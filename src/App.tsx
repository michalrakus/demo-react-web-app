
import React, {useState} from 'react';
// import './App.css'; - tu bol povodne
import {CarBrowse} from "./forms/CarBrowse";
import {XMenu} from "./XMenu";
import {XUtilsMetadata} from "@michalrakus/x-react-web-lib/XUtilsMetadata";
import {XLoginForm} from "@michalrakus/x-react-web-lib/XLoginForm";
import useXToken from "@michalrakus/x-react-web-lib/lib/components/useXToken";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";

import 'primereact/resources/themes/saga-blue/theme.css';
//import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './App.css'; // bol povodne ako prve css

// provizorne takto, musi byt nastavene pred prvym requestom na server
// neda sa pouzit parameter sposobom process.env.X_SERVER_URL, lebo aplikacia bezi vo webbrowseri
const xServerUrl = 'http://localhost:8081/';
//const xServerUrl = 'https://x-demo-server.herokuapp.com/';
XUtils.setXServerUrl(xServerUrl);

// TODO - v buducnosti presunut do XReactWebLib
function App() {

    const [xToken, setXToken] = useXToken();

    const [initialized, setInitialized] = useState(false);

    // useEffect(() => {
    //     fetchAndSetXEntityMap();
    // },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchAndSetXEntityMap = async () => {
        await XUtilsMetadata.fetchAndSetXEntityMap();
        console.log("App - bol zavolany XUtilsMetadata.fetchAndSetXEntityMap()");
        setInitialized(true);
    }

    let elem;
    if (xToken === null) {
        elem = <div className="App-form"><XLoginForm setXToken={setXToken}/></div>;
    }
    else {
        if (!initialized) {
            elem = <div className="App-form">App is being initialized...</div>;
            fetchAndSetXEntityMap();
        }
        else {
            elem = <XMenu defaultFormElement={<CarBrowse/>} setXToken={setXToken}/>;
        }
    }

    return (
        <div className="App">
            {elem}
        </div>
    );
}

export default App;
