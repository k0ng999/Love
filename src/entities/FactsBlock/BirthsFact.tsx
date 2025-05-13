// BirthsFact.tsx
import { useEffect, useState } from "react";

const startDate = new Date("2025-03-15T00:00:00");

const BirthsFact = () => {
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
  const babies = Math.floor(seconds / 1.5);

  return (
    <div>
      <span>В мире родилось </span>
      <strong>{babies.toLocaleString()} пиздюка</strong>
    </div>
  );
};

export default BirthsFact;
