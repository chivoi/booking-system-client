import React from 'react';
// utils
import {useGlobalContext} from '../utils/globalContext';
import {paginate, getMonth, getYear, capitalize} from '../utils/helpers';
// styled
import {Calendar, Header, MonthBox, DateGrid, WeekBox, DayBox, TimeslotBox, Date, MonthNav, KeyBox} from './styled/CalendarStyles';
import {FormDiv, StyledForm, FormHeading, FormSubmit} from './styled/SignUpFormStyles'
// icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Availability = () => {

  const {store} = useGlobalContext();
  const {timeslots, bookings} = store;
  const allTimeslots = timeslots.blocked.concat(timeslots.available).sort((f,s) => f.id-s.id );
  const paginated = paginate(allTimeslots, 1, 16);

  // console.log(paginated);

  const bookingById = id => {
    if (!id) return "";
    let result = bookings.find(booking => {
      return(booking.timeslot_id == id ? booking : "")
     });
    return result;
  }

  const formatBooking = obj => {
    if (!obj || Object.entries(obj).length < 1) return "";
    return `${capitalize(obj.event_type)} @ ${obj.venue}`
  }

  // console.log(formatBooking(bookingById(102)) )

  return(
    <div>
      <Header>My Availability</Header>
      <KeyBox>
        <p><BlockIcon style={{color: "red", padding: "0"} } /> - blocked </p>   
        <p><CheckCircleOutlineIcon style={{color: "green"} }  /> - available</p>
      </KeyBox>
      <Calendar>
        <MonthBox><h3>{getMonth(paginated.data).join(" / ")} {getYear(paginated.data).join("-") }</h3></MonthBox>
        <DateGrid>
        {paginated.data.map((timeslot) => {
          return(
          <DayBox>
            <Date>{timeslot.date.split("-")[2]}</Date>
            <TimeslotBox>{timeslot.half_day === "one" ? "08:00-16:00" : "17:00-23:00"} {timeslot.is_blocked ? <BlockIcon style={{color: "red"} } /> : <CheckCircleOutlineIcon style={{color: "green"} }  />  } {formatBooking(bookingById(timeslot.id))} </TimeslotBox>
          </DayBox>)
        })}

        </DateGrid>
        <MonthNav>
          <NavigateBeforeIcon style={{ fontSize: "4rem", width: "10%" }} />
          <NavigateNextIcon style={{ fontSize: "4rem", width: "10%" }} />
        </MonthNav>
      </Calendar>

      <h3>Edit availability</h3>
      <StyledForm >
        <label>Timeslot:</label>
        <select name="timeslot" id="timeslotId">
        <option value="" disabled={true} selected={true}  >-- select timeslot --</option>
            {allTimeslots.map(t => {
              return <option key={t.id}>{t.id} - {t.date}, {t.half_day === "one" ? "08:00-16:00" : "17:00-23:00" }</option>;
            } )}
        </select>
        <label>Action:</label>
        <select name="action" id="action">
          <option value="block">Block</option>
          <option value="release">Make available</option>
        </select>
        <FormSubmit type="submit"/>
      </StyledForm>
    </div>
  );
}

export default Availability;