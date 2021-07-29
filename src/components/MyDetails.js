import React from 'react';
import { useHistory } from 'react-router-dom';
import { store as notificationStore } from 'react-notifications-component';
// utils
import { deleteAccount } from '../services/bookings';
import { useGlobalContext } from '../utils/globalContext';
// styles
import { FormDiv } from './styled/FormStyles'
import { StyledButtonBox} from './styled/SingleBookingStyles';


const MyDetails = () => {

  let history = useHistory();
  const {store, dispatch} = useGlobalContext();
  const {userDetails} = store;

  const handleUpdate = () => {
    history.push(`/sign-up`);
  }

  const handleDelete = () => {
    deleteAccount()
      .then(() => {
        dispatch({type:'setError', data: null })
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
        .catch(e => {
          dispatch({type:'setError', data: e.message });
          console.log(e);
        });
  }

  return(
    <FormDiv>
      <h1>My Contact Details</h1>
      <p><b>First name:</b> {userDetails.firstName}</p>
      <p><b>Last name:</b> {userDetails.lastName}</p>
      <p><b>Phone number:</b> {userDetails.phoneNum}</p>
      <p><b>Email:</b> {store.loggedInUser}</p>
      <StyledButtonBox>
        <button onClick={handleUpdate}>Update Details</button>
        <button onClick={handleDelete}>Delete Account</button>
      </StyledButtonBox>
    </FormDiv>
  )
}

export default MyDetails;