import {XInputText} from "@michalrakus/x-react-web-lib/XInputText";
import React from "react";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {XButton} from "@michalrakus/x-react-web-lib/XButton";
import {XFormBase} from "@michalrakus/x-react-web-lib/XFormBase";
import {Form} from "../XLibItems";
import {XInputDecimal} from "@michalrakus/x-react-web-lib/XInputDecimal";

@Form("Brand")
export class BrandForm extends XFormBase {

    render() {
        return (
            <div>
                <XInputDecimal form={this} field="idBrand" label="ID" readOnly={true}/>
                <XInputText form={this} field="brand"/>
                <XButton label="Save" onClick={this.onClickSave}/>
                <XButton label="Cancel" onClick={this.onClickCancel}/>
                <SourceCodeLinkForm sourceCodeFile="BrandForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="brand.entity.ts"/>
            </div>
        );
    }
}
