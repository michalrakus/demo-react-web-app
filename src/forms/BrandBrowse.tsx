import {XLazyColumn, XLazyDataTable} from "@michalrakus/x-react-web-lib/XLazyDataTable";
import React from "react";
import {BrandForm} from "./BrandForm";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";

export const BrandBrowse = (props: {}) => {

    const onAddRow = () => {

        // openForm pridavame automaticky v XFormNavigator3 pri renderovani komponentu
        (props as any).openForm(<BrandForm/>);
    }

    const onEdit = (selectedRow: any) => {

        // openForm pridavame automaticky v XFormNavigator3 pri renderovani komponentu
        (props as any).openForm(<BrandForm id={selectedRow.idBrand}/>);
    }

    return (
        <div>
            <XLazyDataTable entity="Brand" rows={15} onAddRow={onAddRow} onEdit={onEdit} removeRow={true} displayed={(props as any).displayed}>
                <XLazyColumn field="idBrand" header="ID"/>
                <XLazyColumn field="brand" header="Brand"/>
            </XLazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="BrandBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="brand.entity.ts"/>
        </div>
    );
}
