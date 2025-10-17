import type UserAddress from "../models/UserAddress.js";
import type IRepository from "./IRepository.js";
import prisma from "../prisma/client.js";

export default class UserAddressRepository implements IRepository<UserAddress> {
  async create(item: UserAddress): Promise<number> {
    try {
      const result = await prisma.user_addresses.create({
        data: {
          user_id: item.getUserId(),
          full_name: item.getFullName(),
          phone: item.getPhone(),
          province_id: item.getProvinceId(),
          district_id: item.getDistrictId(),
          ward_id: item.getWardId(),
          address_detail: item.getAddressDetail(),
          address_type: item.getAddressType(),
          is_default: item.getIsDefault(),
        },
      });
      console.log(JSON.stringify(result));
      if (!result) return 0;
      return 1;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<UserAddress[]> {
    throw new Error("Method not implemented.");
  }
  async findById(id: number): Promise<UserAddress | null> {
    throw new Error("Method not implemented.");
  }
  async update(id: number, item: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
