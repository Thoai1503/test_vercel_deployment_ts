export default class District {
    private id;
    private name;
    private code;
    private province_id;
    private status;
    constructor(id?: number, name?: string, code?: string, province_id?: number, status?: number);
    getId(): number;
    setId(id: number): void;
    getName(): string;
    setName(name: string): void;
    getCode(): string;
    setCode(code: string): void;
    getProvinceId(): number;
    setProvinceId(province_id: number): void;
}
//# sourceMappingURL=District.d.ts.map