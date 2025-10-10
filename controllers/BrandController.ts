import BrandRepository from "../repository/brand.js";
import express, { type Request, type Response } from "express";

import Brand, { type BrandData } from "../models/Brand.js";
export default class BrandController {
  private brandRepository: BrandRepository;
  constructor(brandRepository: BrandRepository) {
    this.brandRepository = brandRepository;
  }
  createBrand = async (
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    const brand: BrandData = req.body;
    const status = 1;
    const newBrand = new Brand(brand);
    try {
      const data = await this.brandRepository.create(newBrand);
      console.log("1." + JSON.stringify(data));
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
  getAllBrands = async (
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    try {
      const brands = await this.brandRepository.findAll();
      res.status(200).json(brands);
    } catch (error) {
      next(error);
    }
  };
}
