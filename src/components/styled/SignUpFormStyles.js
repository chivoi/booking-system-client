import styled from "styled-components";

export const FormDiv = styled.div`
  padding: 0 5rem;
  width: 70%;
  @media screen and (max-width: 768px) { // tablet + phone
    width: 90%;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0.5rem 0;
  }
`;

export const FormHeading = styled.h1`
  text-align: center;
`;

export const FormSubmit = styled.input`
  width: 12rem;
  align-self: center;
`;