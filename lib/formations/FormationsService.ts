import CrudService from "../crud/CrudService";
import FormationModel, { IFormationDocument, IFormationModel } from "./FormationModel";

class FormationsService extends CrudService<"formations", IFormationModel, IFormationDocument> {
  constructor() {
    super("formations", FormationModel, false);
  }

  async getOneByAlias(urlAlias: string): Promise<IFormationModel> {
    return FormationModel.findOne({ urlAlias }).lean().exec();
  }
}

const formationsService = new FormationsService();
export default formationsService;
