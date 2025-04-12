import React, { useState, useEffect, useRef, useContext, TouchEvent } from "react";
import '../phone.css'
import '../../glassBreak/glassbreak.css'
import './codeProjectsMobile.css'
import ParticlesContext from "../../../Providers/ParticlesProvider/ParticlesContext";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";
import { mobileScreenContents } from "../../../data/mobileScreenContent";
import { motion } from "motion/react";


const CodeProjectsMobile: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  //TOUCH/SWIPE
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  // min swipe distance in px
  const minSwipeDistance = 50;

  //PROVIDERS
  const { setParticlesVisible } = useContext(ParticlesContext);
  const { desktopView, setDesktopView } = useDesktopMode();

  // Initialize phone animation
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        setPhoneRevealed(true);
      }, 500);

      return () => clearTimeout(timer);
    });
    return () => cancelAnimationFrame(animationFrame)
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPositionMobilePage = window.scrollY + window.innerHeight / 2;

      // handle particles transition
      const scrollPositionParticles = Math.min(window.scrollY / (window.innerHeight * .25), 1)
      if (scrollPositionParticles > 0.1) {
        setParticlesVisible(false);
      } else {
        setParticlesVisible(true);
      }
      // Find which section is currently in view
      const activeIndex = sectionRefs.current.findIndex((section, index) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        return scrollPositionMobilePage >= sectionTop && scrollPositionMobilePage < sectionBottom;
      });

      if (activeIndex !== -1 && activeIndex !== activeScreen) {
        setActiveScreen(activeIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeScreen, setParticlesVisible]);

  // Add this useEffect to prevent default scrolling when in mobile view
useEffect(() => {
  const preventDefaultScroll = (e: globalThis.WheelEvent) => {
    if (!desktopView) {
      e.preventDefault();
    }
  };

  // Only add listener when in mobile mode
  if (!desktopView) {
    const phoneElement = phoneRef.current;
    if (phoneElement) {
      phoneElement.addEventListener('wheel', preventDefaultScroll, { passive: false });
    }
  }

  return () => {
    const phoneElement = phoneRef.current;
    if (phoneElement) {
      phoneElement.removeEventListener('wheel', preventDefaultScroll);
    }
  };
}, [desktopView]);

// Add this function to handle wheel events for horizontal scrolling
const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  if (desktopView) return; // Only handle in mobile view
  
  e.preventDefault(); // Prevent default vertical scrolling
  
  // Determine direction (positive deltaY means scroll down/right)
  if (e.deltaY > 30 && activeScreen < mobileScreenContents.length - 1) {
    // Scrolled right, go to next screen
    setActiveScreen(prev => prev + 1);
  } else if (e.deltaY < -30 && activeScreen > 0) {
    // Scrolled left, go to previous screen
    setActiveScreen(prev => prev - 1);
  }
};

  const handleTouchStart:React.TouchEventHandler<HTMLDivElement> = (e: TouchEvent<HTMLDivElement>) => {
    if (desktopView) return; // Only track touches in mobile view
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    console.log(e)
    if (desktopView) return; // Only track touches in mobile view
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (desktopView || touchStart === null || touchEnd === null) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && activeScreen < mobileScreenContents.length - 1) {
      // Swiped left, go to next screen
      setActiveScreen(prev => prev + 1);
      
      // Optionally, scroll to the corresponding section
      if (sectionRefs.current[activeScreen + 1]) {
        sectionRefs.current[activeScreen + 1]?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    if (isRightSwipe && activeScreen > 0) {
      // Swiped right, go to previous screen
      setActiveScreen(prev => prev - 1);
      
      // Optionally, scroll to the corresponding section
      if (sectionRefs.current[activeScreen - 1]) {
        sectionRefs.current[activeScreen - 1]?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Reset
    setTouchStart(null);
    setTouchEnd(null);
  };

  const toggleMode = () => {
    setDesktopView(!desktopView);
  };

  return (
    <div className="app-container">
      <motion.button
        className="mode-toggle"
        onClick={toggleMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
      >
        {desktopView ? 'Switch to Mobile' : 'Switch to Desktop'}
      </motion.button>

      <motion.div
        className={`phone-container ${desktopView ? 'desktop-mode' : ''}`}
      >
        <motion.div
          ref={phoneRef}
          className={`phone ${phoneRevealed ? 'loaded' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        // style={{ originZ: 100}}
        >
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="glass-reflection"></div>
              <div
                className="phone-content active"
                style={{ backgroundColor: mobileScreenContents[activeScreen].backgroundColor }}
              >
                <h2 className="phone-title">{mobileScreenContents[activeScreen].title}</h2>
                {mobileScreenContents[activeScreen].hostedSite ?
                  <a className="deployed-icon"
                    href={mobileScreenContents[activeScreen].hostedSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    🚀</a>
                  : null}
                <p className="phone-description">{mobileScreenContents[activeScreen].description}</p>
                {mobileScreenContents[activeScreen].component ?
                  React.createElement(mobileScreenContents[activeScreen].component, { isActive: 'active' })
                  : null}
                <a
                  href={mobileScreenContents[activeScreen].githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={mobileScreenContents[activeScreen].image?.src}
                    alt={mobileScreenContents[activeScreen].image?.alt}
                    width={mobileScreenContents[activeScreen].image?.width}
                  />
                </a>
              </div>

              <div className="screen-indicator">
                {mobileScreenContents.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator-dot ${index === activeScreen ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="scroll-sections">
        {mobileScreenContents.map((screen, index) => (
          <div
            key={screen.id}
            ref={el => sectionRefs.current[index] = el}
            className="scroll-section"
            id={screen.id}
          >
            {desktopView && (
              <div className="desktop-content">
                <h2>{screen.title}</h2>
                <p>{screen.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodeProjectsMobile;