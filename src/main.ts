import * as core from '@actions/core'
import axios from 'axios';
const { dbDetailsFactory } = require('@metis-data/db-details');
const parse = require('pg-connection-string').parse;

const getSlowQueryLogData = async (dbConnection: any) => {
  const dbDetails = dbDetailsFactory('postgres');

  const slowQueryLogData = dbDetails.getSlowQueryLogQueriesSpans(dbConnection)
  
  return await slowQueryLogData;
};

const axiosPost = async (url: string, body: any, headers: any) => {
  try {
    const res = await axios.post(url, body, { headers: headers });
    return res;
  } catch (error) {
    console.log(error);
  }
};



async function run(): Promise<void> {
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
    
   
  } catch (error: any) {
    console.error(error);
    core.setFailed(error);
  }
}

run()
