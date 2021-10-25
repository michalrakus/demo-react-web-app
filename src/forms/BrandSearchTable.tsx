import {XLazyColumn, XLazyDataTable} from "@michalrakus/x-react-web-lib/XLazyDataTable";
import React from "react";

export const BrandSearchTable = (props: {paramExample: string;}) => {

    // parameter searchTableParams pridava XSearchButton automaticky
    return (
        <XLazyDataTable entity="Brand" paginator={false} searchTableParams={(props as any).searchTableParams}>
            <XLazyColumn field="idBrand" header="ID"/>
            <XLazyColumn field="brand" header={`Brand (${props.paramExample})`}/>
        </XLazyDataTable>
    );
}
