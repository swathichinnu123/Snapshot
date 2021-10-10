import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBqmoiCSumo5fCyas9OKm42yaBA5u90If8",
    authDomain: "snapchat-clone-f5cd3.firebaseapp.com",
    projectId: "snapchat-clone-f5cd3",
    storageBucket: "snapchat-clone-f5cd3.appspot.com",
    messagingSenderId: "497142556928",
    appId: "1:497142556928:web:0dcab264042f120f486be5"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export { db , auth , storage , provider };