import ForeignKey from "../pg-structure/constraint/foreign-key";
/**
 * Returns table and referenced table aliases for given foreign key.
 *
 * @ignore
 * @param fk is the foreign key to get table and referenced table aliases for.
 */
declare function getAliases(fk: ForeignKey): [string, string];
declare const _default: typeof getAliases;
export default _default;
//# sourceMappingURL=get-aliases.d.ts.map