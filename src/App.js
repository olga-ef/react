import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Movies from './components/movies.jsx';
import NavBar from './components/common/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import { getCurrentUser } from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state ={};

  componentDidMount () {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
   const { user } = this.state;
    return (
      <main className="container">
      <ToastContainer />
      	<NavBar user={user} />
      	<div className="content">
      		<Switch>
      			<Route path="/register" component={RegisterForm} />
      			<Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
      			<ProtectedRoute 
              path="/movies/:id"
              component={MovieForm} 
            />
      			<Route path="/customers" component={Customers} />
      			<Route path="/rentals" component={Rentals} />
      			<Route path="/movies" render={props => <Movies {...props} user={this.state.user} />} />
      			<Route path="/not-found" component={NotFound} />
      			<Redirect from="/" exact to="/movies" />
      			<Redirect to="/not-found" />
      			<Redirect from="movies/:id" to="/not-found" />			
      		</Switch>
      	</div>
      </main>
    );
  }
}

export default App;
