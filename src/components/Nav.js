import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../utils/userContext";
import { Button, Menu, MenuItem } from "@material-ui/core";
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
// styled
import { StyledNav, StyledNavP } from "./styled/StyledNav";

const Nav = ({anchorEl, handleMenuClick, handleMenuClose}) => {

  const store = useUserContext();

  const {loggedInUser, isAdmin} = store.store;

  return(
    <StyledNav>
      {loggedInUser && !isAdmin && 
        <StyledNavP><NavLink exact to="/new"> Create Booking </NavLink></StyledNavP>}
      {loggedInUser && isAdmin &&
          <StyledNavP><NavLink exact to="/availability"> My Availability </NavLink></StyledNavP>}
      <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
      <AccountBoxRoundedIcon style={{fontSize:"3rem" }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {loggedInUser && 
          <div>
            <MenuItem onClick={handleMenuClose}>Logged in as: {loggedInUser} </MenuItem> 
            <MenuItem onClick={handleMenuClose}><NavLink exact to="/bookings"> My Bookings </NavLink></MenuItem>
            <MenuItem onClick={handleMenuClose}><NavLink exact to="/details"> My Details </NavLink></MenuItem>
            <MenuItem onClick={handleMenuClose}><NavLink exact to="/clients"> My Clients </NavLink></MenuItem>
            <MenuItem onClick={handleMenuClose}><NavLink exact to="/log-out"> Log Out </NavLink></MenuItem>
          </div>
        }
        {!loggedInUser && 
          <div>
            <MenuItem onClick={handleMenuClose}><NavLink exact to="/log-in">Log In</NavLink></MenuItem>
            <MenuItem onClick={handleMenuClose}><NavLink exact to="/sign-up">Sign Up</NavLink></MenuItem>
          </div>
        } 
      </Menu>
    </div>
    </StyledNav>
  )
}

export default Nav;