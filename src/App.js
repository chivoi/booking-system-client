import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// utils
import {reducer} from './utils/reducer';
import { GlobalContext } from './utils/globalContext';
// styles
import './App.css';
// components
import Nav from './components/Nav'
import NewBooking from './components/NewBooking'
import MyBookings from './components/MyBookings'
import SingleBooking from './components/SingleBooking'
import MyDetails from './components/MyDetails'
import Availability from './components/Availability'
import Clients  from './components/MyClients'
import ClientCard  from './components/my-clients/ClientCard'
import LogIn from './components/auth/LogIn'
import SignUp from './components/auth/SignUp'
import LogOut from './components/auth/LogOut'

function App() {

  const [anchorEl, setAnchorEl] = useState(null);
  
  const initialState = {
    loggedInUser: sessionStorage.getItem("email") || "",
    auth: {
      token: sessionStorage.getItem("token") || ""
    },
    userDetails: {
      firstName: sessionStorage.getItem("firstName") || "",
      lastName: sessionStorage.getItem("lastName") || "",
      phoneNum: sessionStorage.getItem("phoneNum") || "",
      isAdmin: sessionStorage.getItem("isAdmin") || false
    },
    bookings: []
  }

  const [store, dispatch] = useReducer(reducer, initialState);

  const { loggedInUser } = store;

  console.log(store);

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <GlobalContext.Provider value={{store,dispatch}}>
        <Router>
          <Nav anchorEl={anchorEl} handleMenuClick={handleMenuClick} handleMenuClose={handleMenuClose} />
          <Switch>
            <Route exact path="/" 
              render = {props => (loggedInUser ? <MyBookings /> : <LogIn />)} />
            <Route exact path="/new" render={props => <NewBooking />} />
            <Route exact path="/bookings" render={props => <MyBookings />} />
            <Route exact path="/bookings/:id" component={SingleBooking} />
            <Route exact path="/bookings/update/:id" component={NewBooking} />
            <Route exact path="/details" render={props => <MyDetails />} />
            <Route exact path="/log-out" render={props => <LogOut />} />
            <Route exact path="/availability" render={props => <Availability />} />
            <Route exact path="/clients" render={props => <Clients />} />
            <Route exact path="/clients/:id" render={props => <ClientCard />} />
            <Route exact path='/log-in' component={LogIn}></Route>
						<Route exact path='/sign-up' component={SignUp}></Route>
          </Switch>
        </Router>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
