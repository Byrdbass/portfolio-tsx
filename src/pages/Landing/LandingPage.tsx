import React, { JSX, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassBreak from "../../components/glassBreak/GlassBreak";
import ParticlesContext from "../../Providers/ParticlesProvider/ParticlesContext";

const LandingPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const { setParticlesVisible } = React.useContext(ParticlesContext);


    useEffect(() => {
        setParticlesVisible(true);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            const scrollPercentage = Math.min(scrollPosition / (windowHeight * 0.1), 1);
            
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

            // Set a new timer
            scrollTimerRef.current = setTimeout(() => {
                // If scrolled beyond threshold, navigate
                if (scrollPosition > windowHeight * 0.4) {
                    navigate('/mobile');

                    // Reset scroll position
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
        };
    }, [navigate, setParticlesVisible]);

    return (
        <div className="landingPage-outer-div">
            {/* MAY INSERT LINK HERE
                    <Link to="/second-page" className="text-blue-500 underline">
          Or click here to navigate
        </Link>
            */}
            <GlassBreak />
        </div>
    )
}

export default LandingPage;