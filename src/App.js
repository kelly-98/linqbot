import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Pool from "./components/Pool";
import Footer from "./components/Footer";
import "./common.scss";
import Stake from "./components/Stake";

import cloud1 from "./assets/image/cloud-1.png";
import cloud2 from "./assets/image/cloud-2.png";
import cloud3 from "./assets/image/cloud-3.png";

function App() {
  return (
    <div className="app min-h-[100vh] relative" lang="en-US">
      <Router>
        <Header />

        <div className="relative min-h-screen z-10 container flex flex-col justify-center items-center">
          <div className="flex-1 flex justify-center items-center w-full">
            <Routes>
              <Route path="/" element={<Pool />} />
              <Route path="/stake" element={<Stake />} />
            </Routes>
          </div>

          <div className="hidden lg:block max-w-[250px] absolute top-10 -left-10">
            <img src={cloud1} alt="" />
          </div>

          <div className="hidden lg:block  max-w-[200px] absolute top-10 right-0">
            <img src={cloud2} alt="" />
          </div>
          <div className="hidden lg:block  max-w-[250px] absolute bottom-20 left-0">
            <img src={cloud3} alt="" />
          </div>

          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
