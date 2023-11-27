export const SET_EVENTID = 'SET_EVENTID';

export const setEventInfo = (eventId) => ({
  type: SET_EVENTID,
  payload: eventId,
});
