export const TOGGLE_SHEET = 'TOGGLE_SHEET';

export const toggleSheet = (sheetName) => ({
  type: TOGGLE_SHEET,
  payload: sheetName,
});