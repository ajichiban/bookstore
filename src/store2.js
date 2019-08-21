//firebase..
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

//Redux..
import { createStore, combineReducers, compose } from 'redux';
import { reduxFirestore, getFirestore , firestoreReducer} from 'redux-firestore';
import thunk from 'redux-thunk';

// Configurar firestore.
const firebaseConfig = {
  apiKey: "AIzaSyCfr5dD554m2E_w8zF27-u9cbzVfqtOKgU",
  authDomain: "bookstore-e50c3.firebaseapp.com",
  databaseURL: "https://bookstore-e50c3.firebaseio.com",
  projectId: "bookstore-e50c3",
  storageBucket: "bookstore-e50c3.appspot.com",
  messagingSenderId: "812070300539",
  appId: "1:812070300539:web:d85e4c252cf34b58"
}
firebase.initializeApp(firebaseConfig)
// Initialize Cloud Firestore through Firebase
firebase.firestore();

// configuracion de react-redux-firebase.
const rfConfig = {
	userProfile : 'users',
	useFirestoreForProfile: true
}

const createStoreWithFirebase = compose(
  reduxFirestore(firebase), // firebase instance as first argument, rfConfig as optional second
)(createStore)

// Reducers...
const rootReducer = combineReducers({
	firestore: firestoreReducer
})
// Create store with reducers and initial state
const initialState = {}
/*const store = createStoreWithFirebase(rootReducer, initialState)*/

const store = createStoreWithFirebase(rootReducer, initialState, compose(
	/*reactReduxFirebase(firebase),*/
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
/*const Store = createStore(rootReducer, compose(
applyMiddleware(thunk.withExtraArgument({getFirestore})),
reduxFirestore(firebase)
))*/
