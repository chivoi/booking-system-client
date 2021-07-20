import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
// utils
import {signUp} from '../../services/auth';
import {useUserContext} from '../../utils/userContext';
// styled
import {FormDiv, StyledForm, FormHeading, FormSubmit} from '../styled/SignUpFormStyles'

const SignUp = () => {
  const initialFormState = {
		email: null, 
		password: null, 
		password_confirmation: null
	}
  const [formState, setFormState] = useState(initialFormState);
  const {store, dispatch} = useUserContext();
  const {firstName, lastName, phoneNum, loggedInUser} = store;
  let history = useHistory();


  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    signUp(formState)
      .then(({username, jwt}) =>{
        sessionStorage.setItem("token", jwt);
        sessionStorage.setItem("email", username);
        dispatch({type: 'setLoggedInUser', data: username})
        dispatch({type: 'setToken', data: jwt})
        history.push('/new')
      })
  }

  return(
    <FormDiv>
      <FormHeading>Sign Up</FormHeading>
      <p>Back to the website</p>
      <p>Please enter your best details we can use to contact you.</p>
      <StyledForm>
        <label>First name: </label>
        <input type="text" name="firstName" id="firstName" />
        <label>Last name: </label>
        <input type="text" name="lastName" id="lasttName" />
        <label>Phone number: </label>
        <input type="text" name="phoneNum" id="phoneNum" />
        <label>Email:</label>
        <input type='email' name='email' value={formState.email} onChange={handleChange}></input>
        <label>Password:</label>
        <input type='password' name='password' value={formState.password} onChange={handleChange}></input>
        <FormSubmit type="submit" value="Create account" onClick={handleSubmit} />
		  </StyledForm>
    </FormDiv>
  )
}

export default SignUp;