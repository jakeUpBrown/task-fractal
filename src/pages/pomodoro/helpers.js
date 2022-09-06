import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function formatTime(time) {
  return dayjs.duration(time, "seconds").format("mm:ss");
}

/*
export function updateTitle(time, mode) {
  const message = mode === POMODORO ? TIME_TO_FOCUS : TIME_FOR_A_BREAK;
  document.title = `${formatTime(time)} - ${message}`;
}
*/