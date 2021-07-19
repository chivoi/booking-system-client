import styled from "styled-components";

export const FormDiv = styled.div`
  width: 75rem;
  @media screen and (max-width: 768px) { // tablet + phone
    width: 100%;
    padding: 0 5rem;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
`;

export const StyledFormCol = styled.div`
  width: 50%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0.5rem 0;
  }
`;

export const RadioButtons = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin-right: 1rem;
  }
`;

export const FormHeading = styled.h1`
  text-align: center;
`;

export const FormSubmit = styled.input`
  width: 50%;
  align-self: center;
`;