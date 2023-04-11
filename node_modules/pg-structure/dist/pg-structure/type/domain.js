"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexable_array_1 = __importDefault(require("indexable-array"));
const type_1 = __importDefault(require("../base/type"));
const helper_1 = require("../../util/helper");
/**
 * Class which represent a PostgreSQL {@link Domain domain}. Provides attributes and methods for details of the {@link Domain domain}.
 */
class Domain extends type_1.default {
    constructor(args) {
        super(args);
        /**
         * All {@link Constraint constraints} of the constraint as an [[IndexableArray]] ordered by name.
         */
        this.checkConstraints = indexable_array_1.default.throwingFrom([], "name");
        // this._sqlType = args.sqlType;
        this.notNull = args.notNull;
        this.arrayDimension = args.arrayDimension;
        this.default = args.default;
        const { schema, typeName, length, precision, scale } = (0, helper_1.parseSQLType)(this.db, args.sqlType);
        this._baseTypeSchema = schema;
        this._baseTypeName = typeName;
        this.length = length;
        this.precision = precision;
        this.scale = scale;
    }
    /** Data type of the domain. */
    get type() {
        return this._baseTypeSchema.typesIncludingEntities.get(this._baseTypeName);
    }
}
exports.default = Domain;
//# sourceMappingURL=domain.js.map