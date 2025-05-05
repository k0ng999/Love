import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles/global.scss";
import App from "./app/App.tsx";
import useOrientationLock from "./shared/hooks/useOrientationLock.ts";

const Root = () => {
  useOrientationLock(); // Включаем хук для блокировки ориентации

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
