import React, { JSX } from "react";
import '../phone.css'


const MobileTemplate: React.FC = (): JSX.Element => {
    return (
        <div className="phone">
            <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                    <div className="glass-reflection"></div>
                    <div className="phone-content">
                        <p className="MobileHomePage-title">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum voluptatibus doloremque architecto, dicta magni laudantium nobis in corporis porro nostrum quidem voluptas harum repudiandae non, rem, maxime nihil blanditiis tenetur!
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MobileTemplate;