import DistrictRepository from "../repository/district.js";
const districtRepository = new DistrictRepository();
const list = await districtRepository.getByProvinceId(1);
console.log("List: " + JSON.stringify(list));
//# sourceMappingURL=unit_test.js.map