import WardRepository from "../repository/ward.js";
import express, { type Request, type Response } from "express";

export default class WardController {
  private wardRepository: WardRepository;
  constructor() {
    this.wardRepository = new WardRepository();
  }
  getByProvinceId = async (
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    const list = await this.wardRepository.getByDistrictId(
      parseInt(req.params.district_id!)
    );
    return res.status(200).json(list);
  };
}
