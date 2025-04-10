import React, { JSXElementConstructor } from "react";
import ProfilePic from '../../../assets/images/ProfilePicMobile.jpg'
import { JSX } from "react/jsx-dev-runtime";
import './mobileProfilePic.css'

interface PhotoProps {
    altText: string;
}

const MobileProfilePic: React.FC<PhotoProps> = ({ altText }): JSX.Element => {
    

    return(
        <div className="mobileProfilePic-outer-div">
            <img src={ProfilePic} alt={altText} className="profilePic" />
        </div>
    )

}

export default MobileProfilePic;