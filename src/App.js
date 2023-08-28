import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Pool from "./components/Pool";
import Footer from "./components/Footer";
import video from "./assets/image/bg.mp4";
import "./common.scss";

function App() {
  return (
    <div className="app min-h-[100vh] relative" lang="en-US">
      <video
        className="video h-full w-full object-cover absolute z-1 top-0 bottom-0 right-0 left-0"
        autoPlay
        muted
        loop
        playsInline>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Router>
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center">
          <Header />

          <div className="container py-10 flex-1 flex justify-center items-center max-w-4xl w-full">
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
