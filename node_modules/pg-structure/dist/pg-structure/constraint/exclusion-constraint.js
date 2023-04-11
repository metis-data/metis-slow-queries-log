"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constraint_1 = __importDefault(require("../base/constraint"));
/**
 * Class which represent a PostgreSQL exclusion constraint. Provides attributes and methods related to constraint.
 */
class ExclusionConstraint extends constraint_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        this.index = args.index;
        this.table = args.table;
    }
    /**
     * Full name of the {@link Constraint constraint} including table name.
     */
    get fullName() {
        return `${this.schema.name}.${this.table.name}.${this.name}`;
    }
    /**
     * [[Schema]] of the {@link Constraint constraint}'s table defined in.
     */
    get schema() {
        return this.table.schema;
    }
}
exports.default = ExclusionConstraint;
//# sourceMappingURL=exclusion-constraint.js.map