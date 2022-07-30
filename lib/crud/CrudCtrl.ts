import { NextApiHandler } from "next";
import { genericCtrlFn } from "../../_common/_helpers/ctrlHelper";
import CrudService from "./CrudService";
import { errorsBuilders } from "../../_common/errors/errorBuilder";
import mongoose from "mongoose";
import { Req } from "../../_common/_types/Req";
import { TFieldsRightsByRole } from "../../_common/permissions/fieldsRightsHelper";

export abstract class CrudCtrl<
    TCrudId extends keyof typeof errorsBuilders,
    TModel,
    TDoc extends TModel & mongoose.Document,
> {
    protected readonly ctrlName: TCrudId;
    protected readonly crudService: CrudService<TCrudId, TModel, TDoc>;
    protected readonly fieldsUpdateRights?: TFieldsRightsByRole<TModel>;

    protected constructor(
        ctrlName: TCrudId,
        crudService: CrudService<TCrudId, TModel, TDoc>,
        fieldsUpdateRights?: TFieldsRightsByRole<TModel>,
    ) {
        this.ctrlName = ctrlName;
        this.crudService = crudService;
        this.fieldsUpdateRights = fieldsUpdateRights;
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

    get: NextApiHandler = (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".get", () => this.crudService.get(req.query.itemId).exec());
    };

    create: NextApiHandler = (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".create", () => this.crudService.create(req.body));
    };

    patch: NextApiHandler = (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".patch", () => this.crudService.patch(req as Req, req.body, {}));
    };

    update: NextApiHandler = (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".update", () => this.crudService.update(req as Req, req.body));
    };

    delete: NextApiHandler = (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".delete", () => this.crudService.delete(req.query.itemId));
    };
}
