"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class which represent a PostgreSQL {@link Function function} argument. Provides attributes and methods for details of the {@link FunctionArgument function argument}.
 */
class FunctionArgument {
    /** @ignore */
    constructor(args) {
        this.type = args.type;
        this.isArray = args.isArray;
        this.name = args.name;
        this.mode = args.mode;
        this.argumentNumber = args.argumentNumber;
    }
}
exports.default = FunctionArgument;
//# sourceMappingURL=function-argument.js.map