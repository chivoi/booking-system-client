import styled from "styled-components";

export const BookingsList = styled.div`
  width: 75rem;
  padding-top: 2rem;
  @media screen and (max-width: 768px) { // tablet + phone
    width: 100%;
    padding: 0 5rem;
  }
`;

export const BookingDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction:row;
  padding: 0.7rem 0;
  border-bottom: 1px dotted black;

`;

export const Col1 = styled.div`
  width: 50%;
  text-align: left;
  @media screen and (max-width: 400px) { // phone
    width: 100%;
  }
`;

export const Col2 = styled.div`
  width: 50%;
  text-align: right;
  @media screen and (max-width: 400px) { // phone
    display: none;
  }
`;

export const FilterLinks = styled.p`
  width: 75rem;
  text-align: left;
  @media screen and (max-width: 768px) { // tablet + phone
    width: 100%;
    padding: 0 5rem;
  }
`;