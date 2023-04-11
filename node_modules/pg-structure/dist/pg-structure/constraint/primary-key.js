"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constraint_1 = __importDefault(require("../base/constraint"));
/**
 * Class which represent a primary key. Provides attributes and methods for details of the primary key.
 */
class PrimaryKey extends constraint_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        this.index = args.index;
        this.table = args.table;
    }
    /**
     * IndexableArray of {@link Column columns} this {@link PrimaryKeyConstraint primary key constraint} has. Columns are in order they are defined in database.
     */
    get columns() {
        return this.index.columns;
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
exports.default = PrimaryKey;
//# sourceMappingURL=primary-key.js.map