import express from "express";
var router = express.Router();
import UserAddressController from "../controllers/UserAddressRepository.js";
const userAddressController = new UserAddressController();
router
    .route("/")
    .post(userAddressController.createNewAddress.bind(userAddressController));
export default router;
//# sourceMappingURL=userAddress.js.map