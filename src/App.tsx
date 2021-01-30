import React, {useState} from 'react';
import './App.css';
import {CarBrowse} from "./forms/CarBrowse";
import {XMenu} from "./XMenu";
import {XUtilsMetadata} from "@michalrakus/x-react-web-lib/XUtilsMetadata";
import {XLoginForm} from "@michalrakus/x-react-web-lib/XLoginForm";
import useXToken from "@michalrakus/x-react-web-lib/lib/components/useXToken";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";

// provizorne takto, musi byt nastavene pred prvym requestom na server
let xServerUrl = process.env.X_SERVER_URL; // pouzivane na heroku
if (xServerUrl == null || xServerUrl == '') {
    xServerUrl = 'http://localhost:8081/';
    //xServerUrl = 'https://x-demo-server.herokuapp.com/';
}
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
        elem = <XLoginForm setXToken={setXToken}/>
    }
    else {
        if (!initialized) {
            elem = <div>App is being initialized...</div>;
            fetchAndSetXEntityMap();
        }
        else {
            elem = <XMenu defaultFormElement={<CarBrowse/>} setXToken={setXToken}/>;
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {elem}
            </header>
        </div>
    );
}

export default App;
