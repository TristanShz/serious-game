import CrudService from "../crud/CrudService";
import CategoryModel, { ICategoryDocument, ICategoryModel } from "./CategoryModel";

class CategoryService extends CrudService<"category", ICategoryModel, ICategoryDocument> {
    constructor() {
        super("category", CategoryModel, false);
    }
}

const categoryService = new CategoryService();
export default categoryService;
