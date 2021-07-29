import axios from 'axios';

export const setApiUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return 'https://alex-velasco-book.herokuapp.com'
  };

  if (process.env.NODE_ENV === "development") {
    console.log("I'm in development!")
    return process.env.REACT_APP_API_URL || "http://localhost:3000"
  }
}

const apiUrl = setApiUrl();


const bookingSystemAPI = axios.create({
  baseURL: apiUrl
})

bookingSystemAPI.interceptors.request.use(req => {
  const token = sessionStorage.getItem('token');
  console.log("SET TOKEN HEADER:", token)
  if (token) req.headers["Authorization"] = `Bearer ${token}`;
  return req;
})

export default bookingSystemAPI;