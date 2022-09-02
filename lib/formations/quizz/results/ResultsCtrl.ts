import { CrudCtrl } from "../../../crud/CrudCtrl";
import { IResultsDocument, IResultsModel } from "./ResultsModel";
import { resultsService } from "./ResultsService";

class ResultsCtrl extends CrudCtrl<"results", IResultsModel, IResultsDocument> {
    constructor() {
        super("results", resultsService);
    }
}

export const resultsCtrl = new ResultsCtrl();
