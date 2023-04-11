import { RelationNameFunctions, RelationType } from "../../types/index";
import Relation, { RelationConstructorArgs, RelationWithout } from "../base/relation";
import Table from "../entity/table";
import ForeignKey from "../constraint/foreign-key";
/** @ignore */
export interface O2MRelationConstructorArgs extends RelationConstructorArgs {
    foreignKey: ForeignKey;
}
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
export default class O2MRelation extends Relation {
    /** @ignore */
    constructor(args: O2MRelationConstructorArgs);
    /**
     * Type of the relation, which is `o2m` for [[O2MRelation]].
     * For TypeScript it is enum of `RelationType.O2M`.
     */
    readonly type = RelationType.O2M;
    /**
     * Whether the relation targets to many. Since, one to many relations targets many, this is `true`.
     */
    readonly toMany: boolean;
    /**
     * Suggested name for {@link Relation relation}.
     *
     * @see {@link ../relation-names.md Relation Names}
     */
    get name(): string;
    /**
     * Retunrs name for the relation using given naming function.
     *
     * @param relationNameFunctions are custom functions or name of the modulethat exports relation name functions to generate names with. `pg-structure` provides some builtin modules (`short`, `optimal` and `descriptive`), but you can use your own.
     * @returns name for the relation using naming function.
     */
    getName(relationNameFunctions: RelationNameFunctions | string): string;
    /**
     * Informational text representation of the relation.
     *
     * @example
     * const info = relation.info; // [public.contact]――― cart_contact ――⥷ [public.cart]
     */
    get info(): string;
    /**
     * {@link Table} which this {@link O2MRelation relation} belongs to.
     *
     * @example
     * const relation     = product.O2MRelationRelations[0];  // RELATION:    product ---< line_item
     * const sourceTable  = relation.sourceTable;             // TABLE:       product
     */
    get sourceTable(): Table;
    /**
     * {@link Table} which this {@link O2MRelation relation} is referring to.
     *
     * @example
     * const relation     = product.O2MRelationRelations[0];  // RELATION:    product ---< line_item
     * const targetTable  = relation.targetTable;             // TABLE:       line_item
     */
    get targetTable(): Table;
    /**
     * {@link ForeignKey Foreign key} between {@link O2MRelation.sourceTable source table} and {@link O2MRelation.targetTable target table}.
     *
     * @example
     * const relation     = product.O2MRelationRelations[0];  // RELATION:    product ---< line_item
     * const foreignKey   = relation.foreignKey;              // CONSTRAINT:           ^-- product_has_carts
     * const FKColumn     = relation.foreignKey.columns[0];   // COLUMN:      product_id (from line_item table)
     */
    foreignKey: ForeignKey;
    /**
     * Returns source table alias after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns source table alias after given tables' names replaced.
     */
    getSourceAliasWithout(without: RelationWithout | RelationWithout[]): string;
    /**
     * Returns target table alias after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns target table alias after given tables' names replaced.
     */
    getTargetAliasWithout(without: RelationWithout | RelationWithout[]): string;
    /** Source table alias */
    get sourceAlias(): string;
    /** Target table alias */
    get targetAlias(): string;
}
//# sourceMappingURL=o2m-relation.d.ts.map