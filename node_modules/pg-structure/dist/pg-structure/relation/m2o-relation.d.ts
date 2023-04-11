import { RelationNameFunctions, RelationType } from "../../types/index";
import Relation, { RelationConstructorArgs, RelationWithout } from "../base/relation";
import Table from "../entity/table";
import ForeignKey from "../constraint/foreign-key";
/** @ignore */
export interface M2ORelationConstructorArgs extends RelationConstructorArgs {
    foreignKey: ForeignKey;
}
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
export default class M2ORelation extends Relation {
    /** @ignore */
    constructor(args: M2ORelationConstructorArgs);
    /**
     * Type of the relation, which is `m2o` for [[M2ORelation]].
     * For TypeScript it is enum of `RelationType.M2O`.
     */
    readonly type = RelationType.M2O;
    /**
     * Whether the relation targets to many. Since, many to one relations targets single, this is `true`.
     */
    readonly toMany: boolean;
    /**
     * Suggested name for {@link Relation relation}.
     *
     * @see {@link ../relation-names.md Relation Names}
     */
    get name(): string;
    /**
     * Returns name for the relation using given naming function.
     *
     * @param relationNameFunctions are custom functions or name of the module that exports relation name functions to generate names with. `pg-structure` provides some builtin modules (`short`, `optimal` and `descriptive`), but you can use your own.
     * @returns name for the relation using naming function.
     */
    getName(relationNameFunctions: RelationNameFunctions | string): string;
    /**
     * Informational text representation of the relation.
     *
     * @example
     * const info = relation.info; // [public.cart] ⭃―― cart_contact ―――[public.contact]
     */
    get info(): string;
    /**
     * {@link Table} which this {@link M2ORelation relation} belongs to.
     *
     * @example
     * const relation     = product.M2ORelationRelations[0];  // RELATION:    line_item >---- product
     * const sourceTable  = relation.sourceTable;             // TABLE:       line_item
     */
    get sourceTable(): Table;
    /**
     * {@link Table} which this {@link M2ORelation relation} is referred by.
     *
     * @example
     * const relation     = product.M2ORelationRelations[0];  // RELATION:    line_item >---- product
     * const targetTable  = relation.targetTable;             // TABLE:       product
     */
    get targetTable(): Table;
    /**
     * {@link ForeignKey Foreign key} between {@link M2ORelation.sourceTable source table} and {@link M2ORelation.targetTable target table}.
     *
     * @example
     * const relation     = product.M2ORelationRelations[0];  // RELATION:    line_item >---- product
     * const foreignKey   = relation.foreignKey;              // CONSTRAINT:               ^-- product_has_carts
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
//# sourceMappingURL=m2o-relation.d.ts.map