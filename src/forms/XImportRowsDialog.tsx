import {Dialog} from "primereact/dialog";
import React, {useState} from "react";
import {XButton} from "@michalrakus/x-react-web-lib/XButton";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Dropdown} from "primereact/dropdown";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";
import {
    CsvDecimalFormat,
    CsvSeparator,
    ImportParam, ImportResponse,
    ImportType
} from "@michalrakus/x-react-web-lib/lib/serverApi/ExportImportParam";

export const XImportRowsDialog = (props: {dialogOpened: boolean; importServicePath: string; entity: string; onHideDialog: (rowsImported: boolean) => void;}) => {

    const hiddenFileInput = React.useRef(null);
    const [selectedFile, setSelectedFile] = useState<any>();
    const [ignoreHeaderLine, setIgnoreHeaderLine] = useState(true);
    const [csvSeparator, setCsvSeparator] = useState(CsvSeparator.Semicolon);
    const [decimalFormat, setDecimalFormat] = useState(CsvDecimalFormat.Comma);

    // bez tejto metody by pri opetovnom otvoreni dialogu ponechal povodne hodnoty
    const onShow = () => {

        setSelectedFile(undefined);
        setIgnoreHeaderLine(true);
        setCsvSeparator(CsvSeparator.Semicolon);
        setDecimalFormat(CsvDecimalFormat.Comma);
    }

    const onChooseFile = () => {
        // @ts-ignore
        hiddenFileInput.current.click();
    }

    const onChangeFile = (event: any) => {

        setSelectedFile(event.target.files[0]);
    }

    const onImport = async () => {

        if (!selectedFile) {
            alert("Please select the file.");
            return;
        }

        const importParam: ImportParam = {
            importType: ImportType.Csv,
            entity: props.entity,
            csvParam: {useHeaderLine: ignoreHeaderLine, csvSeparator: csvSeparator, csvDecimalFormat: decimalFormat}
        };
        const importResponse: ImportResponse = await XUtils.fetchFile(props.importServicePath, importParam, selectedFile);
        if (!importResponse.ok) {
            alert(importResponse.error);
            return;
        }

        alert(`${importResponse.rowsImported} rows imported.`);
        props.onHideDialog(true);
    }

    // poznamka: renderovanie vnutornych komponentov Dialogu sa zavola az po otvoreni dialogu
    // poznamka2: kedze input type="file" je velmi skaredy a tazko sa customizuje cez css, tak pouzivame namiesto neho obycajny button
    // (see https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8)
    return (
        <Dialog visible={props.dialogOpened} onShow={onShow} onHide={() => props.onHideDialog(false)}>
            <div className="field grid">
                <XButton label="Choose file" onClick={onChooseFile}/>
                <input type="file" ref={hiddenFileInput} onChange={onChangeFile} style={{display:'none'}} accept=".json,.csv"/>
                <InputText value={selectedFile ? `${selectedFile.name}, ${selectedFile.size} B` : "No file selected"} readOnly={true}/>
            </div>
            <div className="field grid">
                <label htmlFor="ignoreHeaderLine" className="col-fixed" style={{width:'9.3rem'}}>Ignore header line</label>
                <Checkbox id="ignoreHeaderLine" checked={ignoreHeaderLine} onChange={(e: any) => setIgnoreHeaderLine(e.checked)}/>
            </div>
            <div className="field grid">
                <label htmlFor="csvSeparator" className="col-fixed" style={{width:'9.3rem'}}>Csv separator</label>
                <Dropdown value={csvSeparator} options={XUtils.csvSeparatorOptions} onChange={(e: any) => setCsvSeparator(e.value)}/>
            </div>
            <div className="field grid">
                <label htmlFor="decimalFormat" className="col-fixed" style={{width:'9.3rem'}}>Decimal format</label>
                <Dropdown value={decimalFormat} options={XUtils.decimalFormatOptions} onChange={(e: any) => setDecimalFormat(e.value)}/>
            </div>
            <div className="flex justify-content-center">
                <XButton label="Import" onClick={onImport}/>
            </div>
        </Dialog>
    );
}
