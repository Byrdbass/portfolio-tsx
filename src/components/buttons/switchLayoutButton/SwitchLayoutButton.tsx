import React, { JSX } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";
import './switchLayoutButton.css'

const SwitchLayoutButton: React.FC = ():JSX.Element => {
    const { desktopView, setDesktopView } = useDesktopMode();
    const navigate = useNavigate();
  
    const toggleMode = () => {
      const isDesktopView = !desktopView;
      setDesktopView(isDesktopView);
      navigate(isDesktopView ? "/desktop" : "/mobile");
      console.log('button clicked, desktop view is: ' + desktopView);
    };
  
    return (
      <motion.div className="switchLayout-outer-div"
      animate={{
        x: desktopView ? 400 : 0

      }}
      style={{
        position: desktopView ? "fixed" : "absolute", 
        right: desktopView ? 408 : 485,
        top: desktopView ? 28 : 84
      }}
      >
        <motion.button
            initial={{
                // opacity: 0
            }}
            transition={{
                type: "tween",
                duration: 1
            }}
            animate={{
                opacity: 1
            }}
          className="switchLayout-button"
          onClick={toggleMode}
          whileHover={{ scale: 1.1 }}
        //   whileFocus={{ opacity: 0}}
          whileTap={{ 
            scale: 0.8,
        // opacity: 0
        }}
        >
          {desktopView ? "Switch to Mobile" : "Switch to Desktop"}
        </motion.button>
      </motion.div>
    );
  };
export default SwitchLayoutButton;