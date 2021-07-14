import React from "react";
import { NavLink } from "react-router-dom";
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';

const Nav = () => {
  return(
    <nav>
      <AccountBoxRoundedIcon style={{fontSize:"2.5rem" }} />
      <ul>
        <li><NavLink exact to="/new"> Create Booking </NavLink></li>
        <li><NavLink exact to="/bookings"> My Bookings </NavLink></li>
        <li><NavLink exact to="/details"> My Details </NavLink></li>
        <li><NavLink exact to="/availability"> My Availability </NavLink></li>
        <li><NavLink exact to="/clients"> My Clients </NavLink></li>
        <li><NavLink exact to="/sign-out"> Log Out </NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav;