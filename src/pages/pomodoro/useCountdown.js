import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountdown({ initialSeconds, onStart, onStop, onComplete }) {
  const timerId = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentSecondsLeft, setCurrentSecondsLeft] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [pomodoroUntilMs, setPomodoroUntilMs] = useState(0);

  const clear = () => {
    console.log('clearing')
    clearInterval(timerId.current);
    timerId.current = null;
  };

  useEffect(() => {
    console.log('getting pomodoroUntilMs from localStorage')
    const pomodoroUntilMs = localStorage.getItem("pomodoroUntilMs")
    if (pomodoroUntilMs) {
      setPomodoroUntilMs(pomodoroUntilMs)
    }
    if (pomodoroUntilMs > Date.now()) {
      console.log('setting ticking to true since pomodoroUntilMs has not been reached previously')
      setTicking(true);    
      onStart?.();
    }
  }, [onStart]);

  const tick = useCallback(() => {
    const now = Date.now()
    var newSecondsLeft = Math.floor((pomodoroUntilMs - now) / 1000);
    console.log('newSecondsLeft', newSecondsLeft)
    if (newSecondsLeft > 0) {
      setCurrentSecondsLeft(newSecondsLeft);
      setProgress(newSecondsLeft / initialSeconds);
    }
    if (newSecondsLeft <= 0) {
      setTicking(false);
      clear();
      onComplete?.();
    }
  }, [onComplete, pomodoroUntilMs, initialSeconds]);

  useEffect(() => {
    console.log('checking tick useEffect', ticking)
    if (ticking) {
      timerId.current = setInterval(tick, 1000);
    } else {
      console.log('clearing in useEffect ticking')
      clear();
    }
    return clear;
  }, [tick, ticking]);

  const start = useCallback(() => {
    const pomodoroUntilMs = Date.now() + (initialSeconds * 1000)
    console.log('setting pomoodoroUntilMs in start', pomodoroUntilMs)
    setPomodoroUntilMs(pomodoroUntilMs)
    localStorage.setItem("pomodoroUntilMs", pomodoroUntilMs)
    console.log('set ticking to true')
    setTicking(true);    
    onStart?.();
  }, [onStart, initialSeconds]);

  const stop = useCallback(() => {
    console.log('stopping pomodoro')
    setPomodoroUntilMs(0)
    localStorage.setItem("pomodoroUntilMs", 0)
    setTicking(false);
    onStop?.();
  }, [onStop]);

  const reset = useCallback(() => {
    console.log('resetting pomodoro')
    setTicking(false);
    setCurrentSecondsLeft()
    setProgress(0);
    onStop?.();
  }, [onStop]);

  return {
    start,
    stop,
    reset,
    ticking,
    currentSecondsLeft: currentSecondsLeft || initialSeconds,
    progress,
  };
}
