import React from "react";
import {Car} from "./Car";
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
import {XButton} from "@michalrakus/x-react-web-lib/XButton";
import {Form} from "../XLibItems";

@Form("Car")
export class CarForm extends XFormBase {

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
                <div className="p-grid p-m-3">
                    <div className="p-col">
                        <XInputDecimal form={this} field="idCar" label="ID" readOnly={true}/>
                        <XInputText form={this} field="vin" label="Vin"/>
                        <XInputText form={this} field="brand"/>
                        <XInputDecimal form={this} field="year" label="Year"/>
                    </div>
                    <div className="p-col">
                        <XInputText form={this} field="color" label="Color"/>
                        <XInputDecimal form={this} field="price" label="Price"/>
                        <XInputDate form={this} field="carDate" label="Car date"/>
                        <XInputDate form={this} field="carDatetime" label="Car datetime"/>
                    </div>
                    <div className="p-col">
                        <XInputDecimal form={this} field="brandAssoc.idBrand" label="ID Brand"/>
                        <XDropdown form={this} assocField="brandAssoc" displayField="brand" label="Brand *"/>
                        <XSearchButton form={this} assocField="brandAssoc" displayField="brand" searchTable={<BrandSearchTable paramExample="param example"/>} assocForm={<BrandForm/>} label="Brand * SB" size={16}/>
                        <XToOneAssocButton form={this} assocField="brandAssoc" assocForm={<BrandForm/>} label="Brand * AB"/>
                    </div>
                </div>
                <XFormDataTable2 form={this} assocField="driveList" label="Drive list" /*width="min-content"*/>
                    <XFormColumn field="idDrive" header="ID" readOnly={true}/>
                    <XFormColumn field="cityFrom" header="From"/>
                    <XFormColumn field="cityTo" header="To"/>
                    <XFormColumn field="km"/>
                    <XFormColumn field="fuelPrice" header="Fuel - price"/>
                    <XFormColumn field="driveDate" header="Drive Date"/>
                    <XFormColumn field="driveDatetime" header="Drive Datetime"/>
                    <XFormColumn field="country.idCountry" header="ID country"/>
                    <XFormDropdownColumn assocField="country" displayField="code" header="Country Drop" dropdownInFilter={true}/>
                    <XFormSearchButtonColumn assocField="country" displayField="name" searchTable={<CountrySearchTable/>} header="Country SB"/>
                </XFormDataTable2>
                <XButton label="Save" onClick={this.onClickSave}/>
                <XButton label="Cancel" onClick={this.onClickCancel}/>
                <SourceCodeLinkForm sourceCodeFile="CarForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
            </div>
        );
    }
}
