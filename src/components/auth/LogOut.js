import React, {useEffect} from 'react';
import { logOut } from '../../services/auth';
import { useUserContext } from '../../utils/userContext';
// utils
import { capitalize } from '../../utils/helpers';

const LogOut = () => {
  const { store, dispatch } = useUserContext();

  useEffect( ()=>{
    logOut();
    for (let i in store){
      let action = "set".concat(capitalize(i).split(" ").join(""));
      dispatch({
        type: action,
        data: ""})
    }
  },[store]) 

  return(
    <>
      <h1>Logged out!</h1>
      <p>Back to the website</p>
    </>
  )
}

export default LogOut;