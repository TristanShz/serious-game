import CrudService from "../crud/CrudService";
import CategoryModel, { ICategoryDocument, ICategoryModel } from "./CategoryModel";

class CategoryService extends CrudService<"category", ICategoryModel, ICategoryDocument> {
    constructor() {
        super("category", CategoryModel, false);
    }

    async getOneByAlias(urlAlias: string) {
        return CategoryModel.findOne({ urlAlias }).lean().exec();
    }
}

const categoriesService = new CategoryService();
export default categoriesService;
