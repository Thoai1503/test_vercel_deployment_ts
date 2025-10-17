export default class UserAddress {
    id;
    user_id;
    full_name;
    phone;
    province_id;
    district_id;
    ward_id;
    address_detail;
    address_type;
    is_default;
    status;
    created_at;
    updated_at;
    constructor(id = 0, user_id = 0, full_name = "", phone = "", province_id = 0, district_id = 0, ward_id = 0, address_detail = "", address_type = 0, is_default = false, status = 1, created_at = new Date(), updated_at = new Date()) {
        this.id = id;
        this.user_id = user_id;
        this.full_name = full_name;
        this.phone = phone;
        this.province_id = province_id;
        this.district_id = district_id;
        this.ward_id = ward_id;
        this.address_detail = address_detail;
        this.address_type = address_type;
        this.is_default = is_default;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    // Getter & Setter
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getUserId() {
        return this.user_id;
    }
    setUserId(user_id) {
        this.user_id = user_id;
    }
    getPhone() {
        return this.phone;
    }
    getProvinceId() {
        return this.province_id;
    }
    getDistrictId() {
        return this.district_id;
    }
    getWardId() {
        return this.ward_id;
    }
    getAddressDetail() {
        return this.address_detail;
    }
    getAddressType() {
        return this.address_type;
    }
    getIsDefault() {
        return this.is_default;
    }
    getStatus() {
        return this.status;
    }
    getCreatedDate() {
        return this.created_at;
    }
    getUpdatedAt() {
        return this.updated_at;
    }
    getFullName() {
        return this.full_name;
    }
    setFullName(value) {
        this.full_name = value;
    }
}
//# sourceMappingURL=UserAddress.js.map