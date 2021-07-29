import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// utils
import {reducer} from './utils/reducer';
import { GlobalContext } from './utils/globalContext';
import { getUserBookings, getBookings, getBlockedTimeslots, getTimeslots } from './services/bookings';
// notifications
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
// import 'animate.css/animate.min.css';
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
      isAdmin: sessionStorage.getItem("isAdmin") || "false"
    },
    bookings: JSON.parse(sessionStorage.getItem("bookings")) || [],
    timeslots: {
      available: JSON.parse(sessionStorage.getItem("availableTimeslots")) || [],
      blocked: JSON.parse(sessionStorage.getItem("blockedTimeslots")) || []
    },
    loading: true,
    error: null
  }

  const [store, dispatch] = useReducer(reducer, initialState);

  const { loggedInUser, userDetails, bookings, error } = store;

  console.log(store);

  // pull bookings into the global state

  const getBookingsAsync = async () => {
    try{
      getBookings()
        .then(bookings => {
          sessionStorage.setItem("bookings", JSON.stringify(bookings) )
          dispatch({type: 'setBookings', data: bookings})
          dispatch({type:'setError', data: null })
        })
        .then(() => {
          dispatch({type: "setLoading", data: false})
        })
    } catch(e) {
      dispatch({type: "setError", data: e.message})
    }
  }

  const getUserBookingsAsync = async () => {
    try{
      getUserBookings()
        .then(bookings => {
          sessionStorage.setItem("bookings", JSON.stringify(bookings) )
          dispatch({type: 'setBookings', data: bookings})
          dispatch({type:'setError', data: null })
        });
      dispatch({type: "setLoading", data: false})
    } catch(e) {
      dispatch({type: "setError", data: e.message})
    }
  }

  useEffect( () => {
    if (loggedInUser) {
      if (userDetails.isAdmin == "true") {
        getBookingsAsync();
      } else {
        getUserBookingsAsync();
      }
    }
  }, [loggedInUser, userDetails.isAdmin])

  // get and set blocked timeslots
  useEffect(() => {
    if (loggedInUser) {
      getBlockedTimeslots()
        .then(timeslots => {
          sessionStorage.setItem("blockedTimeslots", JSON.stringify(timeslots) )
            dispatch({
              type: 'setBlockedTimeslots',
              data: timeslots
            })
            dispatch({type:'setError', data: null })
        })
        .catch(e => {
          dispatch({type:'setError', data: e.message });
          console.log(e);
        });
    }
  }, [bookings, loggedInUser])

  // get and set available timeslots
  useEffect(() => {
    if (loggedInUser) {
      getTimeslots()
        .then(timeslots => {
          sessionStorage.setItem("availableTimeslots", JSON.stringify(timeslots) )
            dispatch({
              type: 'setTimeslots',
              data: timeslots
            })
            dispatch({type:'setError', data: null })
        })
        .catch(e => {
          dispatch({type:'setError', data: e.message });
          console.log(e);
        });
    }
  }, [bookings, loggedInUser])

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {error? <p style={{color: "red"} }  >{error}</p> : null}
      <ReactNotification/> 
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
              <Route exact path='/log-in' component={LogIn}></Route>
              <Route exact path='/sign-up' component={SignUp}></Route>
            </Switch>
          </Router>
        </GlobalContext.Provider>
    </div>
  );
}

export default App;
