import IndexableArray from "indexable-array";
import Constraint, { ConstraintConstructorArgs } from "../base/constraint";
import Column from "../column";
import Index from "..";
import { Table, Schema } from "../..";
/** @ignore */
export interface PrimaryKeyConstructorArgs extends ConstraintConstructorArgs {
    index: Index;
    table: Table;
}
/**
 * Class which represent a primary key. Provides attributes and methods for details of the primary key.
 */
export default class PrimaryKey extends Constraint {
    /** @ignore */
    constructor(args: PrimaryKeyConstructorArgs);
    /**
     * The @{link Index index}} supporting this constraint.
     */
    readonly index: Index;
    /**
     * IndexableArray of {@link Column columns} this {@link PrimaryKeyConstraint primary key constraint} has. Columns are in order they are defined in database.
     */
    get columns(): IndexableArray<Column, "name", never, true>;
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
//# sourceMappingURL=primary-key.d.ts.map