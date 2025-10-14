import express from "express";
import ProvinceController from "../controllers/ProvinceController.js";
var router = express.Router();

const provinceController = new ProvinceController();

router.route("/").get(provinceController.getAll);

export default router;
