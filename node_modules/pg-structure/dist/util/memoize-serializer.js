"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Serializer function for fast-memoize to be used with db objects.
 *
 * @ignore
 * @param args args passed to the original function.
 */
function memoizeSerializer(args) {
    return JSON.stringify((Array.isArray(args) ? args : [args]).map((arg) => {
        return arg.fullCatalogName ? `${arg.db.id},${arg.constructor.name},${arg.fullCatalogName}` : arg;
    }));
}
exports.default = memoizeSerializer;
//# sourceMappingURL=memoize-serializer.js.map