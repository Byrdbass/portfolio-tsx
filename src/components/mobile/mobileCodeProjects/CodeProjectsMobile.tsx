import { useState, useEffect, useRef, useContext } from "react";
import '../phone.css'
import '../../glassBreak/glassbreak.css'
import './codeProjectsMobile.css'
import ParticlesContext from "../../../Providers/ParticlesProvider/ParticlesContext";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";
import { mobileScreenContents } from "../../../data/mobileScreenContent";
import React from "react";


const CodeProjectsMobile: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

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
  }, [activeScreen]);

  const toggleMode = () => {
    setDesktopView(!desktopView);
  };

  return (
    <div className="app-container">
      <button
        className="mode-toggle"
        onClick={toggleMode}
      >
        {desktopView ? 'Switch to Mobile' : 'Switch to Desktop'}
      </button>

      <div className={`phone-container ${desktopView ? 'desktop-mode' : ''}`}>
        <div
          ref={phoneRef}
          className={`phone ${phoneRevealed ? 'loaded' : ''}`}
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
        </div>
      </div>

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