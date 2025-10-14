import ProviceRepository from "../repository/province.js";
import express, { type Request, type Response } from "express";

export default class ProvinceController {
  private provinceRepository: ProviceRepository;
  constructor() {
    this.provinceRepository = new ProviceRepository();
  }
  getAll = async (req: Request, res: Response, next: express.NextFunction) => {
    try {
      const list = await this.provinceRepository.findAll();
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
}
