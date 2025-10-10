export default interface IPaymentService {
  createPayment(
    orderId: string,
    amount: number | string,
    options?: Record<string, unknown>
  ): Promise<unknown>;
  returnPayment(params: Record<string, unknown>): Promise<unknown>;
}
