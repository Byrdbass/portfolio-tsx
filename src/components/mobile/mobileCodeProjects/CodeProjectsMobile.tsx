import { useState, useEffect, useRef, useContext } from "react";
import '../phone.css'
import '../../glassBreak/glassbreak.css'
import './codeProjectsMobile.css'
import ParticlesContext from "../../../Providers/ParticlesProvider/ParticlesContext";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";
import { mobileScreenContents } from "../../../data/mobileScreenContent";
import { CrackPoint } from "../../../types/glassBreak";
import CrackedGlassSVG from '../../../assets/images/crackedGlass256x512min.svg?react'
import React from "react";


const CodeProjectsMobile: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [cracked, setCracked] = useState(false);
  const [cracks, setCracks] = useState<CrackPoint[]>([]);
  const glassRef = useRef<HTMLDivElement>(null);
  const [disappearing, setDisappearing] = useState(false);

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
    handleCrackGlass();
    setCracked(!cracked);
  };

  // Generate random crack patterns
  const generateCracks = () => {
    if (!glassRef.current) return;

    const rect = glassRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    //TODO: EXPLORE OTHER PROPS like top,left, bottom, right

    // Create main impact point
    const mainCrack: CrackPoint = {
      x: centerX,
      y: centerY,
      lines: []
    };

    // Generate between 12-17 main cracks from the center
    const numLines = 12 + Math.floor(Math.random() * 5);

    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2;
      const length = 40 + Math.random() * 60;

      mainCrack.lines.push({
        angle,
        length
      });
    }

    // Generate 6-10 secondary crack points
    const secondaryCracks: CrackPoint[] = [];
    const numSecondary = 6 + Math.floor(Math.random() * 4);

    for (let i = 0; i < numSecondary; i++) {
      const distFromCenter = 30 + Math.random() * 60;
      const angle = Math.random() * Math.PI * 2;

      const x = centerX + Math.cos(angle) * distFromCenter;
      const y = centerY + Math.sin(angle) * distFromCenter;

      const secondaryCrack: CrackPoint = {
        x,
        y,
        lines: []
      };

      // 4-7 lines per secondary crack
      const numSecondaryLines = 4 + Math.floor(Math.random() * 4);

      for (let j = 0; j < numSecondaryLines; j++) {
        const lineAngle = (j / numSecondaryLines) * Math.PI * 2;
        const lineLength = 20 + Math.random() * 40;

        secondaryCrack.lines.push({
          angle: lineAngle,
          length: lineLength
        });
      }

      secondaryCracks.push(secondaryCrack);
    }

    setCracks([mainCrack, ...secondaryCracks]);
  };

  const handleCrackGlass = () => {
    if (cracked) return;

    generateCracks();
    setCracked(true);

    // Add shaking animation
    if (phoneRef.current) {
      phoneRef.current.classList.add('shaking');
      setTimeout(() => {
        if (phoneRef.current) {
          phoneRef.current.classList.remove('shaking');

          // Set timer to make phone disappear after crack animation completes
          setTimeout(() => {
            setDisappearing(true);
          }, 1500); // Wait for cracks to fully form
        }
      }, 500);
    }
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
          className={`phone ${phoneRevealed ? 'loaded' : ''}
          {/*${disappearing ? 'disappearing' : ''} TODO: EXPLORE THIS ANIMATION*/}
          `}
        >
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="glass-reflection"></div>
              {cracked && <div className="cracked-glass-container">
                                <CrackedGlassSVG className="cracked-glass-base" />
                                {cracks.map((crackPoint, idx) => (
                                    <g key={idx} opacity="0.8">
                                        {crackPoint.lines.map((line, lineIdx) => {
                                            const endX = crackPoint.x + Math.cos(line.angle) * line.length;
                                            const endY = crackPoint.y + Math.sin(line.angle) * line.length;

                                            return (
                                                <line
                                                    key={`${idx}-${lineIdx}`}
                                                    x1={crackPoint.x}
                                                    y1={crackPoint.y}
                                                    x2={endX}
                                                    y2={endY}
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeOpacity="0.2"
                                                    className="crack-line"
                                                    style={{
                                                        animationDelay: `${lineIdx * 50}ms`,
                                                    }}
                                                />
                                            );
                                        })}
                                    </g>
                                ))}
                            </div>
                            }
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
      {cracked && (
                <div className="falling-pieces">
                    {Array.from({ length: 15 }).map((_, i) => {
                        const size = 5 + Math.random() * 15;
                        const left = 50 + Math.random() * 200 - 100;
                        const delay = Math.random() * 0.5;

                        return (
                            <div
                                key={i}
                                className="glass-shard"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    left: `${left}px`,
                                    animationDelay: `${delay}s`,
                                }}
                            ></div>
                        );
                    })}
                </div>
            )}
    </div>
  );
}

export default CodeProjectsMobile;