import React, {useEffect} from 'react';
import { logOut } from '../../services/auth';
import { useGlobalContext } from '../../utils/globalContext';

const LogOut = () => {
  const { dispatch } = useGlobalContext();

  useEffect( ()=>{
    logOut();
    dispatch({ type: "setLoggedInUser", data: ""})
    dispatch({ type: "setToken", data: ""})
    dispatch({ type: "setFirstName", data: ""})
    dispatch({ type: "setLastName", data: ""})
    dispatch({ type: "setPhoneNum", data: ""})
    dispatch({ type: "setIsAdmin", data: ""})
    dispatch({ type: "setBookings", data: []})
    dispatch({ type: "setTimeslots", data: []})
    dispatch({ type: "setBlockedTimeslots", data: []})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  return(
    <>
      <h1>Logged out!</h1>
      <p>Back to the website</p>
    </>
  )
}

export default LogOut;