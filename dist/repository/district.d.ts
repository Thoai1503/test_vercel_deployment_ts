import District from "../models/District.js";
import type IRepository from "./IRepository.js";
export default class DistrictRepository implements IRepository<District> {
    constructor();
    create(item: District): Promise<number>;
    findById(id: number): Promise<District | null>;
    findAll(): Promise<District[]>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByProvinceId: (province_id: number) => Promise<District[]>;
}
//# sourceMappingURL=district.d.ts.map