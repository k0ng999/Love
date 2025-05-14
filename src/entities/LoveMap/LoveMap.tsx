import { useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import s from "./LoveMap.module.scss";

type Place = {
  coords: [number, number];
  name: string;
  hint?: string;
};

const LoveMap = () => {
  const mapRef = useRef<any>(null);
  const [ymapsInstance, setYmapsInstance] = useState<any>(null);

  const places: Place[] = [
    {
      coords: [44.950777, 34.099251],
      name: "ЦЕНТАР (мусорка для отходников)",
    },
    {
      coords: [44.967127, 34.092815],
      name: "Дом Ивановского Ивана Сергеевича",
    },
    {
      coords: [44.912177, 34.145046],
      name: "Дом Ангелины",
    },
    {
      coords: [44.940042, 34.096926],
      name: "Дом Пидара",
    },
    {
      coords: [44.964054, 34.0996],
      name: "Гагаринский хуй",
    },
    {
      coords: [44.949777, 34.102018],
      name: "ЦУМ (OMFG)",
    },
    {
      coords: [44.938268, 34.09383],
      name: "CENTRUM (AMERICA)",
    },
    {
      coords: [44.919002, 34.151281],
      name: "Водадрачилище",
    },
    {
      coords: [44.912495, 34.138218],
      name: "Завод кирпичей (after ХАЛАКОСТ)",
    },
    {
      coords: [44.942707, 34.097225],
      name: "Надроченый дракон",
    },
    {
      coords: [44.941992, 34.131292],
      name: "Сад Батаников и очкариков",
    },
    {
      coords: [44.676411, 34.410129],
      name: "Турция (Алушта)",
    },
    {
      coords: [44.672521, 34.414999],
      name: "Старик усатыч (Турция)",
    },
  ];

  const handleClick = (coords: [number, number]) => {
    if (mapRef.current && ymapsInstance) {
      mapRef.current.setCenter(coords, 16, {
        duration: 500,
      });
    }
  };

  const handlePlaceClick = () => {
    const mapBlock = document.getElementById("mapBlock");
    if (mapBlock) {
      mapBlock.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={s.head_text}>Карта мест где мы были</div>
      <div className={s.wrapper}>
        <div id="mapBlock" className={s.header_map_block}>
          {/* Добавил ID для блока с картой */}
          <YMaps query={{ apikey: "4e9d2827-a705-49c4-bae9-cb1a470a9084" }}>
            <Map
              defaultState={{
                center: [44.967127, 34.092815],
                zoom: 12,
                type: "yandex#hybrid",
                controls: [],
              }}
              width="100%"
              height="108%"
              instanceRef={(ref) => {
                mapRef.current = ref;
              }}
              onLoad={(ymaps: any) => setYmapsInstance(ymaps)}
            >
              {places.map((place, idx) => (
                <Placemark key={idx} geometry={place.coords} />
              ))}
            </Map>
          </YMaps>
        </div>
      </div>
      <ul className={s.place_list}>
        {places.map((place, idx) => (
          <li
            key={idx}
            onClick={() => {
              handleClick(place.coords);
              handlePlaceClick(); // Скролл к карте
            }}
            style={{ cursor: "pointer" }}
          >
            <div className={s.nums}>
              <div className={s.padding_block}>
                <div></div>
                {idx + 1}
                <div className={s.last}></div>
              </div>
            </div>
            <div className={s.text}>
              <div className={s.padding_block}>
                <div></div>
                {place.name}
                <div className={s.last}></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LoveMap;
