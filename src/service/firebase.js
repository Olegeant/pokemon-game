import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCmvcufTKNxMfDDoXdR7Nn_vkSfNRJr22A',
  authDomain: 'pokemon-game-23b5e.firebaseapp.com',
  databaseURL: 'https://pokemon-game-23b5e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pokemon-game-23b5e',
  storageBucket: 'pokemon-game-23b5e.appspot.com',
  messagingSenderId: '276618513910',
  appId: '1:276618513910:web:aa835fda2e0283f25acbd7',
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = firebase.database();

export default database;
