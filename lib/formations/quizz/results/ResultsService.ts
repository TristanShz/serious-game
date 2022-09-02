import CrudService from "../../../crud/CrudService";
import { IResultsDocument, IResultsModel, ResultsModel } from "./ResultsModel";

class ResultsService extends CrudService<"results", IResultsModel, IResultsDocument> {
    constructor() {
        super("results", ResultsModel, false);
    }
}

export const resultsService = new ResultsService();
