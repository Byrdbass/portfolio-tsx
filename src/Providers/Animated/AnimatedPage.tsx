import { Parallax } from "react-scroll-parallax";
import React from "react";

const AnimatedPage: React.FC<{ children: React.ReactNode; direction: 'up' | 'down' }> = ({ 
    children, 
    direction 
  }) => {
    const translateY: [number, number] = direction === 'down' ? [0, -100] : [100, 0];
  
    return (
      <div className="w-full min-h-screen">
        <Parallax
          translateY={translateY}
          opacity={[1, 0]}
          speed={-15}
          className="w-full min-h-screen"
        >
          {children}
        </Parallax>
      </div>
    );
  };

  export default AnimatedPage