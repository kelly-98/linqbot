import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Pool from "./components/Pool";
import Footer from "./components/Footer";
import bg from "./assets/image/bg-main.png";
import "./common.scss";

function App() {
  return (
    <div className="app min-h-[100vh] relative" lang="en-US">
      <Router>
        <div className="relative min-h-screen z-10 container flex flex-col justify-center items-center bg-[url('./assets/image/bg-main.png')] bg-cover">
          <Header />

          <div className="flex-1 flex justify-center items-center max-w-4xl w-full">
            <Routes>
              <Route path="/" element={<Pool />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
