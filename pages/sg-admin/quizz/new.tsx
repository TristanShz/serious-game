import React, { ReactElement } from "react";
import { QuizzForm } from "../../../resources/admin/quizz/components/QuizzForm";
import { RegularAdminLayout } from "../../../resources/layouts/RegularAdminLayout";

export function NewQuizz() {
  return <QuizzForm />;
}

NewQuizz.getLayout = function getLayout(page: ReactElement) {
  return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default NewQuizz;
