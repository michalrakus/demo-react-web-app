import {XLazyColumn, XLazyDataTable} from "@michalrakus/x-react-web-lib/XLazyDataTable";
import React from "react";
import {Brand} from "./Brand";
import {BrandForm} from "./BrandForm";

export const BrandBrowse = (props: {}) => {

    const onEdit = (selectedRow: Brand) => {
        console.log("zavolany BrandBrowse.onEdit");
        console.log(selectedRow);

        // onExitForm pridavame automaticky v XFormNavigator3 pri renderovani komponentu
        (props as any).onExitForm(<BrandForm entity="Brand" id={selectedRow.idBrand}/>);
    }

    return (
        <XLazyDataTable entity="Brand" rows={5} onEdit={onEdit} displayed={(props as any).displayed}>
            <XLazyColumn field="idBrand" header="ID"/>
            <XLazyColumn field="brand" header="Brand"/>
        </XLazyDataTable>
    );
}
