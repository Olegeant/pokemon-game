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

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = cb => {
    this.database.ref('pokemons').on('value', snapshot => {
      cb(snapshot.val());
    });
  };

  offPokemonSoket = () => {
    this.database.ref('pokemons').off();
  };

  getPokemonsOnce = async () => {
    return await this.database
      .ref('pokemons')
      .once('value')
      .then(snapshot => snapshot.val());
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;

    this.database.ref('pokemons/' + newKey).set(data);
    // .then(() => cb());
  };
}

const FirebaseClass = new Firebase();

export default FirebaseClass;
