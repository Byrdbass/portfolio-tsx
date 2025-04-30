// TechIcon.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TechIcon as TechIconType } from '../../types/techIcons';

interface TechIconProps {
  icon: TechIconType;
  isSelected?: boolean;
}

const TechIcon: React.FC<TechIconProps> = ({ icon, isSelected = false }) => {
  // Import SVG dynamically
  // Note: For this to work, you'll need to have the SVGs in your public folder
  // or use a tool like SVGR to import them as React components
  const iconPath = `/logos/${icon.fileName}`;
  
  return (
    <motion.div 
      className="tech-icon-wrapper"
      initial={{ opacity: 0.7 }}
      animate={{ 
        opacity: 1,
        scale: isSelected ? 1.1 : 1,
        boxShadow: isSelected ? `0 0 15px ${icon.color}` : 'none'
      }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: isSelected ? `${icon.color}20` : 'transparent',
        border: isSelected ? `2px solid ${icon.color}` : '2px solid transparent'
      }}
    >
      <div 
        className="icon-container"
        style={{
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >

        <img 
          src={iconPath} 
          alt={`${icon.name} icon`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
      <motion.span
        className="tech-name"
        style={{
          marginTop: '8px',
          fontWeight: isSelected ? 600 : 400,
          color: isSelected ? icon.color : 'currentColor'
        }}
      >
        {icon.name}
      </motion.span>
      <motion.span
        className="tech-type"
        style={{
          fontSize: '0.8rem',
          opacity: 0.7,
          textTransform: 'capitalize'
        }}
      >
        {icon.type}
      </motion.span>
    </motion.div>
  );
};

export default TechIcon;