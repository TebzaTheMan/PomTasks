import {
  INCREMENT_FOCUSHOURS,
} from '../constants/actions';

const today = Date.now();
const todayDate = new Date(today);

const month = todayDate.toLocaleString('en-US', { month: 'short' });
const shortenedDate = `${todayDate.getDate()}-${month}`;

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
    default:
      return state;
  }
};
export default reducer;
