import ForeignKey from "../pg-structure/constraint/foreign-key";
import PrimaryKey from "../pg-structure/constraint/primary-key";
import CheckConstraint from "../pg-structure/constraint/check-constraint";
import UniqueConstraint from "../pg-structure/constraint/unique-constraint";
import ExclusionConstraint from "../pg-structure/constraint/exclusion-constraint";
/** @ignore */
export declare function isForeignKey(input: any): input is ForeignKey;
/** @ignore */
export declare function isPrimaryKey(input: any): input is PrimaryKey;
/** @ignore */
export declare function isCheckConstraint(input: any): input is CheckConstraint;
/** @ignore */
export declare function isUniqueConstraint(input: any): input is UniqueConstraint;
/** @ignore */
export declare function isExclusionConstraint(input: any): input is ExclusionConstraint;
//# sourceMappingURL=type-guard.d.ts.map