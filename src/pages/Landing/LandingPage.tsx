import React, { JSX, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassBreak from "../../components/glassBreak/GlassBreak";
import ParticlesContext from "../../Providers/ParticlesProvider/ParticlesContext";
import { Parallax } from "react-scroll-parallax";

const LandingPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const { setParticlesVisible } = React.useContext(ParticlesContext);
    const [canNavigate, setCanNavigate] = useState(true);

    useEffect(() => {
        setParticlesVisible(true);
        // Add a small delay before allowing navigation again
        // This prevents immediate navigation after a route change
        const navigationTimeout = setTimeout(() => {
            setCanNavigate(true);
        }, 500);
        const handleScroll = () => {
            if (!canNavigate) return; // Skip if navigation is temporarily disabled
            
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Control particles visibility based on scroll
            const scrollPercentage = Math.min(scrollPosition / (windowHeight * 0.25), 1);
            if (scrollPercentage > 0.1) {
                setParticlesVisible(false);
            } else {
                setParticlesVisible(true);
            }
            
            // Set scrolling flag
            setIsScrolling(true);
            
            // Clear existing timer
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }
            console.log("scroll pos => " + scrollPosition);
            console.log("window height => " +  windowHeight)

            // Set a new timer
            scrollTimerRef.current = setTimeout(() => {
                // If scrolled beyond threshold, navigate
                if (scrollPosition > windowHeight * 0.9) {
                    navigate('/mobile');
                    setCanNavigate(false); // Temporarily disable navigation
                    window.scrollTo(0, 0);
                } else if (scrollPosition < -windowHeight * 0.9) { 
                    // Only add this if you want to navigate on scroll up as well
                    navigate('/');
                    setCanNavigate(false); // Temporarily disable navigation
                    window.scrollTo(0, 0);
                }
                setIsScrolling(false);
            }, 200); // Debounce time
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }
            clearTimeout(navigationTimeout);
        };
    }, [navigate, setParticlesVisible, canNavigate]);

    return (
        <div className="landingPage-outer-div">
                <GlassBreak />
        </div>
    );
};

export default LandingPage;