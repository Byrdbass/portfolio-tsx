import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface DesktopModeContextType {
  desktopView: boolean;
  setDesktopView: (value: boolean) => void;
}

// Create the context with a default value
const DesktopModeContext = createContext<DesktopModeContextType | undefined>(undefined);

// Props interface for the provider component
interface DesktopModeProviderProps {
  children: ReactNode;
  initialDesktopView?: boolean;
}

// Create the provider component
export const DesktopModeProvider: React.FC<DesktopModeProviderProps> = ({ 
  children, 
  initialDesktopView = false 
}) => {
  const [desktopView, setDesktopView] = useState<boolean>(initialDesktopView);

  const value = {
    desktopView,
    setDesktopView
  };

  return (
    <DesktopModeContext.Provider value={value}>
      {children}
    </DesktopModeContext.Provider>
  );
};

// Create and export the custom hook to use this context
export const useDesktopMode = (): DesktopModeContextType => {
  const context = useContext(DesktopModeContext);
  
  if (context === undefined) {
    throw new Error('useDesktopMode must be used within a DesktopModeProvider');
  }
  
  return context;
};