import { useInView } from "react-intersection-observer";
import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./AnimateOnScroll.module.scss";

interface Props {
  children: ReactNode;
  from: "left" | "right" | "bottom";
  threshold?: number;
}

const AnimateOnScroll = ({ children, from, threshold }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: threshold || 0.4,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);

  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollDirection.current = currentY < lastScrollY.current ? "up" : "down";
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (inView && scrollDirection.current === "down" && !hasAnimated) {
      setHasAnimated(true); // запускаем transform-анимацию один раз
      setIsOpaque(true);
    } else if (inView) {
      setIsOpaque(true);
    } else if (!inView && scrollDirection.current === "up") {
      setIsOpaque(false); // возвращаем opacity при скролле вверх
    } else if (!inView && scrollDirection.current === "down") {
      setIsOpaque(false); // блок уходит вверх → делаем прозрачным
    }
    // при !inView + scroll up ничего не делаем
  }, [inView]);

  return (
    <div
      ref={ref}
      className={clsx(
        styles.animateItem,
        styles[from],
        hasAnimated && styles.animated, // применим transform только один раз
        isOpaque && styles.opaque // только opacity: 1
      )}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
