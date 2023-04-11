"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strip_1 = __importDefault(require("../../util/strip"));
const get_adjectives_1 = __importDefault(require("../../util/get-adjectives"));
/**
 * Class which represent a {@link Relation relationship}. Provides attributes and methods for details of the {@link Relation relationship}.
 * @abstract
 * @hideconstructor
 */
class Relation {
    /** @ignore */
    constructor(args) {
        const stub = args; // eslint-disable-line @typescript-eslint/no-unused-vars
        stub.x = 3;
    }
    /** @ignore */
    getWithout(string, without) {
        const withouts = new Set(Array.isArray(without) ? without : [without]);
        let result = string;
        if (withouts.has("source") || withouts.has("any")) {
            result = (0, strip_1.default)(result, this.sourceTable.name);
        }
        if (withouts.has("target") || withouts.has("any")) {
            result = (0, strip_1.default)(result, this.targetTable.name);
        }
        return result;
    }
    /**
     * Returns source table name after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns source table name after given tables' names replaced.
     */
    getSourceNameWithout(without) {
        return this.getWithout(this.sourceTable.name, without);
    }
    /**
     * Returns target table name after replacing given tables' names from it.
     *
     * @param without is type or types of tables to exclude names of.
     * @returns target table name after given tables' names replaced.
     */
    getTargetNameWithout(without) {
        return this.getWithout(this.targetTable.name, without);
    }
    /** Source table name. */
    get sourceName() {
        return this.getWithout(this.sourceTable.name);
    }
    /** Target table name */
    get targetName() {
        return this.getWithout(this.targetTable.name);
    }
    /** Source table's adjective extracted from foreign key name. */
    get sourceAdjective() {
        return (0, get_adjectives_1.default)(this.foreignKey.name, this.sourceTable.name, this.targetTable.name)[0];
    }
    /** Source table's adjective extracted from foreign key name. */
    get targetAdjective() {
        return (0, get_adjectives_1.default)(this.foreignKey.name, this.sourceTable.name, this.targetTable.name)[1];
    }
}
exports.default = Relation;
//# sourceMappingURL=relation.js.map