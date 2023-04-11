import { ArgumentMode } from "../types/index";
import Type from "./base/type";
/** @ignore */
export interface FunctionArgumentConstructorArgs {
    type: Type;
    isArray: boolean;
    name: string;
    mode: ArgumentMode;
    argumentNumber: number;
}
/**
 * Class which represent a PostgreSQL {@link Function function} argument. Provides attributes and methods for details of the {@link FunctionArgument function argument}.
 */
export default class FunctionArgument {
    /** @ignore */
    constructor(args: FunctionArgumentConstructorArgs);
    /** Type of the argument */
    readonly type: Type;
    /** Whether given argument is an array. */
    readonly isArray: boolean;
    /** Name of the argument. Empty string if arguments is without a name. */
    readonly name: string;
    /** Mode of the function arguments such as `in`, `inout`, `out`, `variadic` or `table`. */
    readonly mode: ArgumentMode;
    /** The order number of the argument. It is zero based index. */
    readonly argumentNumber: number;
}
//# sourceMappingURL=function-argument.d.ts.map