/// <reference types="vite-plugin-svgr/client" />
import "./App.css";
import { useState } from "react";
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
import DesktopHomePage from "./pages/desktop/DesktopHomePage";

function App() {
  const [particlesVisible, setParticlesVisible] = useState(true);

  return (
    <>
      <DesktopModeProvider initialDesktopView={false}>
        <ParticlesContext.Provider
          value={{ particlesVisible, setParticlesVisible }}
        >
          <ParticlesBackground />
          <ActiveScreenProvider>
            <ParallaxProvider>
              <ParallaxFix />
              <Router>
                <div className="AnimatedRoutes-wrapper">
                <Routes>
                  <Route path="/" element={<Navigate to="/mobile" replace />} />
                  <Route path="/mobile" element={<CodeProjectsMobile />}></Route>
                  <Route path="/desktop" element={<DesktopHomePage />}></Route>
                </Routes>
                </div>
              </Router>
            </ParallaxProvider>
          </ActiveScreenProvider>
        </ParticlesContext.Provider>
      </DesktopModeProvider>

      {/* <FadeIn /> */}
      {/* <ParallaxSection /> */}
      {/* <GsapAnimation /> */}
    </>
  );
}

export default App;
