import { useEffect, useRef } from "react";
import gsap from "gsap";

const GsapAnimation = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, { rotation: 360, duration: 1 });
  }, []);

  return <div ref={boxRef} className="box" style={{fontSize: '50px', display: 'flex', alignItems: 'center', position: 'absolute'}}>Spin Me!</div>;
};

export default GsapAnimation;