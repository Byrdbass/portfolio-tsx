import React, { useEffect } from "react";
import { useParallaxController } from "react-scroll-parallax";

const ParallaxFix: React.FC = () => {
    const parallaxController = useParallaxController();

    useEffect(() => {
        if (parallaxController) {
            window.addEventListener('load', () => {
                parallaxController.update();
            });
        }
    }, [parallaxController])

    return null
}

export default ParallaxFix;