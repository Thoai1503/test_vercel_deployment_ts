import express, { type Request, type Response } from "express";
export default class WardController {
    private wardRepository;
    constructor();
    getByProvinceId: (req: Request, res: Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=WardController.d.ts.map