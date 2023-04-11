"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_object_1 = __importDefault(require("./base/db-object"));
const view_1 = __importDefault(require("./entity/view"));
const table_1 = __importDefault(require("./entity/table"));
/**
 * Class which represent a PostgreSQL {@link Trigger trigger}. Provides attributes and methods for details of the {@link Trigger trigger}.
 */
class Trigger extends db_object_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        this.oid = args.oid;
        this.parent = args.parent;
        this.function = args.function;
        this.orientation = args.orientation;
        this.timing = args.timing;
        this.events = args.events;
        this.condition = args.condition;
        this.isEnabled = args.isEnabled;
        this.isDeferrable = args.isDeferrable;
        this.isInitiallyDeferred = args.isInitiallyDeferred;
    }
    /**
     * {@link Table} this trigger defined in if it belongs to a {@link Table table}.
     *
     * @example
     * const table = trigger.table; // Table instance
     */
    get table() {
        /* istanbul ignore next */
        return this.parent instanceof table_1.default ? this.parent : undefined;
    }
    /**
     * {@link View} this trigger defined in if it belongs to a {@link View view}.
     *
     * @example
     * const view = trigger.view; // View instance
     */
    get view() {
        /* istanbul ignore next */
        return this.parent instanceof view_1.default ? this.parent : undefined;
    }
    /** [[Schema]] of the object. */
    get schema() {
        return this.parent.schema;
    }
    /**
     * Full name of the object with '.' notation including [[Schema]] name.
     *
     * @example
     * const fullName = trigger.fullName; // public.member.updated_at
     */
    get fullName() {
        return `${this.schema.name}.${this.parent.name}.${this.name}`;
    }
}
exports.default = Trigger;
//# sourceMappingURL=trigger.js.map