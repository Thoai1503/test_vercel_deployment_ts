export default class District {
    id;
    name;
    code;
    province_id;
    status;
    constructor(id = 0, name = "", code = "", province_id = 0, status = 1) {
        this.id = id;
        this.province_id = province_id;
        this.name = name;
        this.code = code;
        this.status = status;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getCode() {
        return this.code;
    }
    setCode(code) {
        this.code = code;
    }
    getProvinceId() {
        return this.province_id;
    }
    setProvinceId(province_id) {
        this.province_id = province_id;
    }
}
//# sourceMappingURL=District.js.map