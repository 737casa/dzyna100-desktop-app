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
import vm from "vm";


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

function random(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.puppeteer = {};
(window.firebase as firebase.app.App) = initFirebase()
window.firebaseAuthUi = initFirebaseAuthUi();
window.firestore = window.firebase.firestore()
window.api = {
    get,post,put,del,createCrud
}
window.auth = window.firebase.auth()
window.random = {
    number:random,
    bool:() => random(0,100) > 50
}

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
