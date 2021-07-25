import React, {useState, useEffect} from 'react'
// utils
import { useGlobalContext } from '../utils/globalContext';
import { formatDate, capitalize, findDateById } from '../utils/helpers';
import { getBlockedTimeslots } from '../services/bookings';
//styled
import { BookingDiv, BookingsList, FilterLinks, Col1, Col2 } from './styled/BookingsListStyles';

const MyBookings = () => {

  const {store} = useGlobalContext();
  const {bookings, timeslots} = store;

  // console.log("from MyBookings");
  // console.log(blockedTimeslots);
  // console.log(bookings)

  // console.log("WHOOOOA", blockedTimeslots);

  if (!bookings) return null;
  if (!timeslots.blocked) return null;

  return(
    <>
      <h1>My Bookings</h1>
      <FilterLinks>All bookings / Past bookings / Future bookings</FilterLinks>
      <BookingsList>
        {bookings.map(booking => {
          console.log(booking.id, booking.event_type)
          return <BookingDiv key={booking.id}><Col1>{findDateById(booking.timeslot_id, timeslots.blocked) }, {booking.venue}</Col1><Col2>{capitalize(booking.event_type) }, {booking.duration} min </Col2></BookingDiv>
        })}
      </BookingsList>
    </>
  )
}

export default MyBookings;