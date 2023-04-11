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
const src_1 = require("@typescript-plus/fast-memoize-decorator/dist/src");
const relation_1 = __importDefault(require("../base/relation"));
const get_aliases_1 = __importDefault(require("../../util/get-aliases"));
const strip_1 = __importDefault(require("../../util/strip"));
const get_adjectives_1 = __importDefault(require("../../util/get-adjectives"));
const naming_function_1 = __importDefault(require("../../util/naming-function"));
/**
 * Class which represent a many to many relationship which resembles `belongsToMany` or `hasManyThrough` relations in ORMs (Object Relational Mappers).
 * Provides attributes and methods for details of the relationship.
 *
 * Actually there isn't such a thing called **many to many relationship** or **through constraint** in the database engine.
 * They are concepts to describe records which may be related more than one record on both sides.
 * For example an invoice may contain more than one product and a product may related to more than one invoice.
 * Those relationships are solved using a **join table**.
 *
 * Since those relations are not present in database engine, they are extracted by estimation/interpretation.
 * Many non-join tables in a database could have more than one foreign keys,
 * and they may not meant to be join tables, but they still appear to have through relationships.
 *
 * <span id="exampleSchema"></span>Below is a database schema as an example:
 * ![Database Schema](/images/schema-through.png)
 *
 * Some definitions used in descriptions for {@link M2MRelation}.
 * * ** Source Table: ** Table which this relationship belongs to.
 * * ** Join Table: ** Table that contains common fields from two or more other tables.
 * * ** Target Table: ** Table that is related to base table through a join table.
 * <br><br>
 * Product table has 3 foreign keys. Product table is not meant to be a many to many join table.
 * However product could have been join table for `size & vendor`, `color & vendor` and `size & color`. As a result size,
 * color and vendor tables would have many to many relationships.
 *
 * @example
 * // Example tables have single primary key and and examples first relation. So zero index ([0]) is used. Use all array elements if necessary.
 * // product ----< line_item >---- cart
 * // (source)        (join)       (target)
 *
 * const relation             = product.m2mRelations[0];              // RELATION:    product ---< line_item >--- cart
 * const foreignKey           = relation.foreignKey;                  // FOREIGNKEY:           ^-- product_has_carts
 * const targetForeignKey     = relation.targetForeignKey;            // FOREIGNKEY:       cart_has_products --^
 * const sourceTable          = relation.sourceTable;                 // TABLE:       product
 * const targetTable          = relation.targetTable;                 // TABLE:       cart
 * const sourceJoinFKColumn   = relation.foreignKey.columns[0];       // COLUMN:      product_id  (from line_item table)
 * const targetJoinFKColumn   = relation.targetForeignKey.columns[0]; // COLUMN:      cart_id     (from line_item table)
 * const sourcePKColumn       = relation.sourceTable.primaryKeys[0];  // COLUMN:      id          (from product table)
 * const targetPKColumn       = relation.targetTable.primaryKeys[0];  // COLUMN:      id          (from cart table)
 */
class M2MRelation extends relation_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        /**
         * Type of the relation, which is `m2m` for [[M2MRelation]].
         * For TypeScript it is enum of `RelationType.M2M`.
         */
        this.type = "m2m" /* RelationType.M2M */;
        /**
         * Whether the relation targets to many. Since, many to many relations targets many, this is `true`.
         */
        this.toMany = true;
        this.foreignKey = args.foreignKey;
        this.targetForeignKey = args.targetForeignKey;
    }
    /**
     * Suggested name for {@link Relation relation}.
     *
     * @see {@link ../relation-names.md Relation Names}
     */
    get name() {
        return this.foreignKey.db._relationNameFunctions.m2m(this);
    }
    /**
     * Returns name for the relation using given naming function.
     *
     * @param relationNameFunctions are custom functions or name of the module that exports relation name functions to generate names with. `pg-structure` provides some builtin modules (`short`, `optimal` and `descriptive`), but you can use your own.
     * @returns name for the relation using naming function.
     */
    getName(relationNameFunctions) {
        return (0, naming_function_1.default)(relationNameFunctions).m2m(this);
    }
    /**
     * Informational text representation of the relation.
     *
     * @example
     * const info = relation.info; // [public.product]――― line_item_product ――⥷ [public.line_item] ⭃―― line_item_cart ―――[public.cart]
     */
    get info() {
        return `[${this.sourceTable.fullName}]――― ${this.foreignKey.name} ――⥷ [${this.joinTable.fullName}] ⭃―― ${this.targetForeignKey.fullName} ―――[${this.targetTable.fullName}]`;
    }
    /**
     * {@link Table} which this relation belongs to.
     *
     * @example
     * const relation = product.M2MRelationRelations[0];  // RELATION:    product ---< line_item >--- cart
     * const source   = relation.sourceTable;             // TABLE:       product
     */
    get sourceTable() {
        return this.foreignKey.referencedTable;
    }
    /**
     * Join {@link Table} of this relationship. This table contains foreign key columns referring both
     * {@link M2MRelation.sourceTable sourceTable} and {@link M2MRelation.targetTable targetTable}.
     *
     * @example
     * const relation  = product.M2MRelationRelations[0]; // RELATION:    product ---< line_item >--- cart
     * const joinTable = relation.joinTable;              // TABLE:       line_item
     */
    get joinTable() {
        return this.foreignKey.table;
    }
    /**
     * {@link Table} which this relation is referring to (Through a join table).
     *
     * @example
     * const relation = product.M2MRelationRelations[0];  // RELATION:    product ---< line_item >--- cart
     * const target   = relation.targetTable;             // TABLE:       cart
     */
    get targetTable() {
        return this.targetForeignKey.referencedTable;
    }
    /** @ignore */
    getWithout(string, without) {
        const withouts = new Set(Array.isArray(without) ? without : [without]);
        let result = string;
        if (without !== "join") {
            result = super.getWithout(string, without);
        }
        if (withouts.has("join") || withouts.has("any")) {
            result = (0, strip_1.default)(result, this.joinTable.name);
        }
        return result;
    }
    /**
     * Returns source table name after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns source table name after given tables' names replaced.
     */
    getSourceNameWithout(without) {
        return this.getWithout(this.sourceTable.name, without);
    }
    /**
     * Returns join table name after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns join table name after given tables' names replaced.
     */
    getJoinNameWithout(without) {
        return this.getWithout(this.joinTable.name, without);
    }
    /**
     * Returns target table name after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns target table name after given tables' names replaced.
     */
    getTargetNameWithout(without) {
        return this.getWithout(this.targetTable.name, without);
    }
    /**
     * Returns source table alias after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns source table alias after given tables' names replaced.
     */
    getSourceAliasWithout(without) {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[1], without);
    }
    /**
     * Returns join table alias after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns join table alias after given tables' names replaced.
     */
    getJoinAliasWithout(without) {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[0], without);
    }
    /**
     * Returns target table alias after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns target table alias after given tables' names replaced.
     */
    getTargetAliasWithout(without) {
        return this.getWithout((0, get_aliases_1.default)(this.targetForeignKey)[1], without);
    }
    /** Source table name */
    get sourceName() {
        return this.getWithout(this.sourceTable.name);
    }
    /** Join table name. */
    get joinName() {
        return this.getWithout(this.joinTable.name);
    }
    /** Target table name */
    get targetName() {
        return this.getWithout(this.targetTable.name);
    }
    /** Source table alias */
    get sourceAlias() {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[1]);
    }
    /** Join table alias */
    get joinAlias() {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[0]);
    }
    /** Target table alias */
    get targetAlias() {
        return this.getWithout((0, get_aliases_1.default)(this.targetForeignKey)[1]);
    }
    /** Source table adjective */
    get sourceAdjective() {
        return (0, get_adjectives_1.default)(this.foreignKey.name, this.sourceTable.name, this.joinTable.name)[0];
    }
    /** Join table adjective */
    get joinAdjective() {
        return (0, get_adjectives_1.default)(this.foreignKey.name, this.sourceTable.name, this.joinTable.name)[1];
    }
    /** Target table adjective */
    get targetAdjective() {
        return (0, get_adjectives_1.default)(this.targetForeignKey.name, this.joinTable.name, this.targetTable.name)[1];
    }
}
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], M2MRelation.prototype, "name", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], M2MRelation.prototype, "getName", null);
exports.default = M2MRelation;
//# sourceMappingURL=m2m-relation.js.map