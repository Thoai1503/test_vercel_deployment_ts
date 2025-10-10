import BrandRepository from "../repository/brand.js";
import express, {} from "express";
import Brand, {} from "../models/Brand.js";
export default class BrandController {
    brandRepository;
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
    }
    createBrand = async (req, res, next) => {
        const brand = req.body;
        const status = 1;
        const newBrand = new Brand(brand);
        try {
            const data = await this.brandRepository.create(newBrand);
            console.log("1." + JSON.stringify(data));
            res.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
    getAllBrands = async (req, res, next) => {
        try {
            const brands = await this.brandRepository.findAll();
            res.status(200).json(brands);
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=BrandController.js.map