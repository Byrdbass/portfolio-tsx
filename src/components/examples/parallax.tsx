import { Parallax } from "react-parallax";
import pokeBackground from '../../assets/images/backgroundForecast.jpeg' 
import GsapAnimation from "./gasp";


const ParallaxSection = () => (
  <Parallax bgImage={pokeBackground} strength={50}>
    <GsapAnimation />
    <div style={{ height: 900 }}>Parallax Content</div>
  </Parallax>
);

export default ParallaxSection;