// YoutubeFact.tsx
import { useEffect, useState } from "react";

const startDate = new Date("2025-03-15T00:00:00");

const YoutubeFact = () => {
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
  const videos = Math.floor(seconds * 5);

  return (
    <div>
      <span>Бездельники на YouTube посмотрели примерно </span>
      <strong>{videos.toLocaleString()} видиков, хихихи</strong>
    </div>
  );
};

export default YoutubeFact;
