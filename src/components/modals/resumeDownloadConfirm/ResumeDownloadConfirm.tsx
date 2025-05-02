import { AnimatePresence, motion } from "motion/react";
import React, { JSX } from "react";
import './resume-download-confirm.css'

interface ResumeDownloadConfirmProps {
    isResumeDownloadOpen: boolean
    onClose: () => void;
    onDownloadFull: () => void
    onDownloadBasic: () => void
}

const ResumeDownLoadConfirm: React.FC<ResumeDownloadConfirmProps> = ({
    isResumeDownloadOpen,
    onClose,
    onDownloadBasic,
    onDownloadFull
}): JSX.Element => {
    return (
            <AnimatePresence>
                {isResumeDownloadOpen && (
                    <>
                    //Modal Backdrop with blur and radial gradient
                    <motion.div 
                    className="modal-backdrop"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{ opacity: 0}}
                    onClick={ onClose }
                    />


             
                <motion.div
                    className="resume-modal-container"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <div className="resume-modal-outer-div">
                        <h2>Download Options</h2>
                        <div className="modal-buttons">
                            <motion.button
                                className="modal-button primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onDownloadFull}
                            >
                                Download Full Resume
                            </motion.button>

                            <motion.button
                                className="modal-button secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onDownloadBasic}
                            >
                                Download Basic Resume
                            </motion.button>

                            <motion.button
                                className="modal-button cancel"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
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