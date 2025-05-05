import { useEffect } from "react";

const useOrientationLock = () => {
  useEffect(() => {
    const lockOrientation = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Если ориентация горизонтальная, возвращаем в портретную
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0); // Сбрасываем прокрутку
      } else {
        document.body.style.overflow = "auto"; // Включаем прокрутку в портретной ориентации
      }
    };

    const mediaQuery = window.matchMedia("(orientation: landscape)");

    mediaQuery.addEventListener("change", lockOrientation);

    // Проверяем на старте
    if (mediaQuery.matches) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }

    return () => {
      mediaQuery.removeEventListener("change", lockOrientation);
    };
  }, []);
};

export default useOrientationLock;
