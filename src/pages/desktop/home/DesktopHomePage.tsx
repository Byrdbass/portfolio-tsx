import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue, useAnimate, useInView, useMotionValueEvent, useScroll } from "motion/react";
import { useActiveScreen } from "../../../Providers/ActiveScreenProvider/ActiveScreenContext";
import { mobileScreenContents } from "../../../data/mobileScreenContent";
import { backInOut, easeIn, easeInOut, easeOut } from "motion";
import { Link } from "react-router-dom";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";
import '../../mobile/mobileCodeProjects/codeProjectsMobile.css'
import './desktopHomePage.css'
import DesktopHeader from "../../../components/header/DesktopHeader";
import useScrollOverflowMask from "../../../helpers/motion/scrollOverflowMask";
import DesktopProjects from "../../../components/Projects/DesktopProjects";
import useScrollOverflowGrid from "../../../helpers/motion/scrollOverflowGrid";
import SwitchLayoutButton from "../../../components/buttons/switchLayoutButton/switchLayoutButton";

interface ScrollProps {

}

const DesktopHomePage: React.FC<ScrollProps> = () => {
  // TODO: join this with a shift method of future desktop components
  const desktopScreenContents = mobileScreenContents.filter((_, index) => index >= 2)

  //PROVIDERS
  const { desktopView, setDesktopView } = useDesktopMode();;

  //hook from motion
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([0, 1, 2, 3]);
  const [currentCenter, setCurrentCenter] = useState<number>(0);
  const visibilityWindow = 6;
  
  const [isMaskActive, setIsMaskActive] = useState(false);
  const [headerScrollProgress, setHeaderScrollProgress] = useState(0);
  const [currentMaskStyle, setCurrentMaskStyle] = useState({});
  //more specific scroll area
  const { scrollYProgress } = useScroll({
    target: containerRef
  });
  // const maskImage: MotionValue<string> = useScrollOverflowMask(scrollYProgress);
  const maskImageGrid = useScrollOverflowGrid(scrollYProgress);

  const scrollThreshold = 0.15;
  
  useMotionValueEvent(maskImageGrid, "change", (latest) => {
    setCurrentMaskStyle(latest);
  });
  
  // Track scroll position for header animation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Set if we're in a mask active zone - at the top section OR bottom section
    const isInMaskZone = latest < scrollThreshold || latest > (1 - scrollThreshold);
    setIsMaskActive(isInMaskZone);
    
    // Calculate normalized progress for header animation - only for top section
    // When below threshold: 0
    // At threshold: 1
    // Linear transition in between
    if (latest < scrollThreshold) {
      const normalizedProgress = 1 - (latest / scrollThreshold);
      setHeaderScrollProgress(normalizedProgress);
    } else {
      setHeaderScrollProgress(0);
    }
  });
  // console.log(currentCenter)

  // Use useCallback to prevent recreation of this function on every render
  const handleVisibilityChange = useCallback((projectIndex: number, isVisible: boolean) => {
    if (isVisible) {
      // Update the center of our visibility window
      setCurrentCenter(projectIndex);
    }
  }, [scrollYProgress]);

  // Update visible projects whenever the center changes
  useEffect(() => {
    // Calculate the range of visible projects based on current center
    const halfWindow = Math.floor(visibilityWindow / 2);
    const start = Math.max(0, currentCenter - halfWindow);
    const end = Math.min(desktopScreenContents.length - 1, currentCenter + halfWindow);

    // Create array of visible project indices
    const newVisibleProjects = [];
    for (let i = start; i <= end; i++) {
      newVisibleProjects.push(i);
    }
    // console.log(newVisibleProjects);
    setVisibleProjects(newVisibleProjects);
  }, [currentCenter, desktopScreenContents.length]);

  const toggleMode = () => {
    setDesktopView(!desktopView);
  };

  const isProjectVisible = (index: number) => {
    return visibleProjects.includes(index);
  };

  // console.log(containerRef.current?.textContent)
  // console.log(scrollYProgress.hasAnimated);

  return (
    <div className="projects-outer-container">
      {/* TODO: do we want this progress bar? */}
      {/* <motion.div className="progress-bar-X" style={{
        scaleX: scrollYProgress,
        originX: 0
        }}/> */}
        <SwitchLayoutButton />
      <Link to="/mobile">
      {/* TODO: ANIMATE BACKGROUND WHEN CLICKED */}
        <motion.button
          className="mode-toggle"
          onClick={toggleMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          {desktopView ? "Switch to Mobile" : "Switch to Desktop"}
        </motion.button>
      </Link>
      <DesktopHeader
        isMaskActive={isMaskActive}
        maskStyle={currentMaskStyle}
        scrollProgress={headerScrollProgress}
      />
      <motion.section
        className="projects-outer-div"
        initial={{
          y: "-5%"
        }}
        transition={{
          delay: 1,
          type: "spring",
          mass: 1.3,
          damping: 6
        }}
        animate={{
          y: "0%",
        }}
      >

        {desktopScreenContents.map((content, index) => {
          return (
            <DesktopProjects
              key={index}
              content={content}
              index={index}
              isVisible={isProjectVisible(index)}
              onVisibilityChange={handleVisibilityChange}
            />
          );
        }
        )}
      </motion.section>
    </div>
  );
};

export default DesktopHomePage;
