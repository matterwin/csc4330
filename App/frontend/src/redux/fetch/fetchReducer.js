import { SET_FETCH_FLAG } from "./fetchActions";

const initialState = {
  shouldFetchFriendsData: false,
  shouldFetchDiscoverData: false,
  shouldFetchSentFriendRequestData: false,
  shouldFetchFriendsListData: false,
  shouldFetchProfileData: false,
  shouldFetchHobbyData: false,
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCH_FLAG:
      const { tab } = action.payload;
      return {
        ...state,
        [`shouldFetch${tab}Data`]: !state[`shouldFetch${tab}Data`], // Toggle the value
      };
    default:
      return state;
  }
};

export default fetchReducer;
