import React, { useState } from 'react';
import { useUserContext } from '../../utils/userContext';
import { logIn } from '../../services/auth'

const LogIn = ({ history }) => {
  const initialLogInFormState = {
    email: "",
    password: ""
  }
  const [logInFormState, setLogInFormState] = useState(initialLogInFormState)

  const { dispatch } = useUserContext();

  const handleChange = e => {
    setLogInFormState({
			...logInFormState,
			[e.target.name]: e.target.value
		})
  }

  const handleSubmit = e => {
    e.preventDefault();
    logIn(logInFormState)
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
      <form >
        <label>Email:</label>
        <input type='email' name='email' value={logInFormState.email} onChange={handleChange}></input>
        <label>Password:</label>
        <input type='password' name='password' value={logInFormState.password} onChange={handleChange}></input>
        <input type="submit" value="Login" onClick={handleSubmit} />
		</form>
    </>
  )
}

export default LogIn;