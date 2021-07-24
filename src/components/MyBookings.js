import React from 'react'
import { useGlobalContext } from '../utils/globalContext';
import { formatDate, capitalize } from '../utils/helpers';

const MyBookings = ({blockedTimeslots} ) => {

  const {store} = useGlobalContext();

  // console.log("from MyBookings");
  // console.log(blockedTimeslots);

  const findBlockedTimeslotById = id => {  
    const timeslot =  blockedTimeslots.find(timeslot => timeslot.id === id)
    return formatDate(timeslot.date);
  }

  return(
    <>
      <h1>My Bookings</h1>
      <p>Show all / Show future bookings/ Show past bookings</p>
      <div>
        {store.bookings.map(booking => {
          return <div key={booking.id}>{findBlockedTimeslotById(booking.timeslot_id) }, {booking.venue} - {capitalize(booking.event_type) }, {booking.duration} min</div>
        })}
      </div>
    </>
  )
}

export default MyBookings;