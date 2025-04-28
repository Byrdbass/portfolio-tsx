import React, { useRef, useEffect } from "react";
import { useInView, motion } from "motion/react";

interface DesktopProjectsProps {
    content: any;
    index: number;
    isVisible: boolean;
    onVisibilityChange: (index: number, isVisible: boolean) => void;
  }

  const DesktopProjects: React.FC<DesktopProjectsProps> = ({ content, index, isVisible, onVisibilityChange }) => {    
    const ref = useRef(null);
    const isInView = useInView(ref, {
        amount: 0.1,
        once: false
    })
     // Use a ref to track previous value to avoid unnecessary updates
    const wasInViewRef = useRef(false);

    useEffect(() => {
        // Only trigger callback when visibility actually changes
        if (isInView !== wasInViewRef.current) {
          wasInViewRef.current = isInView;
          onVisibilityChange(index, isInView);
        }
      }, [isInView, index, onVisibilityChange]);


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
                    duration: 1.5,
                }}
                animate={{
                    x: [-100, 100, 0],
                    rotate: [360, 0],
                    opacity:  isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    borderRadius: ["50%", "100%", "0%", "100%", "25%"],
                    backgroundColor: "var(--teal)"
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    // This keeps projects in the DOM but adjusts their appearance
                    pointerEvents: isVisible ? "auto" : "none"
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