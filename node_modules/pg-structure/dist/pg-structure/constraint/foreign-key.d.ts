import IndexableArray from "indexable-array";
import Constraint, { ConstraintConstructorArgs } from "../base/constraint";
import Column from "../column";
import { Action, MatchType } from "../../types";
import Table from "../entity/table";
import Index from "..";
import { Schema } from "../..";
/** @ignore */
export interface ForeignKeyConstructorArgs extends ConstraintConstructorArgs {
    onUpdate: Action;
    onDelete: Action;
    matchType: MatchType;
    index: Index;
    columns: Column[];
    table: Table;
}
/**
 * Class which represent a foreign key. Provides attributes and methods for details of the foreign key.
 */
export default class ForeignKey extends Constraint {
    /** @ignore */
    constructor(args: ForeignKeyConstructorArgs);
    /**
     * Whether all foreign key columns are mandatory at parent table.
     *
     * @example
     * // account table: (PK) id [NN]
     * // contact table: (PK) id [NN], (FK) account_id [NN]
     * contactTable.foreignKeys[0].mandatoryParent; // true, because all foreign keys (account_id) is not null.
     */
    readonly mandatoryParent: boolean;
    /**
     * Match option of {@link ForeignKey}. One of `FULL`, `PARTIAL`, `NONE`. TypeScript developers should use {@link MatchOption} enum.
     */
    readonly matchType: MatchType;
    /**
     * Update action for {@link ForeignKey foreign keys}. One of `CASCADE`, `SET NULL`, `SET DEFAULT`, `RESTRICT`, `NO ACTION`.
     * TypeScript developers should use {@link Action} enum.
     */
    readonly onUpdate: Action;
    /**
     * Delete action for {@link ForeignKey foreign keys}. One of `CASCADE`, `SET NULL`, `SET DEFAULT`, `RESTRICT`, `NO ACTION`.
     * TypeScript developers should use {@link Action} enum.
     */
    readonly onDelete: Action;
    /**
     * The @{link Index index}} supporting this constraint.
     */
    readonly index: Index;
    /**
     * {@link IndexableArray Indexable array} of {@link Column columns} this {@link ForeignKey foreign key} has. {@link Column Columns} are in order their ordinal position
     * within the {@link ForeignKey foreign key}.
     */
    readonly columns: IndexableArray<Column, "name", never, true>;
    /**
     * This is [[Table]] instance this {@link ForeignKey foreign key} refers to.
     */
    get referencedTable(): Table;
    /**
     * {@link IndexableArray Indexable array} of {@link Column columns} this {@link ForeignKey foreign key} refers. {@link Column Columns} are in order their ordinal position
     * within the {@link ForeignKey foreign key}.
     */
    get referencedColumns(): IndexableArray<Column, "name", never, true>;
    /**
     * Array of columns this {@link ForeignKey foreign key} has and refers to.
     */
    get referencedColumnsBy(): {
        column: Column;
        references: Column;
    }[];
    /**
     * List of other foreign keys which has same source table and target table.
     */
    get correspondingForeignKeys(): IndexableArray<ForeignKey, "name", never, true>;
    /**
     * {@link Table} which this {@link Constraint constraint} defined in.
     */
    readonly table: Table;
    /**
     * Full name of the {@link Constraint constraint} including table name.
     */
    get fullName(): string;
    /**
     * [[Schema]] of the {@link Constraint constraint}'s table defined in.
     */
    get schema(): Schema;
}
//# sourceMappingURL=foreign-key.d.ts.map