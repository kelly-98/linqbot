import Header from "./components/Header";

import "./common.scss";
import Intro from "./components/Intro";
import Pool from "./components/Pool";
import Referral from "./components/Referral";
import Miner from "./components/Miner";
import Footer from "./components/Footer";
import Community from "./components/Community";

function App() {
  return (
    <div className="app" lang="en-US">
      <div className="container">
        <Header />
        <Intro />
        <Pool />
        <Community />
      </div>
      <Footer />
    </div>
  );
}

export default App;
