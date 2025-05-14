// PhotoBlock.tsx
import React, { useRef, useEffect } from "react";
import { images } from "../../assets/images";
import s from "./PhotoBlock.module.scss";

export const PhotoBlock: React.FC = () => {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const widthRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartOffset = useRef<number>(0);
  const animationRef = useRef<number>(0);
  const speed = 80; // px/sec

  // Измерить ширину и запустить анимацию
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    // Очистка и дублирование изображений
    strip.innerHTML = "";
    const dup = [...images, ...images];
    dup.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `img-${i}`;
      img.draggable = false;
      img.className = s.photo;
      strip.appendChild(img);
    });

    const singleW = strip.scrollWidth / 2;
    widthRef.current = singleW;

    strip.style.willChange = "transform";

    let prev = performance.now();

    const loop = (now: number) => {
      const dt = (now - prev) * 0.001;
      prev = now;

      if (!isDraggingRef.current) {
        offsetRef.current += speed * dt;
        if (offsetRef.current >= singleW) offsetRef.current -= singleW;
        strip.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      widthRef.current = strip.scrollWidth / 2;
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Drag события
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const onDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      dragStartX.current = e.clientX;
      dragStartOffset.current = offsetRef.current;
      (e.target as Element).setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartX.current;
      let next = dragStartOffset.current - dx;
      const W = widthRef.current;
      if (next < 0) next += W;
      if (next >= W) next -= W;
      offsetRef.current = next;
      if (strip) strip.style.transform = `translateX(-${next}px)`;
    };

    const onUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      (e.target as Element).releasePointerCapture(e.pointerId);
    };

    strip.addEventListener("pointerdown", onDown);
    strip.addEventListener("pointermove", onMove);
    strip.addEventListener("pointerup", onUp);
    strip.addEventListener("pointerleave", onUp);

    return () => {
      strip.removeEventListener("pointerdown", onDown);
      strip.removeEventListener("pointermove", onMove);
      strip.removeEventListener("pointerup", onUp);
      strip.removeEventListener("pointerleave", onUp);
    };
  }, []);

  return (
    <div className={s.header_block}>
      <div className={s.title}>А это типо мы</div>

      <div className={s.photoBlock}>
        <div ref={stripRef} className={s.photoStrip} />
      </div>
    </div>
  );
};
