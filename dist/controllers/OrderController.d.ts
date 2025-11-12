import { type Request, type Response } from "express";
export default class OrderController {
    private orderRepository;
    constructor();
    getAllOrder(req: Request, res: Response): Promise<Response>;
    getByUserId(req: Request, res: Response): Promise<Response>;
    createOrder(req: Request, res: Response): Promise<any>;
}
//# sourceMappingURL=OrderController.d.ts.map