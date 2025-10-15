import express, { type Request, type Response } from "express";
export default class DistrictController {
    private districtRepository;
    constructor();
    getByProvinceId: (req: Request, res: Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=DistrictController.d.ts.map