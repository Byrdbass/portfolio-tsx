import React, { useRef, useEffect, useState } from "react";
import { useInView, motion, useScroll, MotionValue } from "motion/react";
import useScrollOverflowGrid from "../../helpers/motion/scrollOverflowGrid";
import { ViewportPosition } from "../../types/motionTypes";
import { DesktopProjectsProps } from "../../types/desktopContent";

const DesktopProjects: React.FC<DesktopProjectsProps> = ({ content, index, isVisible, onVisibilityChange }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        amount: 0.3,
        once: false
    })
    // Use a ref to track previous value to avoid unnecessary updates
    const wasInViewRef = useRef(false);
    const [viewportPosition, setViewportPosition] = useState<ViewportPosition>("outside");

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const maskStyles = useScrollOverflowGrid(scrollYProgress);

    // Function to determine if element is at the top or bottom of viewport
    useEffect(() => {
        const checkViewportPosition = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const topThreshold = viewportHeight * 0.5; // % of viewport
            const bottomThreshold = viewportHeight * 0.95; 

            if (rect.top < topThreshold && rect.bottom > 0) {
                setViewportPosition("top");
            } else if (rect.bottom > bottomThreshold && rect.top < viewportHeight) {
                setViewportPosition("bottom");
            } else if (rect.top >= 0 && rect.bottom <= viewportHeight) {
                setViewportPosition("middle");
            } else {
                setViewportPosition("outside");
            }
        };

        // Create unsubscribe function for the scrollYProgress changes
        const unsubscribe = scrollYProgress.on("change", () => {
            checkViewportPosition();
        });

        // Initial check
        checkViewportPosition();

        // Cleanup subscription
        return () => unsubscribe();
    }, [scrollYProgress]);

    useEffect(() => {
        // Only trigger callback when visibility actually changes
        if (isInView !== wasInViewRef.current) {
            wasInViewRef.current = isInView;
            onVisibilityChange(index, isInView);
        }
    }, [isInView, index, onVisibilityChange]);

    // Generate position-based mask
   // Get the appropriate style object based on viewport position
   const getStylesBasedOnPosition = () => {
    const currentStyles = maskStyles.get();
    
    if (viewportPosition === "top" || viewportPosition === "bottom") {
        // Apply the grid effect when at top or bottom
        return {
            maskImage: currentStyles.maskImage,
            WebkitMaskImage: currentStyles.maskImage,
            backgroundImage: currentStyles.backgroundImage,
            backgroundSize: currentStyles.backgroundSize,
            backdropFilter: currentStyles.backdropFilter
        };
    }
    
    // No mask effect for middle or outside viewport
    return {
        maskImage: "none",
        WebkitMaskImage: "none",
        backgroundImage: "none",
        backgroundSize: "0px 0px",
        backdropFilter: "none"
    };
};

const effectiveStyles = isVisible ? getStylesBasedOnPosition() : {
    maskImage: "none",
    WebkitMaskImage: "none",
    backgroundImage: "none",
    backgroundSize: "0px 0px",
    backdropFilter: "none"
};


    return (
        <>
            <motion.div
                ref={ref}
                className="projects-inner-div"
                initial={{
                    opacity: 0,
                    scale: 0.2
                }}
                transition={{
                    duration: 0.5,
                }}
                animate={{
                    x: [-100, 100, 0],
                    rotate: [360, 0],
                    opacity: isVisible ? 1 : 0.1,
                    scale: isVisible ? 1 : 0.6,
                    borderRadius: ["50%", "100%", "0%", "100%", "25%"],
                    backgroundColor: "var(--teal)"
                }}
                whileHover={{ scale: isVisible ? 1.12 : 0.6 }} // Only allow hover effect on visible items
                whileTap={{ scale: isVisible ? 0.9 : 0.6 }}
                style={{
                    // This keeps projects in the DOM but adjusts their appearance
                    pointerEvents: isVisible ? "auto" : "none",
                    // Use transform to move non-visible elements more out of the way
                    transform: isVisible ? "none" : "translateY(10px)",
                    // Apply a transition effect for smooth appearance/disappearance
                    transition: "opacity 0.3s, transform 0.3s, scale 0.3s",
                    // ...effectiveStyles
                }}
                key={index}

            >
                {/* TITLE */}
                <h2>{content.title}</h2>
                {content.hostedSite ? (
                    // DEPLOYED ICON
                    <a
                        className="deployed-icon"
                        href={content.hostedSite}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        🚀
                    </a>
                ) : null}
                {/* DESCRIPTION */}
                <p className="desktop-description">
                    {content.description}
                </p>
                {/* GITHUB REPO */}
                <a
                    href={content.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {" "}
                    Link to repo on Github{" "}
                </a>
                {content.image && (
                    <img
                        src={content.image.src}
                        alt={content.image.alt || ""}
                        width={250}
                    />
                )}
            </motion.div>

        </>
    )
}

export default DesktopProjects;