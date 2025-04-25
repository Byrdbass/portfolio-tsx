import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, useInView } from "motion/react";
import { useActiveScreen } from "../../Providers/ActiveScreenProvider/ActiveScreenContext";
import { mobileScreenContents } from "../../data/mobileScreenContent";
import { backInOut, easeIn, easeInOut, easeOut } from "motion";
import { Link } from "react-router-dom";
import { useDesktopMode } from "../../Providers/Desktop/DesktopProvider";
import '../mobile/mobileCodeProjects/codeProjectsMobile.css'
import './desktopHomePage.css'

const DesktopHomePage: React.FC = () => {
  const [isProjectVisible, setIsProjectVisible] = useState<boolean>(false);
  const firstProject = mobileScreenContents[3];
  const scrollRef = useRef(null);
  // TODO: join this with a shift method of future desktop components
  const desktopScreenContents = mobileScreenContents.filter((_, index) => index >= 2)

  //PROVIDERS
  const { desktopView, setDesktopView } = useDesktopMode();
  // const {activeScreen, setActiveScreen, navigateTo, totalScreens } = useActiveScreen();

  //hook from motion
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1 }, { duration: 2 });
    }
    // else{
    //     animate(scope.current, { opacity: 0 }, { duration: 2 });
    // }
  }, [isInView]);

  const revealProject = () => {
    setIsProjectVisible(!isProjectVisible);
  };
  const toggleMode = () => {
    setDesktopView(!desktopView);
  };

  return (
    <div className="projects-outer-container"
    ref={scrollRef}
    >
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
      
      <motion.div
        className="projects-outer-div"
        // initial={{ 
        //   x: "-50%", 
        //   y: "-50%", 
        //   z: "-100%",
        //   opacity: 0, 
        //   scale: 0.2, 
        // }}
        // transition={{ 
        //   ease: "easeIn", 
        //   duration: 1 
        // }}
        // animate={{
        //   x: "0%",
        //   y: "0%",
        //   z: 0,
        //   opacity: 1,
        //   type: "spring",
        //   scale: 1.0,
        // }}
        // exit={{}}
        >
        {desktopScreenContents.map((val, index) => (
          <motion.div
          className="projects-inner-div"
          initial={{ 
            opacity: 0,
            scale: 0.2
          }}
          // whileInView={{ opacity: 1}}
          // viewport={{ root: scrollRef}}
          transition={{
            duration: 1.5, 
            // repeat: 1,
            // times: [0, 0.9, 0.5, 0.8, 1]

          }}
          animate={{
            x: [-100, 100, 0],
            rotate: [360, 0],
            // scale: [1, 2, 2, 1, 1],
            opacity: 1,
            scale: 1,
            borderRadius: ["50%", "100%", "0%", "100%", "25%"],
            backgroundColor: "var(--animate-div)"
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
        ))}
      </motion.div>

      {/* <motion.div ref={scope} style={{margin: "60px"}}>Regalar Div</motion.div> */}

      <motion.button
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
      </AnimatePresence>
    </div>
  );
};

export default DesktopHomePage;
