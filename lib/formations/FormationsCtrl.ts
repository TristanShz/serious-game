import { IFormationDocument, IFormationModel } from "./FormationModel";
import { NextApiHandler } from "next";
import { CrudCtrl } from "../crud/CrudCtrl";
import { errorsBuilders } from "../../_common/errors/errorBuilder";
import { genericCtrlFn } from "../../_common/_helpers/ctrlHelper";
import formationsService from "./FormationsService";
import { FilterQuery } from "mongoose";
import { sanitizeObject } from "../../_common/_helpers/mongooseHelper";
import { buildQueryFromFilters } from "../crud/crudFiltersHelper";
import { quizzService } from "./quizz/QuizzService";

class FormationsCtrl extends CrudCtrl<"formations", IFormationModel, IFormationDocument> {
    constructor() {
        super("formations", formationsService);
    }

    listing: NextApiHandler = (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".list", async () => {
            let withDisabled = false;

            let query;
            let offset;
            let limit;
            let sort;
            let filters: FilterQuery<IFormationDocument> | undefined;
            if (req.query.offset && typeof req.query.offset === "string") offset = parseInt(req.query.offset);
            if (req.query.limit && typeof req.query.limit === "string") limit = parseInt(req.query.limit);
            if (req.query.sort && typeof req.query.sort === "string") {
                sort = JSON.parse(req.query.sort);
                sanitizeObject(sort, "sort", true);
            }
            if (req.query.filters && typeof req.query.filters === "string") {
                filters = JSON.parse(req.query.filters);
                query = buildQueryFromFilters(filters);
                delete query.password;
            }
            return Promise.all([
                this.crudService.list(withDisabled, undefined, query, offset, limit, sort),
                this.crudService.count(withDisabled, query),
            ]).then(([items, count]) => ({ items, count }));
        });
    };

    getOneByAlias: NextApiHandler = async (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".getOneByAlias", async () => {
            if (req.query.alias) {
                const formation = await formationsService.getOneByAlias(req.query.alias.toString());
                const quizz = formation.quizz
                    ? await Promise.all(
                          formation.quizz.map((quizzId) => {
                              return quizzService.get(quizzId);
                          }),
                      )
                    : undefined;
                console.log("VOILA LES QUIZZ ::", quizz);
                return { ...formation, quizz };
            } else throw errorsBuilders.category.notFound();
        });
    };
}

export const formationsCtrl = new FormationsCtrl();
