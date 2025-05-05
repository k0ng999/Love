import { useState } from "react";
import s from "./HeartPulse.module.scss";
import clsx from "clsx";

function HeartPulse() {
  const [enlarged, setEnlarged] = useState(false);

  const toggleHeartSize = () => {
    setEnlarged(true);
  };

  return (
    <div
      className={clsx(s.header_block, enlarged && s.header_block_close)}
      onClick={toggleHeartSize}
    >
      <div className={clsx(s.heart, enlarged && s.heart_close)}></div>
    </div>
  );
}

export default HeartPulse;
