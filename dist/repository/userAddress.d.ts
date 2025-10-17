import type UserAddress from "../models/UserAddress.js";
import type IRepository from "./IRepository.js";
export default class UserAddressRepository implements IRepository<UserAddress> {
    create(item: UserAddress): Promise<number>;
    findAll(): Promise<UserAddress[]>;
    findById(id: number): Promise<UserAddress | null>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=userAddress.d.ts.map