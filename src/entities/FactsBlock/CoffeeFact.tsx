// CoffeeFact.tsx
import { useEffect, useState } from "react";

const startDate = new Date("2025-03-15T00:00:00");

const CoffeeFact = () => {
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
  const cups = Math.floor(seconds * 0.28);

  return (
    <div>
      <span>В Starbucks сварили около </span>
      <strong>{cups.toLocaleString()} чашек гавна</strong>
    </div>
  );
};

export default CoffeeFact;
