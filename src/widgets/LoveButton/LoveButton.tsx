import { useState, useEffect, useRef } from "react";
import s from "./LoveButton.module.scss";
import HeartIcon from "./heart.svg?react";

type Bubble = {
  id: number;
  left: number; // в процентах
  top: number; // в процентах
  size: number; // в px
  delay: number; // в секундах
};

function LoveButton() {
  const [pressed, setPressed] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const bubbleClearTimeoutRef = useRef<number | null>(null);
  const shrinkTimeoutRef = useRef<number | null>(null);
  const pressStartTimeRef = useRef<number>(0);

  const bubbleCount = 20;
  const delayStep = 0.05; // сек
  const animationDuration = 0.8; // сек
  const totalDuration = (bubbleCount - 1) * delayStep + animationDuration; // сек

  // При нажатии: устанавливаем состояние, генерим пузырьки и планируем их очистку
  const handlePressStart = () => {
    if (bubbleClearTimeoutRef.current) {
      clearTimeout(bubbleClearTimeoutRef.current);
    }
    if (shrinkTimeoutRef.current) {
      clearTimeout(shrinkTimeoutRef.current);
    }

    pressStartTimeRef.current = Date.now();
    setPressed(true);
    setShrunk(true);

    // Сначала очищаем старые пузырьки
    setBubbles([]);

    // Через микро-задачу добавляем новые
    setTimeout(() => {
      const timestamp = Date.now(); // для уникальности
      const newBubbles: Bubble[] = Array.from({ length: bubbleCount }).map(
        (_, i) => ({
          id: timestamp + i, // уникальный id
          left: Math.random() * 100,
          top: 40 + Math.random() * 20,
          size: 40 + Math.random() * 40,
          delay: i * delayStep,
        })
      );
      setBubbles(newBubbles);
    }, 0);

    bubbleClearTimeoutRef.current = window.setTimeout(() => {
      setBubbles([]);
    }, totalDuration * 1000);
  };

  // При отпускании: сразу снимаем pressed, а shrunk сбрасываем лишь после окончания анимации
  const handlePressEnd = () => {
    setPressed(false);

    const elapsedMs = Date.now() - pressStartTimeRef.current;
    const remainingMs = totalDuration * 1000 - elapsedMs;

    if (remainingMs > 0) {
      shrinkTimeoutRef.current = window.setTimeout(() => {
        setShrunk(false);
      }, remainingMs);
    } else {
      setShrunk(false);
    }
  };

  // Чистим таймауты при размонтировании
  useEffect(() => {
    return () => {
      if (bubbleClearTimeoutRef.current)
        clearTimeout(bubbleClearTimeoutRef.current);
      if (shrinkTimeoutRef.current) clearTimeout(shrinkTimeoutRef.current);
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <button
        className={`${s.header_block} ${shrunk ? s.pressed : ""}`}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <svg
          className={s.diagonals}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke="currentColor"
            strokeWidth="4"
          />
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>

        <div className={s.heart}>
          <HeartIcon />
        </div>

        {bubbles.length > 0 && (
          <div className={s.bubbles}>
            {bubbles.map((b) => (
              <span
                key={b.id}
                className={s.bubble}
                style={{
                  left: `${b.left}%`,
                  top: `${b.top}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  animationDelay: `${b.delay}s`,
                }}
              />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

export default LoveButton;
