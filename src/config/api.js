import axios from 'axios';

const bookingSystemAPI = axios.create({
  baseURL: 'http://localhost:3000'
})

bookingSystemAPI.interceptors.request.use(req => {
  const token = sessionStorage.getItem('token');
  console.log("SET TOKEN HEADER:", token)
  if (token) req.headers["Authorization"] = `Bearer ${token}`;
  return req;
})

export default bookingSystemAPI;