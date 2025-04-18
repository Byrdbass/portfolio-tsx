import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimate, useInView } from "motion/react";
import { useActiveScreen } from "../../Providers/ActiveScreenProvider/ActiveScreenContext";
import { mobileScreenContents } from "../../data/mobileScreenContent";
import { Opacity } from "@tsparticles/engine";
import { backInOut, easeIn, easeInOut, easeOut } from "motion";
import { Link } from "react-router-dom";
import { useDesktopMode } from "../../Providers/Desktop/DesktopProvider";
import '../mobile/mobileCodeProjects/codeProjectsMobile.css'

const DesktopHomePage: React.FC = () => {
  const [isProjectVisible, setIsProjectVisible] = useState<boolean>(false);
  const firstProject = mobileScreenContents[3];

  //PROVIDERS
  const { desktopView, setDesktopView } = useDesktopMode();
  // const {activeScreen, setActiveScreen, navigateTo, totalScreens } = useActiveScreen();

  //hook from motion
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView){
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
    <>
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
      <motion.div ref={scope}>
        {mobileScreenContents.map((val, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "cyan",
            //   margin: "20px",
            //   width: 350,
            //   height: "50vh",
            //   display: "grid",
            }}
          >
            {/* TITLE */}
            <h2>{mobileScreenContents[index].title}</h2>
            {mobileScreenContents[index].hostedSite ? (
              // DEPLOYED ICON
              <a
                className="deployed-icon"
                href={mobileScreenContents[index].hostedSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀
              </a>
            ) : null}
            {/* DESCRIPTION */}
            <p className="desktop-description">
              {mobileScreenContents[index].description}
            </p>
            {/* GITHUB REPO */}
            <a
              href={mobileScreenContents[index].githubRepo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Link to repo on Github{" "}
            </a>
            <img
              src={mobileScreenContents[index].image?.src}
              alt={mobileScreenContents[index].image?.alt}
              width={250}
            />
          </div>
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
    </>
  );
};

export default DesktopHomePage;
