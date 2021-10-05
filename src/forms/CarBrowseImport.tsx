import React, {useState} from "react";
import {XLazyColumn, XLazyDataTable} from "@michalrakus/x-react-web-lib/XLazyDataTable";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {XButton} from "@michalrakus/x-react-web-lib/XButton";
import {XImportRowsDialog} from "./XImportRowsDialog";

// obsahuje rozrobeny import - pozri XImportRowsDialog a AppController na servri
export const CarBrowseImport = (props: {}) => {

    const [importRowsDialogOpened, setImportRowsDialogOpened] = useState(false);

    const onClickImport = () => {
        setImportRowsDialogOpened(true);
    }

    const importRowsDialogOnHide = (rowsImported: boolean) => {
        setImportRowsDialogOpened(false);
        // TODO
        if (rowsImported) {
            // setRereadData(true);
        }
    }

    return (
        <div>
            <XLazyDataTable entity="Car" rows={15} displayed={(props as any).displayed}>
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
            <div className="flex justify-content-center">
                <XButton label="Import rows" onClick={onClickImport} />
            </div>
            <SourceCodeLinkForm sourceCodeFile="CarBrowse.tsx"/>
            <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
            <XImportRowsDialog dialogOpened={importRowsDialogOpened} importServicePath="importCarCsv" entity="Car" onHideDialog={importRowsDialogOnHide}/>
        </div>
    );
}
