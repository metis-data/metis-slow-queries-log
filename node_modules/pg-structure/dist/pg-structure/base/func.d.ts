import IndexableArray from "indexable-array";
import FunctionArgument from "../function-argument";
import { Volatility, ParallelSafety } from "../../types/index";
import Schema from "../schema";
import DbObject, { DbObjectConstructorArgs } from "./db-object";
import Type from "./type";
/** @ignore */
export interface FunctionConstructorArgs extends DbObjectConstructorArgs {
    oid: number;
    schema: Schema;
    source: string;
    language: string;
    estimatedCost: number;
    estimatedRows: number;
    isLeakProof: boolean;
    isStrict: boolean;
    parallelSafety: ParallelSafety;
    volatility: Volatility;
    returnType: number;
    returnsSet: boolean;
    variadicArgumentType: number;
    argumentTypes: number[];
    argumentNames: string[] | null;
    argumentModes: string | null;
    signature: string;
    comment: string;
}
/**
 * Class which represent a PostgreSQL ({@link Func function}.
 * Provides attributes and methods for details of the function.
 * Class name is `Func` instead of `Function`, because `Function` is a reserved word in JavaScript,
 * and cannot be used as a class name.
 */
export default abstract class Func extends DbObject {
    /** @ignore */
    constructor(args: FunctionConstructorArgs);
    /** Object identifier for the {@link Function} */
    readonly oid: number;
    /** [[Schema]] of the object. */
    readonly schema: Schema;
    /** Source definition of the function. */
    readonly source: string;
    /** Language name of the function. */
    readonly language: string;
    /** Estimated execution cost (in units of cpu_operator_cost); if proretset, this is cost per row returned */
    readonly estimatedCost: number;
    /** Estimated number of result rows (zero if not proretset) */
    readonly estimatedRows: number;
    /** The function has no side effects. No information about the arguments is conveyed except via the return value. Any function that might throw an error depending on the values of its arguments is not leak-proof. */
    readonly isLeakProof: boolean;
    /** Whether function returns null if any call argument is null. */
    readonly isStrict: boolean;
    /** whether the function can be safely run in parallel mode. */
    readonly parallelSafety: ParallelSafety;
    /** Whether the function's result depends only on its input arguments, or is affected by outside factors. */
    readonly volatility: Volatility;
    /** Data type of the return value. */
    readonly returnType: Type;
    /** Whether function returns a set. */
    readonly returnsSet: boolean;
    /** Whether function returns an array. */
    readonly returnsArray: boolean;
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
    readonly arguments: IndexableArray<FunctionArgument, "name", "argumentNumber", true>;
    /**
     * Full name of the object with '.' notation including [[Schema]] name.
     *
     * @example
     * const fullName = func.fullName; // public.some_func
     */
    get fullName(): string;
}
//# sourceMappingURL=func.d.ts.map