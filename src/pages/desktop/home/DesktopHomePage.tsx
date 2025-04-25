import React, { useEffect, useRef, useState } from "react";
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

interface ScrollProps {

}

const DesktopHomePage: React.FC<ScrollProps> = () => {
  const [isProjectVisible, setIsProjectVisible] = useState<boolean>(false);

  // TODO: join this with a shift method of future desktop components
  const desktopScreenContents = mobileScreenContents.filter((_, index) => index >= 2)

  //PROVIDERS
  const { desktopView, setDesktopView } = useDesktopMode();;

  //hook from motion
  const scrollContainerRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const { scrollYProgress } = useScroll();
  const maskImage: MotionValue<string> = useScrollOverflowMask(scrollYProgress);
  const isInView = useInView(scrollContainerRef, {
      // amount: 0.9,
      // once: true
      margin: "100px 0px"
  })

  const shouldRenderProject = (index: number) => {
    // Initial render - render first few projects
    if (visibleProjects.length === 0 && index < 3) return true;
    // Otherwise, only render if in visible array
    return visibleProjects.includes(index);
  };

  const toggleMode = () => {
    setDesktopView(!desktopView);
  };

  console.log(containerRef)
  console.log(scrollYProgress);

  return (
    <div className="projects-outer-container"
      ref={containerRef}
      
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
        // viewport={{ root: scrollContainerRef }}

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
        {desktopScreenContents.map((val, index) => {
          return (
            <motion.div
              className="projects-inner-div"
              initial={{
                opacity: 0,
                scale: 0.2
              }}
              transition={{
                duration: 1.5,
              }}
              animate={{
                x: [-100, 100, 0],
                rotate: [360, 0],
                opacity: 1,
                scale: 1,
                borderRadius: ["50%", "100%", "0%", "100%", "25%"],
                backgroundColor: "var(--teal)"
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              key={index}

            >
              {/* TITLE */}
              <h2>{desktopScreenContents[index].title}</h2>
              {desktopScreenContents[index].hostedSite ? (
                // DEPLOYED ICON
                <a
                  className="deployed-icon"
                  href={desktopScreenContents[index].hostedSite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🚀
                </a>
              ) : null}
              {/* DESCRIPTION */}
              <p className="desktop-description">
                {desktopScreenContents[index].description}
              </p>
              {/* GITHUB REPO */}
              <a
                href={desktopScreenContents[index].githubRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Link to repo on Github{" "}
              </a>
              <img
                src={desktopScreenContents[index].image?.src}
                alt={desktopScreenContents[index].image?.alt}
                width={250}
              />
            </motion.div>
          )
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
