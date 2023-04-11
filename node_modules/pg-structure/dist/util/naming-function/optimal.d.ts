import O2MRelation from "../../pg-structure/relation/o2m-relation";
import M2ORelation from "../../pg-structure/relation/m2o-relation";
import M2MRelation from "../../pg-structure/relation/m2m-relation";
/**
 * M2M name generator function.
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
export declare function m2m(relation: M2MRelation): string;
/**
 * O2M name generator function. (REF = SOURCE)
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
export declare function o2m(relation: O2MRelation): string;
/**
 * M2O name generator function. (REF = TARGET)
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
export declare function m2o(relation: M2ORelation): string;
//# sourceMappingURL=optimal.d.ts.map