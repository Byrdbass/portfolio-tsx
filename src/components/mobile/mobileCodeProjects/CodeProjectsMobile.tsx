import { useState, useEffect, useRef, useContext } from "react";
import '../phone.css'
import '../../glassBreak/glassbreak.css'
import './codeProjectsMobile.css'
import ParticlesContext from "../../../Providers/ParticlesProvider/ParticlesContext";
import { useDesktopMode } from "../../../Providers/Desktop/DesktopProvider";
import MobileHomePage from "../mobileHomePage/MobileHomePage";

interface ImageData {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

interface MobileScreenContent {
  id: string;
  title?: string;
  description?: string;
  githubRepo?: URL;
  hostedSite?: URL;
  image?: ImageData;
  backgroundColor?: string;
  component?: (props: { isActive: 'active' | '' }) => React.ReactNode;
}

const mobileScreenContents: MobileScreenContent[] = [
  {
    id: 'MobileHomePage',
    component: (props) => <MobileHomePage {...props} />,
    backgroundColor: "transparent"
  },
  {
    id: "poke-weather",
    title: "Poke Weather",
    description: "A weather API with Pokémon based on weather conditions",
    githubRepo: new URL("https://github.com/Byrdbass/Poke-Weather"),
    hostedSite: new URL("http://lelandbyrd.com/assets/Poke-Weather/index.html"),
    image: {
      src: "http://lelandbyrd.com/images/PokeWeather.gif",
      alt: "screenshot of poke-weather app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "repair-revolution",
    title: "Repair Revolution",
    description: "A blog to advocate for the Right to Repair! Reuse and Recycle!",
    githubRepo: new URL("https://github.com/mrlane51/RepairRevolution"),
    hostedSite: new URL("https://repairrevolution.herokuapp.com/"),
    image: {
      src: "https://lelandbyrd.com/images/Repair%20Revolution.gif",
      alt: "screenshot of Repair-Revolution app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "decked-out",
    title: "Decked-Out",
    description: "Create an account and study flashcards of your favorite subject or quiz.",
    githubRepo: new URL("https://github.com/clabel95/Decked-Out"),
    hostedSite: new URL("https://decked--out.herokuapp.com"),
    image: {
      src: "https://lelandbyrd.com/images/Decked-Out.gif",
      alt: "screenshot of Decked-Out app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "werd-to-the-words",
    title: "Werd to The Words",
    description: "A progressive web app that functions as a basic text editor.",
    githubRepo: new URL("https://github.com/Byrdbass/Werd-to-the-Words"),
    hostedSite: new URL("https://werd-to-the-words.herokuapp.com/"),
    image: {
      src: "https://lelandbyrd.com/images/J.A.T.E.gif",
      alt: "screen shot of werd to the words app"
    }
  },
  {
    id: "byrdsbuddies",
    title: "ByrdsBuddies application",
    description: "A backend app that tracks users, their thoughts, and login info.",
    githubRepo: new URL("https://github.com/Byrdbass/ByrdsBuddies"),
    hostedSite: new URL("https://github.com/Byrdbass/ByrdsBuddies"),
    image: {
      src: "https://lelandbyrd.com/images/byrdsbuddies-gif.gif",
      alt: "screen shot of byrdsbuddies app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "blog-bonanza",
    title: "Blog Bonanza",
    description: "A full stack tech blog!",
    githubRepo: new URL("https://github.com/Byrdbass/Blog-Bonanza"),
    hostedSite: new URL("https://blog-bonanza.herokuapp.com"),
    image: {
      src: "http://lelandbyrd.com/images/Blog-Bonanza.gif",
      alt: "screenshot of Blog-Bonanza app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "write-some-notes",
    title: "Write Some Notes",
    description: "A simple note-taking app.",
    githubRepo: new URL("https://github.com/Byrdbass/note-taker"),
    hostedSite: new URL("https://write-some-notes.herokuapp.com/"),
    image: {
      src: "https://lelandbyrd.com/images/Note%20Taker.gif",
      alt: "screenshot of Note Taker app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "team-profile-generator",
    title: "Team Profile Generator",
    description: "A Node app to create an employee database.",
    githubRepo: new URL("https://github.com/Byrdbass/Team-Profile-Generator"),
    hostedSite: new URL("https://github.com/Byrdbass/Team-Profile-Generator"),
    image: {
      src: "https://lelandbyrd.com/images/team-profile-generator-gif.gif",
      alt: "screenshot of Team profile Generator app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "markdown-muhsheeen",
    title: "MarkDown MUHsheeen",
    description: "A markdown file generator for easy GitHub deployment.",
    githubRepo: new URL("https://github.com/Byrdbass/MarkDown-MUHsheeen"),
    hostedSite: new URL("https://github.com/Byrdbass/MarkDown-MUHsheeen"),
    image: {
      src: "https://lelandbyrd.com/images/README-generator-gif.gif",
      alt: "screenshot of a readme generator",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "A 5-day weather forecast based on location.",
    githubRepo: new URL("https://github.com/Byrdbass/weather-dashboard"),
    hostedSite: new URL("https://byrdbass.github.io/weather-dashboard/"),
    image: {
      src: "https://lelandbyrd.com/images/Weather-Dashboard-ScreenShot.gif",
      alt: "screenshot of Weather app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "An app to generate a password with alert boxes.",
    githubRepo: new URL("https://github.com/Byrdbass/passwordGenerator"),
    hostedSite: new URL("https://byrdbass.github.io/passwordGenerator/"),
    image: {
      src: "https://lelandbyrd.com/images/Password_gen_screenshot.png",
      alt: "screenshot of password Generator app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "ecommerce-backend",
    title: "E-Commerce Back End",
    description: "Helps vendors link products to categories and other info.",
    githubRepo: new URL("https://github.com/Byrdbass/E-commerce-Back-End"),
    hostedSite: new URL("https://github.com/Byrdbass/E-commerce-Back-End"),
    image: {
      src: "https://lelandbyrd.com/images/e-commerce-back-end-screenshot.gif",
      alt: "screenshot of e-commerce back end app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "bizness-trackstar",
    title: "Bizness-Trackstar",
    description: "Tracks employee databases including salaries and managers.",
    githubRepo: new URL("https://github.com/Byrdbass/bizness-trackstar"),
    hostedSite: new URL("https://github.com/Byrdbass/bizness-trackstar"),
    image: {
      src: "https://lelandbyrd.com/images/employee-tracker-screenshot.gif",
      alt: "screenshot of bizness-trackstar app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "work-day-scheduler",
    title: "Work Day Scheduler",
    description: "Create and monitor a daily schedule to stay organized.",
    githubRepo: new URL("https://github.com/Byrdbass/work-day-scheduler"),
    hostedSite: new URL("https://byrdbass.github.io/work-day-scheduler"),
    image: {
      src: "https://lelandbyrd.com/images/Work-day-scheduler-screenGif.gif",
      alt: "screenshot of work-day-scheduler app",
      width: '256px',
      height: '512px'
    }
  },
  {
    id: "code-quiz",
    title: "Code Quiz",
    description: "Quiz yourself on basic JavaScript and compete for high scores!",
    githubRepo: new URL("https://github.com/Byrdbass/code-quiz"),
    hostedSite: new URL("https://byrdbass.github.io/code-quiz/"),
    image: {
      src: "https://lelandbyrd.com/images/Code-Quiz-gif.gif",
      alt: "screenshot of an online JS code quiz",
      width: '256px',
      height: '512px'
    }
  }
];

export default function CodeProjectsMobile() {
  const [activeScreen, setActiveScreen] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { setParticlesVisible } = useContext(ParticlesContext);
  const { desktopView, setDesktopView } = useDesktopMode();

  // Initialize phone animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  console.log(sectionRefs.current)
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPositionMobilePage = window.scrollY + window.innerHeight / 2;

      // handle particles transition
      const scrollPositionParticles = Math.min(window.scrollY / (window.innerHeight * .25), 1)
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
              {mobileScreenContents.map((screen, index) => {
                const isActive = index === activeScreen ? 'active' : '';
                return (
                  <div
                    key={screen.id}
                    className={`phone-content ${index === activeScreen ? 'active' : ''}`}
                    style={{ backgroundColor: screen.backgroundColor }}
                  >
                    <h2 className="phone-title">{screen.title}</h2>
                    <p className="phone-description">{screen.description}</p>
                    {screen.component ? screen.component({ isActive }) : null}
                    <img src={screen.image?.src} alt={screen.image?.alt} width={screen.image?.width} />
                  </div>
                )
              }
              )}
              <div className="glass-reflection"></div>

              <div className="screen-indicator">
                {mobileScreenContents.map((_, index) => (
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
        {mobileScreenContents.map((screen, index) => (
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