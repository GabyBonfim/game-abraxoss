import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyAJyjJIqHolAtB8REu8hSUR2WR-1hF8Ycs",
    authDomain: "app-aelin.firebaseapp.com",
    databaseURL: "https://app-aelin-default-rtdb.firebaseio.com",
    projectId: "app-aelin",
    storageBucket: "app-aelin.firebasestorage.app",
    messagingSenderId: "354581622250",
    appId: "1:354581622250:web:9ac2a57e21111bb465d693"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase inicializado");
}

export const auth = firebase.auth();
export const db = firebase.database();
export default firebase;
