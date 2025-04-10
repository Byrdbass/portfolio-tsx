import { Parallax } from "react-scroll-parallax";
import React from "react";
// import './animatedRoutes.css' TODO replace!!

const AnimatedLandingPage: React.FC<{ children: React.ReactNode; direction: 'up' | 'down' }> = ({ 
    children, 
    direction 
  }) => {
   // When direction is 'down', element should move from top (negative) to center (0)
    // When direction is 'up', element should move from bottom (positive) to center (0)
    const translateY: [number, number] = direction === 'down' ? 
      [-100, 100] : // When coming from above
      [100, 0];   // When coming from below
  
    return (
      <div className="AnimatedLandingPage-outer-div">
        <Parallax
          translateY={translateY}
          opacity={[1, 1]} //fade in as it enters
          speed={0}
          className=""
        >
          {children}
        </Parallax>
      </div>
    );
  };

  export default AnimatedLandingPage