import React, { JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
// TODO: do we want a different format for desktop profile image?
import MobileProfilePic from "../../pages/mobile/mobileProfilePic/MobileProfilePic";
import './desktopHeader.css'
import ProjectNavBar from "../navigation/ProjectNavBar";

interface HeaderProps{
    isMaskActive?: boolean;
    maskStyle?: any,
    scrollProgress?: number;
}

const DesktopHeader: React.FC<HeaderProps> = ({ isMaskActive = false, maskStyle = {}, scrollProgress = 0 }): JSX.Element => {
      // Calculate dynamic styles based on scroll progress
  const dynamicStyles = {
    // Example: Scale header based on scroll
    // scale: 1 + (scrollProgress * 0.1), // Scale up to 10% larger at top
    
    // Example: Add blur effect based on scroll
    // filter: `blur(${scrollProgress * 3}px)`,
    
    // Example: Change opacity based on scroll
    opacity: 0.6 + (scrollProgress * 0.4), // 60% to 100% opacity
    
    // Apply mask style only when mask is active
    ...(isMaskActive ? maskStyle : {})
  };
    console.log(scrollProgress)
    return (<>
        <AnimatePresence>
            <motion.section
                className="desktop-header-container"
                style={dynamicStyles}
                initial={{
                    scaleY: 0.0,
                    height: "0%",
                    opacity: 0.3,
                    backgroundColor: "var(--trans)"
                }}
                transition={{
                    type: 'spring',
                    damping: 7,
                    mass: 1.1,
                    delay: 1
                }}
                animate={{
                    ...maskStyle,
                    scaleY: 1,
                    height: "35%",
                    opacity: 1,
                    // backgroundColor: "var(--trans)"
                }}
                exit={{ opacity: 0 }} //TODO: not doing anything? need isVisible prop?
            >
                <ProjectNavBar />
                <MobileProfilePic altText='picture of leland in an orange tie' />
            </motion.section>

        </AnimatePresence>
    </>)
}

export default DesktopHeader;