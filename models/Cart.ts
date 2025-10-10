export default class Cart {
  private id: number;
  private user_id: number;
  private variant_id: number;
  private quantity: number;

  constructor(id = 0, user_id = 0, variant_id = 0, quantity = 1) {
    this.id = id;
    this.user_id = user_id;
    this.variant_id = variant_id;
    this.quantity = quantity;
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
  public getVariantId(): number {
    return this.variant_id;
  }
  public setVariantId(variant_id: number): void {
    this.variant_id = variant_id;
  }
  public getQuantity(): number {
    return this.quantity;
  }
  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }
}
