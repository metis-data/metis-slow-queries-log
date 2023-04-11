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
const naming_function_1 = __importDefault(require("../../util/naming-function"));
/**
 * Class which represent many to one relationship which resembles `belongsTo` relation in ORMs (Object Relational Mappers).
 * Provides attributes and methods for details of the relationship.
 *
 * Actually there is no many to one relation in database engine. It is basically one to many relation in reverse direction.
 *
 * <span id="exampleSchema"></span>Below is a database schema as an example:
 * ![Database Schema](/images/schema-through.png)
 *
 * Some definitions used in descriptions for {@link M2ORelation}.
 * * ** Source Table: ** Table which this relationship belongs to.
 * * ** Target Table: ** Table that is related to base table.
 *
 * @example
 * // Example tables have single primary key and examples first relation. So zero index ([0]) is used. Use all array elements if necessary.
 * // line_item >---- product
 * // (source)        (target)
 *
 * const relation     = line_item.m2oRelations[0];            // RELATION:    line_item >---- product
 * const foreignKey   = relation.foreignKey;                  // CONSTRAINT:               ^-- product_has_carts
 * const sourceTable  = relation.sourceTable;                 // TABLE:       line_item
 * const targetTable  = relation.targetTable;                 // TABLE:       product
 * const FKColumn     = relation.foreignKey.columns[0];       // COLUMN:      product_id  (from line_item table)
 * const PKColumn     = relation.targetTable.primaryKeys[0];  // COLUMN:      id          (from product table)
 */
class M2ORelation extends relation_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        /**
         * Type of the relation, which is `m2o` for [[M2ORelation]].
         * For TypeScript it is enum of `RelationType.M2O`.
         */
        this.type = "m2o" /* RelationType.M2O */;
        /**
         * Whether the relation targets to many. Since, many to one relations targets single, this is `true`.
         */
        this.toMany = false;
        this.foreignKey = args.foreignKey;
    }
    /**
     * Suggested name for {@link Relation relation}.
     *
     * @see {@link ../relation-names.md Relation Names}
     */
    get name() {
        return this.foreignKey.db._relationNameFunctions.m2o(this);
    }
    /**
     * Returns name for the relation using given naming function.
     *
     * @param relationNameFunctions are custom functions or name of the module that exports relation name functions to generate names with. `pg-structure` provides some builtin modules (`short`, `optimal` and `descriptive`), but you can use your own.
     * @returns name for the relation using naming function.
     */
    getName(relationNameFunctions) {
        return (0, naming_function_1.default)(relationNameFunctions).m2o(this);
    }
    /**
     * Informational text representation of the relation.
     *
     * @example
     * const info = relation.info; // [public.cart] ⭃―― cart_contact ―――[public.contact]
     */
    get info() {
        return `[${this.sourceTable.fullName}] ⭃―― ${this.foreignKey.name} ―――[${this.targetTable.fullName}]`;
    }
    /**
     * {@link Table} which this {@link M2ORelation relation} belongs to.
     *
     * @example
     * const relation     = product.M2ORelationRelations[0];  // RELATION:    line_item >---- product
     * const sourceTable  = relation.sourceTable;             // TABLE:       line_item
     */
    get sourceTable() {
        return this.foreignKey.table;
    }
    /**
     * {@link Table} which this {@link M2ORelation relation} is referred by.
     *
     * @example
     * const relation     = product.M2ORelationRelations[0];  // RELATION:    line_item >---- product
     * const targetTable  = relation.targetTable;             // TABLE:       product
     */
    get targetTable() {
        return this.foreignKey.referencedTable;
    }
    /**
     * Returns source table alias after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns source table alias after given tables' names replaced.
     */
    getSourceAliasWithout(without) {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[0], without);
    }
    /**
     * Returns target table alias after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns target table alias after given tables' names replaced.
     */
    getTargetAliasWithout(without) {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[1], without);
    }
    /** Source table alias */
    get sourceAlias() {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[0]);
    }
    /** Target table alias */
    get targetAlias() {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[1]);
    }
}
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], M2ORelation.prototype, "name", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], M2ORelation.prototype, "getName", null);
exports.default = M2ORelation;
//# sourceMappingURL=m2o-relation.js.map