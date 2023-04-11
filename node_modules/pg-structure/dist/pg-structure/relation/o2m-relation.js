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
 * Class which represent one to many relationship which resembles `hasMany` relation in ORMs (Object Relational Mappers).
 * Provides attributes and methods for details of the relationship.
 *
 * <span id="exampleSchema"></span>Below is a database schema as an example:
 * ![Database Schema](/images/schema-through.png)
 *
 * Some definitions used in descriptions for {@link O2MRelation}.
 * * ** Source Table: ** Table which this relationship belongs to.
 * * ** Target Table: ** Table that is related to base table.
 *
 * @example
 * // Example tables have single primary key and examples first relation. So zero index ([0]) is used. Use all array elements if necessary.
 * // product ----< line_item
 * // (source)       (target)
 *
 * const relation         = product.o2mRelations[0];              // RELATION:    product ---< line_item
 * const foreignKey       = relation.foreignKey;                  // FOREIGN KEY:          ^-- product_has_carts
 * const sourceTable      = relation.sourceTable;                 // TABLE:       product
 * const targetTable      = relation.targetTable;                 // TABLE:       line_item
 * const FKColumn         = relation.foreignKey.columns[0];       // COLUMN:      product_id  (from line_item table)
 * const sourcePKColumn   = relation.sourceTable.primaryKeys[0];  // COLUMN:      id          (from product table)
 */
class O2MRelation extends relation_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        /**
         * Type of the relation, which is `o2m` for [[O2MRelation]].
         * For TypeScript it is enum of `RelationType.O2M`.
         */
        this.type = "o2m" /* RelationType.O2M */;
        /**
         * Whether the relation targets to many. Since, one to many relations targets many, this is `true`.
         */
        this.toMany = true;
        this.foreignKey = args.foreignKey;
    }
    /**
     * Suggested name for {@link Relation relation}.
     *
     * @see {@link ../relation-names.md Relation Names}
     */
    get name() {
        return this.foreignKey.db._relationNameFunctions.o2m(this);
    }
    /**
     * Retunrs name for the relation using given naming function.
     *
     * @param relationNameFunctions are custom functions or name of the modulethat exports relation name functions to generate names with. `pg-structure` provides some builtin modules (`short`, `optimal` and `descriptive`), but you can use your own.
     * @returns name for the relation using naming function.
     */
    getName(relationNameFunctions) {
        return (0, naming_function_1.default)(relationNameFunctions).o2m(this);
    }
    /**
     * Informational text representation of the relation.
     *
     * @example
     * const info = relation.info; // [public.contact]――― cart_contact ――⥷ [public.cart]
     */
    get info() {
        return `[${this.sourceTable.fullName}]――― ${this.foreignKey.name} ――⥷ [${this.targetTable.fullName}]`;
    }
    /**
     * {@link Table} which this {@link O2MRelation relation} belongs to.
     *
     * @example
     * const relation     = product.O2MRelationRelations[0];  // RELATION:    product ---< line_item
     * const sourceTable  = relation.sourceTable;             // TABLE:       product
     */
    get sourceTable() {
        return this.foreignKey.referencedTable;
    }
    /**
     * {@link Table} which this {@link O2MRelation relation} is referring to.
     *
     * @example
     * const relation     = product.O2MRelationRelations[0];  // RELATION:    product ---< line_item
     * const targetTable  = relation.targetTable;             // TABLE:       line_item
     */
    get targetTable() {
        return this.foreignKey.table;
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
     * Returns target table alias after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns target table alias after given tables' names replaced.
     */
    getTargetAliasWithout(without) {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[0], without);
    }
    /** Source table alias */
    get sourceAlias() {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[1]);
    }
    /** Target table alias */
    get targetAlias() {
        return this.getWithout((0, get_aliases_1.default)(this.foreignKey)[0]);
    }
}
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], O2MRelation.prototype, "name", null);
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], O2MRelation.prototype, "getName", null);
exports.default = O2MRelation;
//# sourceMappingURL=o2m-relation.js.map