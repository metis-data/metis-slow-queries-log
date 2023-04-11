"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexable_array_1 = __importDefault(require("indexable-array"));
const type_1 = __importDefault(require("../base/type"));
/**
 * Class which represent a PostgreSQL {@link CompositeType composite type}. Provides attributes and methods for details of the {@link CompositeType composite type}.
 */
class CompositeType extends type_1.default {
    /** @ignore  */
    constructor(args) {
        super(args);
        /**
         * All {@link Column columns} of the {@link CompositeType composite type} as an {@link IndexableArray indexable array} ordered by same order they are defined
         * in database {@link CompositeType composite type}.
         *
         * @name Entity#columns
         * @example
         * const isAvailable  = composite.columns.has('id');
         * const columnNames  = composite.columns.map(column => column.name);
         * const column       = composite.columns.get('user_id');
         * const name         = column.name;
         *
         * composite.columns.forEach(column => console.log(column.name));
         */
        this.columns = indexable_array_1.default.throwingFrom([], "name");
        this.relationKind = args.relationKind;
    }
    /**
     * All entities such as tables, views and materialized view are also composite types in PostgreSQL. This is the entity composite type is based on, if any.
     */
    get entity() {
        return this.relationKind && this.relationKind !== "c" ? this.schema.entities.get(this.name) : undefined;
    }
}
exports.default = CompositeType;
//# sourceMappingURL=composite-type.js.map