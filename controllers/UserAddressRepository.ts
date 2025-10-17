import type { NextFunction, Request, Response } from "express";
import UserAddressRepository from "../repository/userAddress.js";
import UserAddress from "../models/UserAddress.js";
import type { UserAddressData } from "../model_view/UserAddressData.js";

export default class UserAddressController {
  private userAddressRepository: UserAddressRepository;
  constructor() {
    this.userAddressRepository = new UserAddressRepository();
  }
  createNewAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const address: UserAddressData = req.body;
    const ua = new UserAddress(
      0,
      address.user_id,
      address.full_name,
      address.phone,
      address.province_id,
      address.district_id,
      address.ward_id,
      address.address_detail,
      1,
      address.is_default,
      1,
      new Date(),
      new Date()
    );
    const result = await this.userAddressRepository.create(ua);
    res.status(201).json(result);
  };
  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const list = await this.userAddressRepository.findByUserId(
      parseInt(req.body.user_id)
    );
    res.status(200).json(list);
  };
}
