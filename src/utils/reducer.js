export const reducer = (state, action) => {
  switch (action.type) {
    case 'setLoggedInUser': {
			return {
				...state,
				loggedInUser: action.data
			}
		}
		case 'setToken': {
			return {
				...state,
				auth: {
					...state.auth,
					token: action.data
				}
			}
    }
    case 'setFirstName': {
      return {
        ...state,
        userDetails: {
					...state.userDetails,
					firstName: action.data
				}
      };
		}
    case 'setLastName': {
      return {
        ...state,
        userDetails: {
					...state.userDetails,
					lastName: action.data
				}
      };
		}
    case 'setPhoneNum': {
      return {
        ...state,
        userDetails: {
					...state.userDetails,
					phoneNum: action.data
				}
      };
		}
    case 'setIsAdmin': {
      return {
        ...state,
        userDetails: {
					...state.userDetails,
					isAdmin: action.data
				}
      };
		}
    case 'setBookings': {
      return {
        ...state,
        bookings: action.data
      }
    }
    case 'setTimeslots': {
      return {
        ...state,
        timeslots: {
          ...state.timeslots,
          available: action.data
        }
      }
    }

    case 'setBlockedTimeslots': {
      return {
        ...state,
        timeslots: {
          ...state.timeslots,
          blocked: action.data
        }
      }
    }


    case 'updateBooking': {
			const booking = state.bookings.find((booking) => booking.id == action.data.id)
			const rest = state.bookings.filter((booking) => booking.id != action.data.id)
			const updatedBooking = Object.assign(booking, action.data)
			return {
				...state,
				bookings: [updatedBooking, ...rest]
			}
		}
    case 'deleteBooking': {
      const updatedBookings = state.bookings.filter((bkng) => {
				return bkng.id !== parseInt(action.data)
			})
			return {
				...state,
			  bookings: updatedBookings
			}
    }
    case 'addBooking': {
      return {
				...state,
				bookings: [action.data, ...state.bookings]
			}
    }
    default:
      return state;
  }
};