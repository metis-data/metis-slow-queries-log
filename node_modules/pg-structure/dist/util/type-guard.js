"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExclusionConstraint = exports.isUniqueConstraint = exports.isCheckConstraint = exports.isPrimaryKey = exports.isForeignKey = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const foreign_key_1 = __importDefault(require("../pg-structure/constraint/foreign-key"));
const primary_key_1 = __importDefault(require("../pg-structure/constraint/primary-key"));
const check_constraint_1 = __importDefault(require("../pg-structure/constraint/check-constraint"));
const unique_constraint_1 = __importDefault(require("../pg-structure/constraint/unique-constraint"));
const exclusion_constraint_1 = __importDefault(require("../pg-structure/constraint/exclusion-constraint"));
/** @ignore */
function isForeignKey(input) {
    return input instanceof foreign_key_1.default;
}
exports.isForeignKey = isForeignKey;
/** @ignore */
function isPrimaryKey(input) {
    return input instanceof primary_key_1.default;
}
exports.isPrimaryKey = isPrimaryKey;
/** @ignore */
function isCheckConstraint(input) {
    return input instanceof check_constraint_1.default;
}
exports.isCheckConstraint = isCheckConstraint;
/** @ignore */
function isUniqueConstraint(input) {
    return input instanceof unique_constraint_1.default;
}
exports.isUniqueConstraint = isUniqueConstraint;
/** @ignore */
function isExclusionConstraint(input) {
    return input instanceof exclusion_constraint_1.default;
}
exports.isExclusionConstraint = isExclusionConstraint;
//# sourceMappingURL=type-guard.js.map