import ProviceRepository from "../repository/province.js";
import express, {} from "express";
export default class ProvinceController {
    provinceRepository;
    constructor() {
        this.provinceRepository = new ProviceRepository();
    }
    getAll = async (req, res, next) => {
        try {
            const list = await this.provinceRepository.findAll();
            res.status(200).json(list);
        }
        catch (err) {
            next(err);
        }
    };
}
//# sourceMappingURL=ProvinceController.js.map