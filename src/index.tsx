import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login";
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import * as firebaseui from "firebaseui";
import {get,post,put,del,createCrud} from "./api";
import firebaseConfig from "./firebaseConfig";

declare global {
    interface Window {
        puppeteer:any,
        user:firebase.User,
        firebase:firebase.app.App,
        firebaseAuthUi:firebaseui.auth.AuthUI
        firestore:firebase.firestore.Firestore
        auth:firebase.auth.Auth
        api: {
            get:typeof get,
            post:typeof post,
            put: typeof put,
            del: typeof del,
            createCrud: typeof createCrud,
        }
    }
}


function initFirebase(){
    if (!firebase.apps.length){
        return firebase.initializeApp(firebaseConfig);
    } else {
        return firebase.app()
    }
}

function initFirebaseAuthUi(){
    return new firebaseui.auth.AuthUI(window.firebase.auth());
}

initFirebase()

window.puppeteer = {};
(window.firebase as firebase.app.App) = initFirebase()
window.firebaseAuthUi = initFirebaseAuthUi();
window.firestore = window.firebase.firestore()
window.api = {
    get,post,put,del,createCrud
}
window.auth = window.firebase.auth()



ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//const channelSnkrs = f => Array.isArray(f.productInfo) && f.productInfo.filter(m => m.merchProduct.channels[0] === "SNKRS").length > 0
