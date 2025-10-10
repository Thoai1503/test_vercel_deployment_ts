import BrandRepository from "../repository/brand.js";
import express, { type Request, type Response } from "express";
export default class BrandController {
    private brandRepository;
    constructor(brandRepository: BrandRepository);
    createBrand: (req: Request, res: Response, next: express.NextFunction) => Promise<void>;
    getAllBrands: (req: Request, res: Response, next: express.NextFunction) => Promise<void>;
}
//# sourceMappingURL=BrandController.d.ts.map