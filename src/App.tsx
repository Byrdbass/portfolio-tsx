/// <reference types="vite-plugin-svgr/client" />
import "./App.css";

import { useRef, useState } from "react";
import { DesktopModeProvider } from "./Providers/Desktop/DesktopProvider";
import ParticlesContext from "./Providers/ParticlesProvider/ParticlesContext";
import { ActiveScreenProvider } from "./Providers/ActiveScreenProvider/ActiveScreenContext";
// import GsapAnimation from './components/examples/gasp'
// import ParallaxSection from './components/examples/parallax'
// import FadeIn from './components/examples/reactSpring'
import { ParallaxProvider } from "react-scroll-parallax";
import ParallaxFix from "./Providers/ParallaxProvider/ParallaxFix";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AnimatedRoutes from "./Providers/Animated/AnimatedRoutes";
import ParticlesBackground from "./components/particles/ParticlesBackground";
import CodeProjectsMobile from "./pages/mobile/mobileCodeProjects/CodeProjectsMobile";
import DesktopHomePage from "./pages/desktop/home/DesktopHomePage";
import RouteHandler from "./routes/RouteHandler";
import SwitchLayoutButton from "./components/buttons/switchLayoutButton/switchLayoutButton";

function App() {
  const scrollContainerRef = useRef(null)
  const [particlesVisible, setParticlesVisible] = useState(true);
  // if location is NOT desktop -> this value is false
  const initialDesktopView = window.location.pathname === "/desktop"
  return (
    <div ref={scrollContainerRef}>
      <DesktopModeProvider initialDesktopView={initialDesktopView}>
        <ParticlesContext.Provider
          value={{ particlesVisible, setParticlesVisible }}
        >
          <ParticlesBackground />
          <ActiveScreenProvider>
            <Router>
              <SwitchLayoutButton />
              {/* <div className="AnimatedRoutes-wrapper"> */}
              <RouteHandler />
              {/* </div> */}
            </Router>
            {/* <ParallaxProvider>
              <ParallaxFix />
            </ParallaxProvider> */}
          </ActiveScreenProvider>
        </ParticlesContext.Provider>
      </DesktopModeProvider>

      {/* <FadeIn /> */}
      {/* <ParallaxSection /> */}
      {/* <GsapAnimation /> */}
    </div>
  );
}

export default App;
