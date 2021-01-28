import {XFormBase} from "@michalrakus/x-react-web-lib/XFormBase";
import {XInputText} from "@michalrakus/x-react-web-lib/XInputText";
import {Button} from "primereact/button";
import React from "react";
import {Brand} from "./Brand";

export class BrandForm extends XFormBase<Brand> {

    render() {
        return (
            <div>
                <XInputText form={this} field="idBrand" label="ID" readOnly={true}/>
                <XInputText form={this} field="brand"/>
                <div className="p-field p-grid">
                    <Button label="Save" onClick={this.onClickSave} />
                    <Button label="Cancel" onClick={this.onClickCancel} />
                </div>
            </div>
        );
    }
}
