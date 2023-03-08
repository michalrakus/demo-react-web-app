import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Auth0Provider} from "@auth0/auth0-react";
import AppAuth0 from "./AppAuth0";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";
import {XEnvVar, XReactAppAuth} from "@michalrakus/x-react-web-lib/XEnvVars";

XUtils.setXBackendUrl(XUtils.getEnvVarValue(XEnvVar.REACT_APP_BACKEND_URL));

let rootElem: any;
if (XUtils.getEnvVarValue(XEnvVar.REACT_APP_AUTH) === XReactAppAuth.LOCAL) {
    /* username/password authentication
    rootElem =
        <React.StrictMode>
            <AppLocal />
        </React.StrictMode>;
     */
}

if (XUtils.getEnvVarValue(XEnvVar.REACT_APP_AUTH) === XReactAppAuth.AUTH0) {
    // na fungovanie klienta stacili domain, clientId, redirectUri - tak som nechal len tie
    // a este som sem pridal audience (id-cko backend-u) aby pri prihlasovani pytal suhlas na scope "profile"
    // (bez toho pri getAccessTokenSilently vrati chybu "Consent required", v doku sa pise: user cannot provide consent during a non-interactive flow (like getAccessTokenSilently))
    // scope "profile" je pravdepodobne defaultny scope ktory sa vzdy vyzaduje
    // tu su dalsie atributy, ktore tu boli zapisane (audience, scope sa daju zapisat pri zavolani getAccessTokenSilently)
    // responseType="token id_token"
    // scope="openid profile admin:demo try:demo"
    rootElem =
        <Auth0Provider
            domain={XUtils.getEnvVarValue(XEnvVar.REACT_APP_AUTH0_DOMAIN)}
            clientId={XUtils.getEnvVarValue(XEnvVar.REACT_APP_AUTH0_CLIENT_ID)}
            redirectUri={window.location.origin}
            audience={XUtils.getEnvVarValue(XEnvVar.REACT_APP_AUTH0_AUDIENCE)}>
            <AppAuth0/>
        </Auth0Provider>;
}

ReactDOM.render(rootElem, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
