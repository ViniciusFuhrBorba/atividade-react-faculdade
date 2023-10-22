import React from "react";
import { TimerBox } from "./TimerBox";
import './Timer.css'

export function Timer(props) {
  return (
    <div className="timer">
      <h3>{props.message}</h3>
      <div className="timer-content">
        <TimerBox title="Anos" value={props.years} />
        <TimerBox title="Mêses" value={props.months} />
        <TimerBox title="Dias" value={props.days} />
        <TimerBox title="Horas" value={props.hours} />
        <TimerBox title="Minutos" value={props.minutes} />
        <TimerBox title="Segundos" value={props.seconds} />
      </div>
    </div>
  );
}
