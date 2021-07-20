import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
// utils
import {signUp} from '../../services/auth';
import {useUserContext} from '../../utils/userContext';
// styled
import {FormDiv, StyledForm, FormHeading, FormSubmit} from '../styled/SignUpFormStyles'

const SignUp = () => {
  const initialFormState = {
    first_name: "",
    last_name: "",
    phone_num: "",
		email: "", 
		password: "",
    password_confirmation: ""
	}
  const [formState, setFormState] = useState(initialFormState);
  const { first_name, last_name, phone_num, email, password, password_confirmation } = formState;

  const {store, dispatch} = useUserContext();
  // const {firstName, lastName, phoneNum, loggedInUser} = store;
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
        dispatch({type: 'setFirstName', data: first_name})
        dispatch({type: 'setLastName', data: last_name})
        dispatch({type: 'setPhoneNum', data: phone_num})
        history.push('/new')
      })
      .catch((error) => console.log(error))
  }

  return(
    <FormDiv>
      <FormHeading>Sign Up</FormHeading>
      <p>Back to the website</p>
      <p>Please enter your best contact details.</p>
      <StyledForm>
        <label>First name: </label>
        <input type="text" name="first_name" id="first_name" value={first_name} onChange={handleChange}/>
        <label>Last name: </label>
        <input type="text" name="last_name" id="last_name" value={last_name} onChange={handleChange} />
        <label>Phone number: </label>
        <input type="text" name="phone_num" id="phone_num" value={phone_num}onChange={handleChange} />
        <label>Email:</label>
        <input type='email' name='email' value={email} onChange={handleChange}></input>
        <label>Password:</label>
        <input type='password' name='password' value={password} onChange={handleChange}></input>
        <label>Confirm password:</label>
        <input type='password' name='password_confirmation' value={password_confirmation} onChange={handleChange}></input>
        <FormSubmit type="submit" value="Create account" onClick={handleSubmit} />
		  </StyledForm>
    </FormDiv>
  )
}

export default SignUp;