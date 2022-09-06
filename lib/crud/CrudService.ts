import { Select, Sort, TMongooseId } from "../../_common/_types/MongooseTypes";
import loggerService from "../../_common/logger/loggerService";
import { errorsBuilders } from "../../_common/errors/errorBuilder";
import { apiConfig } from "../../_config/config";
import mongoose, { FilterQuery } from "mongoose";
import * as fs from "fs";
import _ from "lodash";
import paths from "../../_config/paths";
import { flattenObject } from "../../_common/_helpers/objectHelper";

abstract class CrudService<
    TCrudId extends keyof typeof errorsBuilders,
    TModel,
    TDoc extends TModel & mongoose.Document,
> {
    protected readonly id: TCrudId;
    protected readonly model: mongoose.Model<TDoc>;
    protected readonly enableableModel: boolean; // un element qui peut etre desactive. Par defaut ne retourne pas
    protected readonly modelFilesPaths: string[] = [];
    protected readonly defaultSelect?: Select;

    protected constructor(
        id: TCrudId,
        model: mongoose.Model<TDoc>,
        enableableModel = false,
        modelFilesPaths: string[] = [],
        defaultSelect?: Select,
    ) {
        this.id = id;
        this.model = model;
        this.enableableModel = enableableModel;
        this.modelFilesPaths = modelFilesPaths;
        this.defaultSelect = defaultSelect;
    }

    list(
        withDisabled?: boolean,
        select?: Select,
        query?: FilterQuery<TDoc>,
        offset?: number,
        limit?: number,
        sort: Sort = { createdAt: -1 },
    ) {
        query = { ...query };
        if (this.enableableModel && !withDisabled) {
            (query as any).enabled = true;
        }
        // @ts-ignore
        let findQuery = this.model.find(query, select || this.defaultSelect).sort(sort);
        if (offset) findQuery = findQuery.skip(offset);
        if (limit) findQuery = findQuery.limit(limit);

        return findQuery.lean();
    }

    count(withDisabled?: boolean, query?: FilterQuery<TDoc>) {
        query = Object.assign({}, query);
        if (this.enableableModel && !withDisabled) {
            (query as any).enabled = true;
        }

        return this.model.countDocuments(query);
    }

    get(itemId: TMongooseId, select?: Select, query?: FilterQuery<TDoc>) {
        if (query) {
            return this.model.findOne({ _id: itemId, ...query }, select || this.defaultSelect);
        }
        return this.model.findById(itemId, select || this.defaultSelect);
    }

    async create(item: Omit<TModel, "_id" | "createdAt" | "updatedAt">) {
        return await this.model.create(item);
    }

    async update(itemId: TMongooseId, item: TModel, select?: Select) {
        return this.executeUpdate(itemId, item, select);
    }

    async patch(itemId: TMongooseId, itemPatch: Partial<TDoc>, select?: Select) {
        const itemPatchFlattened = flattenObject(itemPatch);
        const $set: any = {};
        const $unset: any = {};
        const update: any = {};

        for (const itemPath in itemPatchFlattened) {
            if (itemPatchFlattened[itemPath] === undefined || itemPatchFlattened[itemPath] === null) {
                $unset[itemPath] = "";
                update.$unset = $unset;
            } else {
                $set[itemPath] = itemPatchFlattened[itemPath];
                update.$set = $set;
            }
        }

        return this.executeUpdate(itemId, update, select);
    }

    async delete(itemId: TMongooseId) {
        const deletedItem = await this.model.findByIdAndDelete(itemId);
        this._checkFilesToDelete(deletedItem);
        return deletedItem;
    }

    protected async executeUpdate(itemId: TMongooseId, update: any, select?: Select) {
        const oldItem = await this.model.findByIdAndUpdate(itemId, update);
        if (!oldItem) {
            throw (errorsBuilders[this.id] as any).notFound();
        }
        const newItem = await this.model.findById(itemId);
        this._checkFilesToDelete(oldItem, newItem);
        return this.model.findById(itemId, select).lean().exec();
    }

    private _checkFilesToDelete(oldItem: any, newItem?: any) {
        if (this.modelFilesPaths) {
            let oldFilePaths: string[] = [];
            let newFilePaths: string[] = [];
            for (let i = 0; i < this.modelFilesPaths.length; i++) {
                const dataPath = this.modelFilesPaths[i].split(".");
                oldFilePaths = oldFilePaths.concat(this._getFilePaths(oldItem, dataPath));
                newFilePaths = newFilePaths.concat(this._getFilePaths(newItem, dataPath));
            }
            for (const oldFilePath of oldFilePaths) {
                if (!newFilePaths.includes(oldFilePath)) {
                    try {
                        fs.unlink(paths.uploadsPath + oldFilePath.substring(apiConfig.uploads.baseUrl.length), (err) =>
                            loggerService.error("CrudService / " + this.id, err),
                        );
                    } catch (error) {
                        loggerService.error("CrudService / " + this.id, error);
                    }
                }
            }
        }
    }

    private _getFilePaths(item: any, path: string[]) {
        let files: string[] = [];
        const wildCardIndex = path.indexOf("*");
        if (wildCardIndex >= 0) {
            const basePath = path.slice(0, wildCardIndex);
            const nextPath = path.slice(wildCardIndex + 1);
            const baseObject = _.get(item, basePath.join("."));
            if (baseObject && baseObject.length > 0) {
                for (const element of baseObject) {
                    files = files.concat(this._getFilePaths(element, nextPath));
                }
            }
        } else {
            const value = _.get(item, path.join("."));
            if (value && typeof value === "string" && value.startsWith(apiConfig.uploads.baseUrl)) {
                files.push(value);
            }
        }
        return files;
    }
}

export default CrudService;
