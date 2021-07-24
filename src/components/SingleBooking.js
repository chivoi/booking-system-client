import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {getBooking, getSingleTimeslot, getSingleClient} from '../services/bookings';
import {deleteBooking} from '../services/bookings';
// utils
import {useGlobalContext} from '../utils/globalContext';
import {formatDate, capitalize} from '../utils/helpers';

const SingleBooking = () => {
  const [booking, setBooking] = useState({});
  const {id} = useParams();
  const [timeslot, setTimeslot] = useState("");
  const [client, setClient] = useState("");
  // let history = useHistory();
  // const {store, dispatch} = useGlobalContext;
  // const {loggedInUser} = store;

  useEffect(() => {
    getBooking(id)
      .then(booking => setBooking(booking))
      .catch(e => console.log(e))
  },[id])

  
  useEffect(() => {
    getSingleTimeslot(booking.timeslot_id)
    .then(timeslot => setTimeslot(timeslot) )
    .catch(e => console.log(e))
  }, [booking])
  
  useEffect(() => {
    getSingleClient(booking.user_id)
    .then(client => setClient(client) )
    .catch(e => console.log(e))
  }, [booking])

  // console.log(booking);
  // console.log(timeslot);
  // console.log(client);

  if (!booking) return null;
  if (!timeslot) return null;
  if (!client) return null;

  // const handleDelete = () => {
  //   deleteBooking(id)
  //     .then(() => {
  //       dispatch({type: "deleteBooking", data: id})
  //       history.push('/bookings')
  //     })
  // }

  return(
    <div>
      <h1>{booking.venue}, {formatDate(timeslot.date)}</h1>
      <p>Back to My Bookings</p>
      <div>
        <p>Made by: {client.first_name} {client.last_name}</p>
        <p>Timeslot: {formatDate(timeslot.date)}, {timeslot.half_day === 1 ? "08:00 - 16:00" : "17:00 - 23:00"} </p>
        <p>Venue: {booking.venue}</p>
        <p>Address: {booking.address}</p>
        {/* <p>Event type: {capitalize(booking.event_type)}</p> */}
        <p>Start time: {booking.start_time}</p>
        <p>Set duration: {booking.duration} min</p>
        <p>PA Provided: {booking.pa_provided ? "Yes" : "No"}</p>
      </div>
      <div>
        <p>Message:</p>
        <div>{booking.message}</div>
      </div>
    </div>
  )
}

export default SingleBooking;