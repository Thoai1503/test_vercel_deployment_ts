export default class Province {
    id;
    name;
    code;
    status;
    constructor(id = 0, name = "", code = "", status = 1) {
        this.id = id;
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
}
//# sourceMappingURL=Province.js.map