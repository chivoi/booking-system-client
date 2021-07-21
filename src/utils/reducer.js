export const reducer = (state, action) => {
  switch (action.type) {
    case "setAnchorEl": {
      return {
        ...state,
        anchorEl: action.data
      };
    }
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
    case "setDate": {
      return {
        ...state,
        booking: {
					...state.booking,
					date: action.data
				}
      };
    }
    case "setTimeslot": {
      return {
        ...state,
        booking: {
					...state.booking,
					timeslot: action.data
				}
      };
    }
    case "setVenue": {
      return {
        ...state,
        booking: {
					...state.booking,
					venue: action.data
				}
      };
    }
    case "setAddress": {
      return {
        ...state,
        booking: {
					...state.booking,
				  address: action.data
				}
      };
    }
    case "setEventType": {
      return {
        ...state,
        booking: {
					...state.booking,
					eventType: action.data
				}
      };
    }
    case "setStartTime": {
      return {
        ...state,
        booking: {
					...state.booking,
					startTime: action.data
				}
      };
    }
    case "setSetDuration": {
      return {
        ...state,
        booking: {
					...state.booking,
					setDuration: action.data
				}
      };
    }
    case "setPaProvided": {
      return {
        ...state,
        booking: {
					...state.booking,
					paProvided: action.data
				}
      };
    }
    case "setMessage": {
      return {
        ...state,
        booking: {
					...state.booking,
					message: action.data
				}
      };
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
    case 'updateBooking': {
			const booking = state.bookings.find((booking) => booking.id == action.data.id)
			const rest = state.bookings.filter((booking) => booking.id != action.data.id)
			const updatedBooking = Object.assign(booking, action.data)
			return {
				...state,
				bookings: [updatedBooking, ...rest]
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