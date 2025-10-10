export default class Brand {
    id = 0;
    name = "";
    slug = "";
    status = 1;
    static USER_TABLE = "brand";
    static ID_COLUMN = "id";
    static NAME_COLUMN = "name";
    static SLUG_COLUMN = "slug";
    static STATUS_COLUMN = "status";
    constructor(data) {
        this.id = data?.id ?? 0;
        this.name = data?.name ?? "";
        this.slug = data?.slug ?? "";
        this.status = data?.status ?? 1;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSlug() {
        return this.slug;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    setName(name) {
        this.name = name;
    }
    setSlug(slug) {
        this.slug = slug;
    }
    setId(id) {
        this.id = id;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            status: this.status,
        };
    }
}
//# sourceMappingURL=Brand.js.map