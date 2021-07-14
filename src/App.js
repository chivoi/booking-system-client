import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <>
      <Router>
        <Nav/>
        <Switch>
          <Route exact path="/new" render={props => <NewBooking />} />
          <Route exact path="/bookings" render={props => <MyBookings />} />
          <Route exact path="/bookings/:id" render={props => <SingleBooking />} />
          <Route exact path="/details" render={props => <MyDetails />} />
          <Route exact path="/sign-out" render={props => <LogIn />} />
          <Route exact path="/availability" render={props => <Availability />} />
          <Route exact path="/clients" render={props => <Clients />} />
          <Route exact path="/clients/:id" render={props => <ClientCard />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
