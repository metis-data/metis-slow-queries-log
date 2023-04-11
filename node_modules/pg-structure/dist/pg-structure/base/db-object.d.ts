import Db from "../db";
import Schema from "../schema";
import { JSONData, CaseType } from "../../types";
/** @ignore */
export interface DbObjectConstructorArgs {
    name: string;
    comment?: string | null;
}
/**
 * Abstract base class for all database objects.
 */
export default abstract class DbObject {
    /** @ignore */
    constructor(args: DbObjectConstructorArgs);
    /**
     * {@link Schema} of the object.
     */
    abstract readonly schema: Schema;
    /**
     * Full name of the {@link DbObject database object} including parent name.
     */
    abstract get fullName(): string;
    /**
     * Full name of the {@link DbObject database object} including database name.
     */
    get fullCatalogName(): string;
    /**
     * Name of the database object.
     */
    readonly name: string;
    /**
     * Letter casing (i.e `snakeCase` or `camelCase`) of the {@link DbObject database object} name.
     *
     * @example
     * const name = entity.name;                        // ProductDetail
     * const caseType = entity.nameCaseType;            // camelCase
     *
     * const otherEntity = otherEntity.name;            // member_protocol
     * const otherCaseType = otherEntity.nameCaseType;  // snakeCase
     */
    get nameCaseType(): CaseType;
    /**
     * Separator used in {@link DbObject database object} name. Empty string for came case and underscore for (_) snake case.
     */
    get separator(): string;
    /**
     * {@link Db Database} of the database object.
     */
    get db(): Db;
    /**
     * Comment of the database object defined in database including {@link DbObject#commentData comment data}.
     */
    readonly comment?: string;
    /**
     * Description or comment of the database object defined in database. If comment contains {@link DbObject#commentData comment data},
     * it is removed.
     *
     * @example
     * // "Account details. [pg-structure]{ extraData: 2 }[/pg-structure] Also used for logging."
     * table.commentWithoutData;    // "Account details.  Also used for logging."
     */
    get commentWithoutData(): string | undefined;
    /**
     * Data which is extracted from database object's comment. Data is extracted from text between special case-insensitive tag
     * (default: `[pg-structure][/pg-structure]`) and converted to JavaScript object using [JSON5](https://json5.org).
     * Token name can be specified by using `commentDataToken` arguments.
     * For details of [JSON5](https://json5.org/), see it's web site: [https://json5.org](https://json5.org).
     *
     * @example
     * // "Account details. [pg-structure]{ extraData: 2 }[/pg-structure] Also used for logging."
     * table.comment;               // "Account details. [pg-structure]{ extraData: 2 }[/pg-structure] Also used for logging."
     * table.commentWithoutData;    // "Account details.  Also used for logging."
     * table.commentData;           // { extraData: 2 }
     * table.commentData.extraData; // 2
     */
    get commentData(): JSONData | undefined;
}
//# sourceMappingURL=db-object.d.ts.map