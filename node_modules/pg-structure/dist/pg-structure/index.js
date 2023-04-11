"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexable_array_1 = __importDefault(require("indexable-array"));
const src_1 = require("@typescript-plus/fast-memoize-decorator/dist/src");
const table_1 = __importDefault(require("./entity/table"));
const column_1 = __importDefault(require("./column"));
const db_object_1 = __importDefault(require("./base/db-object"));
const materialized_view_1 = __importDefault(require("./entity/materialized-view"));
/**
 * Class which represent a database index. Provides attributes and methods for details of the index.
 */
class Index extends db_object_1.default {
    /** @ignore */
    constructor(args) {
        super(args);
        /**
         * List of {@link Column columns} and {@link Expression expressions} of {@link Index index}, in order their ordinal position
         * within the index. If {@link Index index} does not have any {@link Column columns} or {@link Expression expressions} this is empty array.
         * To get only columns use [[columns]] method.
         */
        this.columnsAndExpressions = [];
        this.oid = args.oid;
        this.isUnique = args.isUnique;
        this.isPrimaryKey = args.isPrimaryKey;
        this.isExclusion = args.isExclusion;
        this.parent = args.parent;
        this.partialIndexExpression = args.partialIndexExpression || undefined;
    }
    get fullName() {
        return `${this.schema.name}.${this.parent.name}.${this.name}`;
    }
    /**
     * If true, this index is a partial index.
     */
    get isPartial() {
        return this.partialIndexExpression !== undefined;
    }
    /**
     * {@link Table} which this {@link Index index} belongs to.
     */
    get table() {
        return this.parent instanceof table_1.default ? this.parent : undefined;
    }
    /**
     * {@link MaterializedView} which this {@link Index index} belongs to.
     */
    get materializedView() {
        return this.parent instanceof materialized_view_1.default ? this.parent : undefined;
    }
    /**
     * {@link Schema} this {@link Index index} belongs to.
     */
    get schema() {
        return this.parent.schema;
    }
    /**
     * List of {@link Column columns} of {@link Index index}, in order their ordinal position
     * within the index. If {@link Index index} does not have any {@link Column columns} this is empty array.
     * Please note that, non reference expressions such as `CONCAT(name, surname)` is not included. To access expressions and
     * columns together use [[columnsAndExpressions]] method.
     */
    get columns() {
        const columns = this.columnsAndExpressions.filter((col) => col instanceof column_1.default);
        return indexable_array_1.default.throwingFrom(columns, "name");
    }
}
__decorate([
    (0, src_1.Memoize)(),
    __metadata("design:type", indexable_array_1.default),
    __metadata("design:paramtypes", [])
], Index.prototype, "columns", null);
exports.default = Index;
//# sourceMappingURL=index.js.map