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
const composite_type_1 = __importDefault(require("./type/composite-type"));
const db_object_1 = __importDefault(require("./base/db-object"));
/**
 * Class which represent a PostgreSQL {@link Schema schema}. Provides attributes and methods for details of the {@link Schema schema}.
 */
class Schema extends db_object_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        /**
         * All {@link Table tables} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         *
         * @example
         * const tableArray   = schema.tables;
         * const isAvailable  = schema.tables.has('person');
         * const table        = schema.tables.get('account');
         * const name         = table.name;
         *
         * schema.tables.forEach(table => console.log(table.name));
         */
        this.tables = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link View views} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         *
         * @example
         * const viewArray    = schema.views;
         * const isAvailable  = schema.views.has('admin_person');
         * const view         = schema.views.get('big_account');
         * const name         = view.name;
         *
         * schema.views.forEach(view => console.log(view.name));
         */
        this.views = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link MaterializedView materialized views} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         *
         * @example
         * const mViewArray   = schema.materializedViews;
         * const isAvailable  = schema.materializedViews.has('admin_person');
         * const mView        = schema.materializedViews.get('big_account');
         * const name         = mView.name;
         *
         * schema.materializedViews.forEach(mView => console.log(mView.name));
         */
        this.materializedViews = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link Sequence sequences} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         *
         * @example
         * const sequenceArray  = schema.sequences;
         * const isAvailable    = schema.sequences.has('person_id_seq');
         * const sequence       = schema.sequences.get('account_id_seq');
         * const name           = sequence.name;
         *
         * schema.sequences.forEach(sequence => console.log(sequence.name));
         */
        this.sequences = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link NormalFunction normalFunctions} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         *
         * @example
         * const functionArray   = schema.normalFunctions;
         * const isAvailable     = schema.normalFunctions.has('some_function');
         * const function        = schema.normalFunctions.get('some_function');
         * const name            = normalFunctions.name;
         *
         * schema.tables.forEach(table => console.log(table.name));
         */
        this.normalFunctions = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link Procedure procedures} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         *
         * @example
         * const functionArray   = schema.procedures;
         * const isAvailable     = schema.procedures.has('some_procedure');
         * const function        = schema.procedures.get('some_procedure');
         * const name            = procedures.name;
         *
         * schema.tables.forEach(table => console.log(table.name));
         */
        this.procedures = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link AggregateFunction aggregateFunctions} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         *
         * @example
         * const functionArray   = schema.aggregateFunctions;
         * const isAvailable     = schema.aggregateFunctions.has('some_function');
         * const function        = schema.aggregateFunctions.get('some_function');
         * const name            = aggregateFunctions.name;
         *
         * schema.tables.forEach(table => console.log(table.name));
         */
        this.aggregateFunctions = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link WindowFunction windowFunctions} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         *
         * @example
         * const functionArray   = schema.windowFunctions;
         * const isAvailable     = schema.windowFunctions.has('some_function');
         * const function        = schema.windowFunctions.get('some_function');
         * const name            = windowFunctions.name;
         *
         * schema.tables.forEach(table => console.log(table.name));
         */
        this.windowFunctions = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link Type custom database types} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
         * This list includes types originated from entities such as tables, views and materialized views. Entities are also composite types in PostgreSQL.
         * To exclude types originated from entities use `types` method.
         *
         * @example
         * const typeArray    = schema.typesIncludingEntities;
         * const isAvailable  = schema.typesIncludingEntities.has('address');
         * const type         = schema.typesIncludingEntities.get('address');
         * const columns      = type.columns;
         */
        this.typesIncludingEntities = indexable_array_1.default.throwingFrom([], "name", "oid", "classOid", "internalName");
        /**
         * {@link Schema} of the object.
         */
        this.schema = this;
        this._db = args.db;
        this.oid = args.oid;
        ["_db"].forEach((property) => Object.defineProperty(this, property, { writable: true, enumerable: false })); // Make added fields non-enumerable.
    }
    /**
     * All {@link Entity entities} ({@link Table tables} and {@link View views}) of the {@link Schema schema}
     * as an {@link IndexableArray indexable array} ordered by name.
     */
    get entities() {
        return indexable_array_1.default.throwingFrom([...this.tables, ...this.views, ...this.materializedViews], "name");
    }
    /**
     * All {@link Function functions} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
     *
     * @example
     * const functionArray   = schema.functions;
     * const isAvailable     = schema.functions.has('some_function');
     * const function        = schema.functions.get('some_function');
     * const name            = function.name;
     *
     * schema.tables.forEach(table => console.log(table.name));
     */
    get functions() {
        return indexable_array_1.default.throwingFrom([...this.normalFunctions, ...this.procedures, ...this.aggregateFunctions, ...this.windowFunctions], "name");
    }
    /**
     * All {@link Type custom database types} of the {@link Schema schema} as an {@link IndexableArray indexable array} ordered by name.
     * This list excludes types originated from entities such as tables, views and materialized views. Entities are also composite types in PostgreSQL.
     * To get all types including entities use `typesIncludingEntities` method.
     *
     * @example
     * const typeArray    = schema.types;
     * const isAvailable  = schema.types.has('address');
     * const type         = schema.types.get('address');
     * const columns      = type.columns;
     */
    get types() {
        return this.typesIncludingEntities.filter((type) => !(type instanceof composite_type_1.default) || type.relationKind === "c");
    }
    get fullName() {
        return this.name;
    }
    /**
     * Returns {@link Table table}, {@link View view} or {@link Column column} on given path in {@link Schema schema}. Path should be in dot (.) notation.
     *
     * Note for TypeScript users: Since `get()` could return one of the many possible types, you may need to specify your expected type using `as`.
     * i.e. `const result = db.get("public.account") as Table`;
     *
     * @param path is the path of the requested item in dot (.) notation such as 'public.contact'
     * @returns requested {@link DbObject database object}.
     * @example
     * const table  = db.get('contact');      // Returns contact table in public schema.
     * const column = db.get('contact.name'); // Returns name column of the contact table.
     */
    get(path) {
        const [entityName, ...parts] = path.split(".");
        const entity = this.entities.get(entityName);
        return parts.length > 0 && entity ? entity.get(parts.join(".")) : entity;
    }
}
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Schema.prototype, "entities", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Schema.prototype, "functions", null);
__decorate([
    (0, fast_memoize_decorator_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Schema.prototype, "types", null);
exports.default = Schema;
//# sourceMappingURL=schema.js.map