export interface ImageData {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }
  //TODO: fix this!
  export type ActiveClassProp = {
    isActive: 'active' | '';
  }
  
  export interface MobileScreenContent {
    id: string;
    title?: string;
    description?: string;
    githubRepo?: URL;
    hostedSite?: URL;
    image?: ImageData;
    backgroundColor?: string;
    component?: (props: { isActive: 'active' | '' }) => React.ReactNode;
  }
  