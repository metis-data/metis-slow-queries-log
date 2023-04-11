"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @ignore */
const builtinRelationNameFunctions = {
    short: "./short",
    optimal: "./optimal",
    descriptive: "./descriptive",
};
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
function getRelationNameFunctions(functions) {
    const module = typeof functions === "string" ? builtinRelationNameFunctions[functions] ?? functions : undefined;
    const result = module === undefined ? functions : require(module);
    const relTypes = ["o2m", "m2o", "m2m"];
    if (!relTypes.every((relType) => typeof result[relType] === "function"))
        throw new Error(module === undefined
            ? `No compatible relation name functions are provided.`
            : `${module} does not export relation name functions for pg-structure: "${require.resolve(module)}"`);
    return result;
}
exports.default = getRelationNameFunctions;
//# sourceMappingURL=index.js.map