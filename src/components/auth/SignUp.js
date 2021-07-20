import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {signUp} from '../../services/auth';
import {useUserContext} from '../../utils/userContext';

const SignUp = () => {
  const initialFormState = {
		email: null, 
		password: null, 
		password_confirmation: null
	}
  const [formState, setFormState] = useState(initialFormState);
  const {dispatch} = useUserContext;
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
    <>
      <h1>Sign Up</h1>
      <p>Back to the website</p>
      <form >
        <label>Email:</label>
        <input type='email' name='email' value={formState.email} onChange={handleChange}></input>
        <label>Password:</label>
        <input type='password' name='password' value={formState.password} onChange={handleChange}></input>
        <input type="submit" value="Login" onClick={handleSubmit} />
		  </form>
    </>
  )
}

export default SignUp;