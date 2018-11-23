import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: 'AIzaSyC7ATI2v4QiWcWUePYlUmoMK4ZnkdE1c6Q',
  authDomain: 'mayappca.firebaseapp.com ',
  databaseURL: 'https://mayappca.firebaseio.com',
  projectId: 'mayappca',
  storageBucket: 'your-app.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
};

const devConfig = {
  apiKey: 'AIzaSyC7ATI2v4QiWcWUePYlUmoMK4ZnkdE1c6Q',
  authDomain: 'mayappca.firebaseapp.com ',
  databaseURL: 'https://mayappca.firebaseio.com',
  projectId: 'mayappca',
  storageBucket: 'your-app.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { auth, db };
