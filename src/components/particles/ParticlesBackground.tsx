import React, { useCallback, useState, useEffect } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { Engine } from "@tsparticles/engine";
import './particlesEx.css'
import ParticlesContext from "../../Providers/ParticlesProvider/ParticlesContext";
import DesktopContext, { useDesktopMode } from "../../Providers/Desktop/DesktopProvider";


const ParticlesBackground = () => {
    const { particlesVisible } = React.useContext(ParticlesContext);
    // const { desktopView, setDesktopView } = useDesktopMode();

    useEffect(() => {
        const initEngine = async () => {
            await initParticlesEngine(async (engine: Engine) => {
                await loadFull(engine);
                // console.log("initializing particles");
            });
        };

        initEngine();
    }, []);


    return (
        <div className={`particles-outer-div ${particlesVisible ? 'visible' : 'hidden'}`}>
            <Particles
                id="tsparticles"
                options={{
                    fullScreen: {
                        enable: true,
                        zIndex: -10
                    },
                    fpsLimit: 120,
                    // preset: "seaAnemone",
                    particles: {
                        number: {
                            value: 400,
                            density: {
                                enable: false,
                            }
                        },
                        color: {
                            value: ["#89CFF0", "#BFEFFF", "#77BDE0", "#A5D3F0"] // Multiple icy blue shades
                        },
                        shape: {
                            type: ["circle", "triangle", "polygon", "square"], // Multiple shapes
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
                        size: {
                            value: 3,
                            animation: {
                                enable: true,
                                speed: 5,
                                sync: true,
                            }
                        },
                        links: {
                            enable: true,
                            distance: 100,
                            color: "#00ffff",
                            opacity: 0.5,
                            width: 1,
                            triangles: {
                                enable: false
                            },
                            // This makes links preferentially form horizontal and vertical
                            warp: false
                        },
                        // collisions: {
                        //     bounce: {

                        //     },
                        // },

                        move: {
                            enable: true,
                            speed: 1,
                            direction: "none",
                            random: false,
                            straight: false,
                            outModes: {
                                default: "bounce"
                            },
                            path: {
                                enable: true,
                                delay: {
                                    value: 0
                                },
                                options: {
                                    size: 20,
                                    draw: false,
                                    increment: 0.001
                                }
                            },
                            trail: {
                                // enable: true,
                                // fill: "#000",
                                // length: 3

                            }
                            // attract: {
                            //     enable: false,
                            //     rotate: {
                            //         x: 600,
                            //         y: 1200
                            //     }
                            // }
                        },
                    },
                    interactivity: {
                        detectsOn: "window",
                        events: {
                            onHover: {
                                enable: true,
                                mode: "repulse"
                            },
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                        },
                        modes: {
                            repulse: {
                                distance: 50,
                                duration: 1.0
                            },
                            push: {
                                quantity: 8
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default ParticlesBackground;