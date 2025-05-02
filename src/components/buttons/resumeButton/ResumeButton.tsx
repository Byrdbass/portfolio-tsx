import { motion } from "motion/react";
import React, { JSX, useState } from "react";
import './resume-button.css'
import ResumeDownloadConfirm from "../../modals/resumeDownloadConfirm/ResumeDownloadConfirm";
import { useResumeModal } from "../../../Providers/ModalProvider/ResumeModalProvider/ResumeModalProvider";

const ResumeButton: React.FC = ():JSX.Element => {
    const { isResumeModalOpen, setResumeModalOpen } = useResumeModal();
    
    const handleDownloadFull = () => {
        console.log("Downloading full resume");
        // Add your download logic here
        setResumeModalOpen(false);
    };
    
    const handleDownloadBasic = () => {
        console.log("Downloading basic resume");
        // Add your download logic here
        setResumeModalOpen(false);
    };

    return (
        <motion.section
        className={`${isResumeModalOpen ? 'reveal-modal' : ''}`}
        >
            <motion.button 
            className="resume-button"
            initial={{}}
            transition={{}}
            animate={{}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: .8}}
            onClick={() => setResumeModalOpen(true)}
            >
                Download Resume
            </motion.button>
        {/* TODO: move this logic to a provider */}
            <ResumeDownloadConfirm 
                isResumeDownloadOpen={isResumeModalOpen}
                onClose={() => setResumeModalOpen(false)}
                onDownloadFull={handleDownloadFull}
                onDownloadBasic={handleDownloadBasic}
            />

        </motion.section>
    )
}

export default ResumeButton;