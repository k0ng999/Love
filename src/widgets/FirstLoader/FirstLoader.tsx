import s from "./FirstLoader.module.scss";

function FirstLoader() {
  return (
    <svg
      className={s.heartLoader}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 90 90"
      version="1.1"
    >
      <g className={s.heartLoader__group}>
        <path
          className={s.heartLoader__square}
          strokeWidth="1"
          fill="none"
          d="M0,30 0,90 60,90 60,30z"
        />
        <path
          className={`${s.heartLoader__circle} ${s.mLeft}`}
          strokeWidth="1"
          fill="none"
          d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
        />
        <path
          className={`${s.heartLoader__circle} ${s.mRight}`}
          strokeWidth="1"
          fill="none"
          d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
        />
        <path
          className={s.heartLoader__heartPath}
          strokeWidth="2"
          d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"
        />
      </g>
    </svg>
  );
}

export default FirstLoader;
