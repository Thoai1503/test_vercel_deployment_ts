export default class District {
  private id: number;
  private name: string;
  private code: string;
  private province_id: number;
  private status: number;
  constructor(id = 0, name = "", code = "", province_id = 0, status = 1) {
    this.id = id;
    this.province_id = province_id;
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
  public getProvinceId() {
    return this.province_id;
  }
  public setProvinceId(province_id: number) {
    this.province_id = province_id;
  }
}
