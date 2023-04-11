import { RelationNameFunctions } from "../../types";
/**
 * If functions argument is functions returns them. If it is a module name or one of the built in modules
 * (`short`, `optimal` or `descriptive`) imports and returns their exported functions.
 *
 * @param functions are relation name functions or a module exporting relation name functions.
 * @example
 * // A module exporting relation name functions.
 * export function o2m() {}
 * export function m2o() {}
 * export function m2m() {}
 */
export default function getRelationNameFunctions(functions: RelationNameFunctions | string): RelationNameFunctions;
//# sourceMappingURL=index.d.ts.map