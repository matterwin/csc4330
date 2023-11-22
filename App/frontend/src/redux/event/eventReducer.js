import { SET_EVENT_DATA } from "./eventActions";

const initialState = {
  discoverEventList: {
    formattedEvents: [],
  },
  friendsEventList: {
    formattedEvents: [],
  },
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT_DATA:
      const { tab, eventData } = action.payload;
      return {
        ...state,
        [`${tab}EventList`]: {
          formattedEvents: eventData,
        },
      };
    default:
      return state;
  }
};

export default eventReducer;
