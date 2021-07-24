import React, {useState, useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import Moment from 'react-moment';
import {getBooking} from '../services/bookings';
import {useGlobalState} from '../utils/globalContext';
import {deleteBooking} from '../services/bookings';

const SingleBooking = () => {
  const [booking, setBooking] = useState({});
  const {id} = useParams;
  let history = useHistory();
  const {store, dispatch} = useGlobalState;
  const {loggedInUser} = store;

  useEffect(() => {
    getBooking(id)
      .then(booking => setBooking(booking))
      .catch(e => console.log(e))
  },[id])

  if (!booking) return null;

  const handleDelete = () => {
    deleteBooking(id)
      .then(() => {
        dispatch({type: "deleteBooking", data: id})
        history.push('/bookings')
      })
  }

  return(
    <div>
      <h1>{booking.venue}</h1>
      <p>Back to My Bookings</p>
      <div>
        <p>Timeslot: </p>
        <p>Venue: {booking.venue}</p>
        <p>Address: {booking.address}</p>
        <p>Event type: {booking.event_type}</p>
        <p>Start time: {booking.start_time}</p>
        <p>Set duration: {booking.set_duration}</p>
        <p>PA Provided: {booking.pa_provided}</p>
      </div>
      <div>
        <p>Message:</p>
        <div>{booking.message}</div>
      </div>
    </div>
  )
}

export default SingleBooking;