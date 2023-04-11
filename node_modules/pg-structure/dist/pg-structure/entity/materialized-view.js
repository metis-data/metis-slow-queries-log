"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexable_array_1 = __importDefault(require("indexable-array"));
const entity_1 = __importDefault(require("../base/entity"));
/**
 * Class which represent a {@link MaterializedView materialized view}. Provides attributes and methods for details of the {@link MaterializedView materialized view}.
 */
class MaterializedView extends entity_1.default {
    constructor() {
        super(...arguments);
        /**
         * All {@link Index indexes} in the materialized view as an [[IndexableArray]], ordered by name.
         */
        this.indexes = indexable_array_1.default.throwingFrom([], "name");
    }
}
exports.default = MaterializedView;
//# sourceMappingURL=materialized-view.js.map