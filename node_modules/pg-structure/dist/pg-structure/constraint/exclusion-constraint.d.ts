import Constraint, { ConstraintConstructorArgs } from "../base/constraint";
import Index from "..";
import { Table, Schema } from "../..";
/** @ignore */
export interface ExclusionConstructorArgs extends ConstraintConstructorArgs {
    index: Index;
    table: Table;
}
/**
 * Class which represent a PostgreSQL exclusion constraint. Provides attributes and methods related to constraint.
 */
export default class ExclusionConstraint extends Constraint {
    /** @ignore */
    constructor(args: ExclusionConstructorArgs);
    /**
     * The @{link Index index}} supporting this constraint.
     */
    readonly index: Index;
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
//# sourceMappingURL=exclusion-constraint.d.ts.map