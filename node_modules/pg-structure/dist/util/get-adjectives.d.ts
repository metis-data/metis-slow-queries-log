/**
 * Returns adjectives of `nameA` and `nameB`. Searches both singular and plural forms.
 * Works both for snake case and camel case strings.
 *
 * @ignore
 * @param text is the text to search names in.
 * @param nameA is the name to search for adjective.
 * @param nameB is the other name to search for adjective.
 * @returns adjectives for names.
 *
 * @example
 * getAdjectives("primary_contact_super_account", "contact", "account"); // ["primary", "super"]
 * getAdjectives("super_account_primary_contact", "contact", "account"); // ["primary", "super"]
 * getAdjectives("SuperAccountsPrimaryContacts", "Contact", "Account"); // ["primary", "super"]
 */
declare const _default: (text: string, nameA: string, nameB: string) => [string | undefined, string | undefined];
export default _default;
//# sourceMappingURL=get-adjectives.d.ts.map