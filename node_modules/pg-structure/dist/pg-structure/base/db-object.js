"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../util/helper");
/**
 * Abstract base class for all database objects.
 */
class DbObject {
    /** @ignore */
    constructor(args) {
        this.name = args.name;
        this.comment = args.comment === null ? undefined : args.comment;
    }
    /**
     * Full name of the {@link DbObject database object} including database name.
     */
    get fullCatalogName() {
        return `${this.db.name}.${this.fullName}`;
    }
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
    get nameCaseType() {
        return (0, helper_1.caseTypeOf)(this.name);
    }
    /**
     * Separator used in {@link DbObject database object} name. Empty string for came case and underscore for (_) snake case.
     */
    get separator() {
        return this.nameCaseType === "camelCase" /* CaseType.CamelCase */ ? "" : "_";
    }
    /**
     * {@link Db Database} of the database object.
     */
    get db() {
        return this.schema._db;
    }
    /**
     * Description or comment of the database object defined in database. If comment contains {@link DbObject#commentData comment data},
     * it is removed.
     *
     * @example
     * // "Account details. [pg-structure]{ extraData: 2 }[/pg-structure] Also used for logging."
     * table.commentWithoutData;    // "Account details.  Also used for logging."
     */
    get commentWithoutData() {
        return (0, helper_1.replaceJSON)(this.db._config.commentDataToken, this.comment);
    }
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
    get commentData() {
        return (0, helper_1.extractJSON)(this.db._config.commentDataToken, this.comment);
    }
}
exports.default = DbObject;
//# sourceMappingURL=db-object.js.map