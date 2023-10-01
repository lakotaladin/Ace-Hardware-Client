import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIahxCv7R2MwUhH5dng1F4bRWGpN2R7vc",
  authDomain: "ace-hardware-clone.firebaseapp.com",
  projectId: "ace-hardware-clone",
  storageBucket: "ace-hardware-clone.appspot.com",
  messagingSenderId: "867660256599",
  appId: "1:867660256599:web:c2cbed9cb9f1c6d3459a12",
  measurementId: "G-QRKGH1M6T2"
};


// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
