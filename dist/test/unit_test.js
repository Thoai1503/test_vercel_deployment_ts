import DistrictRepository from "../repository/district.js";
import WardRepository from "../repository/ward.js";
const districtRepository = new DistrictRepository();
const wardRepository = new WardRepository();
const list = await districtRepository.getByProvinceId(1);
const wards = await wardRepository.getByDistrictId(3);
console.log("List: " + JSON.stringify(wards));
//# sourceMappingURL=unit_test.js.map