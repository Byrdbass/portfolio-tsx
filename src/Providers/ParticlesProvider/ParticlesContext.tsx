import React from "react";

const ParticlesContext = React.createContext<{
    particlesVisible: boolean;
    setParticlesVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    particlesVisible: true,
    setParticlesVisible: () => {},
})

export default ParticlesContext;