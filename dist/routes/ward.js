import express from "express";
import WardController from "../controllers/WardController.js";
const router = express.Router();
const wardController = new WardController();
router.get("/district/:district_id", wardController.getByProvinceId.bind(wardController));
export default router;
//# sourceMappingURL=ward.js.map