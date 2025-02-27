import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DarkModeToggle from "./components/common/DarkModeToggle";
import LocationButton from "./components/LocationButton";

import logowhite from "./assets/images/logowhite.svg";
import logoblack from "./assets/images/logoblack.svg";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <header className="dark:bg-darkGray flex bg-white p-4 shadow-md">
          <div>
            <h2>
              <img src={logoblack} alt="peak 로고" className="block w-24 dark:hidden" />
              <img src={logowhite} alt="peak 로고" className="hidden w-24 dark:block" />
            </h2>
          </div>
          <div className="flex justify-end space-x-5">
            <DarkModeToggle />
            <LocationButton />
          </div>
        </header>

        {/* 페이지 라우팅 */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
