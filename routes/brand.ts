import express from "express";
var router = express.Router();
import BrandController from "../controllers/BrandController.js";

import BrandRepository from "../repository/brand.js";

const brandRepository = new BrandRepository();
const brandController = new BrandController(brandRepository);

router
  .route("/")
  .post(brandController.createBrand)
  .get(brandController.getAllBrands);

export default router;
