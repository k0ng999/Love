// HeartbeatsFact.tsx
import { useEffect, useState } from "react";

const startDate = new Date("2025-03-15T00:00:00");

const HeartbeatsFact = () => {
  const [elapsedMs, setElapsedMs] = useState(
    () => Date.now() - startDate.getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startDate.getTime());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const seconds = elapsedMs / 1000;
  const heartbeats = Math.floor(seconds * 1.2);

  return (
    <div>
      <span>Сердце среднего чела в покое ударило </span>
      <strong>{heartbeats.toLocaleString()} раз, ДА НУ НАХ!</strong>
    </div>
  );
};

export default HeartbeatsFact;
