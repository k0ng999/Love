import { useEffect, useState } from "react";
import AnimatedFlip from "./AnimatedFlip";
import s from "./LoveTimeBlock.module.scss";

function getWordForm(n: number, forms: [string, string, string]) {
  const t = Math.abs(n) % 100;
  const u = t % 10;
  if (t > 10 && t < 20) return forms[2];
  if (u > 1 && u < 5) return forms[1];
  if (u === 1) return forms[0];
  return forms[2];
}

export default function LoveTimeBlock() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const start = new Date("2025-03-15T00:00:00");
    const upd = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - start.getTime()) / 1000);
      setTime({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    };
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);

  const items: [number, [string, string, string]][] = [
    [time.days, ["день", "дня", "дней"]],
    [time.hours, ["час", "часа", "часов"]],
    [time.minutes, ["минуту", "минуты", "минут"]],
    [time.seconds, ["секунду", "секунды", "секунд"]],
  ];

  return (
    <div className={s.header_block}>
      <div className={s.head_text}>Ты радуешь меня уже целых</div>
      <div className={s.time_block}>
        {items.map(([num, forms], i) => {
          const txt = `${num} ${getWordForm(num, forms)}`;
          return (
            <div key={i} className={s.item}>
              <AnimatedFlip content={txt} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
