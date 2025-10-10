export default class Category {
  private id: number = 0;
  private name: string = "";
  private parent_id: number = 0;
  private path = "";
  private level = 0;
  private slug = "";

  constructor(
    id = 0,
    name = "",
    parent_id = 0,
    path = "abc",
    level = 0,
    slug = "abc"
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.parent_id = parent_id;
    this.path = path;
    this.level = level;
  }
  getId() {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }
  getName() {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getSlug() {
    return this.slug;
  }
  setSlug(slug: string) {
    this.slug = slug;
  }
  getParentId() {
    return this.parent_id;
  }
  setParentId(parent_id: number) {
    this.parent_id = parent_id;
  }
  getPath() {
    return this.path;
  }
  setPath(path: string) {
    this.path = path;
  }
}
