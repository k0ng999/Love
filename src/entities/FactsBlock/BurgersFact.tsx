// BurgersFact.tsx
import { useEffect, useState } from "react";

const startDate = new Date("2025-03-15T00:00:00");

const BurgersFact = () => {
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
  const burgers = Math.floor(seconds * 0.67);

  return (
    <div>
      <span>В McDonald’s продали примерно </span>
      <strong>{burgers.toLocaleString()} крабсбургеров</strong>
    </div>
  );
};

export default BurgersFact;
