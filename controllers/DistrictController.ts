import DistrictRepository from "../repository/district.js";
import express, { type Request, type Response } from "express";

export default class DistrictController {
  private districtRepository: DistrictRepository;
  constructor() {
    this.districtRepository = new DistrictRepository();
  }
  getByProvinceId = async (
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    const list = await this.districtRepository.getByProvinceId(
      parseInt(req.params.province_id!)
    );
    return res.status(200).json(list);
  };
}
