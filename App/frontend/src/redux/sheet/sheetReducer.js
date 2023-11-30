import { TOGGLE_SHEET } from './sheetActions';

const initialState = {
  participantsSheet: {
    isOpen: false
  },
  friendInfoSheet: {
    isOpen: false
  },
  invitePeopleSheet: {
    isOpen: false
  },
};

const sheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SHEET:
      const sheetName = action.payload;
      return {
        ...state,
        [sheetName]: {
          ...state[sheetName],
          isOpen: !state[sheetName].isOpen,
        },
      };
    default:
      return state;
  }
};

export default sheetReducer;