import clsx from "clsx";
import { AsideBar } from "../../_common/components/AsideBar";
import DashboardLogo from "../../public/logo.svg"
import { TableComponent } from "../../_common/components/TableComponent";

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

const SgAdmin = () =>  {
 return (
     <div className={clsx("h-screen w-screen bg-contain flex")}>
      <AsideBar title={"admin Dashboard"} logo={DashboardLogo} />
      <main className={"w-full h-full flex items-center justify-center"}>
          <TableComponent columns={FAKE_COLUMNS} data={FAKE_ROW_DATA}/>
      </main>
     </div>
 );
}

export default SgAdmin

