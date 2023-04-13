const axios = require('axios');
const { uuid } = require('uuidv4');
const core = require('@actions/core');

const sendSpansToBackend = async (queriesToSend, apiKey, metisExporterUrl, logFileName, metisBackendUrl) => {
  if (!apiKey) {
    console.debug('API Key doesnt exists');
  }
  core.info(`queries to send`);
  core.info(queriesToSend.length);
  core.info(`queries to send`);
  const data = {
    prName: logFileName,
    prId: 'no-set',
    prUrl: 'no-set',
  };

  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(data).length,
        'x-api-key': apiKey,
      },
    };
    await axiosPost(`${metisBackendUrl ? metisBackendUrl : 'https://app.metisdata.io'}/api/tests/create`, JSON.stringify(data), options);

    const url = metisExporterUrl;
    await sendMultiSpans(url, apiKey, queriesToSend);
  } catch (error) {
    console.error(error);
  }
};

const makeSpan = async (query, queryType, plan, connection, logFileName) => {
  const span_id = uuid();
  const traceId = uuid();

  const duration = (plan && plan['Execution Time']) || 1;

  const timestamp = Date.now();
  const startDate = new Date(timestamp).toISOString();
  const endDate = new Date(timestamp + duration).toISOString();

  const vendor = 'github-action';

  // get host name
  let hostName = vendor;
  try {
    hostName = connection.host;
  } catch (e) {}

  const resource = {
    'app.tag.pr': logFileName,
    'service.name': hostName,
    'service.version': 'or0.000000000000001%',
    'telemetry.sdk.name': vendor,
    'telemetry.sdk.version': 'or0.000000000000000000000000001%',
    'telemetry.sdk.language': vendor,
  };

  return {
    parent_id: null,
    name: queryType || 'REPL',
    kind: 'SpanKind.CLIENT',
    timestamp: Date.now(),
    duration: duration,
    start_time: startDate,
    end_time: endDate,
    attributes: {
      'db.name': connection?.database,
      'db.user': connection?.user,
      'db.system': 'postgres',
      'db.operation': queryType,
      'db.statement': query,
      'db.statement.metis': query + `/*traceparent=${traceId}-${span_id}*/''`,
      'db.statement.metis.plan': JSON.stringify(plan, null, 0),
      'net.peer.name': connection?.host,
      'net.peer.ip': connection?.host,
    },
    status: {
      status_code: 'UNSET',
    },
    context: {
      span_id: span_id,
      trace_id: traceId,
    },
    resource,
  };
};

const axiosPost = async (url, body, options) => {
  try {
    const res = await axios.post(url, body, options);
    return res;
  } catch (error) {
    console.log(error);
  }
};

async function sendMultiSpans(url, apiKey, spans) {
  core.info(`spans length : ${spans.length}`);
  const spansString = spans.map((d) => d && JSON.stringify(d, null, 0));
  const response = [];
  for (let chuckedData of spansString) {
    const dataString = chuckedData ? JSON.stringify(chuckedData, null, 0) : undefined;
    if (dataString && dataString.length) {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Content-Length': dataString.length,
          'x-api-key': apiKey,
        },
      };

      response.push(await axiosPost(url, dataString, options));
    }
  }

  return response;
}

const sendSpansFromSlowQueryLog = async (metisApikey, metisExporterUrl, slowQueryLogData, connection, logFileName, metisBackendUrl) => {
  const spans = await Promise.all(
    slowQueryLogData.map(async (item) => {
      const splitted = item.message.split('plan:');
      const data = splitted[1];
      if (data) {
        const jsonStr = JSON.parse(data);
        core.info(data);
        return await makeSpan(jsonStr['Query Text'], 'select', { Plan: jsonStr.Plan }, connection, logFileName);
      }
    })
  );
  core.info(`spans length: ${spans.length} `);
  sendSpansToBackend(spans, metisApikey, metisExporterUrl, logFileName, metisBackendUrl);
};

module.exports = { sendSpansFromSlowQueryLog };
