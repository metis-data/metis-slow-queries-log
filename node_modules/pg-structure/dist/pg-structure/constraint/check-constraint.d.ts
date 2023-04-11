import Constraint, { ConstraintConstructorArgs } from "../base/constraint";
import { Table, Domain, Schema } from "../..";
/** @ignore */
export interface CheckConstraintConstructorArgs extends ConstraintConstructorArgs {
    expression: string;
    table?: Table;
    domain?: Domain;
}
/**
 * Class which represent a PostgreSQL check constraint. Provides attributes and methods related to constraint.
 */
export default class CheckConstraint extends Constraint {
    /** @ignore */
    constructor(args: CheckConstraintConstructorArgs);
    private get parent();
    /** Expression for check constraint. */
    readonly expression: string;
    /**
     * {@link Table} which this {@link Constraint constraint} defined in if it is defined in a table.
     */
    readonly table?: Table;
    /**
     * {@link Domain} which this {@link Constraint constraint} defined in if it is defined in a domain.
     */
    readonly domain?: Domain;
    /**
     * Full name of the {@link Constraint constraint} including table name.
     */
    get fullName(): string;
    /**
     * [[Schema]] of the {@link Constraint constraint}'s table defined in.
     */
    get schema(): Schema;
}
//# sourceMappingURL=check-constraint.d.ts.map