import { useState, useEffect, useRef, useContext } from "react";
import '../phone.css'
import '../../glassBreak/glassbreak.css'
import './codeProjectsMobile.css'
import ParticlesContext from "../../../Providers/ParticlesProvider/ParticlesContext";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";

interface ImageData{
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

interface ScreenContent{
    id: string;
    title: string;
    description: string;
    githubRepo?: URL;
    hostedSite?: URL;
    image?: ImageData;
    backgroundColor?: string;
    component?: React.ReactNode;
}

const screenContents: ScreenContent[] = [
    {
      id: 'screen1',
      title: 'Welcome',
      description: 'Swipe up or scroll to explore the app',
      backgroundColor: '#1a1a2e'
    },
    {
      id: 'screen2',
      title: 'Features',
      description: 'Discover what our app can do for you',
      backgroundColor: '#16213e'
    },
    {
      id: 'screen3',
      title: 'About Us',
      description: 'Learn more about our team and mission',
      backgroundColor: '#0f3460'
    },
    {
      id: 'screen4',
      title: 'Contact',
      description: 'Get in touch with our support team',
      backgroundColor: '#e94560'
    }
  ];

  export default function CodeProjectsMobile() {
    const [activeScreen, setActiveScreen] = useState(0);
    const phoneRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {setParticlesVisible} = useContext(ParticlesContext);
    //TODO: MOVE THIS TO A PROVIDER
    const { desktopView, setDesktopView } = useDesktopMode();
  
    // Initialize phone animation
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }, []);
  
    // Handle scroll effects
    useEffect(() => {
      const handleScroll = () => {
        const scrollPositionMobilePage = window.scrollY + window.innerHeight / 2;
        const scrollPositionParticles = Math.min(window.scrollY/ (window.innerHeight * .25), 1)
        if (scrollPositionParticles > 0.1) {
          setParticlesVisible(false);
      } else {
          setParticlesVisible(true);
      }
        // Find which section is currently in view
        const activeIndex = sectionRefs.current.findIndex((section, index) => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          return scrollPositionMobilePage >= sectionTop && scrollPositionMobilePage < sectionBottom;
        });
        
        if (activeIndex !== -1 && activeIndex !== activeScreen) {
          setActiveScreen(activeIndex);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [activeScreen]);
  
    const toggleMode = () => {
      setDesktopView(!desktopView);
    };
  
    return (
      <div className="app-container">
        <button 
          className="mode-toggle" 
          onClick={toggleMode}
        >
          {desktopView ? 'Switch to Mobile' : 'Switch to Desktop'}
        </button>
  
        <div className={`phone-container ${desktopView ? 'desktop-mode' : ''}`}>
          <div 
            ref={phoneRef} 
            className={`phone ${isLoaded ? 'loaded' : ''}`}
          >
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                {screenContents.map((screen, index) => (
                  <div 
                    key={screen.id}
                    className={`phone-content ${index === activeScreen ? 'active' : ''}`}
                    style={{ backgroundColor: screen.backgroundColor }}
                  >
                    <h2 className="phone-title">{screen.title}</h2>
                    <p className="phone-description">{screen.description}</p>
                    {screen.component}
                  </div>
                ))}
                <div className="glass-reflection"></div>
                
                <div className="screen-indicator">
                  {screenContents.map((_, index) => (
                    <div 
                      key={index} 
                      className={`indicator-dot ${index === activeScreen ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="scroll-sections">
          {screenContents.map((screen, index) => (
            <div 
              key={screen.id}
              ref={el => sectionRefs.current[index] = el}
              className="scroll-section"
              id={screen.id}
            >
              {desktopView && (
                <div className="desktop-content">
                  <h2>{screen.title}</h2>
                  <p>{screen.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }