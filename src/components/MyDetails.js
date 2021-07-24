import React from 'react'
import { useGlobalContext } from '../utils/globalContext';

const MyDetails = () => {

  const {store} = useGlobalContext();
  const {userDetails} = store;


  return(
    <div>
      <h1>My Contact Details</h1>
      <p>First name: {userDetails.firstName}</p>
      <p>Last name: {userDetails.lastName}</p>
      <p>Phone number: {userDetails.phoneNum}</p>
      <p>Email: {store.loggedInUser}</p>
      <p>Password: **********</p>
      <div>
        <button>Update</button>
        <button>Delete Account</button>
      </div>
    </div>
  )
}

export default MyDetails;