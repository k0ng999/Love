import s from "./AllFacts.module.scss";
import ChipsFact from "./ChipsFact";
import CoffeeFact from "./CoffeeFact";
import BurgersFact from "./BurgersFact";
import YoutubeFact from "./YoutubeFact";
import PhotosFact from "./PhotosFact";
import HeartbeatsFact from "./HeartbeatsFact";
import BirthsFact from "./BirthsFact";
import AnimateOnScroll from "./AnimateOnScroll"; // добавим этот компонент

const AllFacts = () => {
  const facts = [
    <ChipsFact key="chips" />,
    <HeartbeatsFact key="heartbeats" />,
    <YoutubeFact key="youtube" />,
    <PhotosFact key="photos" />,
    <BurgersFact key="burgers" />,

    <CoffeeFact key="coffee" />,
    <BirthsFact key="births" />,
    <div className={s.footer}>
      Все цифры официальные и подтверждены лично АБАМАЙ R R
    </div>,
  ];

  return (
    <div className={s.header_block}>
      {facts.map((fact, index) => (
        <AnimateOnScroll
          key={index}
          from={index % 2 === 0 ? "left" : "right"}
          threshold={0.6}
        >
          {fact}
        </AnimateOnScroll>
      ))}
    </div>
  );
};

export default AllFacts;
