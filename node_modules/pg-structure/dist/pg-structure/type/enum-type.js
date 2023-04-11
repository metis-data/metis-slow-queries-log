"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = __importDefault(require("../base/type"));
const helper_1 = require("../../util/helper");
/**
 * Class which represent a PostgreSQL {@link EnumType enum type}. Provides attributes and methods for details of the {@link EnumType enum type}.
 */
class EnumType extends type_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        this.values = (0, helper_1.parseEnumValues)(args.values);
    }
}
exports.default = EnumType;
//# sourceMappingURL=enum-type.js.map