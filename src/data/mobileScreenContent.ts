import { MobileScreenContent } from "../types/mobileContent";
import { ActiveClassProp } from "../types/mobileContent";
import MobileHomePage from "../components/mobile/mobileHomePage/MobileHomePage";

export const MobileScreenContents: MobileScreenContent[] = [
  {
    //TODO: FIX THIS 
    id: 'MobileHomePage',
    component: ({ActiveClassProp}) => <MobileHomePage {ActiveClassProp} />,
    backgroundColor: "transparent"
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
