import * as firebase from "firebase/app";
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfSYaDZoig3PAeKlniV5pZw1dgvDaoAhg",
  authDomain: "balanced-plate.firebaseapp.com",
  databaseURL: "https://balanced-plate-default-rtdb.firebaseio.com/",
  projectId: "balanced-plate",
  storageBucket: "balanced-plate.appspot.com",
  messagingSenderId: "605648638614",
  appId: "1:605648638614:web:2c633343c661c15ca968b7",
  measurementId: "G-0GKL6DMD4L",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
