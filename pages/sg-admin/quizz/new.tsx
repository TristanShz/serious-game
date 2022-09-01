import { AdminLayout } from "../../../resources/layouts/AdminLayout";
import { ReactElement } from "react";
import { QuizzForm } from "../../../resources/admin/quizz/components/QuizzForm";

const NewQuizz = () => {
  return <QuizzForm />;
};

NewQuizz.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default NewQuizz;
