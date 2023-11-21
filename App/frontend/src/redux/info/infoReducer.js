import { SET_INFO } from "./infoActions";

const initialState = {
  id: ''
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default infoReducer;