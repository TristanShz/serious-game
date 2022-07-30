import { IFormationDocument, IFormationModel } from "./FormationModel";
import categoryService from "../categories/CategoryService";
import { NextApiHandler } from "next";
import { CrudCtrl } from "../crud/CrudCtrl";
import { errorsBuilders } from "../../_common/errors/errorBuilder";
import { genericCtrlFn } from "../../_common/_helpers/ctrlHelper";
import formationsService from "./FormationsService";

class FormationsCtrl extends CrudCtrl<"formations", IFormationModel, IFormationDocument> {
    constructor() {
        super("formations", formationsService);
    }

    listing: NextApiHandler = (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".list", async () => {
            return Promise.all([this.crudService.list(), this.crudService.count()]).then(([items, count]) => ({
                items,
                count,
            }));
        });
    };

    getOneByAlias: NextApiHandler = async (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".getOneByAlias", async () => {
            if (req.query.urlAlias) return await categoryService.getOneByAlias(req.query.urlAlias.toString());
            else throw errorsBuilders.category.notFound();
        });
    };
}

export const formationsCtrl = new FormationsCtrl();
