import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./AnimateOnScroll.module.scss";

interface Props {
  children: ReactNode;
  from: "left" | "right";
}

const AnimateOnScroll = ({ children, from }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div
      ref={ref}
      className={clsx(
        styles.animateItem,
        from === "left" && styles.left,
        from === "right" && styles.right,
        inView && styles.visible
      )}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
