import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyAgJ52USGasT-1ylYdq4qSRZ-dtASAdJWc",
  authDomain: "spicyfoodrestorent.firebaseapp.com",
  databaseURL: "https://spicyfoodrestorent.firebaseio.com",
  projectId: "spicyfoodrestorent",
  storageBucket: "",
  messagingSenderId: "238422512270",
  appId: "1:238422512270:web:7b1623ba8a013e3f6e2fdf"
};
 const firebaseApp = firebase.initializeApp(firebaseConfig);

export {
  firebaseApp
}  