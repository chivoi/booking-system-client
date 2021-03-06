import React, {useState, useEffect} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import { store as notificationStore } from 'react-notifications-component';
// utils
import {getBooking, getSingleTimeslot, getSingleClient, deleteBooking} from '../services/bookings';
import {useGlobalContext} from '../utils/globalContext';
import {formatDate} from '../utils/helpers';
// styles
import { StyledButtonBox, Container } from './styled/SingleBookingStyles';

const SingleBooking = () => {
  const [booking, setBooking] = useState({});
  const {id} = useParams();
  const [timeslot, setTimeslot] = useState("");
  const [client, setClient] = useState("");
  let history = useHistory();
  const {store, dispatch} = useGlobalContext();
  const {userDetails} = store;

  useEffect(() => {
    getBooking(id)
      .then(booking => {
        setBooking(booking);
        dispatch({type:'setError', data: null });
      })
      .catch(e => {
        dispatch({type:'setError', data: e.message });
        console.log(e);
      });
  },[id])

  
  useEffect(() => {
    getSingleTimeslot(booking.timeslot_id)
    .then(timeslot => {
      console.log(timeslot)
      setTimeslot(timeslot)
    })
    .catch(e => {
      console.log(e);
    });
  }, [booking])
  
  useEffect(() => {
    if (userDetails.isAdmin == "true") {
      getSingleClient(booking.user_id)
      .then(client => setClient(client) )
      .catch(e => {
        console.log(e);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking])

  const handleDelete = () => {
    deleteBooking(id)
      .then(() => {
        dispatch({type: "deleteBooking", data: id})
        dispatch({type:'setError', data: null })
        history.push('/bookings')
        notificationStore.addNotification({
          title: "Success",
          message: "Booking deleted!",
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {duration: 2000}
        })
      })
      .catch(e => {
        dispatch({type:'setError', data: e.message });
        console.log(e);
      });
  }

  console.log(notificationStore)

  if (!booking) return null;
  if (!timeslot) return null;
  // if (!client) return null;

  return(
    <Container>
      <h1>{booking.venue}, {formatDate(timeslot.date)}</h1>
      <Link to='/bookings' style={{fontSize: "1.3rem" } }>Back to My Bookings</Link>
      <div>
        {userDetails.isAdmin === "true" && <p><b>Made by:</b> {client.first_name} {client.last_name}</p>}
        <p><b>Timeslot:</b> {formatDate(timeslot.date)}, {timeslot.half_day === 1 ? "08:00 - 16:00" : "17:00 - 23:00"} </p>
        <p> <b>Venue:</b> {booking.venue}</p>
        <p> <b>Address:</b> {booking.address}</p>
        {/* <p>Event type: {capitalize(booking.event_type)}</p> */}
        <p> <b>Start time:</b> {booking.start_time}</p>
        <p> <b>Set duration:</b> {booking.duration} min</p>
        <p> <b>PA Provided:</b> {booking.pa_provided ? "Yes" : "No"}</p>
      </div>
      <div>
        <p> <b>Message:</b> </p>
        <div>{booking.message}</div>
      </div>
      <StyledButtonBox>
       {userDetails.isAdmin == "false" && <button onClick={()=> history.push(`/bookings/update/${id}`)} >Update</button>}
        <button onClick={handleDelete}>Delete</button>
      </StyledButtonBox>
    </Container>
  )
}

export default SingleBooking;