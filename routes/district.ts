import express from "express";
import DistrictController from "../controllers/DistrictController.js";
const router = express.Router();
const districtController = new DistrictController();

router.get(
  "/province/:province_id",
  districtController.getByProvinceId.bind(districtController)
);
export default router;
