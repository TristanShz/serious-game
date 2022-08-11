import React, { ReactElement } from "react";
import { TableComponent } from "../../../_common/components/table/TableComponent";
import { RegularAdminLayout } from "../../../resources/layouts/RegularAdminLayout";

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
        key: "_id",
        label: "ID",
    },
    {
        key: "name",
        label: "prenom/nom",
    },
    {
        key: "slug",
        label: "slug",
    },
];

const CategoryAdminDashboard = (props: Props) => {
    return <TableComponent columns={FAKE_COLUMNS} />;
};

CategoryAdminDashboard.getLayout = function getLayout(page: ReactElement) {
    return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default CategoryAdminDashboard;
