import { CrudCtrl } from "../../../crud/CrudCtrl";
import { IResultsBaseModel, IResultsDocument, IResultsModel } from "./ResultsModel";
import { resultsService } from "./ResultsService";
import { NextApiHandler } from "next";
import { genericCtrlFn } from "../../../../_common/_helpers/ctrlHelper";
import { quizzService } from "../QuizzService";
import { errorsBuilders } from "../../../../_common/errors/errorBuilder";

class ResultsCtrl extends CrudCtrl<"results", IResultsModel, IResultsDocument> {
    constructor() {
        super("results", resultsService);
    }

    postResult: NextApiHandler = async (req, res) => {
        console.log("post result");
        return genericCtrlFn(res, this.ctrlName + ".getResult", async () => {
            const body: IResultsBaseModel = req.body;
            const results = await resultsService.getResults(body.quizz, body.user);
            const quizz = await quizzService.get(body.quizz);
            console.log("BODY RESPONSES LENGTH :::", body.responses.length);
            console.log("BODY REPONSES ::::", body.responses[body.responses.length - 1]);
            const question = quizz?.questions.find(
                (question) => question._id == body.responses[body.responses.length - 1].question,
            );
            let updatedResults: IResultsModel;
            console.log("LA QUESTION DU BACK :: ", question);
            if (question) {
                if (results) {
                    updatedResults = {
                        ...results,
                        responses: [
                            ...results.responses,
                            {
                                question,
                                userResponse: body.responses[body.responses.length - 1].userResponse,
                            },
                        ],
                    };
                    await resultsService.update(results._id, updatedResults);
                } else {
                    updatedResults = {
                        ...body,
                        responses: [{ question, userResponse: body.responses[0].userResponse }],
                    };
                    await resultsService.create(updatedResults);
                }
                return updatedResults;
            }

            throw errorsBuilders.results.notFound();
        });
    };
}

export const resultsCtrl = new ResultsCtrl();
