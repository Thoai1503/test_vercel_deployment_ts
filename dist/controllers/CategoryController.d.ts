import express, { type NextFunction, type Request, type Response } from "express";
export default class CategoryController {
    private categoryService;
    constructor();
    create: (req: Request, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>>>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=CategoryController.d.ts.map