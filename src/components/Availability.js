import React from 'react';
// utils
import {useGlobalContext} from '../utils/globalContext';
// styled
import {Calendar, Header, MonthBox, DateGrid, WeekBox, DayBox, TimeslotBox, Date, MonthNav} from './styled/CalendarStyles';
// material ui styles
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const Availability = () => {

  const {store} = useGlobalContext();
  const {timeslots} = store;
  const allTimeslots = timeslots.blocked.concat(timeslots.available).sort((f,s) => f.id-s.id );

  

  console.log(allTimeslots)

  return(
    <div>
      <Header>My Availability</Header>
      <Calendar>
        <MonthBox><h3>Month 2021</h3></MonthBox>
        <DateGrid>
          <WeekBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox>08:00-16:00</TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
          </WeekBox>
          <WeekBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
          </WeekBox>
          <WeekBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
          </WeekBox>
          <WeekBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
            <DayBox>
              <Date>1</Date>
              <TimeslotBox></TimeslotBox>
              <TimeslotBox></TimeslotBox>
            </DayBox>
          </WeekBox>

        </DateGrid>
        <MonthNav>
          <NavigateBeforeIcon style={{ fontSize: "4rem", width: "10%" }} />
          <NavigateNextIcon style={{ fontSize: "4rem", width: "10%" }} />
        </MonthNav>
      </Calendar>
    </div>
  );
}

export default Availability;