export const reducer = (state, action) => {
  switch (action.type) {
    case "setAnchorEl": {
      return {
        ...state,
        anchorEl: action.data
      };
    }
    case "setDate": {
      return {
        ...state,
        date: action.data
      };
    }
    case "setTimeslot": {
      return {
        ...state,
        timeslot: action.data
      };
    }
    case "setVenue": {
      return {
        ...state,
        venue: action.data
      };
    }
    case "setAddress": {
      return {
        ...state,
        address: action.data
      };
    }
    case "setEventType": {
      return {
        ...state,
        eventType: action.data
      };
    }
    case "setStartTime": {
      return {
        ...state,
        startTime: action.data
      };
    }
    case "setSetDuration": {
      return {
        ...state,
        setDuration: action.data
      };
    }
    case "setPaProvided": {
      return {
        ...state,
        paProvided: action.data
      };
    }
    case "setMessage": {
      return {
        ...state,
        message: action.data
      };
    }
    default:
      return state;
  }
};