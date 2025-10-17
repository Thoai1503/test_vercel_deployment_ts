import UserAddressRepository from "../repository/userAddress.js";
import UserAddress from "../models/UserAddress.js";
export default class UserAddressController {
    userAddressRepository;
    constructor() {
        this.userAddressRepository = new UserAddressRepository();
    }
    createNewAddress = async (req, res, next) => {
        const address = req.body;
        const ua = new UserAddress(0, address.user_id, address.full_name, address.phone, address.province_id, address.district_id, address.ward_id, address.address_detail, 1, address.is_default, 1, new Date(), new Date());
        const result = await this.userAddressRepository.create(ua);
        res.status(201).json(result);
    };
    findByUserId = async (req, res, next) => {
        const list = await this.userAddressRepository.findByUserId(parseInt(req.body.user_id));
        res.status(200).json(list);
    };
}
//# sourceMappingURL=UserAddressRepository.js.map