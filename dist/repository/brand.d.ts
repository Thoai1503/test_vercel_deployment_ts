import Brand from "../models/Brand.js";
import type IRepository from "./IRepository.js";
export default class BrandRepository implements IRepository<Brand> {
    constructor();
    create(brand: Brand): Promise<number>;
    findById(id: number): Promise<Brand | null>;
    findAll(): Promise<Brand[]>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=brand.d.ts.map