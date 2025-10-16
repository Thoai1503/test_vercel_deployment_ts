export default class UserAddress {
  private id: number;
  private user_id: number;
  private full_name: string;
  private phone: string;
  private province_id: number;
  private district_id: number;
  private ward_id: number;
  private address_detail: string;
  private address_type: number;
  private is_default: boolean;
  private status: number;
  private created_at: Date;
  private updated_at: Date;

  constructor(
    id = 0,
    user_id = 0,
    full_name = "",
    phone = "",
    province_id = 0,
    district_id = 0,
    ward_id = 0,
    address_detail = "",
    address_type = 0,
    is_default = false,
    status = 1,
    created_at = new Date(),
    updated_at = new Date()
  ) {
    this.id = id;
    this.user_id = user_id;
    this.full_name = full_name;
    this.phone = phone;
    this.province_id = province_id;
    this.district_id = district_id;
    this.ward_id = ward_id;
    this.address_detail = address_detail;
    this.address_type = address_type;
    this.is_default = is_default;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Getter & Setter
  public getId(): number {
    return this.id;
  }

  public setId(value: number) {
    this.id = value;
  }

  public getFullName(): string {
    return this.full_name;
  }

  public setFullName(value: string) {
    this.full_name = value;
  }
}
