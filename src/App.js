import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Pool from "./components/Pool";
import Footer from "./components/Footer";
import "./common.scss";
import Stake from "./components/Stake";

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

          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
