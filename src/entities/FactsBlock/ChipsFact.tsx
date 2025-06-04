import { useEffect, useState } from "react";

const startDate = new Date("2025-03-15T00:00:00");

const ChipsFact = () => {
  const [elapsedMs, setElapsedMs] = useState(
    () => Date.now() - startDate.getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startDate.getTime());
    }, 100); // обновляем каждые 100 мс
    return () => clearInterval(interval);
  }, []);

  const seconds = elapsedMs / 1000;
  const chips = Math.floor(seconds * 40000); // 40 000 чипсинок в секунду

  return (
    <div>
      <span>За это время на конвейерах Lay’s было произведено примерно </span>
      <strong>{chips.toLocaleString()} штук чипсав</strong>
    </div>
  );
};

export default ChipsFact;
