import React, { JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
// TODO: do we want a different format for desktop profile image?
import MobileProfilePic from "../../pages/mobile/mobileProfilePic/MobileProfilePic";
import './desktopHeader.css'


const DesktopHeader: React.FC = (): JSX.Element => {
    return (<>
        <AnimatePresence>
            <motion.section
                className="desktop-header-container"
                initial={{ 
                    scaleY: 0.0,
                    height: "0%",
                    opacity: 0,
                    backgroundColor: "var(--white)"
                 }}
                transition={{ 
                    type: 'spring', 
                    damping: 7,
                    mass: 1.1,
                    delay: 1.5 
                }}
                animate={{ 
                    scaleY: 1,
                    height: "35%",
                    opacity: 1,
                    backgroundColor: "var(--navy)"
                 }}
                exit={{ opacity: 0 }} //TODO: not doing anything? need isVisible prop?
            >
                <MobileProfilePic altText='picture of leland in an orange tie'/>
            </motion.section>

        </AnimatePresence>
    </>)
}

export default DesktopHeader;