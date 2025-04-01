import { useCallback, useState, useEffect } from "react";
import  Particles, {initParticlesEngine}  from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
// import { loadFull } from "tsparticles";
// import { Engine } from "@tsparticles/engine";
import './particlesEx.css'


const ParticleEx = () => {
    const[init, setInit] = useState(false);

    useEffect(() => {
        const initEngine = async () => {
          await initParticlesEngine(async (engine) => {
            // Use loadSlim for basic features or loadFull for all features
            await loadSlim(engine);
            // or await loadFull(engine);
            console.log("initializing particles");
          });
          
          setInit(true);
        };
        
        initEngine();
      }, []);
    
    
    return (
        <>
        <h1>Hello</h1>
        {init && (
            <Particles
            id="tsparticles"
            options={{
              preset: "snow",
              particles: {
                color: {
                  value: "#ff0000"
                }
              }
            }}
          />
        )}
      </>
    );
}

export default ParticleEx;