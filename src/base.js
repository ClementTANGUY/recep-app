import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBMH-4mEsM25qLJ9kjba67pefYZad9yMnk',
  authDomain: 'recep-app.firebaseapp.com',
  databaseURL: 'https://recep-app.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
