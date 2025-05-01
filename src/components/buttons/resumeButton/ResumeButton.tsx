import { motion } from "motion/react";
import React, { JSX } from "react";

const ResumeButton: React.FC = ():JSX.Element => {
    return (
        <motion.section>
            <motion.button
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