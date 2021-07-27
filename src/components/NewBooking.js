import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {useHistory, useParams} from 'react-router-dom';
import {useGlobalContext} from '../utils/globalContext';
import {getBooking, createBooking, updateBooking} from '../services/bookings';
// styled
import {FormDiv, StyledForm, StyledFormCol, RadioButtons, FormHeading, FormSubmit, TextInput, TextArea, BoldLabel} from './styled/FormStyles'
// utils
import {nextId, formatDate} from '../utils/helpers';


const NewBooking = () => {
  const { store, dispatch } = useGlobalContext();
  const {bookings, timeslots} = store;
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

  const [formState, setFormState] = useState(initialFormState);
  
  const {timeslotId, venue, address, eventType, startTime, setDuration, message } = formState;


  useEffect(() => {
		if(id) {
			getBooking(id)
			.then(booking => {
        let { timeslot_id, venue, address, event_type, start_time, set_duration, pa_provided, message } = booking;
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
  };

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }

  const handleDurationSelect = e => {
    setFormState({
      ...formState,
      setDuration: e.value
    })
  }

  const handleEventTypeSelect = e => {
    setFormState({
      ...formState,
      eventType: e.value
    })
  }

  const handleTimeslotSelect = e => {
    setFormState({
      ...formState,
      timeslotId: e.value
    })
  }

  console.log(formState);

  const eventOptions = [
    { value: 1, label: 'wedding' },
    { value: 2, label: 'party' },
    { value: 3, label: 'reception' },
    { value: 4, label: 'corporate' },
    { value: 5, label: 'festival' },
    { value: 6, label: 'other' }
  ]

  const setDurations = [
    {value: 30, label: "30 min"},
    {value: 35, label: "35 min"},
    {value: 40, label: "40 min"},
    {value: 45, label: "45 min"},
    {value: 50, label: "50 min"},
    {value: 60, label: "1 hour"},
    {value: 90, label: "1 hour 30 min"},
    {value: 120, label: "2 hours"},
    {value: 150, label: "2 hours 30 min"},
    {value: 180, label: "3 hours"}
  ]

  const timeslotOptions = timeslots.available.map(t => {
    return {
      value: t.id,
      label: `${formatDate(t.date)}, ${t.half_day === "one" ? "08:00-16:00" : "17:00-23:00" }`
    }
  })

  return( 
    <FormDiv>
      <FormHeading>New Booking</FormHeading>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormCol>
          <BoldLabel>Select timeslot</BoldLabel>
          <Select
            name="timeslot" 
            id="timeslotId" 
            options={timeslotOptions}
            onChange={handleTimeslotSelect} />
          <BoldLabel>Venue </BoldLabel>
          <TextInput type="text" name="venue" id="venue" value={venue} onChange={handleChange}/>
          <BoldLabel>Address</BoldLabel>
          <TextInput type="text" name="address" id="address" value={address} onChange={handleChange}/>
          <BoldLabel>Event type</BoldLabel>
          <Select 
            name="eventType" 
            id="eventType" 
            options={eventOptions}
            onChange={handleEventTypeSelect} />
          <BoldLabel>Start time</BoldLabel>
          <TextInput type="text" name="startTime" id="startTime" value={startTime} onChange={handleChange}/>
          <BoldLabel>Set duration(min): </BoldLabel>
          <Select 
            name="setDuration" 
            id="setDuration"
            options={setDurations}
            onChange={handleDurationSelect}/>
          <RadioButtons>
            <BoldLabel>PA provided?</BoldLabel>
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
          <BoldLabel>Message</BoldLabel>
          <TextArea name="message" rows="10" cols="30" id="message" value={message} onChange={handleChange}/>
          <FormSubmit type="submit" value={id ? "Update Booking" : "Book"} />
        </StyledFormCol>
      </StyledForm>
    </FormDiv>
  )
}

export default NewBooking;