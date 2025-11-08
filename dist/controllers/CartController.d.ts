import { type Request, type Response } from "express";
export default class CartController {
    private cartRepository;
    constructor();
    addToCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getCartByUserId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateQuantity(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    addListToCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    clearCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=CartController.d.ts.map