import Province from "../models/Province.js";
import type IRepository from "./IRepository.js";
export default class ProviceRepository implements IRepository<Province> {
    constructor();
    create(item: Province): Promise<number>;
    findById(id: number): Promise<Province | null>;
    findAll(): Promise<Province[]>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=province.d.ts.map