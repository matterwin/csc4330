import { TOGGLE_NOTIFY } from './notificationActions';

const initialState = {
  isNotified: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFY:
      return {
        ...state,
        isNotified: !state.isNotified,
      };
    default:
      return state;
  }
};

export default notificationReducer;