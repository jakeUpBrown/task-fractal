import { configureStore } from "@reduxjs/toolkit";
import { POMODORO } from "../constants";
import timerReducer from "./timerSlice";

const loadState = () => {
  console.log('loading state')
  try {
    let mode = localStorage.getItem('mode');
    if (!!!mode) {
      mode = POMODORO
    }
    console.log('found mode', mode)

    return {
      timer: {
        mode,
      }
    }
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    console.log('saving state', state)
    const { mode } = state.timer;
    console.log('saving mode', mode)
    localStorage.setItem('mode', mode);
  } catch(err) {
      console.log(err);
  }
};

const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});

store.subscribe(() => {
  console.log('state', store.getState())
  saveState({
    timer: {
      mode: store.getState().timer.mode,
    }
  });
});

export default store;
