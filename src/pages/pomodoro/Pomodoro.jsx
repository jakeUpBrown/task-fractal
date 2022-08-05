import React, { useEffect, useState } from 'react'
import Timer from './components/Timer';
import Header from "./components/Header";
import classes from "./App.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";

const Pomodoro = () => {
    /*
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(25 * 60);
  const [timer, setTimer] = useState();

  const start = () => {
    const timer = setInterval(() => {
      setTotalSecondsLeft((totalSecondsLeft) => totalSecondsLeft - 1);
      if (totalSecondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    if (totalSecondsLeft === 0) {
      clearInterval(timer);
    }
  }, [totalSecondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const minutesLeft = Math.floor(totalSecondsLeft / 60)
  const secondsLeft = totalSecondsLeft % 60
  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <button onClick={start}>start</button>
      <div>{minutesLeft} : {secondsLeft}</div>
    </div>
  );
  */
  const mode = useSelector((state) => state.timer.mode);

    return (
    <div className={clsx(classes.container, classes[mode])}>
        <Header />
        <div className={classes.content}>
            <Timer />
        </div>
    </div>
    )
}

export default Pomodoro;