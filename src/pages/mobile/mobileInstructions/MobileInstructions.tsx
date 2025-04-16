import React, { JSX } from "react";
import '../phone.css'


const MobileInstructions: React.FC<{isActive: 'active' | ''}> = ({isActive}): JSX.Element => {
    return(
        <div>
            <p className="phone-title">
                Scroll to see projects 
            </p>
                <span className="phone-title">{"\u2B07"}</span> 
            <p className="phone-description">
                click the Image 🖼️ to see the Repo
            </p>
            <p className="phone-description">
                If it is deployed: click the <br />
                <span className="phone-title">🚀</span>
            </p>
        </div>

    )
}

export default MobileInstructions;