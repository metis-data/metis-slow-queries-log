import { Client, ClientConfig } from "pg";
import { JSONData } from "../types/json";
import { CaseType } from "../types";
import { SQLFileResult } from "../types/query-result";
import Schema from "../pg-structure/schema";
import Db from "../pg-structure/db";
import Table from "../pg-structure/entity/table";
/**
 * Extracts JSON5 between given tokens such as `[pg-structure]` and `[/pg-structure]` tags,
 * converts it to object and returns created object.
 *
 * @ignore
 * @param token is the token to search.
 * @param input is th string to extract JSON from.
 * @returns object created from JSON. Undefined if no input is provided or no token is found.
 * @example
 * let meta = extractJSON('Some comment [pg]{"type": "post"}[/pg]', "pg"); // meta = { type: 'post' }
 * let othr = extractJSON('Some comment [xx]{"type": "post"}[/xx]', "xx"); // othr = { type: 'post' }
 */
export declare function extractJSON(token: string, input?: string): JSONData | undefined;
/**
 * Replaces JSON between given tokens such as `[pg-structure]` and `[/pg-structure]` tags including tags.
 *
 * @ignore
 * @param token is the token to search.
 * @param input is the string to replace JSON part.
 * @returns new string. Undefined if no input is provided.
 * @example
 * let meta = replaceJSON('Some comment [pg]{"type": "post"}[/pg]', "pg"); // meta = Some content
 * let othr = replaceJSON('Some comment [xx]{"type": "post"}[/xx]', "xx"); // othr = Some content
 */
export declare function replaceJSON(token: string, input?: string): string | undefined;
/**
 * Parses enum labels defined in PostgreSQL and returns as an array of string values. PostgreSQL returns enum values
 * as comma separated values between curly braces. If string contains a comma, it wraps string with double quotes.
 * fk function considers fk situation.
 *
 * @ignore
 * @param values are enum values.
 * @returns enum labels as an array. If column is not an enum returns null.
 */
export declare function parseEnumValues(values: string | string[]): string[];
/**
 * Returns case type (CamelCase or snake_case) of the given string. Please note, fk function
 * uses simple checks and does not check comprehensively considering all language variations.
 *
 * @ignore
 * @param input is the string to get case type for.
 * @returns case type of the string.
 */
export declare function caseTypeOf(input: string): CaseType;
/**
 * Returns major part of the given version string.
 *
 * @ignore
 * @param version is the version to get major number from.
 * @returns major version of given version.
 */
export declare function majorVersionOf(version: string): number;
/**
 * Returns sorted query versions available which are less than or equal to provided server version.
 *
 * @ignore
 * @returns sorted versions.
 * @example
 * getQueryVersionFor(11); // ["11", "9"]
 */
export declare function getQueryVersionFor(serverVersion: string): Promise<string[]>;
/**
 * Executes given sql file and assign callback function an error events for the query.
 *
 * @ignore
 * @param file is SQL file
 * @param client is node-postgres client to query database.
 * @param schemas is PostgreSQL schemas to be used in query.
 * @param eventCallback is callback to call on 'row' event.
 * @returns void promise
 */
export declare function executeSqlFile<K extends keyof SQLFileResult>(queryVersions: string[], file: K, client: Client, schemas: any[]): Promise<SQLFileResult[K]>;
/**
 * Gets client config from environment variables.
 *
 * @ignore
 * @param prefix is the prefix used in environment variables.
 * @returns the config.
 *
 * @example
 * getEnvValues("DB"); // DB_USER=user DB_CONNECTION_STRIN=abc -> { user: "user", connectionString: "abc" }
 */
export declare function getEnvValues(prefix: string): ClientConfig;
/**
 * Returns pg client. If given object is already pg client returns it directly, otherwise creates pg object
 * based on given options.
 *
 * @ignore
 * @param is pg client or Connection parameters.
 * @returns pg client.
 */
export declare function getConnectedPgClient(pgClientOrConfig: Client | ClientConfig | string): Promise<{
    client: Client;
    shouldCloseConnection: boolean;
}>;
/**
 * Returns given value after replacing type cast.
 *
 * @ignore
 * @param defaultWithTypeCast is default value with type cast.
 * @returns default value without type cast.
 * @example
 * replaceTypeCast("'George'::character varying"); // 'George'
 */
export declare function replaceTypeCast(defaultWithTypeCast: string | number | boolean | null): number | boolean | string | null;
/**
 * Checks whether given default value is a serial type.
 *
 * @ignore
 * @param defaultValue is the default value to test whether it is serial type.
 * @returns whether default value is a serial.
 */
export declare function isSerial(defaultValue: string | null): boolean;
/**
 * Removes quotes around given string and returns it.
 *
 * @ignore
 * @param input is string to remove quotes from.
 * @returns unquoted string.
 */
export declare function unquote(input: string): string;
/**
 * Parses SQL type name returned from `format_type(type_oid, typemod)` PostgreSQL System Information Function.
 * such as `character varying(20)`, `numeric(3,2)`, `extra_modules."extra-domain"[]`, `timestamp(0) without time zone` etc.
 *
 * @ignore
 * @param sqlType is SQL type name returned from `format_type` PostgreSQL System Information Function.
 * @returns type details.
 */
export declare function parseSQLType(db: Db, sqlType: string): {
    schema: Schema;
    typeName: string;
    length?: number;
    precision?: number;
    scale?: number;
};
/**
 * Finds and returns duplicate names from given Indexable array.
 *
 * @ignore
 * @param accessor is one of the attribute names of the Table class which is type of [[IndexableArray]].
 * @returns duplicate names.
 */
export declare function getDuplicateNames(indexableArray: {
    name: string;
}[]): string[];
/**
 * Memoized function to get foreign keys from source table to target table.
 * @hidden
 */
export declare const getForeignKeysTo: (source: Table, target?: Table) => import("indexable-array").default<import("..").ForeignKey, "name", never, true>;
/**
 * Creates a summary table in markdown format for all relations in database.
 *
 * @ignore
 * @returns markdown table.
 *
 * @example
 * pgStructure({ database: "db", user: "user", password: "password" }).then(db => {
 *  console.log(getRelationsMarkdown(db));
 *  console.log(db.relationNameCollisions);
 * });
 */
export declare function getRelationsMarkdown(db: Db, fk?: boolean): string;
/**
 * Converts it's input to an array.
 *
 * @param input is the input value to convert to array.
 * @returns array If input is undefined returns undefined.
 */
export declare function arrify<T>(input: T | T[] | undefined): T[] | undefined;
//# sourceMappingURL=helper.d.ts.map