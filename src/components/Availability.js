import React from 'react';
// utils
import {useGlobalContext} from '../utils/globalContext';
import {paginate, getMonth, getYear} from '../utils/helpers';
// styled
import {Calendar, Header, MonthBox, DateGrid, WeekBox, DayBox, TimeslotBox, Date, MonthNav} from './styled/CalendarStyles';
import {FormDiv, StyledForm, FormHeading, FormSubmit} from './styled/SignUpFormStyles'
// icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Availability = () => {

  const {store} = useGlobalContext();
  const {timeslots} = store;
  const allTimeslots = timeslots.blocked.concat(timeslots.available).sort((f,s) => f.id-s.id );
  const paginated = paginate(allTimeslots, 1, 28);

  console.log(paginated.data);

  // somehow delete all results before today or fill the gap between timeslot 1 and next

  return(
    <div>
      <Header>My Availability</Header>
      <Calendar>
        <MonthBox><h3>{getMonth(paginated.data).join(" / ")} {getYear(paginated.data).join("-") }</h3></MonthBox>
        <DateGrid>
        {paginated.data.map((timeslot, index) => {
          return(
          <DayBox>
            <Date>{timeslot.date.split("-")[2]}</Date>
            <TimeslotBox>{timeslot.half_day === "one" ? "08-16" : "17-23"} {timeslot.is_blocked ? <BlockIcon style={{color: "red"} } /> : <CheckCircleOutlineIcon style={{color: "green"} }   />  } </TimeslotBox>
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