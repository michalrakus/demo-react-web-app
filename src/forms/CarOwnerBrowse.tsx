import {XLazyColumn, XLazyDataTable} from "@michalrakus/x-react-web-lib/XLazyDataTable";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import React from "react";
import {CarOwnerForm} from "./CarOwnerForm";

export const CarOwnerBrowse = (props: {}) => {

    const onAddRow = () => {

        // openForm pridavame automaticky v XFormNavigator3 pri renderovani komponentu
        // {carOwnerFile: {}} - inicializacny objekt typu CarOwner, obsahuje aj novy prazdny objekt typu CarOwnerFile (OneToOne asociacia carOwnerFile)
        (props as any).openForm(<CarOwnerForm object={{carOwnerFile: {}}}/>);
    }

    const onEdit = (selectedRow: any) => {

        // openForm pridavame automaticky v XFormNavigator3 pri renderovani komponentu
        (props as any).openForm(<CarOwnerForm id={selectedRow.id}/>);
    }

    return (
        <div>
            <XLazyDataTable entity="CarOwner" rows={15} formFooterHeight={'4.43rem'}
                            onAddRow={onAddRow} onEdit={onEdit} removeRow={true} displayed={(props as any).displayed}>
                <XLazyColumn field="id" header="ID"/>
                <XLazyColumn field="name" header="Name"/>
                <XLazyColumn field="surname" header="Surname"/>
            </XLazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="CarOwnerBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="car-owner.entity.ts"/>
        </div>
    );
}
