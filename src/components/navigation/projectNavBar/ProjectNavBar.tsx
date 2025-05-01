import React, { JSX } from "react";
import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react"
import { forwardRef, SVGProps, useState } from "react"
import TechIcon from "../../svg/TechIcon";
import { techIconsData } from "../../../data/techIconData";
import { TechIcon as TechIconType } from "../../../types/techIcons";
import LeftArrowNormal from "../../svg/LeftArrowNormal";
import SwitchLayoutButton from "../../buttons/switchLayoutButton/switchLayoutButton";
import ResumeButton from "../../buttons/resumeButton/ResumeButton";
import './project-nav-bar.css';

const ProjectNavBar: React.FC = (): JSX.Element => {
    const items = [1, 2, 3, 4, 5, 6]
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [selectedItemId, setSelectedItemId] = useState<number>(techIconsData[0].id);
    const [direction, setDirection] = useState<1 | -1>(1)
    const [leftArrowAnimating, setLeftArrowAnimating] = useState(false);
    const [rightArrowAnimating, setRightArrowAnimating] = useState(false);

    // Find the current icon by ID
    const currentIcon = techIconsData.find(icon => icon.id === selectedItemId) || techIconsData[0];

    // Find the current index for wrapping
    const currentIndex = techIconsData.findIndex(icon => icon.id === selectedItemId);

    function setSlide(newDirection: 1 | -1) {
        // Use the index for wrapping calculation
        const nextIndex = wrap(0, techIconsData.length - 1, currentIndex + newDirection);
        // Get the icon ID from the calculated index
        const nextItemId = techIconsData[nextIndex].id;

        setSelectedItemId(nextItemId)
        setDirection(newDirection)

        if (newDirection === -1) {
            setLeftArrowAnimating(true);
            //TODO: PLAY WITH TIMING - match with transition prop in svg 
            setTimeout(() => setLeftArrowAnimating(false), 400);
        } else {
            setRightArrowAnimating(true);
            setTimeout(() => setRightArrowAnimating(false), 400);
        }
    }

    return (
        <motion.nav className="project-nav-bar-container">
            <motion.button
                className="arrow-button"
                initial={false}
                animate={{ backgroundColor: currentIcon.color }}
                aria-label="Previous"
                // style={button}
                onClick={() => setSlide(-1)}
                whileFocus={{ outline: `2px solid ${currentIcon.color}` }}
                whileTap={{ scale: 0.9 }}
            >
                <LeftArrowNormal isAnimating={leftArrowAnimating} {...iconsProps} />
            </motion.button>
            <AnimatePresence
                custom={direction}
                initial={false}
                mode="popLayout"
            >
                <TechSlide key={selectedItemId}
                    direction={direction}
                    techIcon={currentIcon}
                    color={currentIcon.backgroundColor} />
            </AnimatePresence>
            <motion.button
                className="arrow-button"
                initial={false}
                animate={{ backgroundColor: currentIcon.color }}
                aria-label="Next"
                // style={button}
                onClick={() => setSlide(1)}
                whileFocus={{ outline: `2px solid ${currentIcon.color}` }}
                whileTap={{ scale: 0.9 }}
            >
                <ArrowRight />
            </motion.button>
            <div className="button-outer-div">
                <div className="empty-placeholder-button"></div>
                <ResumeButton />

            </div>
        </motion.nav>
    )
}

interface SlideProps {
    techIcon: TechIconType;
    direction: number;
    color: string;
}

const TechSlide = forwardRef<HTMLDivElement, SlideProps>(function Slide(
    { color, techIcon },
    ref: React.Ref<HTMLDivElement>
) {
    const direction = usePresenceData()
    return (
        <motion.div
            className="tech-slide-outer-div"
            ref={ref}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    delay: 0.2,
                    type: "spring",
                    visualDuration: 0.3,
                    bounce: 0.4,
                },
            }}
            exit={{ opacity: 0, x: direction * -50 }}
            style={{
                // ...box, 
                backgroundColor: color
            }}
        >
            <TechIcon icon={techIcon} isSelected={true} />
        </motion.div>
    )
})

/**
 * ==============   Icons   ================
 */
const iconsProps: SVGProps<SVGSVGElement> = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
}


function ArrowRight() {
    return (
        <svg {...iconsProps}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}

/**
 * ==============   Styles   ================
 */

// const container: React.CSSProperties = {

// }

// const box: React.CSSProperties = {
//     position: "relative",
//     display: "flex",
//     flexDirection: "column",
//     top: "10px",
//     backgroundColor: "#0cdcf7",
//     borderRadius: "10px",
// }

// const button: React.CSSProperties = {
//     backgroundColor: "#0cdcf7",
//     width: 40,
//     height: 40,
//     borderRadius: "50%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//     zIndex: 1,
//     outlineOffset: 2,
// }

export default ProjectNavBar;