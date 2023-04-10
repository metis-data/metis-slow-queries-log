import { uuid } from "uuidv4";


export const sendSpansToBackend  = async(queriesToSend: any, apiKey: string, metisExporterUrl: string, logFileName: string, metisBackendUrl:string) => {
  if (!apiKey) {
    console.debug("API Key doesnt exists");
  }

  const data = {
    "prName": logFileName,
    "prId": "no-set",
    "prUrl": "no-set"
   }
  

  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(data).length,
        "x-api-key": apiKey,
      },
    };
   await post(`${metisBackendUrl ? metisBackendUrl : 'https://app.metisdata.io' }/api/tests/create`,JSON.stringify(data),options)

    const url = metisExporterUrl;
    await sendMultiSpans(
      url,
      apiKey,
      queriesToSend
    );
  } catch (error) {
    console.error(error);
  }
};

export const makeSpan = async (query: string, queryType: string, plan: any, connection: any, logFileName: string) =>  {
  const span_id = uuid();
  const traceId = uuid();

  const duration = plan && plan["Execution Time"] || 1;

  const timestamp = Date.now();
  const startDate = new Date(timestamp).toISOString();
  const endDate = new Date(timestamp + duration).toISOString();

  const vendor = "github-action";


  // get host name
  let hostName = vendor;
  try {
    hostName = connection.host;
  } catch (e) {

  }

  const resource = {
    "app.tag.pr": logFileName, 
    "service.name": hostName,
    "service.version": 'or0.000000000000001%',
    "telemetry.sdk.name": vendor,
    "telemetry.sdk.version": 'or0.000000000000000000000000001%',
    "telemetry.sdk.language": vendor,
  };

  return {
    parent_id: null,
    name: queryType || "REPL",
    kind: "SpanKind.CLIENT",
    timestamp: Date.now(),
    duration: duration,
    start_time: startDate,
    end_time: endDate,
    attributes: {
      "db.name": connection?.database,
      "db.user": connection?.user,
      "db.system": 'postgres',
      "db.operation": queryType,
      "db.statement": query,
      "db.statement.metis": query + `/*traceparent=${traceId}-${span_id}*/''`,
      "db.statement.metis.plan": JSON.stringify(plan, null, 0),
      "net.peer.name": connection?.host,
      "net.peer.ip": connection?.host,
    },
    status: {
      status_code: "UNSET",
    },
    context: {
      span_id: span_id,
      trace_id: traceId,
    },
    resource,
  };
}


export async function post(url: string, data: string, options: any) {
  const parsedUrl = new URL(url);
  let http: any;
  if (parsedUrl.protocol === 'https:') {
    http = require('https')
  } else {
    http = require('http')
  }
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res: any) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject({
          statusCode: res.statusCode,
          message: `HTTP status code ${res.statusCode}`,
        });
      }

      const body: any = [];
      res.on("data", (chunk: any) => body.push(chunk));
      res.on("end", () => {
        const resString = Buffer.concat(body).toString();
        resolve(resString);
      });
    });

    req.on("error", (err :any) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request time out"));
    });

    req.write(data);
    req.end();
  });
}

export function * chuncker (data: any, limit = 200000) {
  if (!data) {
    return [];
  }

  let result = [];
  let counter = 0;
  for (const item of data) {
    counter += item.length;
    result.push(item);
    if (counter >= limit) {
      yield result;
      counter = 0;
      result = []; // start a new chunk
    }
  }

  yield result;
}

export async function sendMultiSpans(
  url: any,
  apiKey: any,
  spans: any
) {
const spansString = spans.map((d: any) => JSON.stringify(d, null, 0));
const response = [];
for (let chuckedData of chuncker(spansString)) {
  const dataString = JSON.stringify(
      chuckedData,
      null,
      0
  );

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Content-Length": dataString.length,
      "x-api-key": apiKey,
    },
  };

  response.push(await post(url, dataString, options));
}

return response;
}


export const  sendSpansFromSlowQueryLog = async (metisApikey: any, metisExporterUrl: any, slowQueryLogData: any, connection: any, logFileName: any, metisBackendUrl: any) =>  {

  if(metisApikey && metisExporterUrl) {
    const spans = await Promise.all(slowQueryLogData.map(async (item: any) => {
      const splitted = item.message.split("plan:");
      const jsonStr = JSON.parse(splitted[1]);
      return await makeSpan(jsonStr['Query Text'], 'select', {Plan: jsonStr.Plan}, connection, logFileName )
       
    }))
    sendSpansToBackend(spans, metisApikey, metisExporterUrl,logFileName,metisBackendUrl);
  }
  }