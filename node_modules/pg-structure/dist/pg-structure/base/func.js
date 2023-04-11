"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-plusplus */
const indexable_array_1 = __importDefault(require("indexable-array"));
const function_argument_1 = __importDefault(require("../function-argument"));
const db_object_1 = __importDefault(require("./db-object"));
/**
 * Returns type for given oid and whether it is an array.
 *
 * @ignore
 * @param db is the [[Db]] object.
 * @param oid is the oid of the type.
 * @returns type and whether type is an array.
 */
function getType(db, oid) {
    const type = db.allTypes.getMaybe(oid, { key: "oid" });
    if (type)
        return [type, false];
    return [db.allTypes.get(oid, { key: "arrayOid" }), true];
}
/** @ignore */
const argumentModeLetterMap = {
    i: "in",
    b: "inout",
    o: "out",
    v: "variadic",
    t: "table",
};
/**
 * Class which represent a PostgreSQL ({@link Func function}.
 * Provides attributes and methods for details of the function.
 * Class name is `Func` instead of `Function`, because `Function` is a reserved word in JavaScript,
 * and cannot be used as a class name.
 */
class Func extends db_object_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        /** Whether function returns an array. */
        this.returnsArray = false;
        /**
         * All {@link FunctionArgument function arguments} of the {@link Function function} as an {@link IndexableArray indexable array} ordered by same order they are defined
         * in PostgreSQL {@link Function function}.
         *
         * Please note that, `name` is not required for PostgreSQL function arguments. There may be multiple empty string arguments.
         * {@link IndexableArray https://www.npmjs.com/package/indexable-array} returns first one.
         * You may also use `getAll` to get all unnamed arguments as an array.
         *
         * @example
         * myFunc.arguments.get("maxVal");
         * myFunc.arguments.getAll("");
         */
        this.arguments = indexable_array_1.default.throwingFrom([], "name", "argumentNumber");
        const { db } = args.schema;
        this.oid = args.oid;
        this.schema = args.schema;
        this.source = args.source;
        this.language = args.language;
        this.estimatedCost = args.estimatedCost;
        this.estimatedRows = args.estimatedRows;
        this.isLeakProof = args.isLeakProof;
        this.isStrict = args.isStrict;
        this.parallelSafety = args.parallelSafety;
        this.volatility = args.volatility;
        [this.returnType, this.returnsArray] = getType(db, args.returnType);
        this.returnsSet = args.returnsSet;
        const argumentModes = args.argumentModes === null ? null : args.argumentModes.replace(/^\{(.+)\}$/, "$1").split(",");
        for (let i = 0; i <= args.argumentTypes.length - 1; i++) {
            const argArgs = {};
            [argArgs.type, argArgs.isArray] = getType(db, args.argumentTypes[i]);
            argArgs.name = args.argumentNames === null ? "" : args.argumentNames[i];
            argArgs.mode = argumentModes === null ? "in" : argumentModeLetterMap[argumentModes[i]];
            argArgs.argumentNumber = i;
            this.arguments.push(new function_argument_1.default(argArgs));
        }
        // this.variadicArgumentType = db.allTypes.get(args.variadicArgumentType, { key: "oid" });
    }
    /**
     * Full name of the object with '.' notation including [[Schema]] name.
     *
     * @example
     * const fullName = func.fullName; // public.some_func
     */
    get fullName() {
        return `${this.schema.name}.${this.name}`;
    }
}
exports.default = Func;
//# sourceMappingURL=func.js.map