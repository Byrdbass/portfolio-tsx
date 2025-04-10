import React, { JSX } from "react";
import '../phone.css'
import MobileProfilePic from "../mobileProfilePic/MobileProfilePic";


const MobileHomePage: React.FC = (): JSX.Element => {
    return (
        <>
            <div className="phone-content">
                <MobileProfilePic altText='picture of leland in an orange tie' />
                <p className="phone-title">
                    I'm Leland Byrd
                </p>
                <p className="phone-description">
                    I'm a Software Engineer
                </p>
            </div>
        </>
    )
}

export default MobileHomePage