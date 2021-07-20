import React, { useState } from 'react';
import { useUserContext } from '../../utils/userContext';
import { logIn } from '../../services/auth'

const LogIn = ({ history }) => {
  const initialFormState = {
    email: "",
    password: ""
  }
  const [formState, setFormState] = useState(initialFormState)

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
      .then(({username,jwt}) => {
        sessionStorage.setItem("token", jwt);
        sessionStorage.setItem("email", username);
        dispatch({type: 'setLoggedInUser', data: username})
        dispatch({type: 'setToken', data: jwt})
        history.push('/new')
		  })
		  .catch((error) => console.log(error))
  }

  return(
    <>
      <h1>Log In</h1>
      <p>Back to the website</p>
      <p>Please enter your best details we can use to contact you.</p>
      <form >
        <label>First name: </label>
        <input type="text" name="firstName" id="firstName" />
        <label>Last name</label>
        <label></label>
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