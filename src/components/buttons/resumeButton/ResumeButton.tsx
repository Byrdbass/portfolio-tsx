import { motion } from "motion/react";
import React, { JSX, useState } from "react";
import './resume-button.css'
import ResumeDownloadConfirm from "../../modals/resumeDownloadConfirm/ResumeDownloadConfirm";

const ResumeButton: React.FC = ():JSX.Element => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    
    const handleDownloadFull = () => {
        console.log("Downloading full resume");
        // Add your download logic here
        setModalOpen(false);
    };
    
    const handleDownloadBasic = () => {
        console.log("Downloading basic resume");
        // Add your download logic here
        setModalOpen(false);
    };

    return (
        <motion.section
        className={`${modalOpen ? 'reveal-modal' : ''}`}
        >
            <motion.button 
            className="resume-button"
            initial={{}}
            transition={{}}
            animate={{}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: .8}}
            onClick={() => setModalOpen(true)}
            >
                Download Resume
            </motion.button>

            <ResumeDownloadConfirm 
                isResumeDownloadOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onDownloadFull={handleDownloadFull}
                onDownloadBasic={handleDownloadBasic}
            />

        </motion.section>
    )
}

export default ResumeButton;