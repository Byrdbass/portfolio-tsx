import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { Engine } from "@tsparticles/engine";
import './particlesEx.css'

const ParticleEx = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);
    
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: "#000000"
                },
                particles: {
                    color: {
                        value: "#89CFF0" // Icy blue
                    },
                    links: {
                        color: "#BFEFFF", // Light blue for links
                        distance: 300,
                        enable: true,
                        opacity: 0.4,
                        width: 2
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out"
                        },
                        random: false,
                        speed: 12,
                        straight: false
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800
                        },
                        value: 80
                    },
                    opacity: {
                        value: 0.5
                    },
                    shape: {
                        type: "circle"
                    },
                    size: {
                        value: { min: 1, max: 10 }
                    }
                },
                detectRetina: true
            }}
        />
    );
}

export default ParticleEx;