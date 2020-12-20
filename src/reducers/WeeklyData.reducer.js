/* eslint-disable no-console */
import isThisWeek from 'date-fns/isThisWeek';
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';
import {
  INCREMENT_FOCUSHOURS,
  DIFFERENT_DAY,
} from '../constants/actions';

const getTodayDate = () => {
  const todayDate = new Date();
  return format(todayDate, 'MM/dd/yyyy');
};
let newState = [];
const currentDates = [];
const MinuteInHours = 1 / 60;

const getThisWeek = () => {
  const prevWeek = startOfWeek(Date.now());
  const week = {};
  const dataHold = [];

  for (let x = 0; x < 7; x += 1) {
    week[prevWeek] = 0;
    prevWeek.setDate(prevWeek.getDate() + 1);
  }
  for (let x = 0; x < 7; x += 1) {
    const current = new Date(Object.keys(week)[x]);
    dataHold.push(format(current, 'MM/dd/yyyy'));
  }
  return dataHold;
};
const thisWeek = getThisWeek();

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_FOCUSHOURS:
      return state.map((data) => (data.date === getTodayDate()
        ? {
          ...data,
          focusedHours: data.focusedHours + MinuteInHours,
        }
        : data));
    case DIFFERENT_DAY:
      // remove all the dates that are not part of this week
      newState = state.filter((current) => (!isThisWeek(current.date)));
      // add all the dates that are part of this week if a date is not there just add it!
      // eslint-disable-next-line no-restricted-syntax
      for (const data of newState) {
        currentDates.push(data.date);
      }
      thisWeek.map((date) => !currentDates.includes(date)
      && newState.push({ date, focusedHours: 0 }));
      console.log(newState);
      return newState;
    default:
      return state;
  }
};
export default reducer;
