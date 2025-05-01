import React, { JSX } from "react";
import '../phone.css'
import MobileProfilePic from "../mobileProfilePic/MobileProfilePic";
import { ActiveClassProp } from "../../../types/mobileContent";
import { motion } from "motion/react";
import ResumeButton from "../../../components/buttons/resumeButton/ResumeButton";

type MobileHomePageProps = ActiveClassProp;

const MobileHomePage: React.FC<MobileHomePageProps> = ({isActive}): JSX.Element => {
    return (
        <>
            <div className={`phone-content ${isActive}`}>
                <MobileProfilePic altText='picture of leland in an orange tie' />
                <p className="phone-title">
                    I'm Leland Byrd
                </p>
                <p className="phone-description">
                    I'm a Software Engineer
                </p>
                <ResumeButton />
            </div>
        </>
    )
}

export default MobileHomePage;