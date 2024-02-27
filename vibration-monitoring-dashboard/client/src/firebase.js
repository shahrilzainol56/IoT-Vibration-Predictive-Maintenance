import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAsRQliLnyMKy_SAZ2n9zn1YQLCatMi0Fg",
  authDomain: "vibrationmonitoring-c1079.firebaseapp.com",
  databaseURL:
    "https://vibrationmonitoring-c1079-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vibrationmonitoring-c1079",
  storageBucket: "vibrationmonitoring-c1079.appspot.com",
  messagingSenderId: "610326019121",
  appId: "1:610326019121:web:8c2806d35f09cd5eeee910",
  measurementId: "G-HPYS5SD7F7",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
