import DistrictRepository from "../repository/district.js";
import express, {} from "express";
export default class DistrictController {
    districtRepository;
    constructor() {
        this.districtRepository = new DistrictRepository();
    }
    getByProvinceId = async (req, res, next) => {
        const list = await this.districtRepository.getByProvinceId(parseInt(req.params.province_id));
        return res.status(200).json(list);
    };
}
//# sourceMappingURL=DistrictController.js.map