import { Client, ClientConfig } from "pg";
import { Options } from "./types/index";
import Db from "./pg-structure/db";
/**
 * Reverse engineers a PostgreSQL database and creates [[Db]] instance which represents given database's structure.
 * There are several options such as to include or exclude schemas, provide custom names to relations. Please refer to [[Options]]
 * for detailed explanations.
 *
 * **IMPORTANT:** Please note that if included schemas contain references to a non-included schema, this function throws exception.
 * (e.g. a foreign key to another schema or a type in another schema which is not included)
 *
 * @param client is either a [node-postgres client](https://node-postgres.com/api/client) or a configuration object or a connection string to create a [node-postgres client](https://node-postgres.com/api/client).
 * @param options are preferences to modify reverse engineering process.
 * @returns [[Db]] object which represents given database's structure.
 *
 * @example
 * const db = await pgStructure({ database: "db", user: "u", password: "pass" }, { includeSchemas: ["public"] });
 */
export declare function pgStructure(client?: Client | ClientConfig | string, options?: Options): Promise<Db>;
/**
 * Reads configuration details from environment variables to create [node-postgres client](https://node-postgres.com/api/client).
 * Keys are upper case environment variables prefixed with `options.envPrefix` (default is `DB`).
 *
 * |Environment Varibale|[ClientConfig](https://node-postgres.com/api/client) Key|
 * |---|---|
 * |DB_DATABASE|database|
 * |DB_USER|user|
 * |DB_PASSWORD|password|
 * |...|...|
 *
 * @param options are preferences to modify reverse engineering process.
 * @returns [[Db]] object which represents given database's structure.
 *
 * @example
 * const db = await pgStructure({ includeSchemas: ["public"] });
 *
 * @example
 * const db = await pgStructure(); // Read connection details from environmet variables.
 */
export declare function pgStructure(options?: Options): Promise<Db>;
/**
 * Deserializes given data to create [[Db]] object. Please note that custom relation name functions are not serialized.
 * To serialize, provide functions as a module and use them with `{ relationNameFunctions: "my-module" }`.
 *
 * @param serializedData is serialized data of the `Db` object.
 * @returns [[Db]] object for given serialized data.
 * @example
 * import pgStructure, { deserialize } from "pg-structure";
 * const db = await pgStructure({ database: "db", user: "u", password: "pass" });
 * const serialized = db.serialize();
 * const otherDb = deserialize(serialized);
 */
export declare function deserialize(serializedData: string): Db;
//# sourceMappingURL=main.d.ts.map