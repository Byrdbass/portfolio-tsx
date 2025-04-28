import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue, useAnimate, useInView, useScroll } from "motion/react";
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

interface ScrollProps {

}

const DesktopHomePage: React.FC<ScrollProps> = () => {
  // TODO: join this with a shift method of future desktop components
  const desktopScreenContents = mobileScreenContents.filter((_, index) => index >= 2)

  //PROVIDERS
  const { desktopView, setDesktopView } = useDesktopMode();;

  //hook from motion
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([0,1,2,3]);
  const [currentCenter, setCurrentCenter] = useState<number>(0);
  const visibilityWindow = 6;

  const { scrollYProgress } = useScroll();
  const maskImage: MotionValue<string> = useScrollOverflowMask(scrollYProgress);



    // Use useCallback to prevent recreation of this function on every render
    const handleVisibilityChange = useCallback((projectIndex: number, isVisible: boolean) => {
      if (isVisible) {
        // Update the center of our visibility window
        setCurrentCenter(projectIndex);
      }
    }, []);
  
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
      console.log(newVisibleProjects);
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
    <div className="projects-outer-container"

    >
      {/* TODO: do we want this progress bar? */}
      {/* <motion.div className="progress-bar-X" style={{
        scaleX: scrollYProgress,
        originX: 0
        }}/> */}
      <Link to="/mobile">
        <motion.button
          className="mode-toggle"
          onClick={toggleMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          {desktopView ? "Switch to Mobile" : "Switch to Desktop"}
        </motion.button>
      </Link>
      <DesktopHeader />
      <motion.section
        ref={containerRef}
        style={{ maskImage }}
        className="projects-outer-div"
        transition={{
          delay: 1.5,
          type: "spring",
          mass: 1.3,
          damping: 6
        }}
        animate={{
          y: "5%",
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

      {/* <motion.div ref={scope} style={{margin: "60px"}}>Regalar Div</motion.div> */}

      {/* <motion.button
        style={{ margin: "60px", fontSize: "60px", borderRadius: "50px" }}
        onClick={revealProject}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        whileDrag={{ scale: 0.9, rotate: 10 }}
        drag
      >
        {isProjectVisible ? "HIDE" : "SHOW"}
      </motion.button>
      <AnimatePresence>
        {isProjectVisible ? (
          <motion.div
            animate={{ scale: 1.2 }}
            exit={{ opacity: 0 }}
            layoutId="modal"
          >
            <h2>{firstProject.title}</h2>
            <p>{firstProject.description}</p>
            <img src={firstProject.image?.src} alt="" />
          </motion.div>
        ) : null}
      </AnimatePresence> */}
    </div>
  );
};

export default DesktopHomePage;
