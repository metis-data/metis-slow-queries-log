import IndexableArray from "indexable-array";
import Schema from "./schema";
import Table from "./entity/table";
import Column from "./column";
import DbObject, { DbObjectConstructorArgs } from "./base/db-object";
import MaterializedView from "./entity/materialized-view";
/** @ignore */
interface IndexConstructorArgs extends DbObjectConstructorArgs {
    oid: number;
    parent: Table | MaterializedView;
    name: string;
    isUnique: boolean;
    isPrimaryKey: boolean;
    isExclusion: boolean;
    partialIndexExpression: string | null;
}
/**
 * Class which represent a database index. Provides attributes and methods for details of the index.
 */
export default class Index extends DbObject {
    /** @ignore */
    constructor(args: IndexConstructorArgs);
    /** Object identifier for the {@link Schema} */
    readonly oid: number;
    get fullName(): string;
    /**
     * If true, this is a unique index. Please note that all unique constraints have a unique index created by PostgreSQL automatically,
     * but unique indexes may not have unique constraint.
     */
    readonly isUnique: boolean;
    /**
     * If true, this index represents the primary key of the table ({@link Index#isUnique isUnique} is always true for primary keys.)
     */
    readonly isPrimaryKey: boolean;
    /**
     * If true, this index supports an exclusion constraint.
     */
    readonly isExclusion: boolean;
    /**
     * If true, this index is a partial index.
     */
    get isPartial(): boolean;
    /** If index is a partial index, partial index expression */
    readonly partialIndexExpression: string | undefined;
    /**
     * {@link Table} which this {@link Index index} belongs to.
     */
    get table(): Table | undefined;
    /**
     * {@link MaterializedView} which this {@link Index index} belongs to.
     */
    get materializedView(): MaterializedView | undefined;
    /**
     * Parent {@link DbObject database object} this column belongs to.
     */
    readonly parent: Table | MaterializedView;
    /**
     * {@link Schema} this {@link Index index} belongs to.
     */
    get schema(): Schema;
    /**
     * List of {@link Column columns} of {@link Index index}, in order their ordinal position
     * within the index. If {@link Index index} does not have any {@link Column columns} this is empty array.
     * Please note that, non reference expressions such as `CONCAT(name, surname)` is not included. To access expressions and
     * columns together use [[columnsAndExpressions]] method.
     */
    get columns(): IndexableArray<Column, "name", never, true>;
    /**
     * List of {@link Column columns} and {@link Expression expressions} of {@link Index index}, in order their ordinal position
     * within the index. If {@link Index index} does not have any {@link Column columns} or {@link Expression expressions} this is empty array.
     * To get only columns use [[columns]] method.
     */
    readonly columnsAndExpressions: Array<Column | string>;
}
export {};
//# sourceMappingURL=index.d.ts.map