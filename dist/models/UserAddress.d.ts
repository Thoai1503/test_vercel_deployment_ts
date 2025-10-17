export default class UserAddress {
    private id;
    private user_id;
    private full_name;
    private phone;
    private province_id;
    private district_id;
    private ward_id;
    private address_detail;
    private address_type;
    private is_default;
    private status;
    private created_at;
    private updated_at;
    constructor(id?: number, user_id?: number, full_name?: string, phone?: string, province_id?: number, district_id?: number, ward_id?: number, address_detail?: string, address_type?: number, is_default?: boolean, status?: number, created_at?: Date, updated_at?: Date);
    getId(): number;
    setId(value: number): void;
    getUserId(): number;
    setUserId(user_id: number): void;
    getPhone(): string;
    getProvinceId(): number;
    getDistrictId(): number;
    getWardId(): number;
    getAddressDetail(): string;
    getAddressType(): number;
    getIsDefault(): boolean;
    getStatus(): number;
    getCreatedDate(): Date;
    getUpdatedAt(): Date;
    getFullName(): string;
    setFullName(value: string): void;
}
//# sourceMappingURL=UserAddress.d.ts.map