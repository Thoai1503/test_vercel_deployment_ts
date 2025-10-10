export default interface IRepository<T> {
    create(item: T): Promise<number>;
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: number, item: any): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=IRepository.d.ts.map