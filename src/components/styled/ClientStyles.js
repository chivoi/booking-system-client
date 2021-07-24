import styled from 'styled-components';

export const Container = styled.div`
  width: 75rem;
  @media screen and (max-width: 768px) { // tablet + phone
    width: 100%;
    padding: 0 5rem;
  }
`;

export const Heading = styled.h1`
  text-align: left;
`;

export const ClientDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction:row;
  padding: 0.7rem 0;
  border-bottom: 1px dotted black;

`;

export const GridSquare = styled.div`
  width: 33%;
`;