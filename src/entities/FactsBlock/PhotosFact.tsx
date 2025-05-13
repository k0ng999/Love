// PhotosFact.tsx
import { useEffect, useState } from "react";

const startDate = new Date("2025-03-15T00:00:00");

const PhotosFact = () => {
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
  const photos = Math.floor(seconds * 1.2);

  return (
    <div>
      <span>Человечки по всему миру сделали </span>
      <strong>{photos.toLocaleString()} чёртавых фотак</strong>
    </div>
  );
};

export default PhotosFact;
