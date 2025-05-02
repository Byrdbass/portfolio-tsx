import { createContext, ReactNode, useContext, useState } from "react";

interface ResumeModalContextType{
    isResumeModalOpen: boolean;
    setResumeModalOpen: (value: boolean) => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined >(undefined);

interface ResumeModalProviderProps{
    children: ReactNode;
    initialResumeModal?: boolean;
}

export const ResumeModalProvider: React.FC<ResumeModalProviderProps> = ({
    children,
    initialResumeModal = false
}) => {
    const[ isResumeModalOpen, setResumeModalOpen ] = useState<boolean>(initialResumeModal);

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