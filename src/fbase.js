import * as fire_app from "firebase/app";
import * as fire_auth from "firebase/auth"
import * as fire_store from "firebase/firestore"
import * as fire_storage from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSGING_SENDERID,
    appId: process.env.REACT_APP_APP_ID
};
fire_app.initializeApp(firebaseConfig);

export const getApp = fire_app;
export const store = fire_store;
export const auth = fire_auth;
export const fstorage = fire_storage;
