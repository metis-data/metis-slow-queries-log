import Type, { TypeConstructorArgs } from "../base/type";
/** @ignore */
interface EnumConstructorArgs extends TypeConstructorArgs {
    values: string[];
}
/**
 * Class which represent a PostgreSQL {@link EnumType enum type}. Provides attributes and methods for details of the {@link EnumType enum type}.
 */
export default class EnumType extends Type {
    /** @ignore */
    constructor(args: EnumConstructorArgs);
    /** Array of the textual labels for {@link EnumType enum type} values. */
    readonly values: string[];
}
export {};
//# sourceMappingURL=enum-type.d.ts.map