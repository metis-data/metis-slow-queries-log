import { NumericType, TypeCategory } from "../../types";
import DbObject, { DbObjectConstructorArgs } from "./db-object";
import Schema from "../schema";
/** @ignore */
export interface TypeConstructorArgs extends DbObjectConstructorArgs {
    oid: number;
    arrayOid: number;
    internalName?: string;
    shortName?: string;
    classOid: number;
    schema: Schema;
    category: TypeCategory;
    hasLength?: boolean;
    hasScale?: boolean;
    hasPrecision?: boolean;
}
export default abstract class Type extends DbObject {
    /** @ignore */
    constructor(args: TypeConstructorArgs);
    /** Object identifier for the {@link Entity} */
    readonly oid: number;
    /** If typarray is not 0 then it identifies another row in pg_type, which is the array type having this type as element. */
    readonly arrayOid: number;
    /** Object identifier of PostgreSQL class (`pg_catalog.pg_class`) for the {@link Entity} */
    readonly classOid: number;
    /**
     * {@link Schema} this {@link Type type} belongs to.
     */
    schema: Schema;
    /**
     * Full name of the object with '.' notation including [[Schema]] name.
     *
     * @example
     * const fullName = type.fullName; // public.phone_number
     */
    get fullName(): string;
    /**
     * Internal name of type. Available for some builtin types.
     *
     * @example
     * const name = doublePrecisionType.name; // double precision
     * const shortName = doublePrecisionType.internalName; // float8
     */
    readonly internalName?: string;
    /**
     * Short name of type. Available for some builtin types.
     *
     * @example
     * const name = timetzType.name; // time with time zone
     * const shortName = timetzType.shortName; // time with time zone
     * const name2 = varcharType.name; // character varying
     * const shortName2 = varcharType.name; // varchar
     */
    readonly shortName?: string;
    /**
     * An arbitrary classification of PostgreSQL data types that is used by the PostgreSQL parser
     * to determine which implicit casts should be “preferred”.
     * See related doc [here](https://www.postgresql.org/docs/current/catalog-pg-type.html#CATALOG-TYPCATEGORY-TABLE)
     */
    category: TypeCategory;
    /** Whether the type has length property. */
    hasLength: boolean;
    /** Whether the type has scale property. */
    hasScale: boolean;
    /** Whether the type has precision property. */
    hasPrecision: boolean;
    /**
     * If type is a numeric type, its numerical type. If type is non-numeric this is `undefined`.
     * For TypeScript it is an enum of `NumericType.Integer`, `NumericType.Exact` or `NumericType.Floating`.
     * For JavaScript ir is a string of `Integer`, `Exact` or `Floating`.
     */
    numericType?: NumericType;
}
//# sourceMappingURL=type.d.ts.map