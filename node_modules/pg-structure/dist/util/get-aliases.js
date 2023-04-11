"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_memoize_1 = __importDefault(require("fast-memoize"));
const get_adjectives_1 = __importDefault(require("./get-adjectives"));
const memoize_serializer_1 = __importDefault(require("./memoize-serializer"));
/**
 * Returns table and referenced table aliases for given foreign key.
 *
 * @ignore
 * @param fk is the foreign key to get table and referenced table aliases for.
 */
function getAliases(fk) {
    const aliases = fk.name.split(fk.db._config.foreignKeyAliasSeparator).map((alias) => alias.trim());
    if (aliases.length === 2) {
        return (fk.db._config.foreignKeyAliasTargetFirst ? aliases.reverse() : aliases);
    }
    // const [tableAdjective, referencedTableAdjective] = getAdjectives(fk);
    const [tableAdjective, referencedTableAdjective] = (0, get_adjectives_1.default)(fk.name, fk.table.name, fk.referencedTable.name);
    return [
        tableAdjective ? `${tableAdjective}${fk.separator}${fk.table.name}` : fk.table.name,
        referencedTableAdjective ? `${referencedTableAdjective}${fk.separator}${fk.referencedTable.name}` : fk.referencedTable.name,
    ];
}
exports.default = (0, fast_memoize_1.default)(getAliases, { serializer: memoize_serializer_1.default });
//# sourceMappingURL=get-aliases.js.map