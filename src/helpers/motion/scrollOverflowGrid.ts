import { animate, useMotionValue, useMotionValueEvent, MotionValue } from "motion/react";
import { mask } from "motion/react-client";

const top = "0%";
const bottom = "100%";
const topInset = "5%";
const bottomInset = "95%";
const transparent = 'var(--trans)';
const opaque = "#000";

export default function useScrollOverflowGrid(scrollProgress: MotionValue<number>) {
    // This will hold our combined mask/background/filter properties
    const maskStyles = useMotionValue({
        maskImage: `linear-gradient(to bottom, ${opaque}, ${opaque})`,
        backgroundImage: 'none',
        backgroundSize: '0px 0px',
        backdropFilter: 'blur(0px)'
    });

    useMotionValueEvent(scrollProgress, "change", (value) => {
        if (value === 0) {
            // At the top - no effect
            animate(maskStyles, {
                maskImage: `linear-gradient(to bottom, ${opaque}, ${opaque})`,
                backgroundImage: 'none',
                backgroundSize: '0px 0px',
                backdropFilter: 'blur(0px)'
            });
        }
        else if (value === 1) {
            // At the bottom - no effect
            animate(maskStyles, {
                maskImage: `linear-gradient(to top, ${opaque}, ${opaque})`,
                backgroundImage: 'none',
                backgroundSize: '0px 0px',
                backdropFilter: 'blur(0px)'
            });
        }
        else if (scrollProgress.getPrevious() === 0 || scrollProgress.getPrevious() === 1) {
            // Transitioning from top or bottom - apply the grid effect
            animate(maskStyles, {
                maskImage: `radial-gradient(${transparent} 1px, var(--black) 1px)`,
                backgroundImage: `radial-gradient(${transparent} 1px, var(--black) 1px)`,
                backgroundSize: '4px 4px',
                backdropFilter: 'blur(3px)'
            });
        }
    });

    return maskStyles;
}