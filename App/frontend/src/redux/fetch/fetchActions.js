export const SET_FETCH_FLAG = 'SET_FETCH_FLAG';

export const setFetchFlag = (tab) => ({
  type: SET_FETCH_FLAG,
  payload: { tab },
});