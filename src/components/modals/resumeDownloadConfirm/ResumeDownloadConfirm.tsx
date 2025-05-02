import { AnimatePresence, motion } from "motion/react";
import React, { JSX, useState } from "react";
import './resume-download-confirm.css'
import { useResumeModal } from "../../../Providers/ModalProvider/ResumeModalProvider/ResumeModalProvider";


const ResumeDownLoadConfirm: React.FC = (): JSX.Element => {
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

    // Close modal function
    const handleClose = () => {
        setResumeModalOpen(false);
    };

    return (
        <AnimatePresence>
            {isResumeModalOpen && (
                <>
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 1}}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setResumeModalOpen(false)}
                    />



                    <motion.div
                        className="resume-modal-container"
                        initial={{ scale: 4, opacity: 0.2 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            duration: 1,
                            type: "spring",
                            damping: 25,
                            stiffness: 30,
                        }}
                    >
                        <div className="resume-modal-outer-div">
                            <h2>Download Options</h2>
                            <div className="modal-buttons-div">
                                <motion.button
                                    className="modal-button primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDownloadFull}
                                >
                                    Download Full Resume
                                </motion.button>

                                <motion.button
                                    className="modal-button secondary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDownloadBasic}
                                >
                                    Download Basic Resume
                                </motion.button>

                                <motion.button
                                    className="modal-button cancel"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleClose}
                                >
                                    No thanks
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
export default ResumeDownLoadConfirm