import React from 'react';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
// utils
import { useGlobalContext } from '../utils/globalContext';
import { capitalize, findDateById } from '../utils/helpers';
//styled
import { BookingDiv, BookingsList, Col1, Col2 } from './styled/BookingsListStyles';

const MyBookings = () => {

  const {store} = useGlobalContext();
  const {bookings, timeslots, loading} = store;

  const findBookingDateById = (id) => {
    try {
      return findDateById(id, timeslots.blocked)
    }catch (e) {
      console.log(e)
      return null
    }
  }

  return(
    <>
      <h1>My Bookings</h1>
      <BookingsList>
        {loading && <CircularProgress />}
          {bookings.map(booking => {
            return <BookingDiv key={booking.id}><Col1>{findBookingDateById(booking.timeslot_id)}, {booking.venue}</Col1><Col2>{capitalize(booking.event_type) }, {booking.duration} min  <Link to={`/bookings/${booking.id}`} >Details</Link></Col2></BookingDiv>
          })
        }
      </BookingsList>
    </>
  )
}

export default MyBookings;