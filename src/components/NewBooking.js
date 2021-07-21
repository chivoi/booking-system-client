import React, {useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useUserContext} from '../utils/userContext';
import {getBooking, createBooking, updateBooking} from '../services/bookings';
// styled
import {FormDiv, StyledForm, StyledFormCol, RadioButtons, FormHeading, FormSubmit} from './styled/FormStyles'
// utils
import {capitalize, nextId} from '../utils/helpers';


const NewBooking = () => {
  const timeslotOptions = ["08:00 - 16:00", "17:00 - 23:00"]
  const eventTypes = ["Wedding", "Party", "Reception", "Corporate", "Festival", "Other"]
  const setDurations = [30, 35, 40, 45, 50, 60, 90, 120, 150, 180]

  const { store, dispatch } = useUserContext();
  const {bookings} = store;
  // const {date, timeslot, venue, address, eventType, startTime, setDuration, paProvided, message} = store.booking;

  let history = useHistory();
	let {id} = useParams();

  useEffect(() => {
    const setBookingData = (booking) => {
      for (let i of booking){
        let action = "set".concat(capitalize(i.split("_")).join(""));
        dispatch({
          type: action,
          data: booking[i]
        })
      }
    }

		if(id) {
			getBooking(id)
			.then(booking => {
				console.log(booking);
        setBookingData(booking);
			})
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
	},[id])

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      updateBooking( {id: id, ...store.booking} )
        .then(()=> {
          dispatch({type: 'updateBooking', data: {id: id, ...store.booking}})
				  history.push(`/bookings/${id}`)
        })
    } else {
      createBooking({...store.booking, id: nextId(bookings)})
        .then(booking => {
          dispatch({type: 'addBooking', data: booking})
          history.push('/bookings')
        })
        .catch(err => console.log(err))
    }
  };

  const handleChange = e => {
    let action = "set".concat(capitalize(e.target.id).split(" ").join(""));
    dispatch({
      type: action,
      data: e.target.value
    })
  }
  
  return(
    <FormDiv>
      <FormHeading>New Booking</FormHeading>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormCol>
          <label htmlFor="date">Select date </label>
          <input 
            type="date" 
            min={new Date().toISOString().split("T")[0]} id="date" 
            onChange={handleChange}/>
          <label>Select timeslot </label>
          <select name="timeslot" id="timeslot" onChange={handleChange}>
            <option disabled selected>-- select timeslot --</option>
            {timeslotOptions.map((t) => {
              return <option key={t}>{t}</option>;
            })}
          </select>
          <label>Venue </label>
          <input type="text" name="venue" id="venue" onChange={handleChange}/>
          <label>Address</label>
          <input type="text" name="address" id="address" onChange={handleChange}/>
          <label>Event type</label>
          <select name="eventType" id="eventType" onChange={handleChange}>
            <option disabled selected> -- select event type -- </option>
            {eventTypes.map((t) => {
              return <option key={t}>{t}</option>;
            })}
          </select>
          <label>Start time</label>
          <input type="text" name="startTime" id="startTime" onChange={handleChange}/>
          <label>Set duration(min): </label>
          <select name="setDuration" id="setDuration" onChange={handleChange}>
            <option disabled selected> -- select duration -- </option>
            {setDurations.map((t) => {
              return <option key={t}>{t}</option>;
            })}
          </select>
          <RadioButtons>
            <label>PA provided?</label>
            <div>
              <input type="radio" value={true} name="paProvided" id="paProvided" onChange={handleChange} />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input type="radio" id="paProvided" value={false} name="paProvided" onChange={handleChange} />
              <label htmlFor="no">No</label>
            </div>
          </RadioButtons>
        </StyledFormCol>
        <StyledFormCol>
          <label>Message</label>
          <textarea name="message" rows="10" cols="30" id="message" onChange={handleChange}/>
          <FormSubmit type="submit" value={id ? "Update Booking" : "Book"} />
        </StyledFormCol>
      </StyledForm>
    </FormDiv>
  )
}

export default NewBooking;