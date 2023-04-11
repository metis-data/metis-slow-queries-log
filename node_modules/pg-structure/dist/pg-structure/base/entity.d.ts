import IndexableArray from "indexable-array";
import DBObject, { DbObjectConstructorArgs } from "./db-object";
import Column from "../column";
import Schema from "../schema";
/** @ignore */
export interface EntityObjectConstructorArgs extends DbObjectConstructorArgs {
    oid: number;
    schema: Schema;
}
/**
 * Class which represent an entity ({@link Table table }, {@link View view} etc.).
 * Provides attributes and methods for details of the entity.
 */
export default abstract class Entity extends DBObject {
    /** @ignore */
    constructor(args: EntityObjectConstructorArgs);
    /** Object identifier for the {@link Entity} */
    readonly oid: number;
    /**
     * Full name of the object with '.' notation including [[Schema]] name.
     *
     * @example
     * const fullName = entity.fullName; // public.member
     */
    get fullName(): string;
    /** [[Schema]] of the object. */
    readonly schema: Schema;
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
    readonly columns: IndexableArray<Column, "name", "attributeNumber", true>;
    /**
     * Returns {@link Column column} with given name from {@link Entity entity}.
     *
     * @param path is the name of the {@link Column column}.
     * @returns requested {@link Column columns}.
     * @example
     * const column = entity.get('contact'),  // Returns contact column from entity.
     */
    get(column: string): Column;
}
//# sourceMappingURL=entity.d.ts.map