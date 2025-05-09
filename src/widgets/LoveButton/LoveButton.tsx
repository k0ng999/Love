import { useState, useEffect, useRef } from "react";
import s from "./LoveButton.module.scss";
import HeartIcon from "./heart.svg?react";
import clsx from "clsx";

type Bubble = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
};

export default function LoveButton() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [shrunk, setShrunk] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [animating, setAnimating] = useState(false);

  const pressStartTimeRef = useRef<number | null>(null);
  const shakeTimerRef = useRef<number | null>(null);
  const rampTimerRef = useRef<number | null>(null);
  const bubbleTimerRef = useRef<number | null>(null);

  const bubbleCount = 30;
  const delayStep = 0.05; // сек
  const bubbleAnimDur = 0.8; // сек
  const SHAKE_INTERVAL = 700; // мс
  const RAMP_DURATION = 520; // мс

  const clearTimers = () => {
    [shakeTimerRef, rampTimerRef, bubbleTimerRef].forEach((ref) => {
      if (ref.current) {
        clearTimeout(ref.current);
        ref.current = null;
      }
    });
  };

  const generateBubbles = () => {
    const now = Date.now();
    const newB = Array.from({ length: bubbleCount }).map((_, i) => ({
      id: now + i,
      left: Math.random() * 100,
      top: 40 + Math.random() * 20,
      size: 40 + Math.random() * 40,
      delay: i * delayStep,
    }));
    setBubbles(newB);

    const totalMs = ((bubbleCount - 1) * delayStep + bubbleAnimDur) * 1000;
    bubbleTimerRef.current = window.setTimeout(() => {
      setBubbles([]);
      setAnimating(false);
    }, totalMs);
  };

  const endShakeAndRamp = () => {
    setShrunk(false);
    rampTimerRef.current = window.setTimeout(() => {
      setIsShaking(false);
      generateBubbles();
    }, RAMP_DURATION);
  };

  const handlePressStart = () => {
    // блокируем во время любых анимаций
    if (animating || bubbles.length > 0) return;

    clearTimers();
    setBubbles([]);
    setAnimating(true);
    setShrunk(true);
    setIsShaking(true);
    pressStartTimeRef.current = Date.now();
  };

  const handlePressEnd = () => {
    // игнорируем если не в активной анимации, или уже запланирован endShakeAndRamp
    if (
      !animating ||
      !isShaking ||
      pressStartTimeRef.current === null ||
      shakeTimerRef.current !== null
    ) {
      return;
    }

    const held = Date.now() - pressStartTimeRef.current;
    const cycles = Math.ceil(held / SHAKE_INTERVAL) || 1;
    const delayToRamp = cycles * SHAKE_INTERVAL - held;

    shakeTimerRef.current = window.setTimeout(endShakeAndRamp, delayToRamp);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleClick = () => {
    console.log(123);
  };
  const onMouseDown = () => {
    handlePressStart();
    handleClick();
  };

  return (
    <div className={s.wrapper}>
      <button
        className={clsx(
          s.header_block,
          shrunk && s.pressed,
          isShaking && s.shake
        )}
        onMouseDown={onMouseDown}
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
        <div className={clsx(s.heart, animating && s.heartPaused)}>
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
