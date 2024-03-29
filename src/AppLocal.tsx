
import React, {useState} from 'react';
// import './App.css'; - tu bol povodne
import {CarBrowse} from "./forms/CarBrowse";
import {XMenu} from "./XMenu";
import {XUtilsMetadata} from "@michalrakus/x-react-web-lib/XUtilsMetadata";
import {XLoginForm} from "@michalrakus/x-react-web-lib/XLoginForm";
import useXToken from "@michalrakus/x-react-web-lib/lib/components/useXToken";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './App.css'; // bol povodne ako prve css

// window.screen.addEventListener("orientationchange", function () {
//     console.log("The orientation of the screen is: " + window.screen.orientation);
// });

/*
const ratio = window.devicePixelRatio || 1;
const w = window.screen.width * ratio;
const h = window.screen.height * ratio;
console.log('***************** fachci');
console.log(window.devicePixelRatio);
console.log(w);
console.log(h);
*/

//console.log(window.getComputedStyle(document.documentElement).fontSize);

// TODO - v buducnosti presunut do XReactWebLib
function AppLocal() {

    const [xToken, setXToken] = useXToken();

    const [initialized, setInitialized] = useState(false);

    // useEffect(() => {
    //     fetchAndSetXEntityMap();
    // },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchAndSetXMetadata = async () => {
        await XUtilsMetadata.fetchAndSetXEntityMap();
        console.log("App - bol zavolany XUtilsMetadata.fetchAndSetXEntityMap()");
        await XUtilsMetadata.fetchAndSetXBrowseMetaMap();
        console.log("App - bol zavolany XUtilsMetadata.fetchAndSetXBrowseMetaMap()");
        setInitialized(true);
    }

    let elem;
    if (xToken === null) {
        elem = <div className="App-form"><XLoginForm setXToken={setXToken}/></div>;
    }
    else {
        if (!initialized) {
            elem = <div className="App-form">App is being initialized...</div>;
            fetchAndSetXMetadata();
        }
        else {
            elem = <XMenu defaultFormElement={<CarBrowse/>} logout={() => {setXToken(null);}}/>;
        }
    }

    return (
        <div className="App">
            {elem}
        </div>
    );
}

export default AppLocal;
