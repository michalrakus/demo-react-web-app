import {XInputText} from "@michalrakus/x-react-web-lib/XInputText";
import React from "react";
import {SourceCodeLinkForm} from "./SourceCodeLinkForm";
import {SourceCodeLinkEntity} from "./SourceCodeLinkEntity";
import {XFormBase} from "@michalrakus/x-react-web-lib/XFormBase";
import {Form} from "../XLibItems";
import {XInputDecimal} from "@michalrakus/x-react-web-lib/XInputDecimal";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";
import {XFormFooter} from "@michalrakus/x-react-web-lib/XFormFooter";
import {XButton} from "@michalrakus/x-react-web-lib/XButton";
import {InputText} from "primereact/inputtext";

@Form("CarOwner")
export class CarOwnerForm extends XFormBase {

    hiddenFileInputRef: any;

    constructor(props: any) {
        super(props);

        this.hiddenFileInputRef = React.createRef();

        this.onDownload = this.onDownload.bind(this);
        this.onChooseFile = this.onChooseFile.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    // atribut selectedFile potrebujeme mat v this.state (ktory je v XFormBase)
    // zapiseme ho a citame ho tymito pomocnymi metodkami
    setSelectedFile(selectedFile: any) {
        // zapiseme hodnotu do this.state.object.selectedFile
        //this.onFieldChange('selectedFile', selectedFile);
        this.setState({selectedFile: selectedFile});
    }

    getSelectedFile(): any {
        // precitame hodnotu z this.state.object.selectedFile
        //return this.getXObject().selectedFile;
        return this.state.selectedFile;
    }

    async onDownload() {
        let response;
        try {
            response = await XUtils.fetchBasicJson('carOwnerDownloadFile', {carOwnerFileId: this.getXObject().carOwnerFile.id});
        }
        catch (e) {
            XUtils.showErrorMessage("Download failed.", e);
            return;
        }
        const fileName = this.getXObject().carOwnerFile.filename;
        // let respJson = await response.json(); - konvertuje do json objektu
        let respBlob = await response.blob();

        // download blob-u (download by mal fungovat asynchronne a "stream-ovo" v spolupraci so servrom)
        let url = window.URL.createObjectURL(respBlob);
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    }

    onChooseFile() {
        // @ts-ignore
        this.hiddenFileInputRef.current.click();
    }

    onChangeFile(event: any) {
        this.setSelectedFile(event.target.files[0]);
    }

    async onClickSave(): Promise<void> {

        if (!this.validateSave()) {
            return;
        }

        // TODO - pri inserte povinny
        // if (!this.getSelectedFile()) {
        //     alert("Please select the file.");
        //     return;
        // }

        //const carOwner: any = {...this.getXObject()}; // create copy
        //delete carOwner.selectedFile;
        const carOwner: any = this.getXObject();
        try {
            await XUtils.fetchFile('carOwnerSaveRow', carOwner, this.getSelectedFile());
        }
        catch (e) {
            XUtils.showErrorMessage("Save row failed.", e);
            return; // zostavame vo formulari
        }
        (this.props as any).openForm(null); // save zbehol, ideme naspet do browsu
    }

    render() {
        const selectedFile: any = this.getSelectedFile();

        return (
            <div>
                <div className="x-form-row">
                    <div className="x-form-col">
                        <XInputDecimal form={this} field="id" label="ID" readOnly={true}/>
                        <XInputText form={this} field="name" label="Name"/>
                        <XInputText form={this} field="surname" label="Surname"/>
                        <XInputText form={this} field="carOwnerFile.filename" label="Filename"/>
                        <div className="field grid">
                            <XButton label="Download" onClick={this.onDownload}/>
                        </div>
                        <div className="field grid">
                            <XButton label="Choose file" onClick={this.onChooseFile}/>
                            <input type="file" ref={this.hiddenFileInputRef} onChange={this.onChangeFile} style={{display:'none'}}/>
                            <InputText value={selectedFile ? `${selectedFile.name}, ${selectedFile.size} B` : "No file selected"} readOnly={true}/>
                        </div>
                    </div>
                </div>
                <XFormFooter form={this}/>
                <SourceCodeLinkForm sourceCodeFile="CarOwnerForm.tsx"/>
                <SourceCodeLinkEntity sourceCodeFile="car-owner.entity.ts"/>
            </div>
        );
    }
}

XUtils.registerAppForm(<CarOwnerForm/>, "CarOwner");
