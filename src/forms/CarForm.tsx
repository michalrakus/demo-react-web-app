import React from "react";
import {XInputText} from "@michalrakus/x-react-web-lib/XInputText";
import {XFormBase} from "@michalrakus/x-react-web-lib/XFormBase";
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
import {Form} from "../XLibItems";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";
import {XCheckbox} from "@michalrakus/x-react-web-lib/XCheckbox";
import {XObject} from "@michalrakus/x-react-web-lib/lib/components/XObject";
import {XErrors} from "@michalrakus/x-react-web-lib/XErrors";
import {XAutoComplete} from "@michalrakus/x-react-web-lib/XAutoComplete";
import {XFormFooter} from "@michalrakus/x-react-web-lib/XFormFooter";
import {XInputTextarea} from "@michalrakus/x-react-web-lib/XInputTextarea";

@Form("Car")
export class CarForm extends XFormBase {

    // props by mal byt typu FormProps ale koli bugu v novej verzii typescript-u sme ho zmenili na any
    constructor(props: any) {
        super(props);

        //this.onClickAddRow = this.onClickAddRow.bind(this);
    }

    // nepouziva sa
    // onClickAddRow() {
    //
    //     this.onTableAddRow("driveList", {cityFrom: "fachci"}, "idDrive");
    // };

    // overrides method in XFormBase
    validate(object: XObject): XErrors {
        const errors: XErrors = {};
        if (object.vin && object.vin.length < 3) {
            errors.vin = "Length must be at least 3.";
        }
        return errors;
    }

    render() {
        return (
            <div>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <XInputDecimal form={this} field="idCar" label="ID" readOnly={true}/>
                        <div className="x-form-inline-row">
                            <XInputText form={this} field="vin" label="Vin"/>
                            <XCheckbox form={this} field="carBoolean" label="Car boolean" inline={true}/>
                        </div>
                        <XInputText form={this} field="brand" label="Brand string"/>
                        <XInputTextarea form={this} field="comment" label="Comment" rows={4}/>
                    </div>
                    <div className="x-form-col">
                        <XInputText form={this} field="color" label="Color"/>
                        <div className="x-form-inline-row">
                            <XInputDecimal form={this} field="year" label="Year"/>
                            <XInputDecimal form={this} field="price" label="Price" inline={true}/>
                        </div>
                        <XInputDate form={this} field="carDate" label="Car date"/>
                        <XInputDate form={this} field="carDatetime" label="Car datetime"/>
                    </div>
                    <div className="x-form-col">
                        <XInputDecimal form={this} field="brandAssoc.idBrand" label="ID Brand"/>
                        <XDropdown form={this} assocField="brandAssoc" displayField="brand" label="Brand assoc D"/>
                        <XSearchButton form={this} assocField="brandAssoc" displayField="brand" searchTable={<BrandSearchTable paramExample="param example"/>} assocForm={<BrandForm/>} label="Brand assoc SB" size={16}/>
                        <XAutoComplete form={this} assocField="brandAssoc" displayField="brand" assocForm={<BrandForm/>} label="Brand assoc AC"/>
                        <XToOneAssocButton form={this} assocField="brandAssoc" assocForm={<BrandForm/>} label="Brand assoc AB"/>
                    </div>
                </div>
                <div className="x-viewport-width">
                    <XFormDataTable2 form={this} assocField="driveList" label="Drive list" /*scrollWidth={'50rem'} scrollHeight={'20rem'}*/ filterDisplay="row">
                        <XFormColumn field="idDrive" header="ID" readOnly={true} width="5rem"/>
                        <XFormColumn field="cityFrom" header="From" width={'10rem md:default'}/>
                        <XFormColumn field="cityTo" header="To" width={'10rem md:default'}/>
                        <XFormColumn field="km"/>
                        <XFormColumn field="fuelPrice" header="Fuel - price"/>
                        <XFormColumn field="driveDate" header="Drive Date"/>
                        <XFormColumn field="driveDatetime" header="Drive Datetime"/>
                        <XFormColumn field="driveBoolean" header="Boolean"/>
                        <XFormColumn field="country.idCountry" header="ID country"/>
                        <XFormDropdownColumn assocField="country" displayField="code" header="Country Drop" dropdownInFilter={true}/>
                        <XFormSearchButtonColumn assocField="country" displayField="name" searchTable={<CountrySearchTable/>} header="Country SB" width="12rem"/>
                    </XFormDataTable2>
                </div>
                <XFormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="CarForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="car.entity.ts"/>
            </div>
        );
    }
}

XUtils.registerAppForm(<CarForm/>, "Car");
