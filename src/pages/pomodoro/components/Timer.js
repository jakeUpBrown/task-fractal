/* eslint-disable no-restricted-globals */
import { useCallback, useEffect } from "react";
import clsx from "clsx";
import Progress from "./Progress";
import classes from "./Timer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { incrementRound, setMode } from "../redux/timerSlice";
import {
  CONFIRM,
  LONG_BREAK,
  POMODORO,
  SHORT_BREAK,
  START,
  STOP,
  TIME_FOR_A_BREAK,
  TIME_TO_FOCUS,
} from "../constants";
import { formatTime } from "../helpers";
import useCountdown from "../useCountdown";
import { player } from "../util";

const alarmAudio = player({});

const SecondaryButton = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        classes.secondaryButton,
        active && classes.secondaryActive
      )}
    >
      {children}
    </button>
  );
};

const PrimaryButton = ({ active, onClick, color, mode }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        classes.primaryButton,
        active && classes.primaryActive,
        color
      )}
      id={`${mode}-${active ? 'stop' : 'start'}-button`}
    >
      {active ? STOP : START}
    </button>
  );
}

const NextButton = ({ onClick, className }) => (
  <button onClick={onClick} className={clsx(classes.nextButton, className)}>
    {'>'}
  </button>
);

export default function Timer() {
  const dispatch = useDispatch();
  const {
    mode,
    round,
    modes,
    alarmSound,
    alarmVolume,
    autoPomodoros,
    autoBreaks,
  } = useSelector((state) => { console.log('state', state); return state.timer});

  
  const { ticking, start, stop, reset, currentSecondsLeft, progress } = useCountdown({
    initialSeconds: modes[mode].time,
    onStart: () => {
    },
    onStop: () => {
    },
    onComplete: () => {
      next();
      alarmAudio.play();
    },
  });

  const jumpTo = useCallback(
    (id) => {
      reset();
      dispatch(setMode(id));
    },
    [dispatch, reset]
  );

  useEffect(() => {
    alarmAudio.setAudio(alarmSound);
  }, [alarmSound]);

  useEffect(() => {
    alarmAudio.setVolume(alarmVolume);
  }, [alarmVolume]);

  const next = useCallback(() => {
    switch (mode) {
      case LONG_BREAK:
      case SHORT_BREAK:
        jumpTo(POMODORO);
        if (autoPomodoros) {
          start();
        }
        break;
      default:
        jumpTo(SHORT_BREAK);
        dispatch(incrementRound());
        if (autoBreaks) {
          start();
        }
        break;
    }
  }, [dispatch, jumpTo, mode, autoPomodoros, autoBreaks, start]);

  const confirmAction = useCallback(
    (cb) => {
      if (!ticking) {
        cb()
      } else {
        if (confirm(CONFIRM)) {
          stop()
          cb()
        }
      }
    },
    [stop, ticking]
  );

  const confirmNext = useCallback(() => {
    confirmAction(next);
  }, [confirmAction, next]);

  const confirmJump = useCallback(
    (id) => {
      confirmAction(() => jumpTo(id));
    },
    [confirmAction, jumpTo]
  );

  const toggleTimer = useCallback(() => {
    if (ticking) {
      stop();
    } else {
      start();
    }
  }, [start, stop, ticking]);

  return (
    <div>
      <Progress percent={progress} />
      <div className={classes.container}>
        <div className={classes.content}>
          <ul id='mode-button-array'>
            {Object.values(modes).map(({ id, label }) => (
              <SecondaryButton
                key={id}
                active={id === mode}
                id={id}
                onClick={() => confirmJump(id)}
              >
                {label}
              </SecondaryButton>
            ))}
          </ul>
          <div className={classes.time}>{formatTime(currentSecondsLeft)}</div>
          <div className={classes.actionButtons}>
            <div className={classes.left} />
            <PrimaryButton
              active={ticking}
              onClick={toggleTimer}
              color={classes[mode]}
              mode={mode}
            />
            <div className={classes.right}>
              <NextButton
                className={ticking && classes.showNext}
                onClick={confirmNext}
              />
            </div>
          </div>
        </div>
        <div className={classes.counter}>#{round}</div>
        <footer className={classes.footer}>
          {mode === POMODORO ? TIME_TO_FOCUS : TIME_FOR_A_BREAK}
        </footer>
      </div>
    </div>
  );
}
