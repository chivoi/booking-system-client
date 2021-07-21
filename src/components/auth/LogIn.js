import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useUserContext } from '../../utils/userContext';
import { logIn } from '../../services/auth'

const LogIn = () => {
  const initialFormState = {
    email: "",
    password: ""
  }
  const [formState, setFormState] = useState(initialFormState)

  let history = useHistory();

  const { dispatch } = useUserContext();

  const handleChange = e => {
    setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
  }

  const handleSubmit = e => {
    e.preventDefault();
    logIn(formState)
      .then(({username, jwt, first_name, last_name, phone_num, is_admin}) => {
        sessionStorage.setItem("token", jwt);
        sessionStorage.setItem("email", username);
        dispatch({type: 'setLoggedInUser', data: username})
        dispatch({type: 'setToken', data: jwt})
        dispatch({type: 'setFirstName', data: first_name})
        dispatch({type: 'setLastName', data: last_name})
        dispatch({type: 'setPhoneNum', data: phone_num})
        dispatch({type: 'setIsAdmin', data: is_admin})
        history.push('/new')
		  })
		  .catch((error) => console.log(error))
  }

  return(
    <>
      <h1>Log In</h1>
      <p>Back to the website</p>
      <form>
        <label>Email:</label>
        <input type='email' name='email' value={formState.email} onChange={handleChange}></input>
        <label>Password:</label>
        <input type='password' name='password' value={formState.password} onChange={handleChange}></input>
        <input type="submit" value="Login" onClick={handleSubmit} />
		  </form>
    </>
  )
}

export default LogIn;