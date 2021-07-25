import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteAccount } from '../services/bookings';
import { useGlobalContext } from '../utils/globalContext';

const MyDetails = () => {

  let history = useHistory();
  const {store} = useGlobalContext();
  const {userDetails} = store;

  const handleUpdate = () => {
    history.push(`/sign-up`);
  }

  // const handleDelete = () => {
  //   deleteAccount()
  //     .then(() => {history.push('/log-out')})
  //     .catch(e => console.log(e))
  //   return(<div> "The account has been deleted"</div>)
  // }


  return(
    <div>
      <h1>My Contact Details</h1>
      <p>First name: {userDetails.firstName}</p>
      <p>Last name: {userDetails.lastName}</p>
      <p>Phone number: {userDetails.phoneNum}</p>
      <p>Email: {store.loggedInUser}</p>
      <div>
        <button onClick={handleUpdate}>Update Details</button>
        {/* <button onClick={handleDelete}>Delete Account</button> */}
      </div>
    </div>
  )
}

export default MyDetails;