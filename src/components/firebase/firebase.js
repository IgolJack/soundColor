import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD2bFypMTS-hY_JPqoLlLS--ptIPyTl6xY",
    authDomain: "olia-b5a1d.firebaseapp.com",
    databaseURL: "https://olia-b5a1d.firebaseio.com",
    projectId: "olia-b5a1d",
    storageBucket: "olia-b5a1d.appspot.com",
    messagingSenderId: "306001944130",
    appId: "1:306001944130:web:20e1e92e10352f47cc97db",
    measurementId: "G-HCX2XNT8DH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()

export default firebase