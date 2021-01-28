import {XLazyColumn, XLazyDataTable} from "@michalrakus/x-react-web-lib/XLazyDataTable";
import React from "react";

export const CountrySearchTable = (props: {}) => {

    // parameter searchTableParams pridava XSearchButton automaticky
    return (
        <XLazyDataTable entity="Country" rows={5} searchTableParams={(props as any).searchTableParams}>
            <XLazyColumn field="idCountry" header="ID"/>
            <XLazyColumn field="code" header="Kod"/>
            <XLazyColumn field="name" header="Krajina"/>
        </XLazyDataTable>
    );
}
