import React from "react";
import {Car} from "./Car";
import {Button} from "primereact/button";
import {XInputText} from "@michalrakus/x-react-web-lib/XInputText";
import {FormProps, XFormBase} from "@michalrakus/x-react-web-lib/XFormBase";
import {XDropdown} from "@michalrakus/x-react-web-lib/XDropdown";
import {XSearchButton} from "@michalrakus/x-react-web-lib/XSearchButton";
import {BrandSearchTable} from "./BrandSearchTable";
import {XToOneAssocButton} from "@michalrakus/x-react-web-lib/XToOneAssocButton";
import {BrandForm} from "./BrandForm";
import {
    XFormDataTable2,
    XFormColumn,
    XFormDropdownColumn,
    XFormSearchButtonColumn
} from "@michalrakus/x-react-web-lib/XFormDataTable2";
import {CountrySearchTable} from "./CountrySearchTable";
import {XInputDecimal} from "@michalrakus/x-react-web-lib/XInputDecimal";
import {XInputDate} from "@michalrakus/x-react-web-lib/XInputDate";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";

export class CarForm extends XFormBase<Car> {

    constructor(props: FormProps) {
        super(props);

        this.onClickAddRow = this.onClickAddRow.bind(this);
    }

    // nepouziva sa
    onClickAddRow() {

        this.onTableAddRow("driveList", {cityFrom: "fachci"}, "idDrive");
    };

    render() {
        return (
            <div>
                <XInputText form={this} field="idCar" label="ID" readOnly={true}/>
                <XInputText form={this} field="vin" label="Vin"/>
                <XInputText form={this} field="brand"/>
                <XInputText form={this} field="year" label="Year"/>
                <XInputText form={this} field="color" label="Color"/>
                <XInputDecimal form={this} field="price" label="Price"/>
                <XInputDate form={this} field="carDate" label="Car date"/>
                <XInputDate form={this} field="carDatetime" label="Car datetime"/>
                <XInputText form={this} field="brandAssoc.idBrand" label="ID Brand"/>
                <XDropdown form={this} assocField="brandAssoc" displayField="brand" label="Brand *"/>
                <XSearchButton form={this} assocField="brandAssoc" displayField="brand" searchTable={<BrandSearchTable paramcek="fiha"/>} assocForm={<BrandForm/>} label="Brand * SB"/>
                <XToOneAssocButton form={this} assocField="brandAssoc" assocForm={<BrandForm/>} label="Brand * AB"/>
                <XFormDataTable2 form={this} assocField="driveList" label="Cesty">
                    <XFormColumn field="idDrive" header="ID"/>
                    <XFormColumn field="cityFrom" header="From"/>
                    <XFormColumn field="cityTo" header="To"/>
                    <XFormColumn field="km"/>
                    <XFormColumn field="fuelPrice" header="Fuel - price"/>
                    <XFormColumn field="driveDate" header="Drive Date"/>
                    <XFormColumn field="driveDatetime" header="Drive Datetime"/>
                    <XFormColumn field="country.idCountry" header="ID country"/>
                    <XFormDropdownColumn assocField="country" displayField="code" header="Krajina Drop" dropdownInFilter={true}/>
                    <XFormSearchButtonColumn assocField="country" displayField="name" searchTable={<CountrySearchTable/>} header="Krajina SB"/>
                </XFormDataTable2>
                <div className="p-field p-grid">
                    <Button label="Save" onClick={this.onClickSave} />
                    <Button label="Cancel" onClick={this.onClickCancel} />
                </div>
                <SourceCodeLinkForm sourceCodeFile="CarForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
            </div>
        );
    }
}
