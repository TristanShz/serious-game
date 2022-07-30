import { NextApiHandler } from "next";
import { genericCtrlFn } from "../../_common/_helpers/ctrlHelper";
import CrudService from "./CrudService";
import { errorsBuilders } from "../../_common/errors/errorBuilder";
import mongoose from "mongoose";

export abstract class CrudHandler<
    TCrudId extends keyof typeof errorsBuilders,
    TModel,
    TDoc extends TModel & mongoose.Document,
> {
    protected readonly ctrlName: TCrudId;
    protected readonly crudService: CrudService<TCrudId, TModel, TDoc>;

    protected constructor(ctrlName: TCrudId, crudService: CrudService<TCrudId, TModel, TDoc>) {
        this.ctrlName = ctrlName;
        this.crudService = crudService;
    }

    // protected static async checkAdminUser(req: any) {
    //     const user = await getUserFromRequest(req);
    //     if (!user?.roles.includes(USER_ROLES.ADMIN)) {
    //         throw errorsBuilders.users.auth.unauthorized();
    //     }
    // }

    list: NextApiHandler = (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".list", async () => {
            // let withDisabled = false;
            // if (req.query.withDisabled) {
            //     // must be admin
            //     await CrudHandler.checkAdminUser(req);
            //     withDisabled = req.query.withDisabled === "true";
            // }
            //
            // let query = this.getQueryForList(req);
            // let offset;
            // let limit;
            // let sort;
            // let filters: FilterQuery<TDoc> | undefined;
            // if (req.query.offset && typeof req.query.offset === "string") offset = parseInt(req.query.offset);
            // if (req.query.limit && typeof req.query.limit === "string") limit = parseInt(req.query.limit);
            // if (req.query.sort && typeof req.query.sort === "string") {
            //     sort = JSON.parse(req.query.sort);
            //     sanitizeObject(sort, "sort", true);
            // }
            // if (req.query.filters && typeof req.query.filters === "string") {
            //     await CrudCtrl.checkAdminUser(req);
            //     filters = JSON.parse(req.query.filters);
            //     query = { ...query, ...buildQueryFromFilters(filters) };
            //     delete query.password;
            // }
            return Promise.all([this.crudService.list(), this.crudService.count()]).then(([items, count]) => ({
                items,
                count,
            }));
        });
    };
}
