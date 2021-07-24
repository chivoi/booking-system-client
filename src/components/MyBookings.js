import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../utils/globalContext';
import { formatDate, capitalize } from '../utils/helpers';
import { getBlockedTimeslots, getBookings, getUserBookings } from '../services/bookings';
//styled
import { BookingDiv, BookingsList, FilterLinks, Col1, Col2 } from './styled/BookingsListStyles';

const MyBookings = () => {

  const {store, dispatch} = useGlobalContext();
  const {userDetails, loggedInUser} = store;
  const [blockedTimeslots, setBlockedTimeslots] = useState([]);

  // get and set blocked timeslots
  useEffect(() => {
    getBlockedTimeslots()
      .then(timeslots => {
        setBlockedTimeslots(timeslots)
      })
      .catch(err => console.log(err))
  }, [])

  // console.log("from MyBookings");
  // console.log(blockedTimeslots);
  // console.log(store.bookings)
  
  const findBlockedTimeslotById = id => {
    const timeslot = blockedTimeslots.find(timeslot => timeslot.id === id);
    return formatDate(timeslot.date);
  }

  // pull bookings into the global state
  useEffect(() => {
    console.log(userDetails.isAdmin);
    if (userDetails.isAdmin) {
      getBookings()
        .then(bookings => {
          dispatch({
            type: 'setBookings',
            data: bookings
          })
        })
    } else {
      getUserBookings()
      .then(bookings => {
        dispatch({
          type: 'setBookings',
          data: bookings
        })
      })
    }
  }, [userDetails.isAdmin, loggedInUser])

  if (!store.bookings) return null;

  return(
    <>
      <h1>My Bookings</h1>
      <FilterLinks>All bookings / Past bookings / Future bookings</FilterLinks>
      <BookingsList>
        {store.bookings.map(booking => {
          return <BookingDiv key={booking.id}><Col1>{findBlockedTimeslotById(booking.timeslot_id) }, {booking.venue}</Col1><Col2>{capitalize(booking.event_type) }, {booking.duration} min </Col2></BookingDiv>
        })}
      </BookingsList>
    </>
  )
}

export default MyBookings;