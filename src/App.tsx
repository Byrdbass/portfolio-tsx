/// <reference types="vite-plugin-svgr/client" />
import './App.css'
// import AnimatedComponent from './components/examples/framer-motion'
// import GsapAnimation from './components/examples/gasp'
// import ParallaxSection from './components/examples/parallax'
// import FadeIn from './components/examples/reactSpring'
import { ParallaxProvider } from 'react-scroll-parallax'
import ParallaxFix from './Providers/ParallaxProvider/ParallaxFix'
import { BrowserRouter } from 'react-router-dom'
import AnimatedRoutes from './Providers/Animated/AnimatedRoutes'
import ParticlesBackground from './components/particles/ParticlesBackground'
import ParticlesContext from './Providers/ParticlesProvider/ParticlesContext'
import { useState } from 'react'


function App() {
  const [particlesVisible, setParticlesVisible] = useState(true)

  return (
    <>
    <ParticlesContext.Provider value={{particlesVisible, setParticlesVisible}}>
      <ParallaxProvider>
        <ParallaxFix />
        <BrowserRouter>
          <ParticlesBackground />
          <div className="AnimatedRoutes-wrapper">

            <AnimatedRoutes />
          </div>
        </BrowserRouter>
      </ParallaxProvider>
    </ParticlesContext.Provider>
      {/* <FadeIn /> */}
      {/* <ParallaxSection /> */}
      {/* <GsapAnimation /> */}
      {/* <AnimatedComponent /> */}
    </>
  )
}

export default App
