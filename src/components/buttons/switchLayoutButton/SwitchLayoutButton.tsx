import React, { JSX } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";
import './switchLayoutButton.css'

const SwitchLayoutButton: React.FC = ():JSX.Element => {
  const { desktopView, setDesktopView } = useDesktopMode();

  const toggleMode = () => {
    setDesktopView(!desktopView);
  };

    return(
        <motion.div
        className="switchLayout-outer-div"
        >

        <Link to= {desktopView ? "/mobile" : "/desktop"}>
              {/* TODO: ANIMATE BACKGROUND WHEN CLICKED */}
        <motion.button
          className="switchLayout-button"
          onClick={toggleMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          {desktopView ? "Switch to Mobile" : "Switch to Desktop"}
        </motion.button>
      </Link>
        </motion.div>
    )
}
export default SwitchLayoutButton;