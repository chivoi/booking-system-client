import React from 'react'

import {FormDiv, StyledForm, StyledFormCol, RadioButtons, FormHeading, FormSubmit} from './styled/FormStyles'


const NewBooking = () => {
  const timeslotOptions = ["08:00 - 16:00", "17:00 - 23:00"]
  const eventTypes = ["Wedding", "Party", "Reception", "Corporate", "Festival", "Other"]
  const setDurations = [30, 35, 40, 45, 50, 60, 90, 120, 150, 180]

  return(
    <FormDiv>
      <FormHeading>New Booking</FormHeading>
      <StyledForm>
        <StyledFormCol>
          <label htmlFor="date">Select date </label>
          <input type="date" min={new Date().toISOString().split("T")[0]}/>
          <label>Select timeslot </label>
          <select name="timeslots">
            <option disabled selected value> -- select an option -- </option>
            {timeslotOptions.map((t) => {
              return <option key={t}>{t}</option>;
            })}
          </select>
          <label>Venue </label>
          <input type="text" name="venue"/>
          <label>Address</label>
          <input type="text" name="address"/>
          <label>Event type</label>
          <select name="event-types">
            <option disabled selected value> -- select an option -- </option>
            {eventTypes.map((t) => {
              return <option key={t}>{t}</option>;
            })}
          </select>
          <label>Start time</label>
          <input type="text" name="start-time"/>
          <label>Set duration(min): </label>
          <select name="event-types">
            <option disabled selected value> -- select an option -- </option>
            {setDurations.map((t) => {
              return <option key={t}>{t}</option>;
            })}
          </select>
          <RadioButtons>
            <label>PA provided?</label>
            <div class="radio-buttons-yes">
              <input type="radio" id="yes" value="yes" name="PA" />
              <label for="yes">Yes</label>
            </div>
            <div class="radio-buttons-no">
              <input type="radio" id="no" value="no" name="PA" />
              <label for="no">No</label>
            </div>
          </RadioButtons>
        </StyledFormCol>
        <StyledFormCol>
          <label>Message</label>
          <textarea name="message" rows="10" cols="30"/>
          <FormSubmit type="submit" value="Book" />
        </StyledFormCol>
      </StyledForm>
    </FormDiv>
  )
}

export default NewBooking;