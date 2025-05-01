import { motion } from "motion/react";
import React, { JSX } from "react";
import './resume-button.css'

const ResumeButton: React.FC = ():JSX.Element => {
    return (
        <motion.section>
            <motion.button 
            className="resume-button"
            initial={{}}
            transition={{}}
            animate={{}}
            whileHover={{}}
            whileTap={{}}
            >
                Download Resume
            </motion.button>

        </motion.section>
    )
}

export default ResumeButton;