import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

import Todos from './Todo';

const fbConfig = {
    apiKey: "<AIzaSyCfr5dD554m2E_w8zF27-u9cbzVfqtOKgU></AIzaSyCfr5dD554m2E_w8zF27-u9cbzVfqtOKgU>",
    authDomain: "bookstore-e50c3.firebaseapp.com",
    databaseURL: "https://bookstore-e50c3.firebaseio.com",
    projectId: "bookstore-e50c3",
    storageBucket: "bookstore-e50c3.appspot.com",
    messagingSenderId: "812070300539",
    appId: "1:812070300539:web:d85e4c252cf34b58"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

// Setup react-redux so that connect HOC can be used
const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Todos />
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default App;