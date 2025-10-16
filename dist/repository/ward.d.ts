import Ward from "../models/Ward.js";
import type IRepository from "./IRepository.js";
export default class ProviceRepository implements IRepository<Ward> {
    constructor();
    create(item: Ward): Promise<number>;
    findById(id: number): Promise<Ward | null>;
    findAll(): Promise<Ward[]>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByDistrictId: (District_id: number) => Promise<Ward[]>;
}
//# sourceMappingURL=ward.d.ts.map