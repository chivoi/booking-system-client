import React from 'react'
import { useGlobalContext } from '../utils/globalContext';

const MyBookings = () => {

  const {store} = useGlobalContext();

  // get timeslots for displayed bookings from the table
  // display date from the timeslot based on timeslot_id in the booking
  // figure out how to display in columns

  console.log(store.bookings)

  return(
    <>
      <h1>My Bookings</h1>
      <p>Show all / Show future bookings/ Show past bookings</p>
      <div>
        {store.bookings.map(booking => {
          return <div key={booking.id}>{booking.timeslot_id}, {booking.venue} - {booking.event_type}, {booking.duration} min</div>
        })}
      </div>
    </>
  )
}

export default MyBookings;