import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Navigation from './components/Navigation';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Home from './components/Home';
import About from './components/About';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

import './styles.css';

export default function App() {
  const [user, setUser] = useState({});
  let history = useHistory();

  // Check if user info is in local storage
  useEffect(() => {
    try {
      const jwt = localStorage.getItem('token');
      const decoded = jwt_decode(jwt);
      console.log(decoded);
      setUser(decoded);
      history.replace('/');
    } catch (err) {}
  }, [history]);

  return user.firstName ? (
    <React.Fragment>
      <div className="page-container">
        <div className="content-wrap">
          <Navigation user={user} />
          <main role="main" className="container-fluid mt-2">
            <Switch>
              <Route path="/products/:id" component={ProductDetails} />
              <Route path="/products" component={Products} />
              <Route path="/about" component={About} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" component={Home} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  ) : (
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
      <Redirect to="/login" />
    </Switch>
  );
}
