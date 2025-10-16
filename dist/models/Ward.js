export default class Ward {
    id;
    name;
    code;
    district_id;
    status;
    constructor(id = 0, name = "", code = "", district_id = 0, status = 1) {
        this.id = id;
        this.district_id = district_id;
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
    getDistrictId() {
        return this.district_id;
    }
    setDistrictId(district_id) {
        this.district_id = district_id;
    }
}
//# sourceMappingURL=Ward.js.map