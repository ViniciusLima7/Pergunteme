import firebase from "firebase/app";

import 'firebase/auth';
import 'firebase/database';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_DATABASE_URL,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID
      apiKey: "AIzaSyCeRFF5Oj8gC8jEpg647ygafis3Amxxizk",
      authDomain: "letmeask-ap.firebaseapp.com",
      databaseURL: "https://letmeask-ap-default-rtdb.firebaseio.com",
      projectId: "letmeask-ap",
      storageBucket: "letmeask-ap.appspot.com",
      messagingSenderId: "150307138341",
      appId: "1:150307138341:web:7c5c09f0d3e1faa56d48cc"
   
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const database = firebase.database();

  export {firebase, auth,database}