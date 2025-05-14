import { useState, useEffect, useRef } from "react";
import s from "./LoveButton.module.scss";
import HeartIcon from "./heart.svg?react";
import clsx from "clsx";
import axios, { AxiosError } from "axios";

type Bubble = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
};

export default function LoveButton() {
  const [error, setError] = useState<string | null>(null);

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
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    } else {
      handlePush();
    }

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

  const hadndleSendNotification = () => {
    handlePressStart();
    handlePush();
  };
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  // Регистрируем service worker один раз
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/Love/sw.js").then((reg) => {
        setRegistration(reg);
      });
    }
  }, []);

  const requestPermissionAndSubscribe = async () => {
    if (!registration) return alert("Service Worker не зарегистрирован");

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Разрешение не получено");
      return;
    }

    // const publicKey =
    //   "BLJwDpwOACqIj4pn9vkzHE9wyrSvR64EzbzCdjK5G4GKRzMXv9d_Fr2qzdSuwtXxVI35-ZPlIPJDxlYZoz00fr4";
    // const sub = await registration.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: urlBase64ToUint8Array(publicKey),
    // });

    // await axios.post("https://loveback.onrender.com/subscribe", sub);
    setIsSubscribed(true);
  };
  const handlePush = async () => {
    try {
      requestPermissionAndSubscribe();
      if (!registration) return alert("Service Worker не зарегистрирован");
      const sub = await registration.pushManager.getSubscription();

      const res = await axios.post(
        "https://loveback.onrender.com/sendNotification",
        {
          senderSubscription: sub,
        }
      );

      // Проверяем, что пришло от сервера
      console.log("Response:", res.data); // Логируем ответ с сервера

      if (res.data.error) {
        // Если есть ошибка, показываем её
        setError(`Ошибка: ${res.data.error}`);
      } else if (res.data.success) {
        // Если успех, показываем успех
        setError(`Успех: ${res.data.success}`);
      } else {
        setError("Неизвестный ответ от сервера");
      }
    } catch (err: unknown) {
      console.error("Ошибка при отправке уведомления:", err);

      if (err instanceof AxiosError) {
        const errorDetails = `
        Сообщение: ${err.message}
        Код ошибки: ${err.code}
        Конфигурация запроса: ${JSON.stringify(err.config, null, 2)}
        Ответ сервера: ${JSON.stringify(err.response, null, 2)}
      `;
        setError(errorDetails);
      } else if (err instanceof Error) {
        setError(`Ошибка: ${err.message}`);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <div className={s.wrapper}>
      {/* <button onClick={requestPermissionAndSubscribe}>
        Разрешить уведомления
      </button> */}

      <button
        className={clsx(
          s.header_block,
          shrunk && s.pressed,
          isShaking && s.shake
        )}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={hadndleSendNotification}
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

// Утилита: перевод base64 в Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
