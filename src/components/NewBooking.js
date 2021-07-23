import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useGlobalContext} from '../utils/globalContext';
import {getBooking, createBooking, updateBooking, getTimeslots, getBookings, getUserBookings} from '../services/bookings';
// styled
import {FormDiv, StyledForm, StyledFormCol, RadioButtons, FormHeading, FormSubmit} from './styled/FormStyles'
// utils
import {nextId} from '../utils/helpers';


const NewBooking = () => {
  const eventTypes = {1: "Wedding", 2: "Party", 3: "Reception", 4: "Corporate", 5: "Festival", 6: "Other"};
  const setDurations = [30, 35, 40, 45, 50, 60, 90, 120, 150, 180];

  const { store, dispatch } = useGlobalContext();
  const {bookings, loggedInUser} = store;
  let history = useHistory();
	let {id} = useParams();

  const initialFormState = {
    timeslotId: "",
    venue: "",
    address: "",
    eventType: "",
    startTime: "",
    setDuration: "",
    paProvided: "",
    message: ""
	}

  const [timeslots, setTimeslots] = useState([]);

  // get the timeslots

  useEffect(() => {
    getTimeslots()
      .then(timeslots => {
        setTimeslots(timeslots)
      })
      .catch(err => console.log(err))
  }, [])

  const [formState, setFormState] = useState(initialFormState);
  
  const {timeslotId, venue, address, eventType, startTime, setDuration, message } = formState;

  useEffect(() => {
		if(id) {
			getBooking(id)
			.then(booking => {
        let { timeslot_id, venue, address, event_type, start_time, set_duration, pa_provided, message } = booking;
				console.log(booking);
        setFormState({
          timeslotId: timeslot_id,
          venue: venue,
          address: address,
          eventType: event_type,
          startTime: start_time,
          setDuration: set_duration,
          paProvided: pa_provided,
          message: message
				})
			})
		}
	},[id])

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      updateBooking( {id: id, ...formState} )
        .then(()=> {
          dispatch({type: 'updateBooking', data: {id: id, ...formState}})
				  history.push(`/bookings/${id}`)
        })
    } else {
      createBooking({...formState, id: nextId(bookings)})
        .then(booking => {
          dispatch({type: 'addBooking', data: booking})
          console.log(booking)
          console.log(bookings)
          history.push('/bookings')
        })
        .catch(err => console.log(err))
    }
    console.log(formState)
    console.log(store)
  };

  const handleChange = e => {
    if (Object.values(eventTypes).includes(String(e.target.value))){
      setFormState({
        ...formState,
        eventType: Object.keys(eventTypes).find(key => eventTypes[key] === e.target.value)
      })
    } else if (e.target.name === "timeslot") {
      setFormState({
        ...formState,
        timeslotId: e.target.value.split(" ")[0]
      })
    }
    else{
      setFormState({
        ...formState,
        [e.target.id]: e.target.value
      })
    }
  }

  return( 
    <FormDiv>
      <FormHeading>New Booking</FormHeading>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormCol>
          <label htmlFor="date">Select timeslot</label>
          <select name="timeslot" id="timeslotId" value={timeslotId} onChange={handleChange}>
            <option disabled selected>-- select timeslot --</option>
            {timeslots.map(t => {
              return <option key={t.id}>{t.id} - {t.date}, {t.half_day === "one" ? "08:00-16:00" : "17:00-23:00" }</option>;
            } )}
          </select>
          <label>Venue </label>
          <input type="text" name="venue" id="venue" value={venue} onChange={handleChange}/>
          <label>Address</label>
          <input type="text" name="address" id="address" value={address} onChange={handleChange}/>
          <label>Event type</label>
          <select name="eventType" id="eventType" value={eventType} onChange={handleChange}>
            <option disabled selected> -- select event type -- </option>
            {Object.entries(eventTypes).map((t) => {
              return <option key={t[0]}>{t[1]}</option>;
            })}
          </select>
          <label>Start time</label>
          <input type="text" name="startTime" id="startTime" value={startTime} onChange={handleChange}/>
          <label>Set duration(min): </label>
          <select name="setDuration" id="setDuration" value={setDuration} onChange={handleChange}>
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
          <textarea name="message" rows="10" cols="30" id="message" value={message} onChange={handleChange}/>
          <FormSubmit type="submit" value={id ? "Update Booking" : "Book"} />
        </StyledFormCol>
      </StyledForm>
    </FormDiv>
  )
}

export default NewBooking;