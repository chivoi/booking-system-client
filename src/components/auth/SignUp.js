import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
// utils
import {signUp} from '../../services/auth';
import {useGlobalContext} from '../../utils/globalContext';
import {getUserDetails, updateDetails} from '../../services/bookings';
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

  const {store, dispatch} = useGlobalContext();
  const {loggedInUser} = store;
  
  let history = useHistory();

  useEffect(() => {
    if (loggedInUser) {
      getUserDetails()
        .then(details =>{
          setFormState({
            first_name: details.first_name,
            last_name: details.last_name,
		        phone_num: details.phone_num,
		        email: details.email
          })
        })
      console.log(formState)
    }
  },[loggedInUser])

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (loggedInUser) {
      updateDetails(formState)
        .then(details => {
          dispatch({type: 'setLoggedInUser', data: details.email})
          dispatch({type: 'setFirstName', data: details.first_name})
          dispatch({type: 'setLastName', data: details.last_name})
          dispatch({type: 'setPhoneNum', data: details.phone_num})
        history.push('/details')
        })
        .catch(error => console.log(error))
      } 
      else{
      signUp(formState)
      .then(({username, jwt}) =>{
        sessionStorage.setItem("token", jwt);
        sessionStorage.setItem("email", username);
        dispatch({type: 'setLoggedInUser', data: username})
        dispatch({type: 'setToken', data: jwt})
        dispatch({type: 'setFirstName', data: first_name})
        dispatch({type: 'setLastName', data: last_name})
        dispatch({type: 'setPhoneNum', data: phone_num})
        dispatch({type: 'setIsAdmin', data: false})
        history.push('/new')
      })
      .catch((error) => console.log(error))
    }
  }

  console.log(formState);

  return(
    <FormDiv>
      <FormHeading>Sign Up</FormHeading>
      {loggedInUser ? <p>Back to my details</p> : <p>Back to the website</p> }
      {loggedInUser ? <p>Please enter your new contact details.</p> : <p>Please enter your best contact details.</p>}
      <StyledForm>
        <label>First name: </label>
        <input type="text" name="first_name" id="first_name" value={first_name} onChange={handleChange}/>
        <label>Last name: </label>
        <input type="text" name="last_name" id="last_name" value={last_name} onChange={handleChange} />
        <label>Phone number: </label>
        <input type="text" name="phone_num" id="phone_num" value={phone_num}onChange={handleChange} />
        <label>Email:</label>
        <input type='email' name='email' value={email} onChange={handleChange}></input>
        {!loggedInUser &&
          <div style={{display: "flex", flexDirection:"column"} }>
            <label>Password:</label>
            <input type='password' name='password' value={password} onChange={handleChange}></input>
            <label>Confirm password:</label>
            <input type='password' name='password_confirmation' value={password_confirmation} onChange={handleChange}></input>
          </div>
        }
        <FormSubmit type="submit" value={loggedInUser ? "Update Details" : "Create account"} onClick={handleSubmit} />
		  </StyledForm>
    </FormDiv>
  )
}

export default SignUp;