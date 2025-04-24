import React, { useState, useEffect, useRef, useContext } from "react";
import "../phone.css";
import "../../../components/glassBreak/glassbreak.css";
import "./codeProjectsMobile.css";
import ParticlesContext from "../../../Providers/ParticlesProvider/ParticlesContext";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";
import { useActiveScreen } from "../../../Providers/ActiveScreenProvider/ActiveScreenContext";
import { mobileScreenContents } from "../../../data/mobileScreenContent";
import { motion } from "motion/react";
import { Events, scroller } from "react-scroll";
import { Link } from "react-router-dom";

const CodeProjectsMobile: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  //TOUCH/SWIPE
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  // min swipe distance in px
  const minSwipeDistance = 50;
  //PROVIDERS
  const { setParticlesVisible } = useContext(ParticlesContext);
  const { desktopView, setDesktopView } = useDesktopMode();
  const { activeScreen, setActiveScreen, navigateTo, totalScreens } =
    useActiveScreen();

  // Initialize phone animation
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        setPhoneRevealed(true);
      }, 500);

      return () => clearTimeout(timer);
    });
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  //react-scroll events
  useEffect(() => {
    Events.scrollEvent.register("begin", () => {
      setIsScrolling(true);
    });

    Events.scrollEvent.register("end", () => {
      setIsScrolling(false);
    });

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  // Handle Y axis scroll effects for desktop mode
  useEffect(() => {
    const handleScroll = () => {
      const scrollPositionMobilePage = window.scrollY + window.innerHeight / 2;

      // handle particles transition
      const scrollPositionParticles = Math.min(
        window.scrollY / (window.innerHeight * 0.25),
        1
      );
      // if (scrollPositionParticles > 0.1) {
      //   setParticlesVisible(false);
      // } else {
      //   setParticlesVisible(true);
      // }
      // Find which section is currently in view
      const activeIndex = sectionRefs.current.findIndex((section, index) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        return (
          scrollPositionMobilePage >= sectionTop &&
          scrollPositionMobilePage < sectionBottom
        );
      });

      if (activeIndex !== -1 && activeIndex !== activeScreen) {
        setActiveScreen(activeIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeScreen, setActiveScreen, setParticlesVisible, desktopView]);

  //track horizontal whee movement for mobile view
  useEffect(() => {
    if (desktopView) return;

    const phoneElement = phoneRef.current;
    if (!phoneElement) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      //estimating var delta based off of which axis is greater in value (which diaganol might be read)
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (
        delta > 0 &&
        delta < 1 &&
        activeScreen < mobileScreenContents.length - 1
      ) {
        navigateTo(activeScreen + 1);
        e.preventDefault();
      } else if (delta < 0 && delta > -1 && activeScreen > 0) {
        navigateTo(activeScreen - 1);
        e.preventDefault();
      }
    };

    phoneElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => phoneElement.removeEventListener("wheel", handleWheel);
  }, [activeScreen, totalScreens, navigateTo, desktopView, isScrolling]);

  // Add this function to handle wheel events for horizontal scrolling
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    if (desktopView) return; // Only track touches in mobile view
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
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
      navigateTo(activeScreen + 1);
    } else if (isRightSwipe && activeScreen > 0) {
      navigateTo(activeScreen - 1);
    }

    // Reset
    setTouchStart(null);
    setTouchEnd(null);
  };

  //Navigate function for react-scroll
  const handleNavigation = (index: number) => {
    navigateTo(index);

    //TODO:THIS may need to be false
    if (desktopView) {
      scroller.scrollTo(mobileScreenContents[index].id, {
        //TODO: play with these values for optimal control
        duration: 800,
        smooth: true,
        offset: -50,
      });
    }
  };

  const toggleMode = () => {
    setDesktopView(!desktopView);
    setPhoneRevealed(false);
  };

  return (
    <div className="app-container">
      <Link to="/desktop">
        <motion.button
          className="mode-toggle"
          onClick={toggleMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          {desktopView ? "Switch to Mobile" : "Switch to Desktop"}
        </motion.button>
      </Link>

      <motion.div
        className={`phone-container`}
        initial={{
          x: "-100%",
          y: "-100%",
          opacity: 0,
          scale: 0.1
        }}
        transition={{
          type: "tween",
        }}
        animate={{
          x: "-40%",
          y: "-75%",
          scale: 1,
          opacity: 1
        }}
        // drag
        // dragDirectionLock
      >
        <motion.div
          ref={phoneRef}
          className={`phone`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1 }}
          // style={{ originZ: 100}}
        >
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="glass-reflection"></div>
              <div
                className="phone-content active"
                style={{
                  backgroundColor:
                    mobileScreenContents[activeScreen].backgroundColor,
                }}
              >
                <h2 className="phone-title">
                  {mobileScreenContents[activeScreen].title}
                </h2>
                {mobileScreenContents[activeScreen].hostedSite ? (
                  <a
                    className="deployed-icon"
                    href={mobileScreenContents[activeScreen].hostedSite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🚀
                  </a>
                ) : null}
                <p className="phone-description">
                  {mobileScreenContents[activeScreen].description}
                </p>
                {mobileScreenContents[activeScreen].component
                  ? React.createElement(
                      mobileScreenContents[activeScreen].component,
                      { isActive: "active" }
                    )
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
                <div className="screen-indicator">
                  {(() => {
                    const visibleDots = 7; // Total dots to display at once
                    const halfVisible = Math.floor(visibleDots / 2);

                    // Calculate the start and end of the visible range
                    let startDot = Math.max(0, activeScreen - halfVisible);
                    let endDot = Math.min(
                      totalScreens - 1,
                      startDot + visibleDots - 1
                    );

                    // Adjust start if we're near the end to always show visibleDots
                    if (endDot - startDot + 1 < visibleDots && startDot > 0) {
                      startDot = Math.max(0, endDot - visibleDots + 1);
                    }

                    // Create the dots array
                    const dots = [];

                    // Add "more before" indicator if needed
                    if (startDot > 0) {
                      dots.push(
                        <div
                          key="more-before"
                          className="indicator-more"
                          onClick={() => handleNavigation(startDot - 1)}
                        >
                          ⬅️
                        </div>
                      );
                    }

                    // Add the visible dots
                    for (let i = startDot; i <= endDot; i++) {
                      dots.push(
                        <div
                          key={i}
                          className={`indicator-dot ${
                            i === activeScreen ? "active" : ""
                          }`}
                          onClick={() => handleNavigation(i)}
                        />
                      );
                    }

                    // Add "more after" indicator if needed
                    if (endDot < totalScreens - 1) {
                      dots.push(
                        <div
                          key="more-after"
                          className="indicator-more"
                          onClick={() => handleNavigation(endDot + 1)}
                        >
                          ➡️
                        </div>
                      );
                    }

                    return dots;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="scroll-sections">
        {mobileScreenContents.map((screen, index) => (
          <div
            key={screen.id}
            ref={(el) => (sectionRefs.current[index] = el)}
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
};

export default CodeProjectsMobile;
