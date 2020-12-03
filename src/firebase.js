// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyASxPX5A_ALTt34QYD0U4LvfByFeNUFnoQ",
    authDomain: "whatsapp-clone-84825.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-84825.firebaseio.com",
    projectId: "whatsapp-clone-84825",
    storageBucket: "whatsapp-clone-84825.appspot.com",
    messagingSenderId: "352595868862",
    appId: "1:352595868862:web:67b7d4c6deac74a148f2ef",
    measurementId: "G-KL84DPCY6R"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;