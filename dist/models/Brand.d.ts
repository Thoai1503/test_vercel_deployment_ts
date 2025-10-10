export interface BrandData {
    id?: number;
    name?: string;
    slug?: string;
    status?: number;
}
export default class Brand {
    private id;
    private name;
    private slug;
    private status;
    static USER_TABLE: string;
    static ID_COLUMN: string;
    static NAME_COLUMN: string;
    static SLUG_COLUMN: string;
    static STATUS_COLUMN: string;
    constructor(data?: BrandData);
    getId(): number;
    getName(): string;
    getSlug(): string;
    getStatus(): number;
    setStatus(status: number): void;
    setName(name: string): void;
    setSlug(slug: string): void;
    setId(id: number): void;
    toJSON(): {
        id: number;
        name: string;
        slug: string;
        status: number;
    };
}
//# sourceMappingURL=Brand.d.ts.map