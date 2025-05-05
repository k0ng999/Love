import { useEffect, useState } from "react";
import s from "./LoveTimeBlock.module.scss";

function getWordForm(number: number, forms: [string, string, string]) {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

function LoveTimeBlock() {
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date("2025-03-15T00:00:00");

    const updateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimePassed({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.header_block}>
      <div className={s.head_text}>Ты радуешь меня уже целых</div>
      <div className={s.time_block}>
        <div>
          {timePassed.days}{" "}
          {getWordForm(timePassed.days, ["день", "дня", "дней"])}
        </div>
        <div>
          {timePassed.hours}{" "}
          {getWordForm(timePassed.hours, ["час", "часа", "часов"])}
        </div>
        <div>
          {timePassed.minutes}{" "}
          {getWordForm(timePassed.minutes, ["минута", "минуты", "минут"])}
        </div>
        <div>
          {timePassed.seconds}{" "}
          {getWordForm(timePassed.seconds, ["секунда", "секунды", "секунд"])}
        </div>
      </div>
    </div>
  );
}

export default LoveTimeBlock;
