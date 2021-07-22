import bookingSystemAPI from '../config/api';

export async function getBookings() {
	const response = await bookingSystemAPI.get('/api/bookings');
	console.log(response.data);
	return response.data;
};

export async function getTimeslots() {
	const response = await bookingSystemAPI.get('api/timeslots')
	console.log(response.data);
	return response.data
}

export async function getUserBookings() {
  const response = await bookingSystemAPI.get('/api/my_bookings');
  return response.data;
};

export async function getBooking(id) {
	const response = await bookingSystemAPI.get(`/api/bookings/${id}`);
	return response.data;
}

export async function createBooking(booking) {
	const response = await bookingSystemAPI.post('/api/bookings', {
		date: booking.date,
		timeslot: parseInt(booking.timeslot) === 1 ? "one" : "two",
		venue: booking.venue,
		address: booking.address,
		event_type: parseInt(booking.eventType),
		start_time: booking.startTime,
		set_duration: parseInt(booking.setDuration),
		pa_provided: "false" ? false : true,
		message: booking.message
	});
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