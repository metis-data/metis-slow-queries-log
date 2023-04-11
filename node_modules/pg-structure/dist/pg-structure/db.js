"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexable_array_1 = __importDefault(require("indexable-array"));
const fast_memoize_decorator_1 = require("@typescript-plus/fast-memoize-decorator");
const fs_1 = require("fs");
const path_1 = require("path");
const helper_1 = require("../util/helper");
const packageJson = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, "../../package.json"), { encoding: "utf8" }));
/**
 * Function to get duplicate relation names from given relations.
 *
 * @ignore
 * @param relations are relations to get duplicate names.
 */
function getDuplicateRelations(relations) {
    return (0, helper_1.getDuplicateNames)(relations).map((name) => ({ [name]: relations.getAll(name).map((rel) => rel.info) }));
}
/**
 * Class which represent a {@link Db database}. Provides attributes and methods for details of the {@link Db database}.
 */
class Db {
    /** @ignore */
    constructor(args, config, queryResults, relationNameFunctions) {
        /** Random assigned id to db. */
        this.id = Math.random();
        /**
         * PostgreSQL system schemas needed by `pg-structure`.
         *
         * @ignore
         */
        this.systemSchemas = indexable_array_1.default.throwingFrom([], "name", "oid");
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
        this.schemas = indexable_array_1.default.throwingFrom([], "name", "oid");
        if (!args.name) {
            throw new Error("Database name is required.");
        }
        this.name = args.name;
        this.serverVersion = args.serverVersion;
        this._config = config;
        this._relationNameFunctions = relationNameFunctions;
        this.queryResults = queryResults;
    }
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
    serialize() {
        return JSON.stringify({
            name: this.name,
            serverVersion: this.serverVersion,
            version: packageJson.version,
            config: this._config,
            queryResults: this.queryResults,
        });
    }
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
    _allObjects(system, type, ...extra) {
        const schemas = system ? this.systemSchemas : this.schemas;
        return schemas.reduce((allObjects, schema) => allObjects.concat(schema[type]), indexable_array_1.default.throwingFrom([], "name", "oid", ...extra));
    }
    /**
     * All {@link Table tables} of the database. Returned array have all objects, you may loop over them.
     * However Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named table. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     */
    get tables() {
        return this._allObjects(false, "tables");
    }
    /**
     * All {@link Entity entities} of the database. Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named entity. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     */
    get entities() {
        return this._allObjects(false, "entities");
    }
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
    get types() {
        return this._allObjects(false, "types", "classOid", "arrayOid", "internalName");
    }
    /**
     * All user defined {@link Type types} of the database including {@link entity entities} such as
     * {@link Table table}, {@link Views view}, {@link MaterializedView materialized view} and {@link Sequence sequence} types.
     * Entities are also composite types in PostgreSQL. To get all types excluding entities use `types` method.
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     *
     * @see [[types]], [[systemTypes]], [[allTypes]]
     */
    get typesIncludingEntities() {
        return this._allObjects(false, "typesIncludingEntities", "classOid", "arrayOid", "internalName");
    }
    /**
     * All system {@link Type types} of the database. Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named type. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     *
     * @see [[types]], [[typesIncludingEntities]], [[allTypes]]
     */
    get systemTypes() {
        return this._allObjects(true, "typesIncludingEntities", "classOid", "arrayOid", "internalName");
    }
    /**
     * All {@link Type types} of the database including system types and {@link entity entities}.
     * Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named type. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     *
     * @see [[types]], [[typesIncludingEntities]], [[systemTypes]]
     */
    get allTypes() {
        return this.typesIncludingEntities.concat(this.systemTypes);
    }
    /**
     * All {@link Index indexes} of the database. Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named index. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     */
    get indexes() {
        return this.schemas.reduce((allIndexes, schema) => {
            const indexes = schema.tables.reduce((schemaIndexes, table) => schemaIndexes.concat(table.indexes), []);
            return allIndexes.concat(indexes);
        }, indexable_array_1.default.throwingFrom([], "name", "oid"));
    }
    /**
     * All {@link Entity entities} of the database. Returned array have all objects, you may loop over them.
     * However two PostgreSQL schemas may have same named entity. `get` method of
     * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
     * You may also use `getAll` or `get(1234, { key: oid })`.
     */
    get functions() {
        return this._allObjects(false, "functions");
    }
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
    get(path) {
        const [firstPart, ...parts] = path.split(".");
        if (this.schemas.has(firstPart)) {
            const schema = this.schemas.get(firstPart);
            return parts.length > 0 && schema ? schema.get(parts.join(".")) : schema;
        }
        return this.schemas.get("public").get(path);
    }
    /**
     * Name collisions of table relations if there are any, otherwise undefined.
     */
    get relationNameCollisions() {
        const result = {};
        // const a = getDuplicateNames(this.tables[0].m2oRelations).map(name => ({
        //   [name]: this.tables[0].m2oRelations.getAll(name).map(rel => rel.info),
        // }));
        this.tables.forEach((table) => {
            // const duplicates: { m2o: Collision; o2m: Collision; m2m: Collision } = {
            //   m2o: getDuplicateNames(table.m2oRelations).map(name => ({ [name]: table.m2oRelations.getAll(name).map(rel => rel.info) })),
            //   o2m: getDuplicateNames(table.o2mRelations).map(name => ({ [name]: table.o2mRelations.getAll(name).map(rel => rel.info) })),
            //   m2m: getDuplicateNames(table.m2mRelations).map(name => ({ [name]: table.m2mRelations.getAll(name).map(rel => rel.info) })),
            // };
            const duplicates = {
                m2o: getDuplicateRelations(table.m2oRelations),
                o2m: getDuplicateRelations(table.o2mRelations),
                m2m: getDuplicateRelations(table.m2mRelations),
            };
            const tableDuplicateCount = duplicates.m2o.length + duplicates.o2m.length + duplicates.m2m.length;
            if (tableDuplicateCount > 0) {
                result[table.fullName] = duplicates;
            }
        });
        return Object.keys(result).length > 0 ? result : undefined;
    }
}
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Db.prototype, "tables", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Db.prototype, "entities", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Db.prototype, "types", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Db.prototype, "typesIncludingEntities", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Db.prototype, "systemTypes", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Db.prototype, "allTypes", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Db.prototype, "indexes", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Db.prototype, "functions", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Db.prototype, "relationNameCollisions", null);
exports.default = Db;
//# sourceMappingURL=db.js.map