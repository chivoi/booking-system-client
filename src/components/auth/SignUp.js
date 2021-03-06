import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import { store as notificationStore } from 'react-notifications-component';
// utils
import {signUp} from '../../services/auth';
import {useGlobalContext} from '../../utils/globalContext';
import {getUserDetails, updateDetails} from '../../services/bookings';
// styled
import {StyledForm, FormHeading} from '../styled/SignUpFormStyles'
import { FormDiv, TextInput, FormSubmit } from '../styled/FormStyles';

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
        .catch(e => {
          dispatch({type:'setError', data: e.message });
          console.log(e);
        });
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
          dispatch({type: 'setError', data: null})
          history.push('/details')
          notificationStore.addNotification({
            title: "Success",
            message: "Contact details updated!",
            type: "info",
            insert: "top",
            container: "center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {duration: 2000}
          })
        })
        .catch(e => {
          dispatch({type:'setError', data: e.message });
          console.log(e);
        });
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
        dispatch({type: 'setError', data: null})
        history.push('/new')
      })
      .catch(e => {
        dispatch({type:'setError', data: e.message });
        console.log(e);
      });
    }
  }

  console.log(formState);

  return(
    <FormDiv>
      {loggedInUser ? <FormHeading>Edit contact details</FormHeading> : <FormHeading>Sign Up</FormHeading>}
      {loggedInUser && <Link to='/details' style={{margin: "2rem", fontSize:"1.4rem"} } >Back to my details </Link> }
      {loggedInUser ? <p>Please enter your new contact details.</p> : <p>Please enter your best contact details.</p>}
      <StyledForm style={{flexDirection:"column", width: "50%"} }>
        <label>First name: </label>
        <TextInput style={ {marginTop:"1rem"} } type="text" name="first_name" id="first_name" value={first_name} onChange={handleChange}/>
        <label>Last name: </label>
        <TextInput style={ {marginTop:"1rem"} } type="text" name="last_name" id="last_name" value={last_name} onChange={handleChange} />
        <label>Phone number: </label>
        <TextInput style={ {marginTop:"1rem"} } type="text" name="phone_num" id="phone_num" value={phone_num}onChange={handleChange} />
        <label>Email:</label>
        <TextInput style={ {marginTop:"1rem"} } type='email' name='email' value={email} onChange={handleChange}/>
        {!loggedInUser &&
          <div style={{display: "flex", flexDirection:"column"} }>
            <label>Password:</label>
            <TextInput style={ {marginTop:"1rem"} } type='password' name='password' value={password} onChange={handleChange} />
            <label style={ {marginTop:"1rem"} }>Confirm password:</label>
            <TextInput style={ {marginTop:"1rem"} } type='password' name='password_confirmation' value={password_confirmation} onChange={handleChange} />
          </div>
        }
        <FormSubmit type="submit" value={loggedInUser ? "Update Details" : "Create account"} onClick={handleSubmit} />
		  </StyledForm>
    </FormDiv>
  )
}

export default SignUp;