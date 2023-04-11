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
const src_1 = require("@typescript-plus/fast-memoize-decorator/dist/src");
const entity_1 = __importDefault(require("../base/entity"));
const m2o_relation_1 = __importDefault(require("../relation/m2o-relation"));
const o2m_relation_1 = __importDefault(require("../relation/o2m-relation"));
const m2m_relation_1 = __importDefault(require("../relation/m2m-relation"));
const type_guard_1 = require("../../util/type-guard");
const helper_1 = require("../../util/helper");
/**
 * Class which represent a table. Provides attributes and methods for details of the table.
 * Tables may have relationships with other tables.
 *
 * <span id="exampleSchema"></span>Below is a database schema which is used in code examples.
 * ![Database Schema](/images/schema-through.png)
 */
class Table extends entity_1.default {
    constructor() {
        super(...arguments);
        /**
         * All {@link Trigger triggers} in the table as an [[IndexableArray]] ordered by name.
         */
        this.triggers = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link Constraint constraints} in the table as an [[IndexableArray]] ordered by name.
         */
        this.constraints = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link ForeignKey foreign keys} which are referring to this {@link Table table} as an [[IndexableArray]].
         *
         * @see [[Table.o2mRelations]], [[Table.m2oRelations]], [[Table.m2mRelations]] to get more details about relations.
         */
        this.foreignKeysToThis = indexable_array_1.default.throwingFrom([], "name");
        /**
         * All {@link Index indexes} in the table as an [[IndexableArray]], ordered by name.
         */
        this.indexes = indexable_array_1.default.throwingFrom([], "name");
    }
    /**
     * Returns {@link ForeignKey foreign keys} from this table to `target` table.
     *
     * @param target is target {@link Table table} to get foreign keys for. It could be name, full name or {@link Table table} object.
     * @returns foreign keys from this table to target table.
     */
    getForeignKeysTo(target) {
        const targetTable = typeof target === "string" ? this.schema.tables.getMaybe(target) || this.db.tables.get(target) : target;
        return (0, helper_1.getForeignKeysTo)(this, targetTable);
    }
    /**
     * Returns {@link ForeignKey foreign keys} from given table to this table.
     *
     * @param from is {@link Table table} to get foreign keys targeting this table. It could be name, full name or {@link Table table} object.
     * @returns foreign keys from given table to this table.
     */
    getForeignKeysFrom(from) {
        const sourceTable = typeof from === "string" ? this.schema.tables.getMaybe(from) || this.db.tables.get(from) : from;
        return (0, helper_1.getForeignKeysTo)(sourceTable, this);
    }
    /**
     * Returns join tables between this table and target table.
     *
     * @param target is target {@link Table table} to get join tables for. It could be name, full name or {@link Table table} object.
     */
    getJoinTablesTo(target) {
        const targetTable = typeof target === "string" ? this.schema.tables.getMaybe(target) || this.db.tables.get(target) : target;
        const joinTables = this.getThroughConstraints()
            .filter((tc) => tc.toOther.referencedTable === targetTable)
            .map((tc) => tc.toOther.table);
        const uniqueJoinTables = new Set(joinTables);
        return indexable_array_1.default.throwingFrom(uniqueJoinTables, "name").sortBy("name");
    }
    /**
     * All {@link ForeignKey foreign keys} in the {@link Table table} as an [[IndexableArray]] ordered by name.
     *
     * @see {@link Table.o2mRelations o2mRelations}, {@link Table.m2oRelations m2oRelations}, {@link Table.m2mRelations m2mRelations} to get more details about relations.
     */
    get foreignKeys() {
        return this.constraints.filter(type_guard_1.isForeignKey);
    }
    /**
     * All {@link UniqueConstraint unique constraints} in the {@link Table table} as an [[IndexableArray]] ordered by name.
     */
    get uniqueConstraints() {
        return this.constraints.filter(type_guard_1.isUniqueConstraint);
    }
    /**
     * All {@link CheckConstraint check constraints} in the {@link Table table} as an [[IndexableArray]] ordered by name.
     */
    get checkConstraints() {
        return this.constraints.filter(type_guard_1.isCheckConstraint);
    }
    /**
     * All {@link ExclusionConstraint exclusion constraints} in the {@link Table table} as an [[IndexableArray]] ordered by name.
     */
    get exclusionConstraints() {
        return this.constraints.filter(type_guard_1.isExclusionConstraint);
    }
    /**
     * {@link PrimaryKey Primary key} of this {@link Table table}.
     *
     * @see {@link Table.primaryKeyColumns primaryKeyColumns} to get primary key columns directly.
     * @example
     * table.primaryKey.columns.forEach(column => console.log(column.name));
     */
    get primaryKey() {
        return this.constraints.find(type_guard_1.isPrimaryKey);
    }
    /**
     * {@link Table Tables}, which this {@link Table table} has {@link O2MRelation one to many relationship}, ordered by table name.
     * Please note that same table will appear more than once if there are more than one relationship between tables or same named tables from
     * different schemas (i.e. `public.account` may have relations with `public.contact` and `vip.contact`).
     *
     * @see [Example schema](.exampleSchema), {@link IndexableArray}
     * @example
     * vendorTable.hasManyTables.forEach(table => console.log(table.name));
     * vendorTable.hasManyTables.getAll("contact"); // All related tables named contact.
     */
    get hasManyTables() {
        return this.foreignKeysToThis.map((fk) => fk.table).sortBy("name");
    }
    /**
     * {@link Table Tables}, which this {@link Table table} has {@link M2ORelation belongs to relationship} (a.k.a. many to one) which is reverse direction of
     * {@link O2MRelation one to many relationship} (a.k.a one to many), ordered by table name.
     * Please note that same table will appear more than once if there are more than one relationship between tables or same named tables from
     * different schemas (i.e. `public.account` may have relations with `public.contact` and `vip.contact`).
     *
     * @see [Example schema](.exampleSchema), {@link IndexableArray}
     * @example
     * productTable.belongsToTables.forEach(table => console.log(table.name));
     * productTable.belongsToTables.getAll("contact"); // All related tables named contact.
     */
    get belongsToTables() {
        return this.foreignKeys.map((fk) => fk.referencedTable).sortBy("name");
    }
    /**
     * {@link Table Tables} which this {@link Table table} has {@link M2MRelation many to many relationship}, ordered by table name
     * Please note that same table will appear more than once if there are more than one relationship between tables or same named tables from
     * different schemas (i.e. `public.account` may have relations with `public.contact` and `vip.contact`).
     *
     * @see [Example schema](.exampleSchema)
     * @example
     * // Cart (id) has many products (id) through line_item join table.
     * cartTable.belongsToManyTables.forEach(table => console.log(table.name));
     * cartTable.belongsToManyTables.getAll("contact"); // All related tables named contact.
     */
    get belongsToManyTables() {
        const tables = this.getThroughConstraints().map((constraint) => constraint.toOther.referencedTable);
        return indexable_array_1.default.throwingFrom(tables, "name").sortBy("name");
    }
    /**
     * {@link Table Tables} which this {@link Table table} has {@link M2MRelation many to many relationship} joined by primary keys only in join table, ordered by table name
     * Please note that same table will appear more than once if there are more than one relationship between tables or same named tables from
     * different schemas (i.e. `public.account` may have relations with `public.contact` and `vip.contact`).
     *
     * @see [Example schema](.exampleSchema), {@link IndexableArray}
     * @example
     * // Cart (id) has many products (id) through line_item join table.
     * cartTable.belongsToManyTablesPk.forEach(table => console.log(table.name));
     * cartTable.belongsToManyTablesPk.getAll("contact"); // All related tables named contact.
     */
    get belongsToManyTablesPk() {
        const tables = this.getThroughConstraints(true).map((constraint) => constraint.toOther.referencedTable);
        return indexable_array_1.default.throwingFrom(tables, "name").sortBy("name");
    }
    /**
     * Array of {@link M2MRelation many to many relationships} of the {@link Table table}. {@link M2MRelation Many to many relationships} resembles
     * `has many through` and `belongs to many` relations in ORMs. It has some useful methods and information for generating ORM classes.
     */
    get m2mRelations() {
        return indexable_array_1.default.throwingFrom(this.getM2MRelations(false), "name").sortBy("name");
    }
    /**
     * Array of {@link M2MRelation many to many relationships} of the {@link Table table}. Different from {@link Table.m2mRelations m2mRelations},
     * this only includes relations joined by `Primary Foreign Keys` in join table. `Primary Foreign Key` means
     * foreign key of join table which are also primary key of join table at the same time.
     * {@link M2MRelation} resembles `has many through` and `belongs to many` relations in ORMs.
     * It has some useful methods and information for generating ORM classes.
     */
    get m2mRelationsPk() {
        return indexable_array_1.default.throwingFrom(this.getM2MRelations(true), "name").sortBy("name");
    }
    /**
     * Array of {@link O2MRelation one to many relationships} of the {@link Table table}. {@link O2MRelation} resembles
     * `has many` relations in ORMs. It has some useful methods and information for generating ORM classes.
     */
    get o2mRelations() {
        return this.foreignKeysToThis.map((fk) => new o2m_relation_1.default({ foreignKey: fk })).sortBy("name");
    }
    /**
     * Array of {@link M2ORelation many to one relationships} of the {@link Table table}. {@link M2ORelation} resembles
     * `belongs to` relations in ORMs. It has some useful methods and information for generating ORM classes.
     */
    get m2oRelations() {
        return this.foreignKeys.map((fk) => new m2o_relation_1.default({ foreignKey: fk })).sortBy("name");
    }
    /**
     * List of all relationships of the {@link Table table}. They are sort by type ([[O2MRelation]], [[M2ORelation]], [[M2MRelation]]).
     */
    get relations() {
        return indexable_array_1.default.throwingFrom([...this.o2mRelations, ...this.m2oRelations, ...this.m2mRelations], "name");
    }
    /**
     * Returns through constraints.
     *
     * @param onlyPk is whether to include only PK column constraints.
     * @returns through constraints and their details.
     */
    getThroughConstraints(onlyPk = false) {
        const result = [];
        this.foreignKeysToThis.forEach((fkToThis) => {
            const joinTable = fkToThis.table;
            joinTable.foreignKeys
                .filter((fkToOther) => fkToThis !== fkToOther)
                .forEach((fkToOther) => {
                result.push({
                    toThis: fkToThis,
                    toOther: fkToOther,
                });
            });
        });
        return onlyPk
            ? result.filter((c) => c.toThis.columns.every((col) => col.isPrimaryKey) && c.toOther.columns.every((col) => col.isPrimaryKey))
            : result;
    }
    /** @ignore */
    getM2MRelations(onlyPk) {
        return this.getThroughConstraints(onlyPk).map((tc) => new m2m_relation_1.default({ foreignKey: tc.toThis, targetForeignKey: tc.toOther }));
    }
    /**
     * Returns {@link Column column} with given name from {@link Table table}.
     *
     * @param path is the name of the {@link Column column}.
     * @returns requested {@link Column columns}.
     * @example
     * const column = entity.get('contact'),  // Returns contact column from entity.
     */
    get(column) {
        return this.columns.get(column);
    }
}
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Table.prototype, "belongsToManyTables", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Table.prototype, "belongsToManyTablesPk", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Table.prototype, "m2mRelations", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Table.prototype, "m2mRelationsPk", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Table.prototype, "o2mRelations", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Table.prototype, "m2oRelations", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Table.prototype, "relations", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], Table.prototype, "getThroughConstraints", null);
exports.default = Table;
//# sourceMappingURL=table.js.map