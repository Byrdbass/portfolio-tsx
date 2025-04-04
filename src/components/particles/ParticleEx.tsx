import { useCallback, useState, useEffect } from "react";
import  { Particles, initParticlesEngine}  from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { Engine } from "@tsparticles/engine";
import './particlesEx.css'


const ParticleEx = () => {
    // const[init, setInit] = useState(false);

    //this hook doesn't seem to be doing anything except holding the variable name
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log("Particles Init");
        await loadFull(engine);
    }, []);

    useEffect(() => {
        const initEngine = async () => {
          await initParticlesEngine(async (engine: Engine) => {
            await loadFull(engine);
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
                // init={particlesInit}
                options={{
                    fullScreen: {
                        enable: true,
                        zIndex: -1
                    },
                    preset: "snow",
                    particles: {
                        number: {
                            value: 800,
                            density: {
                                enable: false
                            }
                        },
                        color: {
                            value: ["#89CFF0", "#BFEFFF", "#77BDE0", "#A5D3F0"] // Multiple icy blue shades
                        },
                        shape: {
                            type: ["circle", "triangle", "polygon"], // Multiple shapes
                            options: {
                                polygon: {
                                    sides: 6 // Hexagons (like ice crystals)
                                }
                            }
                        },
                        opacity: {
                            value: { min: 0.3, max: 1 }, // Random opacity within range
                            animation: {
                                enable: true,
                                speed: 1,
                                sync: true
                            }
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