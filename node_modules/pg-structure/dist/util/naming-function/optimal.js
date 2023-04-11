"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m2o = exports.o2m = exports.m2m = void 0;
const inflection_1 = require("inflection");
/**
 * M2M name generator function.
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
function m2m(relation) {
    const inflectionMethod = relation.sourceTable.nameCaseType === "camelCase" /* CaseType.CamelCase */ ? "camelize" : "underscore";
    // (Student --< Message >-- Student) causes `receiver_senders` and `sender_receivers`. Make them senders and receivers.
    const tolerableCorrespondence = relation.targetTable === relation.sourceTable ? 1 : 0;
    const sep = relation.sourceTable.separator;
    let result = "";
    if (relation.foreignKey.correspondingForeignKeys.length > tolerableCorrespondence) {
        result += relation.getSourceAliasWithout("join") + sep; // If multiple "source -> same join", add source alias to distinguish between source fks.
    }
    if (relation.sourceTable.getJoinTablesTo(relation.targetTable).length > 1) {
        result += relation.getJoinNameWithout("target") + sep; // If multiple "any join -> target", add join name to distinguish between target fks.
    }
    if (relation.targetForeignKey.correspondingForeignKeys.length > 0) {
        result += relation.getTargetAliasWithout("join"); // If multiple "same join -> target", add target alias to distinguish between target fks.
    }
    else {
        result += relation.getTargetNameWithout("join");
    }
    return (0, inflection_1.transform)(result, ["pluralize", inflectionMethod]);
}
exports.m2m = m2m;
/**
 * O2M name generator function. (REF = SOURCE)
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
function o2m(relation) {
    const inflectionMethod = relation.sourceTable.nameCaseType === "camelCase" /* CaseType.CamelCase */ ? "camelize" : "underscore";
    const fk = relation.foreignKey;
    const sep = relation.sourceTable.separator;
    const result = fk.correspondingForeignKeys.length > 0 || relation.targetAlias === ""
        ? relation.getSourceAliasWithout("target") + sep + relation.targetAlias
        : relation.targetAlias;
    return `${(0, inflection_1.transform)(result, ["pluralize", inflectionMethod])}`;
}
exports.o2m = o2m;
/**
 * M2O name generator function. (REF = TARGET)
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
function m2o(relation) {
    const inflectionMethod = relation.sourceTable.nameCaseType === "camelCase" /* CaseType.CamelCase */ ? "camelize" : "underscore";
    const sep = relation.sourceTable.separator;
    const prefix = relation.sourceAlias !== relation.sourceName ? relation.getSourceAliasWithout("target") + sep : "";
    const result = relation.foreignKey.correspondingForeignKeys.length > 0 || relation.getTargetNameWithout("source") === ""
        ? prefix + relation.getTargetAliasWithout("source")
        : relation.getTargetNameWithout("source");
    return (0, inflection_1.transform)(result, ["singularize", inflectionMethod]);
}
exports.m2o = m2o;
//# sourceMappingURL=optimal.js.map