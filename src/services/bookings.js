import bookingSystemAPI from '../config/api';

export async function getBookings() {
	const response = await bookingSystemAPI.get('/api/bookings');
	console.log(response);
	return response.data;
};

export async function getUserBookings() {
  const response = await bookingSystemAPI.get('/api/my_bookings');
  return response.data;
};

export async function getBooking(id) {
	const response = await bookingSystemAPI.get(`/api/bookings/${id}`);
	return response.data;
}

export async function createBooking(booking) {
	const response = await bookingSystemAPI.post('/api/bookings');
	return booking;
};

export async function deleteBooking(id) {
  const response = await bookingSystemAPI.delete(`/api/bookings/${id}`);
	return id;
};

export async function updateBooking(booking) {
  const response = await bookingSystemAPI.patch(`/api/bookings/${booking.id}`);
	return booking;
	
}