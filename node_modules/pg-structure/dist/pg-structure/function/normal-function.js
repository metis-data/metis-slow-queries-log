"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const func_1 = __importDefault(require("../base/func"));
/**
 * Class which represent a PostgreSQL ({@link NormalFunction normal function}.
 * Provides attributes and methods for details of the normal function.
 * Class name is `NormalFunction` because procedures, aggregate functions, and window functions are
 * classified as functions by PostgreSQL. The term "normal function" is used by PostgreSQL.
 * See `prokind` attribute at https://www.postgresql.org/docs/12/catalog-pg-proc.html.
 */
class NormalFunction extends func_1.default {
}
exports.default = NormalFunction;
//# sourceMappingURL=normal-function.js.map