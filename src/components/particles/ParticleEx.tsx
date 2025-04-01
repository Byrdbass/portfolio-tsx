import { useCallback, useState, useEffect } from "react";
import  { Particles, initParticlesEngine}  from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { Engine } from "@tsparticles/engine";
import './particlesEx.css'


const ParticleEx = () => {
    // const[init, setInit] = useState(false);

    const particlesInit = useCallback(async (engine: Engine) => {
        console.log("Particles Init");
        await loadFull(engine);
    }, []);

    useEffect(() => {
        const initEngine = async () => {
          await initParticlesEngine(async (engine: Engine) => {
            // Use loadSlim for basic features or loadFull for all features
            await loadFull(engine);
            // or await loadFull(engine);
            console.log("initializing particles");
          });
          
        //   setInit(true);
        };
        
        initEngine();
      }, []);
    
    
    return (
        <>
        <h1>Hello</h1>
        {/* useCallback version */}
        <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    preset: "snow",
                    particles: {
                        number: {
                            value: 100,
                        },
                        color: {
                            value: "#ff0000",
                        },
                        move: {
                            enable: true,
                            speed: 5,
                        },
                    },
                }}
            />

        {/* useState version */}
        {/* {init && (
            <Particles
            id="tsparticles"
            options={{
              preset: "default",
              particles: {
                color: {
                  value: "#ff0000"
                }
              }
            }}
          />
        )} */}
      </>
    );
}

export default ParticleEx;