import { SET_FETCH_FLAG } from "./fetchActions";

const initialState = {
  shouldFetchFriendsData: false,
  shouldFetchDiscoverData: false,
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCH_FLAG:
      const { tab, value } = action.payload;
      return {
        ...state,
        [`shouldFetch${tab}Data`]: value,
      };
    default:
      return state;
  }
};

export default fetchReducer;
