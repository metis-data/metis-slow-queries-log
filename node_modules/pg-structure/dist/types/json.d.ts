/** @ignore */
export declare type Primitive = string | number | boolean | null;
/** @ignore */
export interface JSONObject {
    [member: string]: JSONData | undefined;
}
/** @ignore */
export interface JSONArray extends Array<JSON> {
}
/** @ignore */
export declare type JSONData = Primitive | JSONObject | JSONArray;
//# sourceMappingURL=json.d.ts.map