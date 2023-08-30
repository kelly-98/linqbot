import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Claim from "./components/Claim";
import Footer from "./components/Footer";
import "./common.scss";
import Home from "./components/Home";
import ComingSoon from "./components/CominngSoon";
import Stake from "./components/Stake";

function App() {
  return (
    <div className="app min-h-[100vh] relative" lang="en-US">
      <Router>
        <div className="relative min-h-screen z-10 flex flex-col justify-center items-center">
          <Header />

          <div className="flex-1 container flex justify-center items-center max-w-4xl w-full">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route path="/claim" element={<Claim />} />
            </Routes>
            <Routes>
              <Route path="/stake" element={<Stake />} />
            </Routes>
            <Routes>
              <Route path="/analytics" element={<ComingSoon />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
