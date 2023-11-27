import { SET_EVENTID } from './eventInfoActions';

const initialState = {
  eventId: null
};

const eventInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTID:
      return {
        ...state,
        eventId: action.payload,
      };
    default:
      return state;
  }
};

export default eventInfoReducer;
