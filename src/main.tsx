import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles/global.scss";
import App from "./app/App.tsx";

const Root = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
