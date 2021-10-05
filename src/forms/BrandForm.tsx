import {XInputText} from "@michalrakus/x-react-web-lib/XInputText";
import React from "react";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {XFormBase} from "@michalrakus/x-react-web-lib/XFormBase";
import {Form} from "../XLibItems";
import {XInputDecimal} from "@michalrakus/x-react-web-lib/XInputDecimal";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";
import {XFormFooter} from "@michalrakus/x-react-web-lib/XFormFooter";

@Form("Brand")
export class BrandForm extends XFormBase {

    render() {
        return (
            <div>
                <XInputDecimal form={this} field="idBrand" label="ID" readOnly={true}/>
                <XInputText form={this} field="brand"/>
                <XFormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="BrandForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="brand.entity.ts"/>
            </div>
        );
    }
}

XUtils.registerAppForm(<BrandForm/>, "Brand");
