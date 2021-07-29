import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useGlobalContext } from '../../utils/globalContext';
import { logIn } from '../../services/auth'
// styles
import { FormDiv, FormSubmit, StyledForm, TextInput } from '../styled/FormStyles';

const LogIn = () => {
  const initialFormState = {
    email: "",
    password: ""
  }
  const [formState, setFormState] = useState(initialFormState)

  
  let history = useHistory();
  
  const {dispatch} = useGlobalContext();
  // const {loggedInUser, userDetails} = store;

  const handleChange = e => {
    setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
  }

  const handleSubmit = e => {
    e.preventDefault();
    logIn(formState)
      .then(response => {
        const {username, jwt, first_name, last_name, phone_num, is_admin} = response;
        sessionStorage.setItem("token", jwt);
        sessionStorage.setItem("email", username);
        sessionStorage.setItem("firstName", first_name);
        sessionStorage.setItem("lastName", last_name);
        sessionStorage.setItem("phoneNum", phone_num);
        sessionStorage.setItem("isAdmin", is_admin);
        dispatch({type: 'setLoggedInUser', data: username})
        dispatch({type: 'setToken', data: jwt})
        dispatch({type: 'setFirstName', data: first_name})
        dispatch({type: 'setLastName', data: last_name})
        dispatch({type: 'setPhoneNum', data: phone_num})
        dispatch({type: 'setIsAdmin', data: is_admin})

        history.push('/bookings')
		  })
		  .catch(error => {
        dispatch({type:'setError', data: 'Incorrect username or password. Please try again' })
        console.log(error)   
      })
  }

  return(
    <FormDiv>
      <h1>Log In</h1>
      <StyledForm style={{flexDirection:"column", width: "50%"} } >
        <label style={ {marginTop:"1rem"} }>Email:</label>
        <TextInput style={ {marginTop:"1rem"} } type='email' name='email' value={formState.email} onChange={handleChange}></TextInput>
        <label style={ {marginTop:"1rem"} }>Password:</label>
        <TextInput style={ {marginTop:"1rem"} } type='password' name='password' value={formState.password} onChange={handleChange}></TextInput>
        <FormSubmit style={{marginTop:"1rem"} } type="submit" value="Login" onClick={handleSubmit} />
		  </StyledForm>
    </FormDiv>
  )
}

export default LogIn;