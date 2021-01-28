import firebase from "firebase/app"
import {auth} from "firebaseui";


declare global {
    export interface Window {
        puppeteer:any,
        user:firebase.User,
        firebase:firebase.app.App,
        firebaseAuthUi:auth.AuthUI
        firestore:firebase.firestore.Firestore
        auth:firebase.auth.Auth
        api: {
            get:typeof get,
            post:typeof post,
            put: typeof put,
            del: typeof del,
            createCrud: typeof createCrud,
        }
        random:(min:number,max:number) => number
    }
}

