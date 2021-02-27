import React from "react";
import {Car} from "./Car";
import {XLazyColumn, XLazyDataTable} from "@michalrakus/x-react-web-lib/XLazyDataTable";
import {CarForm} from "./CarForm";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";

export const CarBrowse = (props: {}) => {

    const onEdit = (selectedRow: any) => {

        // openForm pridavame automaticky v XFormNavigator3 pri renderovani komponentu
        (props as any).openForm(<CarForm id={selectedRow.idCar}/>);
    }

    return (
        <div>
            <XLazyDataTable entity="Car" rows={15} onEdit={onEdit} displayed={(props as any).displayed}>
                <XLazyColumn field="idCar" header="ID"/>
                <XLazyColumn field="vin" header="Vin"/>
                <XLazyColumn field="year" header="Year"/>
                <XLazyColumn field="brand" header="Brand"/>
                <XLazyColumn field="brandAssoc.brand" header="Brand *" dropdownInFilter={true}/>
                <XLazyColumn field="color" header="Color"/>
                <XLazyColumn field="price" header="Price"/>
                <XLazyColumn field="carDate" header="Car Date"/>
                <XLazyColumn field="carDatetime" header="Car Datetime"/>
            </XLazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="CarBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
        </div>
    );
}
