export default class Category {
    private id;
    private name;
    private parent_id;
    private path;
    private level;
    private slug;
    constructor(id?: number, name?: string, parent_id?: number, path?: string, level?: number, slug?: string);
    getId(): number;
    setId(id: number): void;
    getName(): string;
    setName(name: string): void;
    getSlug(): string;
    setSlug(slug: string): void;
    getParentId(): number;
    setParentId(parent_id: number): void;
    getPath(): string;
    setPath(path: string): void;
}
//# sourceMappingURL=Category.d.ts.map