export interface DesktopProjectsProps {
    content: any;
    index: number;
    isVisible: boolean;
    onVisibilityChange: (index: number, isVisible: boolean) => void;
}