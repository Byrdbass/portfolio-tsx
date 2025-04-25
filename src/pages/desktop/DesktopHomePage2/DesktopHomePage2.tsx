import { useEffect, useRef, useState } from "react";
import { mobileScreenContents } from "../../../data/mobileScreenContent";
import { motion, useInView, useScroll } from "motion/react";



const DesktopHomePage2: React.FC = () => {
    const desktopScreenContents = mobileScreenContents.filter((_, index) => index >= 2);
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
    
    // Set up scroll tracking
    const { scrollYProgress } = useScroll();
    
    // Function to check if an element should be rendered
    const shouldRenderProject = (index: number) => {
      // Initial render - render first few projects
      if (visibleProjects.length === 0 && index < 3) return true;
      // Otherwise, only render if in visible array
      return visibleProjects.includes(index);
    };
  
    return (
      <div 
        ref={containerRef}
        className="projects-outer-container"
        style={{
          height: '100vh',
          overflow: 'auto',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        <motion.div 
          className="projects-outer-div"
        >
          {desktopScreenContents.map((content, index) => {
            if (!shouldRenderProject(index)) {
              // Render placeholder with same dimensions but no content
              return (
                <div 
                  key={index} 
                  className="project-placeholder"
                  style={{ height: '35vh', width: '30vw', margin: '20px' }}
                />
              );
            }
            
            // Create a wrapper component that handles visibility detection
            return (
              <ProjectItem 
                key={index}
                content={content}
                index={index}
                onVisibilityChange={(isVisible) => {
                  if (isVisible) {
                    // Add this project to visible array
                    setVisibleProjects(prev => 
                      prev.includes(index) ? prev : [...prev, index]
                    );
                    
                    // Also add adjacent projects for smoother scrolling
                    const adjacent = [index - 2, index - 1, index + 1, index + 2]
                      .filter(i => i >= 0 && i < desktopScreenContents.length);
                    
                    setVisibleProjects(prev => 
                      [...new Set([...prev, ...adjacent])]
                    );
                  }
                }}
              />
            );
          })}
        </motion.div>
      </div>
    );
  };
  
  // Component that handles visibility detection and rendering
  const ProjectItem = ({ content, index, onVisibilityChange }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
      amount: 0.1, // Only need a small amount to be visible
      once: false
    });
    
    useEffect(() => {
      onVisibilityChange(isInView);
    }, [isInView, onVisibilityChange]);
    
    return (
      <motion.div
        ref={ref}
        className="projects-inner-div"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{
          x: [-100, 100, 0],
          rotate: [360, 0],
          opacity: 1,
          scale: 1,
          borderRadius: ["50%", "100%", "0%", "100%", "25%"],
        }}
        whileHover={{ scale: 1.12 }}
      >
        <h2>{content.title}</h2>
        {/* Rest of project content */}
      </motion.div>
    );
  };

  export default DesktopHomePage2;