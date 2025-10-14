export default class Province {
  private id: number;
  private name: string;
  private code: string;
  private status: number;
  constructor(id = 0, name = "", code = "", status = 1) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.status = status;
  }
  public getId() {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getName() {
    return this.name;
  }
  public setName(name: string) {
    this.name = name;
  }
  public getCode() {
    return this.code;
  }
  public setCode(code: string) {
    this.code = code;
  }
}
