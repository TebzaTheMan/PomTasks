/* eslint-disable no-console */
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';
import {
  INCREMENT_FOCUSHOURS,
  NEW_WEEK,
} from '../constants/actions';

const getTodayDate = () => {
  const todayDate = new Date();
  return format(todayDate, 'MM/dd/yyyy');
};
const MinuteInHours = 1 / 60;
const getNewWeekDays = () => {
  const prevWeek = startOfWeek(Date.now());
  const week = {};
  const dataHold = [];

  for (let x = 0; x < 7; x += 1) {
    week[prevWeek] = 0;
    prevWeek.setDate(prevWeek.getDate() + 1);
  }
  for (let x = 0; x < 7; x += 1) {
    const current = new Date(Object.keys(week)[x]);
    dataHold.push({ date: format(current, 'MM/dd/yyyy'), focusedHours: 0 });
  }
  return dataHold;
};
const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_FOCUSHOURS:
      localStorage.hoursFocused = Number(localStorage.hoursFocused) + Number(MinuteInHours);
      return state.map((data) => (data.date === getTodayDate()
        ? {
          ...data,
          focusedHours: data.focusedHours + MinuteInHours,
        }
        : data));
    case NEW_WEEK:
      // UPDATE with new week
      return getNewWeekDays();
    default:
      return state;
  }
};
export default reducer;
