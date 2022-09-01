import { ReactElement } from "react";
import RegularLayout from "../resources/layouts/RegularLayout";
import { observer } from "mobx-react-lite";
import useUser from "../lib/users/_helpers/useUser";
import { pages } from "../_config/pages";

function Profile() {
  const user = useUser({
    redirectTo: pages.login.path
  });
  return <div></div>;
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <RegularLayout headerProps={{ full: true }}>{page}</RegularLayout>;
};

export default observer(Profile);
