import React from 'react';
import { useHistory } from 'react-router-dom';
import { store as notificationStore } from 'react-notifications-component';
// utils
import { deleteAccount } from '../services/bookings';
import { useGlobalContext } from '../utils/globalContext';
// styles
import 'animate.css/animate.min.css';
import { StyledButtonBox} from './styled/SingleBookingStyles';


const MyDetails = () => {

  let history = useHistory();
  const {store} = useGlobalContext();
  const {userDetails} = store;

  const handleUpdate = () => {
    history.push(`/sign-up`);
  }

  const handleDelete = () => {
    deleteAccount()
      .then(() => {
        history.push('/log-out')
        notificationStore.addNotification({
          title: "Account deleted.",
          message: "Come back soon!",
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000
          }
        });})
      .catch(e => console.log(e))
  }

  return(
    <div>
      <h1>My Contact Details</h1>
      <p>First name: {userDetails.firstName}</p>
      <p>Last name: {userDetails.lastName}</p>
      <p>Phone number: {userDetails.phoneNum}</p>
      <p>Email: {store.loggedInUser}</p>
      <StyledButtonBox>
        <button onClick={handleUpdate}>Update Details</button>
        <button onClick={handleDelete}>Delete Account</button>
      </StyledButtonBox>
    </div>
  )
}

export default MyDetails;