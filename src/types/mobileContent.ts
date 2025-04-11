export interface ImageData {
    src: string;
    alt: string;
    width?: string;
    height?: string;
  }

  export interface ActiveClassProp {
    isActive: 'active' | '';
  }
  
  export interface MobileScreenContent {
    id: string;
    title?: string;
    description?: string;
    githubRepo?: string;
    hostedSite?: string;
    image?: ImageData;
    backgroundColor?: string;
    component?: React.ComponentType<ActiveClassProp>
  }
  