import IndexableArray from "indexable-array";
import { RelationNameFunctions, CollisionsByTable } from "../types/index";
import Schema from "./schema";
import Table from "./entity/table";
import Column from "./column";
import Index from ".";
import Entity from "./base/entity";
import Type from "./base/type";
import { QueryResults } from "../types/query-result";
import { Func } from "..";
/** @ignore */
export interface Config {
    relationNameFunctions: RelationNameFunctions | string;
    commentDataToken: string;
    foreignKeyAliasSeparator: string;
    foreignKeyAliasTargetFirst: boolean;
}
/**
 * Class which represent a {@link Db database}. Provides attributes and methods for details of the {@link Db database}.
 */
export default class Db {
    /** @hidden */
    _relationNameFunctions: RelationNameFunctions;
    /** @ignore */
    constructor(args: {
        name: string;
        serverVersion: string;
    }, config: Config, queryResults: QueryResults, relationNameFunctions: RelationNameFunctions);
    /**
     * Serializes object.
     *
     * CAVEATS:
     * - Serialized data may or may not be deserialized with another version of `pg-structure`. (Even between minor versions are not guaranteed).
     * - Serialized data is not direct stringified version of objects.
     * - Ignores relation name function provided using `relationNameFunctions` args, if it is not a module name.
     *
     * @example
     * import pgStructure, { deserialize } from "pg-structure";
     * const db = await pgStructure({ database: "db", user: "u", password: "pass" });
     * const serialized = db.serialize();
     * const otherDb = deserialize(serialized);
     */
    serialize(): string;
    /** SQL query results returned from database to build pg-structure. */
    private queryResults;
    /** Random assigned id to db. */
    readonly id: number;
    /**  Name  of {@link Db database}. */
    readonly name: string;
    /** Version of the PostgreSQL Engine */
    readonly serverVersion: string;
    /**
     * `pg-structure` configuration.
     *
     * @ignore
     */
    readonly _config: Config;
    /**
     * PostgreSQL system schemas needed by `pg-structure`.
     *
     * @ignore
     */
    readonly systemSchemas: IndexableArray<Schema, "name", "oid", true>;
    /**
     * All {@link Schema schemas} in the {@link Db database} as an {@link IndexableArray indexable array} ordered by their name.
     *
     * @example
     * const schemaArray  = db.schemas;
     * const isAvailable  = db.schemas.has('another_schema');
     * const public       = db.schemas.get('public');
     * const name         = public.name;
     * const names = db.schemas.map(schema => schema.name);
     */
    readonly schemas: IndexableArray<Schema, "name", "oid", true>;
    /**
     * All {@link DbObject database objects} of given type of the database. Different PostgreSQL schemas may have same named objects.
     * `get` method of {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     *
     * @ignore
     * @param type is type of objects to get from database.
     * @returns all objects of given type of the database.
     * @example
     * const allTables = db._allObjects(type: "tables");
     */
    private _allObjects;
    /**
     * All {@link Table tables} of the database. Returned array have all objects, you may loop over them.
     * However Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named table. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     */
    get tables(): IndexableArray<Table, "name", "oid", true>;
    /**
     * All {@link Entity entities} of the database. Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named entity. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     */
    get entities(): IndexableArray<Entity, "name", "oid", true>;
    /**
     * All user defined {@link Type types} of the database excluding {@link entity entities} such as
     * {@link Table table}, {@link Views view}, {@link MaterializedView materialized view} and {@link Sequence sequence} types.
     * Entities are also composite types in PostgreSQL. To get all types including entities use `typesIncludingEntities` method.
     * Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named type. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     *
     * @see [[typesIncludingEntities]], [[systemTypes]], [[allTypes]]
     */
    get types(): IndexableArray<Type, "name", "oid" | "classOid" | "arrayOid" | "internalName", true>;
    /**
     * All user defined {@link Type types} of the database including {@link entity entities} such as
     * {@link Table table}, {@link Views view}, {@link MaterializedView materialized view} and {@link Sequence sequence} types.
     * Entities are also composite types in PostgreSQL. To get all types excluding entities use `types` method.
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     *
     * @see [[types]], [[systemTypes]], [[allTypes]]
     */
    get typesIncludingEntities(): IndexableArray<Type, "name", "oid" | "classOid" | "arrayOid" | "internalName", true>;
    /**
     * All system {@link Type types} of the database. Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named type. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     *
     * @see [[types]], [[typesIncludingEntities]], [[allTypes]]
     */
    get systemTypes(): IndexableArray<Type, "name", "oid" | "classOid" | "arrayOid" | "internalName", true>;
    /**
     * All {@link Type types} of the database including system types and {@link entity entities}.
     * Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named type. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     *
     * @see [[types]], [[typesIncludingEntities]], [[systemTypes]]
     */
    get allTypes(): IndexableArray<Type, "name", "oid" | "classOid" | "arrayOid" | "internalName", true>;
    /**
     * All {@link Index indexes} of the database. Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named index. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     */
    get indexes(): IndexableArray<Index, "name", "oid", true>;
    /**
     * All {@link Entity entities} of the database. Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named entity. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     */
    get functions(): IndexableArray<Func, "name", "oid", true>;
    /**
     * Returns {@link Schema schema}, {@link Table table} or {@link Column column} for given path. Path should be in dot (.) notation.
     * If no schema is provided looks into `public` schema as PostgreSQL does.
     *
     * Note for TypeScript users: Since `get()` could return one of the many possible types, you may need to specify your expected type using `as`.
     * i.e. `const result = db.get("public") as Schema`;
     *
     * @param path is the path of the requested item in dot (.) notation such as `public.contact`
     * @returns requested {@link DbObject database object}.
     * @example
     * const schema   = db.get('public');               // Returns public schema.
     * const table    = db.get('public.contact');       // Returns contact table in public schema.
     * const table2   = db.get('contact');              // Returns contact table in public schema.
     * const column   = db.get('public.contact.name');  // Returns name column of the contact table in public schema.
     * const column2  = db.get('contact.name');         // Returns name column of the contact table in public schema.
     */
    get(path: string): Schema | Entity | Column;
    /**
     * Name collisions of table relations if there are any, otherwise undefined.
     */
    get relationNameCollisions(): CollisionsByTable | undefined;
}
//# sourceMappingURL=db.d.ts.map