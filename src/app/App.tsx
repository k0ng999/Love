import MainPage from "../pages/Main/MainPage";

import "./App.scss";

function App() {
  window.addEventListener("orientationchange", function () {
    if (window.orientation === 90 || window.orientation === -90) {
      window.orientation = 0; // Возвращает ориентацию в портретный режим
    }
  });

  return <MainPage></MainPage>;
}

export default App;
