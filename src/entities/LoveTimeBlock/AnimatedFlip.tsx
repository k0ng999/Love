import { useEffect, useState } from "react";
import clsx from "clsx";
import s from "./AnimatedFlip.module.scss";

type Props = {
  content: string;
};

function AnimatedFlip({ content }: Props) {
  const [prev, setPrev] = useState(content);
  const [animating, setAnimating] = useState(false);
  const [current, setCurrent] = useState(content);

  useEffect(() => {
    if (content !== current) {
      setPrev(current);
      setAnimating(true);

      const timeout = setTimeout(() => {
        setCurrent(content);
        setAnimating(false);
      }, 600); // длительность анимации

      return () => clearTimeout(timeout);
    }
  }, [content, current]);

  return (
    <div className={s.flip_container}>
      {animating ? (
        <>
          <div className={clsx(s.flip_item, s.animate_out)}>{prev}</div>
          <div className={clsx(s.flip_item, s.animate_in)}>{content}</div>
        </>
      ) : (
        <div className={s.static}>{current}</div>
      )}
    </div>
  );
}

export default AnimatedFlip;
