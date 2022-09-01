import { NextApiHandler } from "next";
import { genericCtrlFn } from "../../_common/_helpers/ctrlHelper";
import CrudService from "./CrudService";
import { errorsBuilders } from "../../_common/errors/errorBuilder";
import mongoose, { FilterQuery } from "mongoose";
import { Req } from "../../_common/_types/Req";
import { TFieldsRightsByRole } from "../../_common/permissions/fieldsRightsHelper";
import { IFormationDocument } from "../formations/FormationModel";
import { sanitizeObject } from "../../_common/_helpers/mongooseHelper";
import { buildQueryFromFilters } from "./crudFiltersHelper";

export abstract class CrudCtrl<TCrudId extends keyof typeof errorsBuilders,
  TModel,
  TDoc extends TModel & mongoose.Document,
  > {
  protected readonly ctrlName: TCrudId;
  protected readonly crudService: CrudService<TCrudId, TModel, TDoc>;
  protected readonly fieldsUpdateRights?: TFieldsRightsByRole<TModel>;

  protected constructor(
    ctrlName: TCrudId,
    crudService: CrudService<TCrudId, TModel, TDoc>,
    fieldsUpdateRights?: TFieldsRightsByRole<TModel>
  ) {
    this.ctrlName = ctrlName;
    this.crudService = crudService;
    this.fieldsUpdateRights = fieldsUpdateRights;
  }

  list: NextApiHandler = (req, res) => {
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
        this.crudService.count(withDisabled, query)
      ]).then(([items, count]) => ({ items, count }));
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
    return genericCtrlFn(res, this.ctrlName + ".update", () => this.crudService.update(req.query.itemId, req.body));
  };

  delete: NextApiHandler = (req, res) => {
    return genericCtrlFn(res, this.ctrlName + ".delete", () => this.crudService.delete(req.query.itemId));
  };
}
