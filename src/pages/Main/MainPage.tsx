import s from "./MainPage.module.scss";
import FirstLoader from "../../widgets/FirstLoader/FirstLoader";
import HeartPulse from "../../widgets/HeartPulse/HeartPulse";
import { useEffect, useState } from "react";
import clsx from "clsx";

function MainPage() {
  const [firstClick, setFirstClick] = useState(false);
  const [showHeart, setShowHeart] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // Скрытие FirstLoader через 7 секунд
  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 7000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  // Скрытие HeartPulse через 1 секунду после клика
  useEffect(() => {
    if (firstClick) {
      const timeout = setTimeout(() => {
        setShowHeart(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [firstClick]);

  return (
    <>
      {showLoader && <FirstLoader />}
      <div className={s.fadeIn}>
        {showHeart && (
          <div
            onClick={() => setFirstClick(true)}
            className={clsx(s.heartPulse, firstClick && s.heartPulseClose)}
          >
            <HeartPulse />
          </div>
        )}
      </div>
    </>
  );
}

export default MainPage;
