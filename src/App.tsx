/// <reference types="vite-plugin-svgr/client" />
import './App.css'
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
import CodeProjectsMobile from './pages/mobile/mobileCodeProjects/CodeProjectsMobile'
import { DesktopModeProvider } from './Providers/Desktop/DesktopProvider'
import { ActiveScreenProvider } from './Providers/ActiveScreenProvider/ActiveScreenContext'



function App() {
  const [particlesVisible, setParticlesVisible] = useState(true)

  return (
    <>
      <DesktopModeProvider initialDesktopView={false}>
        <ParticlesContext.Provider value={{ particlesVisible, setParticlesVisible }}>
          <ParticlesBackground />
          <ActiveScreenProvider>
            {/* TODO: can we set default home route to automatically redirect to '/mobile' */}
            <CodeProjectsMobile />
          {/* <ParallaxProvider>
            <ParallaxFix />
            <Router>
              <div className="AnimatedRoutes-wrapper">

                <AnimatedRoutes />
              </div>
            </Router>
          </ParallaxProvider> */}

          </ActiveScreenProvider>
        </ParticlesContext.Provider>
      </DesktopModeProvider>

      {/* <FadeIn /> */}
      {/* <ParallaxSection /> */}
      {/* <GsapAnimation /> */}
    </>
  )
}

export default App
