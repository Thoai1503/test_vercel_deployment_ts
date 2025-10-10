export interface BrandData {
  id?: number;
  name?: string;
  slug?: string;
  status?: number;
}

export default class Brand {
  private id = 0;
  private name = "";
  private slug = "";
  private status = 1;
  static USER_TABLE = "brand";
  static ID_COLUMN = "id";
  static NAME_COLUMN = "name";
  static SLUG_COLUMN = "slug";
  static STATUS_COLUMN = "status";
  constructor(data?: BrandData) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? "";
    this.slug = data?.slug ?? "";
    this.status = data?.status ?? 1;
  }

  public getId(): number {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getSlug(): string {
    return this.slug;
  }
  public getStatus(): number {
    return this.status;
  }
  public setStatus(status: number): void {
    this.status = status;
  }
  public setName(name: string): void {
    this.name = name;
  }
  public setSlug(slug: string): void {
    this.slug = slug;
  }
  public setId(id: number): void {
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
