import { TriggerOrientation, TriggerTiming, TriggerEvent, TriggerEnabled } from "../types/index";
import DbObject, { DbObjectConstructorArgs } from "./base/db-object";
import Schema from "./schema";
import View from "./entity/view";
import Table from "./entity/table";
import NormalFunction from "./function/normal-function";
/** @ignore */
export interface TriggerObjectConstructorArgs extends DbObjectConstructorArgs {
    oid: number;
    parent: Table | View;
    name: string;
    function: NormalFunction;
    orientation: TriggerOrientation;
    timing: TriggerTiming;
    events: TriggerEvent[];
    condition: string | null;
    isEnabled: TriggerEnabled;
    isDeferrable: boolean;
    isInitiallyDeferred: boolean;
}
/**
 * Class which represent a PostgreSQL {@link Trigger trigger}. Provides attributes and methods for details of the {@link Trigger trigger}.
 */
export default class Trigger extends DbObject {
    /** @ignore */
    constructor(args: TriggerObjectConstructorArgs);
    /** Object identifier for the {@link Trigger} */
    readonly oid: number;
    /**
     * Parent {@link DbObject database object} this trigger is defined in.
     */
    readonly parent: Table | View;
    /**
     * {@link Table} this trigger defined in if it belongs to a {@link Table table}.
     *
     * @example
     * const table = trigger.table; // Table instance
     */
    get table(): Table | undefined;
    /**
     * {@link View} this trigger defined in if it belongs to a {@link View view}.
     *
     * @example
     * const view = trigger.view; // View instance
     */
    get view(): View | undefined;
    /** [[Schema]] of the object. */
    get schema(): Schema;
    /**
     * Full name of the object with '.' notation including [[Schema]] name.
     *
     * @example
     * const fullName = trigger.fullName; // public.member.updated_at
     */
    get fullName(): string;
    /**  [[Function]] of trigger. */
    readonly function: NormalFunction;
    /** whether the trigger fires once for each processed row or once for each statement. */
    readonly orientation: TriggerOrientation;
    /** Time at which the trigger fires. */
    readonly timing: TriggerTiming;
    /** Events that fires the trigger. */
    readonly events: TriggerEvent[];
    /** WHEN condition of the trigger, `null` if none. */
    readonly condition: string | null;
    /** In which session_replication_role modes the trigger fires */
    readonly isEnabled: TriggerEnabled;
    /** Whether constraint trigger is deferrable */
    readonly isDeferrable: boolean;
    /** Whether constraint trigger is initially deferred */
    readonly isInitiallyDeferred: boolean;
}
//# sourceMappingURL=trigger.d.ts.map