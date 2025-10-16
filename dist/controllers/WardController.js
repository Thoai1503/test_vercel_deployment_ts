import WardRepository from "../repository/ward.js";
import express, {} from "express";
export default class WardController {
    wardRepository;
    constructor() {
        this.wardRepository = new WardRepository();
    }
    getByProvinceId = async (req, res, next) => {
        const list = await this.wardRepository.getByDistrictId(parseInt(req.params.district_id));
        return res.status(200).json(list);
    };
}
//# sourceMappingURL=WardController.js.map