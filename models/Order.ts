export default class Order {
  private id: number;
  private user_id: number;
  private discount: number;
  private total: number;
  private created_at: Date;
  private address_id: number;

  constructor(
    id = 0,
    user_id = 0,
    discount = 0,
    total = 1,
    address_id = 0,
    created_at = new Date(Date.now())
  ) {
    this.id = id;
    this.user_id = user_id;
    this.discount = discount;
    this.total = total;
    this.created_at = created_at;
    this.address_id = address_id;
  }
  public getId(): number {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public getUserId(): number {
    return this.user_id;
  }
  public setUserId(user_id: number): void {
    this.user_id = user_id;
  }
  public getDiscount(): number {
    return this.discount;
  }
  public setDiscount(discount: number): void {
    this.discount = discount;
  }
  public getTotal(): number {
    return this.total;
  }
  public setTotal(total: number): void {
    this.total = total;
  }
  public getAddressId(): number {
    return this.address_id;
  }
  public setAddressId(address_id: number): void {
    this.address_id = address_id;
  }
}
