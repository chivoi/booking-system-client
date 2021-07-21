import React, {useEffect} from 'react';
import { logOut } from '../../services/auth';
import { useUserContext } from '../../utils/userContext';
// utils
import { capitalize } from '../../utils/helpers';

const LogOut = () => {
  const { store, dispatch } = useUserContext();

  useEffect( ()=>{
    logOut();
    const clearStore = store => {
      for (let i in store){
        let action = "set".concat(capitalize(i).split(" ").join(""));
        dispatch({
          type: action,
          data: ""})
      }
    }
    clearStore(store);
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