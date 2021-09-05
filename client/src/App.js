import React, { useEffect } from 'react';
import './App.css';
import Header from './Header' ; 
import Home from './Home';
import Login from './Login';
import Checkout from './Checkout';
import Orders from './Orders'; 
import { BrowserRouter as Router, Switch, Route } 
from "react-router-dom";
 
import { useStateValue } from './StateProvider'
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
 

// stripe publishable key goin in as string, public key doesn't need to be hidden
 const promise = loadStripe('pk_test_51JGxmXHTdBxpkhj0KeRb8pnLW7ppwGX9q0fRA67NZjvGFvQUwnsycrNqbjWxQORLebayCADCb1g8EhEVfuUB9BUb00AUnbQ3BV');

function App() {
  
  // create listener that keeps track which users are logged in when the app loads
  const [{}, dispatch] = useStateValue(); 
  const [verification, setVerification] = useStateValue(false)

  // useEffect(() => {
  //   // will only run once with the component loads because no addition arguments are added
  //   // add client side authentication
  //   auth.onAuthStateChanged(authUser => {
  //     console.log('The User Is >>>', authUser);

  //     if(authUser) {
  //       // the user just logged in/ was logged in
  //       dispatch({
  //         type: 'SET_USER', 
  //         user: authUser
  //       })
  //     }
  //     else {
  //       // the user was logged out
  //       dispatch({
  //         type: 'SET_USER', 
  //         user: null
  //       })
  //     }
  //   })
  // }, [])

 

  return (

    // BEM
    <Router>
      <div className="app">
        {/* render sticky header or other component regardless of route */}
        {/* render components depending on the route */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route> 
          <Route path="/orders">
            <Orders />
          </Route> 
          <Route path="/checkout">
            <Header  />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header  />
            {/* hoc for stripe functionality */}
            <Elements stripe={promise}>
              <Payment /> 
            </Elements>
          </Route>  
          {/* default route at the bottom */}
          <Route path="/">
            <Header  />
            <Home /> 
          </Route>
        </Switch>
      </div>
    </Router>
   
  );
}

export default App;
