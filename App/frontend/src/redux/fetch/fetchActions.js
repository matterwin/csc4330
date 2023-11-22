
export const SET_FETCH_FLAG = 'SET_FETCH_FLAG';

export const setFetchFlag = (tab, value) => ({
  type: SET_FETCH_FLAG,
  payload: { tab, value },
});