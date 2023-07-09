const core = require('@actions/core');
const axios = require('axios');
const { dbDetailsFactory } = require('@metis-data/db-details');
const parse = require('pg-connection-string').parse;
const { sendSpansFromSlowQueryLog } = require('./spans');

const getSlowQueryLogData = async (dbConnection) => {
  const dbDetails = dbDetailsFactory('postgres');

  const slowQueryLogData = await dbDetails.getSlowQueryLogQueriesSpans(dbConnection);
  core.info(slowQueryLogData)
  return await slowQueryLogData;
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
    if (slowQueryLogData && slowQueryLogData.length > 0) {
      await sendSpansFromSlowQueryLog(metisApikey, slowQueryLogData, dbConnection, core.getInput('metis_exporter_url'), core.getInput('target_url'));
    }
    slowQueryLogData && slowQueryLogData.length > 0 ? console.log(`spans count: ${slowQueryLogData?.length}`) : console.log('No spans where found from slow query log');
  } catch (error) {
    console.error(error);
    core.setFailed(error);
  }
}

run();
