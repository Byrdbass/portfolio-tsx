import { MobileScreenContent } from "../types/mobileContent";
import MobileHomePage from "../pages/mobile/mobileHomePage/MobileHomePage.tsx";
import MobileInstructions from "../pages/mobile/mobileInstructions/MobileInstructions.tsx";

export const mobileScreenContents: MobileScreenContent[] = [
  {
    id: 'MobileHomePage',
    component: MobileHomePage,
    backgroundColor: "transparent"
  },
  {
    id: "instructions",
    component: MobileInstructions,
    backgroundColor: "transparent"
  },
// clock-in
{
  id: "clock-in",
  title: "Clock In",
  description: "Clock In system and Quickbooks clone for company financial tracking, Airtable BackEnd",
  githubRepo: "https://github.com/LelandByrd",
  hostedSite: "https://clock-in-phi.vercel.app/",
  image: {
    src: "http://lelandbyrd.com/images/ClockIn-03302024.png",
    alt: "Clock In system",
    width: "256px",
    height: "512px"
  }
},

// ikigai-bot
{
  id: "ikigai-bot",
  title: "Ikigai Bot",
  description: "A bot to help student determine career ambitions and recommendations",
  githubRepo: "https://github.com/LelandByrd",
  hostedSite: "https://ikigaibot.vercel.app/",
  image: {
    src: "http://lelandbyrd.com/images/Ikigaibot.gif",
    alt: "Ikigai chat bot",
    width: "256px",
    height: "512px"
  }
},

// goalsetter-bot
{
  id: "goalsetter-bot",
  title: "GoalSetter Bot",
  description: "A chat bot created for teachers to set daily or weekly goals",
  githubRepo: "https://github.com/LelandByrd",
  hostedSite: "https://strivetogether-continuous.vercel.app/",
  image: {
    src: "http://lelandbyrd.com/images/GoalsetterForTeachers.gif",
    alt: "Goalsetter app for Teachers",
    width: "256px",
    height: "512px"
  }
},

// multitracks
{
  id: "multitracks",
  title: "MultiTracks",
  description: "An DotNET API created to showcase various Musician Profiles",
  githubRepo: "https://github.com/Byrdbass/MultiTracks",
  hostedSite: "",
  image: {
    src: "http://lelandbyrd.com/images/MultiTracks.com.gif",
    alt: "gif of MultiTracks Music app",
    width: "256px",
    height: "512px"
  }
},
  {
    id: "poke-weather",
    title: "Poke Weather",
    description: "A weather API with Pokémon based on weather conditions",
    githubRepo: "https://github.com/Byrdbass/Poke-Weather",
    hostedSite: "http://lelandbyrd.com/assets/Poke-Weather/index.html",
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
    githubRepo: "https://github.com/mrlane51/RepairRevolution",
    hostedSite: "https://repairrevolution.herokuapp.com/",
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
    githubRepo: "https://github.com/clabel95/Decked-Out",
    hostedSite: "https://decked--out.herokuapp.com",
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
    githubRepo: "https://github.com/Byrdbass/Werd-to-the-Words",
    hostedSite: "https://werd-to-the-words.herokuapp.com/",
    image: {
      src: "https://lelandbyrd.com/images/J.A.T.E.gif",
      alt: "screen shot of werd to the words app"
    }
  },
  {
    id: "byrdsbuddies",
    title: "ByrdsBuddies application",
    description: "A backend app that tracks users, their thoughts, and login info.",
    githubRepo: "https://github.com/Byrdbass/ByrdsBuddies",
    hostedSite: "https://github.com/Byrdbass/ByrdsBuddies",
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
    githubRepo: "https://github.com/Byrdbass/Blog-Bonanza",
    hostedSite: "https://blog-bonanza.herokuapp.com",
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
    githubRepo: "https://github.com/Byrdbass/note-taker",
    hostedSite: "https://write-some-notes.herokuapp.com/",
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
    githubRepo: "https://github.com/Byrdbass/Team-Profile-Generator",
    hostedSite: "https://github.com/Byrdbass/Team-Profile-Generator",
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
    githubRepo: "https://github.com/Byrdbass/MarkDown-MUHsheeen",
    hostedSite: "https://github.com/Byrdbass/MarkDown-MUHsheeen",
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
    githubRepo: "https://github.com/Byrdbass/weather-dashboard",
    hostedSite: "https://byrdbass.github.io/weather-dashboard/",
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
    githubRepo: "https://github.com/Byrdbass/passwordGenerator",
    hostedSite: "https://byrdbass.github.io/passwordGenerator/",
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
    githubRepo: "https://github.com/Byrdbass/E-commerce-Back-End",
    hostedSite: "https://github.com/Byrdbass/E-commerce-Back-End",
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
    githubRepo: "https://github.com/Byrdbass/bizness-trackstar",
    hostedSite: "https://github.com/Byrdbass/bizness-trackstar",
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
    githubRepo: "https://github.com/Byrdbass/work-day-scheduler",
    hostedSite: "https://byrdbass.github.io/work-day-scheduler",
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
    githubRepo: "https://github.com/Byrdbass/code-quiz",
    hostedSite: "https://byrdbass.github.io/code-quiz/",
    image: {
      src: "https://lelandbyrd.com/images/Code-Quiz-gif.gif",
      alt: "screenshot of an online JS code quiz",
      width: '256px',
      height: '512px'
    }
  }
];