import React, { useEffect } from "react";
import ParticlesContext from "../../Providers/ParticlesProvider/ParticlesContext";
import { Link } from "react-router-dom";

const MobileHomePage: React.FC = () => {
    const { setParticlesVisible } = React.useContext(ParticlesContext);

    useEffect(() => {
        setParticlesVisible(false);
      }, [setParticlesVisible]);
      
    return (
        <div className="MobileHomePage-outer-div">
            <Link to={'/'}> HOME </Link>
            <h1>THIS IS COMING SOON TO MOBILE HOME PAGE </h1>
        </div>
    )
}

export default MobileHomePage