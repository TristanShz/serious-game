import React, { ReactElement } from "react";
import { TableComponent } from "../../../_common/components/table/TableComponent";
import { RegularAdminLayout } from "../../../resources/layouts/RegularAdminLayout";
import { fetcher } from "../../../_config/axios";
import useSWR from "swr";
import { baseUrlAdmin } from "../../../_common/routes/routes";

type Props = {};

const FAKE_ROW_DATA = [
    {
        _id: "if35435435DiSfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
    {
        _id: "if35435435dDSfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
    {
        _id: "if35435l435DSfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
    {
        _id: "if35435435DxSfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
    {
        _id: "if35435435DSnfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
    {
        _id: "if35435435vDSfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
    {
        _id: "if3543543b5DSfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
    {
        _id: "if35435435sDSfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
    {
        _id: "if354354d35DSfsdfsdf",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        date: "15/06/2022",
        adresse: "25 rue des pinpin",
        phone: "5432567890",
        subscribe: "oui",
        role: "ADMIN",
    },
];

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
    const { data, error } = useSWR(`${baseUrlAdmin}/api/v1/category`, fetcher);
    //TODO: Ajouter componentLoader + ResourceStore
    return <TableComponent columns={FAKE_COLUMNS} data={FAKE_ROW_DATA} />;
};

UsersAdminDashboard.getLayout = (page: ReactElement) => <RegularAdminLayout>{page}</RegularAdminLayout>;

export default UsersAdminDashboard;
