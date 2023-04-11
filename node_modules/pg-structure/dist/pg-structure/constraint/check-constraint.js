"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constraint_1 = __importDefault(require("../base/constraint"));
/**
 * Class which represent a PostgreSQL check constraint. Provides attributes and methods related to constraint.
 */
class CheckConstraint extends constraint_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        this.expression = args.expression;
        this.table = args.table;
        this.domain = args.domain;
    }
    get parent() {
        return (this.table ? this.table : this.domain);
    }
    /**
     * Full name of the {@link Constraint constraint} including table name.
     */
    get fullName() {
        return `${this.schema.name}.${this.parent.name}.${this.name}`;
    }
    /**
     * [[Schema]] of the {@link Constraint constraint}'s table defined in.
     */
    get schema() {
        return this.parent.schema;
    }
}
exports.default = CheckConstraint;
//# sourceMappingURL=check-constraint.js.map