import styled from 'styled-components';


export const Header = styled.h1`
  text-align: center;
`;
  
export const Calendar = styled.div`
  width: 75rem;
`;

export const MonthBox = styled.div`
  border: 1px solid black;
  & > * {
    text-align: center;
  }
`;

export const DateGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-left: 1px solid black;
`

export const WeekBox = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const DayBox = styled.div`
  display: flex;
  flex-direction: row;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  padding: 0.5rem 0.7rem;
  width: 47.9%;
  height: 3rem;
  &:last-child{
    border-right: none;
  }
  & > * {
    margin-right: 1rem;
  }
`;

export const TimeslotBox = styled.div`
  height: 20%;
  font-size: small;
  `;

export const Date = styled.div`
  height: 50%;
  font-weight: bold;
`;

export const MonthNav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const KeyBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: space-evenly;
`;