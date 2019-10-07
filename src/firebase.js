import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCDdrlJNrMYv8SylQq8D8E9c0dSMAiCcj8",
    authDomain: "react-slack-clone-66350.firebaseapp.com",
    databaseURL: "https://react-slack-clone-66350.firebaseio.com",
    projectId: "react-slack-clone-66350",
    storageBucket: "react-slack-clone-66350.appspot.com",
    messagingSenderId: "200600593909",
    appId: "1:200600593909:web:076e9a48530a059b942cbc",
    measurementId: "G-XTQP3M861X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;