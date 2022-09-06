import { CrudCtrl } from "../../../crud/CrudCtrl";
import { IResultsDocument, IResultsModel } from "./ResultsModel";
import { resultsService } from "./ResultsService";
import { NextApiHandler } from "next";
import { genericCtrlFn } from "../../../../_common/_helpers/ctrlHelper";
import { quizzService } from "../QuizzService";
import { deepEqualBetweenObjects } from "../../../../_common/_helpers/objectHelper";

class ResultsCtrl extends CrudCtrl<"results", IResultsModel, IResultsDocument> {
    constructor() {
        super("results", resultsService);
    }

    postResult: NextApiHandler = async (req, res) => {
        return genericCtrlFn(res, this.ctrlName + ".getResult", async () => {
            const body: IResultsModel = req.body;
            const results = await resultsService.getResults(body.quizz, body.user);
            const quizz = await quizzService.get(body.quizz);
            const question = quizz?.questions.find(
                (question) => question._id === body.responses[body.responses.length - 1].question._id,
            );
            if (question) {
                if (results) {
                    await resultsService.update(results._id, {
                        ...results,
                        responses: [
                            ...results.responses,
                            {
                                question,
                                userResponse: body.responses[body.responses.length - 1].userResponse,
                            },
                        ],
                    });
                } else {
                    await resultsService.create({
                        ...body,
                        responses: [{ question, userResponse: body.responses[0].userResponse }],
                    });
                }
                return deepEqualBetweenObjects(
                    question.answers,
                    body.responses[body.responses.length - 1].userResponse,
                );
            }
        });
    };
}

export const resultsCtrl = new ResultsCtrl();
