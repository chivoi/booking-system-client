import bookingSystemAPI from '../config/api';

// timeslots

export async function getTimeslots() {
	const response = await bookingSystemAPI.get('api/timeslots')
	return response.data
}

export async function getSingleTimeslot(id) {
	const response = await bookingSystemAPI.get(`api/timeslots/${id}`)
	return response.data
}

export async function getBlockedTimeslots() {
	const response = await bookingSystemAPI.get('api/blocked_timeslots')
	return response.data
}

export async function updateTimeslot(timeslot, action) {
	console.log(timeslot);
	console.log(action);
	const response = await bookingSystemAPI.patch('api/edit_availability', {
		id: timeslot.id,
		is_blocked: action === "block" ? true : false
	})
	return timeslot;
}

// clients

export async function getClients() {
	const response = await bookingSystemAPI.get('api/clients')
	return response.data
}

export async function getSingleClient(id) {
	const response = await bookingSystemAPI.get(`api/clients/${id}`)
	return response.data
}

// bookings

export async function getBookings() {
	const response = await bookingSystemAPI.get('/api/bookings');
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
	const response = await bookingSystemAPI.post('/api/bookings', {
		timeslot_id: parseInt(booking.timeslotId),
		venue: booking.venue,
		address: booking.address,
		event_type: parseInt(booking.eventType),
		start_time: booking.startTime,
		duration: parseInt(booking.setDuration),
		pa_provided: booking.paProvided === "false" ? false : true,
		message: booking.message
	});
	return booking;
};

export async function deleteBooking(id) {
  const response = await bookingSystemAPI.delete(`/api/bookings/${id}`);
	return id;
};

export async function updateBooking(booking) {
  const response = await bookingSystemAPI.patch(`/api/bookings/${booking.id}`, {
		timeslot_id: parseInt(booking.timeslotId),
		venue: booking.venue,
		address: booking.address,
		event_type: parseInt(booking.eventType),
		start_time: booking.startTime,
		set_duration: parseInt(booking.setDuration),
		pa_provided: "false" ? false : true,
		message: booking.message
		});
	return booking;	
}

// account details

export async function updateDetails(details) {
	const response = await bookingSystemAPI.patch('/api/my_details', {
		first_name: details.first_name,
		last_name: details.last_name,
		phone_num: details.phone_num,
		email: details.email
	});
	return details;
}

export async function getUserDetails() {
	const response = await bookingSystemAPI.get('/api/my_details');
	return response.data;
}

export async function deleteAccount() {
	const response = await bookingSystemAPI.delete('/api/my_details');
	console.log(response);
	return "deleted";
}