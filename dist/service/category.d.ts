import Category from "../models/Category.js";
export default class CategoryService {
    endPoint: string | undefined;
    constructor();
    createCategory: (cate: Category) => Promise<any>;
    updateCategory: (cate: Category) => Promise<any>;
    deleteCategory: (id: number) => Promise<any>;
}
//# sourceMappingURL=category.d.ts.map