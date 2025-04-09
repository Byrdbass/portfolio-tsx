import { useLocation, Routes, Route } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import React, { useState, useEffect } from "react";
import LandingPage from "../../pages/Landing/LandingPage";
import MobileHomePage from "../../pages/MobileHome/MobileHomePage";
import './animatedRoutes.css'
import AnimatedPage from "./AnimatedPage";

//TODO: RENAME THIS TO ANIMATEDROUTESMOBILE
const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState(location);
    const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('down');

    //TODO: create two types of page order one for desktop and one for mobile
    const pageOrder = ['/', '/mobile'];

    useEffect(() => {
        if (location !== prevLocation) {
            const prevIndex = pageOrder.indexOf(prevLocation.pathname);
            const currentIndex = pageOrder.indexOf(location.pathname);

            if (prevIndex < currentIndex) {
                setTransitionDirection('down');
            }
            else {
                setTransitionDirection('up');
            }

            setPrevLocation(location);
        }
    }, [location, prevLocation])

    return (
        <div className="AnimatedRoutes-outer-div">

            <Routes>
                <Route path="/" element={
                    <AnimatedPage direction={transitionDirection}>

                        <LandingPage />
                    </AnimatedPage>

                } />
                <Route path="/mobile" element={
                    <AnimatedPage direction={transitionDirection}>

                        <MobileHomePage />
                    </AnimatedPage>

                } />
                {/* <Route path="/third-page" element={
                <Parallax 
                translateY={transitionDirection === 'down' ? [100, 0] : [100, 0]} 
                opacity={[0, 1]}
                speed={-10}
                className="w-full"
                >
                <ThirdPage />
                </Parallax>
            } /> */}
            </Routes >
        </div>
    )
}

export default AnimatedRoutes;