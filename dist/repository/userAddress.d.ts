import type UserAddress from "../models/UserAddress.js";
import type IRepository from "./IRepository.js";
export default class UserAddressRepository implements IRepository<UserAddress> {
    create(item: UserAddress): Promise<number>;
    findAll(): Promise<UserAddress[]>;
    findById(id: number): Promise<UserAddress | null>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findByUserId(user_id: number): Promise<({
        users: {
            id: number;
            email: string;
            role: number;
            status: number;
            password: string;
            phone: string;
            full_name: string;
        };
        districts: {
            id: number;
            status: number;
            name: string;
            province_id: number;
            code: string;
        };
        provinces: {
            id: number;
            status: number;
            name: string;
            code: string;
        };
        wards: {
            id: number;
            status: number;
            name: string;
            district_id: number;
            code: string;
        };
    } & {
        id: number;
        status: number;
        phone: string;
        full_name: string;
        address_detail: string;
        address_type: number;
        is_default: boolean;
        created_at: Date;
        updated_at: Date | null;
        user_id: number;
        province_id: number;
        district_id: number;
        ward_id: number;
    })[]>;
}
//# sourceMappingURL=userAddress.d.ts.map