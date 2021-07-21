import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// utils
import {reducer} from './utils/reducer';
import { UserContext } from './utils/userContext';
// styles
import './App.css';
// components
import Nav from './components/Nav'
import NewBooking from './components/NewBooking'
import MyBookings from './components/MyBookings'
import SingleBooking from './components/SingleBooking'
import MyDetails from './components/MyDetails'
import Availability from './components/Availability'
import Clients  from './components/my-clients/index'
import ClientCard  from './components/my-clients/ClientCard'
import LogIn from './components/auth/LogIn'
import SignUp from './components/auth/SignUp'
import LogOut from './components/auth/LogOut'

function App() {
  
  const initialState = {
    anchorEl: null,
    loggedInUser: sessionStorage.getItem("email") || "",
    auth: {
      token: sessionStorage.getItem("token") || ""
    },
    booking: {
      date: null,
      timeslot: null,
      venue: null,
      address: null,
      eventType: null,
      startTime: null,
      setDuration: null,
      paProvided: null,
      message: null
    },
    userDetails: {
      firstName: sessionStorage.getItem("firstName") || "",
      lastName: sessionStorage.getItem("lastName") || "",
      phoneNum: sessionStorage.getItem("phoneNum") || "",
      isAdmin: false
    },
    bookings: []
  }

  const [store, dispatch] = useReducer(reducer, initialState);

  const { anchorEl, loggedInUser } = store;

  // debugging

  // const formData = { date, timeslot, venue, address, eventType, startTime, setDuration, paProvided, message };

  console.log(store);

  const handleMenuClick = (event) => {
    dispatch({
      type: "setAnchorEl",
      data: event.currentTarget,
    });
  };
  
  const handleMenuClose = () => {
    dispatch({
      type: "setAnchorEl",
      data: null,
    });
  };

  return (
    <>
      <UserContext.Provider value={{store,dispatch}}>
        <Router>
          <Nav anchorEl={anchorEl} handleMenuClick={handleMenuClick} handleMenuClose={handleMenuClose} />
          <Switch>
            <Route exact path="/" 
              render = {props => (loggedInUser ? <MyBookings /> : <LogIn />)} />
            <Route exact path="/new" render={props => <NewBooking />} />
            <Route exact path="/bookings" render={props => <MyBookings />} />
            <Route exact path="/bookings/:id" render={props => <SingleBooking />} />
            <Route exact path="/details" render={props => <MyDetails />} />
            <Route exact path="/log-out" render={props => <LogOut />} />
            <Route exact path="/availability" render={props => <Availability />} />
            <Route exact path="/clients" render={props => <Clients />} />
            <Route exact path="/clients/:id" render={props => <ClientCard />} />
            <Route exact path='/log-in' component={LogIn}></Route>
						<Route exact path='/sign-up' component={SignUp}></Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
