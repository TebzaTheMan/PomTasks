import {
  RESET_STREAK, INCREMENT_DAYS_ACCESSED, UPDATE_LASTUSED_DATE,
  INCREMENT_STREAK, INCREMENT_TOTAL_FOCUSHOURS,
} from '../constants/actions';

const MinuteInHours = 1 / 60;

const reducer = (state, action) => {
  switch (action.type) {
    case RESET_STREAK:
      return { ...state, streak: 0 };

    case INCREMENT_DAYS_ACCESSED:
      return { ...state, daysAccessed: state.daysAccessed + 1 };
    case UPDATE_LASTUSED_DATE:
      return { ...state, lastUsed: new Date().toLocaleDateString() };
    case INCREMENT_STREAK:
      return { ...state, streak: state.streak + 1 };
    case INCREMENT_TOTAL_FOCUSHOURS:
      return { ...state, hoursFocused: state.hoursFocused + MinuteInHours };
    default:
      return state;
  }
};
export default reducer;
