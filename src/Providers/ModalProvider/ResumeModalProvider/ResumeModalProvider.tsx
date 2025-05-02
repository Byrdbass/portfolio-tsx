import { createContext, ReactNode, useContext, useState } from "react";

interface ResumeModalContextType{
    isResumeModalOpen: boolean;
    setResumeModalOpen: (isOpen: boolean) => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined >(undefined);

interface ResumeModalProviderProps{
    children: ReactNode;
}

export const ResumeModalProvider: React.FC<ResumeModalProviderProps> = ({
    children
}) => {
    const[ isResumeModalOpen, setResumeModalOpen ] = useState<boolean>(false);

    const value = {
        isResumeModalOpen,
        setResumeModalOpen
    };

    return (
        <ResumeModalContext.Provider value={value}>
            {children}
        </ResumeModalContext.Provider>
    )
};

export const useResumeModal = (): ResumeModalContextType => {
    const context = useContext(ResumeModalContext);

    if (context === undefined){
        throw new Error('useResumeModal must be used withina provider')
    }

    return context;
}