import React from 'react';

//Redux
import store from './store';
import { rrfProps } from './store';
import {Provider} from 'react-redux';
import { ReactReduxFirebaseProvider} from 'react-redux-firebase'

//React Router.
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Protected Routes.
import { UserIsAuthenticated, UserIsNotAuthenticated} from './components/helpers/auth';

//Pages Subscriptors.
import SubscriptorsList from './components/subscriptors/SubscriptorsList';
import EditSubscriptor from './components/subscriptors/EditSubscriptor';
import NewSubscriptor from './components/subscriptors/NewSubscriptor';
import ShowSingleSubscriptor from './components/subscriptors/ShowSingleSubscriptor';

//pages Books.
import BooksList from './components/books/BooksList';
import EditBook from './components/books/EditBook';
import NewBook from './components/books/NewBook';
import ShowBook from './components/books/ShowBook';
import BookLoan from './components/books/BookLoan';

//Others Pages.
import Login from './components/auth/Login';

//Components Layout.
import Navbar from './components/layout/Navbar';

// Setup react-redux so that connect HOC can be used
function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              
              <Route exact path={'/'} component={UserIsAuthenticated(BooksList)} />
              <Route exact path={'/books/show/:id'} component={UserIsAuthenticated(ShowBook)} />
              <Route exact path={'/books/new'} component={UserIsAuthenticated(NewBook)} />
              <Route exact path={'/books/edit/:id'} component={UserIsAuthenticated(EditBook)} />
              <Route exact path={'/books/loan/:id'} component={UserIsAuthenticated(BookLoan)} />

              <Route exact path={'/subscriptors'} component={UserIsAuthenticated(SubscriptorsList)} />
              <Route exact path={'/subscriptors/show/:id'} component={UserIsAuthenticated(ShowSingleSubscriptor)} />
              <Route exact path={'/subscriptors/new'} component={UserIsAuthenticated(NewSubscriptor)} />
              <Route exact path={'/subscriptors/edit/:id'} component={UserIsAuthenticated(EditSubscriptor)} />
              <Route exact path={'/login'} component={UserIsNotAuthenticated(Login)} />

            </Switch>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
