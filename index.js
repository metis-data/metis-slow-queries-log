const core = require('@actions/core');
const axios = require('axios');
const { dbDetailsFactory } = require('@metis-data/db-details');
const parse = require('pg-connection-string').parse;
const { sendSpansFromSlowQueryLog } = require('./spans');

const getSlowQueryLogData = async (dbConnection) => {
  const dbDetails = dbDetailsFactory('postgres');

  const slowQueryLogData = dbDetails.getSlowQueryLogQueriesSpans(dbConnection);

  return await slowQueryLogData;
};

const axiosPost = async (url, body, headers) => {
  try {
    const res = await axios.post(url, body, { headers: headers });
    return res;
  } catch (error) {
    console.log(error);
  }
};

async function run() {
  try {
    /*
      Parse connection string to object
    */
    let config = parse(core.getInput('db_connection_string'));

    /*
      Set actions vars from action input args
    */
    const metisApikey = core.getInput('metis_api_key');
    const dbConnection = {
      database: config.database,
      user: config.user,
      password: config.password,
      host: config.host,
      // ssl: config?.ssl || { rejectUnauthorized: false },
    };

    /*
      Collect Slow query log data.
    */
    const slowQueryLogData = await getSlowQueryLogData(dbConnection);
    console.log('check');
    core.info('check -info');
    console.log(`log: ${slowQueryLogData}`);
    core.info(`info: ${JSON.stringify(slowQueryLogData)}`);
    await sendSpansFromSlowQueryLog(metisApikey, core.getInput('metis_api_key'), core.getInput('metis_exporter_url'), slowQueryLogData, dbConnection, core.getInput('target_url'));
  } catch (error) {
    console.error(error);
    core.setFailed(error);
  }
}

run();
