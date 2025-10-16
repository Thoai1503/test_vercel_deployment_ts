export default class Ward {
  private id: number;
  private name: string;
  private code: string;
  private district_id: number;
  private status: number;
  constructor(id = 0, name = "", code = "", district_id = 0, status = 1) {
    this.id = id;
    this.district_id = district_id;
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
  public getDistrictId() {
    return this.district_id;
  }
  public setDistrictId(district_id: number) {
    this.district_id = district_id;
  }
}
