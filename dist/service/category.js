import axios from "axios";
import Category from "../models/Category.js";
export default class CategoryService {
    endPoint = process.env.CATALOG_API_ENDPOINT;
    constructor() { }
    createCategory = async (cate) => {
        try {
            const result = await axios.post(this.endPoint + "api/category", cate, {
                headers: { "Content-Type": "application/json" },
            });
            return result.data;
        }
        catch (error) {
            console.log("Error :" + error.message);
            throw error;
        }
    };
    updateCategory = async (cate) => {
        try {
            console.log("Update category id:" + cate.getId());
            const result = await axios.post(this.endPoint + `api/category/${cate.getId()}`, cate, {
                headers: { "Content-Type": "application/json" },
            });
            return result.data;
        }
        catch (error) {
            console.log("Error :" + error.message);
            throw error;
        }
    };
    deleteCategory = async (id) => {
        return await axios
            .delete(this.endPoint + `api/category/${id}`)
            .then((res) => {
            return res.data;
        })
            .catch((error) => {
            console.error("Lỗi khi xoá category:", error.message);
            return false;
        });
    };
}
//# sourceMappingURL=category.js.map