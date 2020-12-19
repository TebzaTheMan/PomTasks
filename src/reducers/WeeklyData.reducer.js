import {
  INCREMENT_FOCUSHOURS,
  MOVE_TO_NEWDAY,
} from '../constants/actions';

const today = Date.now();
const todayDate = new Date(today);

const month = todayDate.toLocaleString('en-US', { month: 'short' });
const shortenedDate = `${todayDate.getDate()}-${month}`;
let newState = [];
const MinuteInHours = 1 / 60;
const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_FOCUSHOURS:
      return state.map((data) => (data.date === shortenedDate
        ? {
          ...data,
          focusedHours: data.focusedHours + MinuteInHours,
        }
        : data));
    case MOVE_TO_NEWDAY:
      newState = [...state];
      newState.shift();// remove the first date as it is outdated
      newState.push({ date: shortenedDate, focusedHours: 0 }); // add today's date
      return newState;
    default:
      return state;
  }
};
export default reducer;
