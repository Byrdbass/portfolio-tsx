import React, { useContext, useState, createContext, ReactNode } from "react";
import { mobileScreenContents } from "../../data/mobileScreenContent";

interface ActiveScreenContextType {
    activeScreen: number;
    setActiveScreen: (index: number) => void;
    navigateTo: (index: number) => void;
    totalScreens: number;
}

const ActiveScreenContext = createContext<ActiveScreenContextType | undefined>(undefined);

export const ActiveScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeScreen, setActiveScreen] = useState(0);
    const totalScreens = mobileScreenContents.length;

    //Navigate function for react-scroll
    const navigateTo = (index: number) => {
        if (index >= 0 && index < totalScreens){
            setActiveScreen(index);
        }
    }

    const value = {
        activeScreen,
        setActiveScreen,
        navigateTo,
        totalScreens
    }

    return <ActiveScreenContext.Provider value={value}>
        {children}
    </ActiveScreenContext.Provider>
}

//export custom hook
export const useActiveScreen = (): ActiveScreenContextType => {
    const context = useContext(ActiveScreenContext);
    if(context === undefined){
        throw new Error('useActiveScreen must be in an ActiveScreenProvider')
    }
    return context;
}

export default ActiveScreenContext;