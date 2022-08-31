import { ICategoryDocument, ICategoryModel } from "./CategoryModel";
import { NextApiHandler } from "next";
import { CrudCtrl } from "../crud/CrudCtrl";
import { genericCtrlFn } from "../../_common/_helpers/ctrlHelper";
import { errorsBuilders } from "../../_common/errors/errorBuilder";
import categoriesService from "./CategoryService";
import categoryService from "./CategoryService";

class CategoryCtrl extends CrudCtrl<"category", ICategoryModel, ICategoryDocument> {
  constructor() {
    super("category", categoriesService);
  }

  getOneByAlias: NextApiHandler = async (req, res) => {
    return genericCtrlFn(res, this.ctrlName + ".getOneByAlias", async () => {
      if (req.query.urlAlias) return await categoryService.getOneByAlias(req.query.urlAlias.toString());
      else throw errorsBuilders.category.notFound();
    });
  };
}

export const categoryCtrl = new CategoryCtrl();
