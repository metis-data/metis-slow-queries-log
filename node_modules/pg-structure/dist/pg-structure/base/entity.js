"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexable_array_1 = __importDefault(require("indexable-array"));
const db_object_1 = __importDefault(require("./db-object"));
/**
 * Class which represent an entity ({@link Table table }, {@link View view} etc.).
 * Provides attributes and methods for details of the entity.
 */
class Entity extends db_object_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        /**
         * All {@link Column columns} of the {@link Entity entity} as an {@link IndexableArray indexable array} ordered by same order they are defined
         * in database {@link Entity entity}.
         *
         * @name Entity#columns
         * @example
         * const isAvailable  = table.columns.has('id');
         * const columnNames  = table.columns.map(column => column.name);
         * const column       = table.columns.get('user_id');
         * const name         = column.name;
         *
         * table.columns.forEach(column => console.log(column.name));
         */
        this.columns = indexable_array_1.default.throwingFrom([], "name", "attributeNumber");
        this.oid = args.oid;
        this.schema = args.schema;
    }
    /**
     * Full name of the object with '.' notation including [[Schema]] name.
     *
     * @example
     * const fullName = entity.fullName; // public.member
     */
    get fullName() {
        return `${this.schema.name}.${this.name}`;
    }
    /**
     * Returns {@link Column column} with given name from {@link Entity entity}.
     *
     * @param path is the name of the {@link Column column}.
     * @returns requested {@link Column columns}.
     * @example
     * const column = entity.get('contact'),  // Returns contact column from entity.
     */
    get(column) {
        return this.columns.get(column);
    }
}
exports.default = Entity;
//# sourceMappingURL=entity.js.map