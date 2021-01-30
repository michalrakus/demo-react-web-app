import React, {useState} from "react";
import {Menubar} from "primereact/menubar";
import {CarBrowse} from "./forms/CarBrowse";
import {XFormNavigator3} from "@michalrakus/x-react-web-lib/XFormNavigator3";
import {BrandBrowse} from "./forms/BrandBrowse";
import {TestovaciForm} from "./forms/TestovaciForm";
import {XToken} from "@michalrakus/x-react-web-lib/XToken";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";
import {XUserBrowse} from "@michalrakus/x-react-web-lib/XUserBrowse";

// TODO - v buducnosti presunut do XReactWebLib
export const XMenu = (props: {defaultFormElement?: any; setXToken: (xToken: XToken | null) => void;}) => {

    const [form, setForm] = useState<any>(props.defaultFormElement);
    const xFormNavigator = React.createRef<XFormNavigator3>();

    const items = [
        {
            label:'Application',
            items:[
                {label:'Brand', command: () => {openForm(<BrandBrowse/>);}},
                {label:'Car', command: () => {openForm(<CarBrowse/>);}},
                {label:'Prazdne', command: () => {openForm(null);}},
                {label:'Testovaci', command: () => {openForm(<TestovaciForm/>);}}
            ]
        },
        {
            label:'Administration',
            items:[
                {label:'Users', command: () => {openForm(<XUserBrowse/>);}}
            ]
        },
        {
            label:'Log off',
            icon:'pi pi-fw pi-power-off',
            command: () => {props.setXToken(null);}
        }
    ];

    const openForm = (newFormElement: any) => {
        if (xFormNavigator.current === null) {
            throw "Unexpected error - xFormNavigator.current is null";
        }
        xFormNavigator.current.openRootForm(newFormElement);
    }

    const end: any = "Server: " + XUtils.xServerUrl + "  User: " + XUtils.getUsername();

    return (
        <div>
            <Menubar model={items} end={end}/>
            <XFormNavigator3 ref={xFormNavigator} initFormElement={form}/>
        </div>
    );
}
