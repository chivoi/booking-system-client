import bookingSystemAPI from '../config/api';

export async function signUp(data) {
	const response = await bookingSystemAPI.post('/api/auth/sign_up', data) 
	return response.data
}
export async function logIn(data) {
	const response = await bookingSystemAPI.post('/api/auth/log_in', data)
	return response.data
}
export async function signOut(data) {
	sessionStorage.clear();
	return "Logged out";
}