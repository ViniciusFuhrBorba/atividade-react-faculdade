import React, { useEffect, useState } from "react";
import { Timer } from "./Timer";
import { PageHeader } from "./PageHeader";

import "./HomePage.css";

const DEFAULT_TIME = {
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function HomePage() {
  const [title, setTitle] = useState("AULA AO VIVO");
  const [subtitle, setSubtitle] = useState("ReactJS - Primeiros Passos");
  const [message, setMessage] = useState("A aula começa em");
  const [endDate, setEndDate] = useState(new Date(2023, 9, 20, 20, 55, 0, 0));
  const [time, setTime] = useState(calcTime(endDate));
  const [tick, setTick] = useState(null);

  function calcTime(endDate) {
    const currentDate = new Date();

    let years = 0;
    if (endDate.getFullYear() > currentDate.getFullYear()) {
      years = endDate.getFullYear() - currentDate.getFullYear();
    }
    if (years < 0) {
      return DEFAULT_TIME;
    }

    let months = endDate.getMonth() - currentDate.getMonth();
    if (months < 0) {
      months += 12;
      years--;
    }
    if (months < 0) {
      return DEFAULT_TIME;
    }

    let days = endDate.getDate() - currentDate.getDate();
    if (days < 0) {
      days += 30;
      months--;
    }
    if (days < 0) {
      return DEFAULT_TIME;
    }

    let hours = endDate.getHours() - currentDate.getHours();
    if (hours < 0) {
      hours += 24;
      days--;
    }

    let minutes = endDate.getMinutes() - currentDate.getMinutes();
    if (minutes < 0) {
      minutes += 30;
      hours--;
    }

    let seconds = endDate.getSeconds() - currentDate.getSeconds();
    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }

    const timer = {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };

    return timer;
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data.json");
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setMessage(data.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(time);
    const { years, months, days, hours, minutes, seconds } = time;
    if (
      years >= 0 &&
      months >= 0 &&
      days >= 0 &&
      hours >= 0 &&
      minutes >= 0 &&
      seconds >= 0
    ) {
      const tick = setInterval(() => {
        const time = calcTime(endDate);
        setTime(time);
      }, 1000);
      setTick(tick);
    } else {
      setTime(DEFAULT_TIME);
    }
  }, []);

  useEffect(() => {
    const { years, months, days, hours, minutes, seconds } = time;
    if (
      years <= 0 &&
      months <= 0 &&
      days <= 0 &&
      hours <= 0 &&
      minutes <= 0 &&
      seconds <= 0
    ) {
      window.clearInterval(tick);
    }
  }, [time]);

  const { years, months, days, hours, minutes, seconds } = time;

  return (
    <div className="page">
      <PageHeader title={title} subtitle={subtitle} />
      <Timer
        message={message}
        years={years}
        months={months}
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </div>
  );
}
