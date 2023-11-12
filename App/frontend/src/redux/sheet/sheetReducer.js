import { TOGGLE_SHEET } from './sheetActions';

const initialState = {
  isOpen: false,
};

const sheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SHEET:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default sheetReducer;