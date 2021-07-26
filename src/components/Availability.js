import React, {useState, useEffect} from 'react';
// utils
import {useGlobalContext} from '../utils/globalContext';
import { getSingleTimeslot, updateTimeslot } from '../services/bookings';
import { formatDate } from '../utils/helpers';
// styled
import {StyledForm, FormSubmit} from './styled/SignUpFormStyles'

const Availability = () => {

  const {store, dispatch} = useGlobalContext();
  const {timeslots} = store;
  const allTimeslots = timeslots.blocked.concat(timeslots.available).sort((f,s) => f.id-s.id );

  const initialFormState = {
    timeslot:{
      id: "",
      date: "",
      halfDay: "",
      isBlocked: ""
    },
    action:""
  }

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = e => {
    if (e.target.id === "action"){
      setFormState({
        ...formState,
        [e.target.id]: e.target.value
      })
    } else {
      let timeslotArray = "" || e.target.value.split("--")
      const halfDay = timeslotArray[1].substr(6) === "23:00" ? 2 : 1;
      const isBlocked = timeslotArray[2] === "Blocked" ? true : false;
      setFormState({
        ...formState,
        timeslot: {
          id: parseInt(timeslotArray[3]),
          date: timeslotArray[0],
          halfDay: halfDay,
          isBlocked: isBlocked
        } 
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formState);
    updateTimeslot(formState.timeslot, formState.action)
      .then(timeslot => {
        dispatch({
          type: "updateTimeslots",
          data: {
            id: timeslot.id, ...formState}
        })
        setFormState(initialFormState);
      })
      .catch(e => console.log(e) )
  }

  console.log(formState);

  return(
    <div>
      <h3>Edit availability</h3>
      <StyledForm onSubmit={handleSubmit}>
        <label>Timeslot:</label>
        <select name="timeslot" id="timeslotId" onClick={handleChange}>
        <option value="" disabled={true} selected={true}  >-- select timeslot --</option>
            {allTimeslots.map(t => {
              return <option key={t.id}>{t.date}--{t.half_day === "one" ? "08:00-16:00" : "17:00-23:00"}--{t.is_blocked ? "Blocked" : "Available"}--{t.id}</option>;
            } )}
        </select>
        <label>Action:</label>
        <select name="action" id="action" onClick={handleChange}>
          <option value="" disabled={true} selected={true}  >-- select action --</option>
          <option value="block">Block</option>
          <option value="release">Release</option>
        </select>
        <FormSubmit type="submit"/>
      </StyledForm>
    </div>
  );
}

export default Availability;