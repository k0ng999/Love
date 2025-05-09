import s from "./MainPage.module.scss";
import FirstLoader from "../../widgets/FirstLoader/FirstLoader";
import HeartPulse from "../../widgets/HeartPulse/HeartPulse";
import { useEffect, useState } from "react";
import clsx from "clsx";
import LoveTimeBlock from "../../entities/LoveTimeBlock/LoveTimeBlock";
import LoveButton from "../../widgets/LoveButton/LoveButton";

function MainPage() {
  const [firstClick, setFirstClick] = useState(false);
  const [showHeart, setShowHeart] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // Скрытие FirstLoader через 7 секунд
  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  // Скрытие HeartPulse через 1 секунду после клика
  useEffect(() => {
    if (firstClick) {
      const timeout = setTimeout(() => {
        setShowHeart(false);
        document.body.style.overflow = "auto";
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [firstClick]);

  return (
    <>
      {showLoader && (
        <div className={s.loader}>
          <FirstLoader />
        </div>
      )}
      <div className={s.fadeIn}>
        {showHeart && (
          <div
            onClick={() => setFirstClick(true)}
            className={clsx(s.heartPulse, firstClick && s.heartPulseClose)}
          >
            <HeartPulse />
          </div>
        )}
        <LoveTimeBlock></LoveTimeBlock>
        <LoveButton></LoveButton>
      </div>
    </>
  );
}

export default MainPage;
