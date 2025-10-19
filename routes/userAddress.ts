import express from "express";
var router = express.Router();
import UserAddressController from "../controllers/UserAddressController.js";
const userAddressController = new UserAddressController();

router
  .route("/")
  .post(userAddressController.createNewAddress.bind(userAddressController));
router
  .route("/user/:user_id")
  .get(userAddressController.findByUserId.bind(userAddressController));
router
  .route("/:id")
  .put(userAddressController.updateAddress.bind(userAddressController));
export default router;
