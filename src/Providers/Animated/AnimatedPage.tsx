import { Parallax } from "react-scroll-parallax";
import React from "react";
import './animatedRoutes.css'

const AnimatedPage: React.FC<{ children: React.ReactNode; direction: 'up' | 'down' }> = ({ 
    children, 
    direction 
  }) => {
   // When direction is 'down', element should move from top (negative) to center (0)
    // When direction is 'up', element should move from bottom (positive) to center (0)
    const translateY: [number, number] = direction === 'down' ? 
      [-100, 0] : // When coming from above
      [100, 0];   // When coming from below
  
    return (
      <div className="AnimatedPage-outer-div">
        <Parallax
          translateY={translateY}
          opacity={[0, 1]} //fade in as it enters
          speed={0}
          className=""
        >
          {children}
        </Parallax>
      </div>
    );
  };

  export default AnimatedPage