const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = { 
  apiKey: "AIzaSyBYCzQR3r_DGyT9pV-iNTMlDA2aGOvNR_k",
  authDomain: "final-95290.firebaseapp.com",
  projectId: "final-95290",
  storageBucket: "final-95290.appspot.com",
  messagingSenderId: "571967534209",
  appId: "1:571967534209:web:670ce6ec02e9b0a3e24980"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase