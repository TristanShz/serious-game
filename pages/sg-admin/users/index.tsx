import React, { ReactElement } from "react";
import { TableComponent } from "../../../_common/components/table/TableComponent";
import { RegularAdminLayout } from "../../../resources/layouts/RegularAdminLayout";
import { fetcher } from "../../../_config/axios";
import useSWR from "swr";
import { baseAPIUrlAdmin } from "../../../_common/routes/routes";
import { ComponentLoader } from "../../../_common/components/loader/ComponentLoader";
import { usersAdminStore } from "../../../resources/admin/users/_stores/usersAdminStore";
import { TUser } from "../../../resources/users/_models/UserMdl";
import { ResourcesProvider, useResourcesStore } from "../../../resources/admin/_stores/ResourcesContext";
import { ResourcesStore } from "../../../resources/admin/_stores/ResourcesStore";

type Props = {};

const FAKE_COLUMNS = [
    {
        key: "name",
        label: "prenom/nom",
    },
    {
        key: "email",
        label: "Email",
    },
    {
        key: "date",
        label: "Date de naissance",
    },
    {
        key: "adresse",
        label: "Adresse",
    },
    {
        key: "phone",
        label: "Téléphone",
    },
    {
        key: "subscribe",
        label: "inscrit",
    },
    {
        key: "role",
        label: "Rôle",
    },
    {
        key: "_id",
        label: "ID",
    },
];

const UsersAdminDashboard = (props: Props) => {
    return (
        <>
            <ComponentLoader<TUser>
                endPoint={usersAdminStore.listEndPoint()}
                render={(data) => {
                    usersAdminStore.setItems(data?.data.items!);
                    const resourcesStore = new ResourcesStore<TUser>("users", data?.data.items, usersAdminStore);

                    return (
                        <ResourcesProvider store={resourcesStore}>
                            <TableComponent columns={FAKE_COLUMNS} />
                        </ResourcesProvider>
                    );
                }}
            />
        </>
    );
};

UsersAdminDashboard.getLayout = (page: ReactElement) => <RegularAdminLayout>{page}</RegularAdminLayout>;

export default UsersAdminDashboard;
