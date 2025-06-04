import s from "./MainPage.module.scss";
import FirstLoader from "../../widgets/FirstLoader/FirstLoader";
import HeartPulse from "../../widgets/HeartPulse/HeartPulse";
import { useEffect, useState } from "react";
import clsx from "clsx";
import LoveTimeBlock from "../../entities/LoveTimeBlock/LoveTimeBlock";
import LoveButton from "../../widgets/LoveButton/LoveButton";
import AllFacts from "../../entities/FactsBlock/AllFacts";
import LoveMap from "../../entities/LoveMap/LoveMap";
import AnimateOnScroll from "../../entities/FactsBlock/AnimateOnScroll";
import { PhotoBlock } from "../../entities/PhotoBlock/PhotoBlock";
function MainPage() {
  const [firstClick, setFirstClick] = useState(false);
  const [showHeart, setShowHeart] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showLoaderClose, setShowLoaderClose] = useState(false);

  useEffect(() => {
    if (showLoaderClose) {
      setTimeout(() => setShowLoader(false), 400);
    }
  }, [showLoaderClose]);

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
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [firstClick]);

  return (
    <>
      {showLoader && (
        <div
          className={clsx(s.loader, showLoaderClose && s.loader_close)}
          onClick={() => setShowLoaderClose(true)}
        >
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
        <div className={s.background_block}>
          <div className={s.backHeart}>
            <LoveTimeBlock></LoveTimeBlock>
            <LoveButton></LoveButton>
          </div>
        </div>

        <AnimateOnScroll key={"allFacts"} from="bottom" threshold={0.01}>
          <div className={s.background_block}>
            <AllFacts></AllFacts>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll key={"map"} from="bottom" threshold={0.01}>
          <div className={s.background_block}>
            <LoveMap />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll key={"photo"} from="bottom" threshold={0.01}>
          <div className={s.background_block}>
            <PhotoBlock></PhotoBlock>
          </div>
        </AnimateOnScroll>
      </div>
    </>
  );
}

export default MainPage;
