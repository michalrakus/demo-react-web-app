import React, {useState} from "react";
import {Menubar} from "primereact/menubar";
import {CarBrowse} from "./forms/CarBrowse";
import {XFormNavigator3} from "@michalrakus/x-react-web-lib/XFormNavigator3";
import {BrandBrowse} from "./forms/BrandBrowse";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";
import {XUserBrowse} from "@michalrakus/x-react-web-lib/XUserBrowse";
import {XBrowse} from "@michalrakus/x-react-web-lib/XBrowse";
import {XBrowseMetaBrowse} from "@michalrakus/x-react-web-lib/XBrowseMetaBrowse";
import {XHolder1, XHolder2} from "@michalrakus/x-react-web-lib/XHolders";
import {CarBrowseImport} from "./forms/CarBrowseImport";
import { User } from "@auth0/auth0-react";
import {TestovaciForm} from "./forms/TestovaciForm";
import {TestovaciFormTable} from "./forms/TestovaciFormTable";
import {CarOwnerBrowse} from "./forms/CarOwnerBrowse";

// TODO - v buducnosti presunut do XReactWebLib
export const XMenu = (props: {defaultFormElement?: any; logout: () => void; user?: User | undefined}) => {

    const [rootFormElement, setRootFormElement] = useState<any>(props.defaultFormElement);
    const [renderHolder1, setRenderHolder1] = useState<boolean>(true);

    const items = [
        {
            label:'Application',
            items:[
                {label:'Brand', command: () => {openForm(<BrandBrowse/>);}},
                {label:'Car', command: () => {openForm(<CarBrowse/>);}},
                {label:'Car owner', command: () => {openForm(<CarOwnerBrowse/>);}},
                {label:'Car - import', command: () => {openForm(<CarBrowseImport/>);}},
                //{label:'Prazdne', command: () => {openForm(null);}},
                {label:'Testovaci', command: () => {openForm(<TestovaciForm/>);}},
                {label:'Testovaci 2', command: () => {openForm(<TestovaciFormTable/>);}}
            ]
        },
        {
            label:'Runtime edit',
            items:[
                {label:'Brand - runtime edit', command: () => {openForm(<XBrowse entity="Brand"/>);}},
                {label:'Car - runtime edit', command: () => {openForm(<XBrowse entity="Car"/>);}}
            ]
        },
        {
            label:'Administration',
            items:[
                {label:'Users', command: () => {openForm(<XUserBrowse/>);}},
                {label:'Browses', command: () => {openForm(<XBrowseMetaBrowse/>);}}
                //{label:'Change password', command: () => {openForm(<XChangePasswordForm setXToken={props.setXToken}/>);}}
            ]
        },
        {
            label:'Log off',
            icon:'pi pi-fw pi-power-off',
            command: props.logout
        }
    ];

    const openForm = (newFormElement: any) => {
        setRootFormElement(newFormElement);
        // we want refresh the whole element tree (call constructors of class components, call componentDidMount methods to refresh data, ...)
        // change of Holder1 to Holder2 and back will cause mounting of new component tree
        // without this, changing from <XBrowse entity="Brand"/> to <XBrowse entity="Car"/> will not work (component tree will not change)
        setRenderHolder1(!renderHolder1);
    }

    const end: any = (
        <div className="grid">
            <div className="mx-2">Backend: {XUtils.getXBackendUrl()}</div><div className="mx-2">  User: {/*XUtils.getUsername()*/props.user?.name}</div>
        </div>
    );

    // little workaround - see remark in function openForm
    let holderWithNavigator;
    if (renderHolder1) {
        holderWithNavigator = <XHolder1 element={<XFormNavigator3 rootFormElement={rootFormElement}/>}/>;
    }
    else {
        holderWithNavigator = <XHolder2 element={<XFormNavigator3 rootFormElement={rootFormElement}/>}/>;
    }

    return (
        <div>
            <Menubar id="menuId" model={items} end={end} className="mb-1"/>
            {holderWithNavigator}
        </div>
    );
}
