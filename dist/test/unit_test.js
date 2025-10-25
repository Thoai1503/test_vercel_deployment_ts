import DistrictRepository from "../repository/district.js";
import WardRepository from "../repository/ward.js";
import UserAddressRepository from "../repository/userAddress.js";
import UserAddress from "../models/UserAddress.js";
import OrderRepository from "../repository/order.js";
const districtRepository = new DistrictRepository();
const wardRepository = new WardRepository();
const orderRepository = new OrderRepository();
const userAddressRepository = new UserAddressRepository();
const list = await districtRepository.getByProvinceId(1);
const wards = await wardRepository.getByDistrictId(3);
const ua = new UserAddress(0, 2, "Thoai Thiên Long", "0976111111", 1, 1, 1, "3 Đường 3/2", 1, false, 1, new Date(), new Date());
const orders = await orderRepository.findAll();
const create = await userAddressRepository.create(ua);
const userAddress = await userAddressRepository.findByUserId(2);
console.log("List: " + JSON.stringify(orders));
//# sourceMappingURL=unit_test.js.map