/// <reference types="vite-plugin-svgr/client" />
import './App.css'
// import AnimatedComponent from './components/examples/framer-motion'
// import GsapAnimation from './components/examples/gasp'
// import ParallaxSection from './components/examples/parallax'
// import FadeIn from './components/examples/reactSpring'
import { ParallaxProvider } from 'react-scroll-parallax'
import ParallaxFix from './Providers/ParallaxProvider/ParallaxFix'
import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './Providers/Animated/AnimatedRoutes'
import ParticlesBackground from './components/particles/ParticlesBackground'
import ParticlesContext from './Providers/ParticlesProvider/ParticlesContext'
import { useState } from 'react'
import CodeProjectsMobile from './components/mobile/mobileCodeProjects/CodeProjectsMobile'
import DesktopContext from './Providers/Desktop/DesktopProvider'


function App() {
  const [particlesVisible, setParticlesVisible] = useState(true)
  const [ DesktopView, setDesktopView] = useState(false);

  return (
    <>
      <DesktopContext.Provider value={{ DesktopView, setDesktopView }}>
        <ParticlesContext.Provider value={{ particlesVisible, setParticlesVisible }}>
          <ParallaxProvider>
            <ParallaxFix />
            <Router>
              <ParticlesBackground />
              <CodeProjectsMobile />
              <div className="AnimatedRoutes-wrapper">

                <AnimatedRoutes />
              </div>
            </Router>
          </ParallaxProvider>
        </ParticlesContext.Provider>
      </DesktopContext.Provider>
      {/* <FadeIn /> */}
      {/* <ParallaxSection /> */}
      {/* <GsapAnimation /> */}
      {/* <AnimatedComponent /> */}
    </>
  )
}

export default App
