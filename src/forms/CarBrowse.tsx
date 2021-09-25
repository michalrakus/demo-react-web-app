import React from "react";
import {XLazyColumn, XLazyDataTable} from "@michalrakus/x-react-web-lib/XLazyDataTable";
import {CarForm} from "./CarForm";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {Car} from "./Car";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";

export const CarBrowse = (props: {}) => {

    const onAddRow = () => {

        // openForm pridavame automaticky v XFormNavigator3 pri renderovani komponentu
        (props as any).openForm(<CarForm object={{driveList: []}}/>);
    }

    const onEdit = (selectedRow: any) => {

        // openForm pridavame automaticky v XFormNavigator3 pri renderovani komponentu
        (props as any).openForm(<CarForm id={selectedRow.idCar}/>);
    }

    // priklad na custom removeRow
    const onRemoveRow = async (selectedRow: Car): Promise<boolean> => {

        if (window.confirm('Are you sure to remove the selected row?')) {
            await XUtils.removeRow("Car", selectedRow);
            return true;
        }
        return false;
    }

    return (
        <div>
            <XLazyDataTable entity="Car" rows={15} onAddRow={onAddRow} onEdit={onEdit} removeRow={false} displayed={(props as any).displayed}>
                <XLazyColumn field="idCar" header="ID"/>
                <XLazyColumn field="vin" header="Vin"/>
                <XLazyColumn field="year" header="Year"/>
                <XLazyColumn field="brand" header="Brand string"/>
                <XLazyColumn field="brandAssoc.brand" header="Brand assoc" dropdownInFilter={true}/>
                <XLazyColumn field="color" header="Color"/>
                <XLazyColumn field="price" header="Price"/>
                <XLazyColumn field="carDate" header="Car Date"/>
                <XLazyColumn field="carDatetime" header="Car Datetime"/>
                <XLazyColumn field="carBoolean" header="Car Boolean"/>
            </XLazyDataTable>
            <SourceCodeLinkForm sourceCodeFile="CarBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
        </div>
    );
}
