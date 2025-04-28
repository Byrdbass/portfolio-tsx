import { animate, useMotionValue, useMotionValueEvent, MotionValue } from "motion/react";
import { mask } from "motion/react-client";

const top = "0%";
const bottom = "100%";
const topInset = "5%";
const bottomInset = "95%";
const transparent = '#0000';
const opaque = "#000";

export default function useScrollOverflowMask(scrollProgress: MotionValue<number>):MotionValue<string> {
    //THIS OCCURS WHEN PAGE LOADS
    const maskImage = useMotionValue(
        `linear-gradient(to bottom, ${opaque}, ${opaque})`
    )
    useMotionValueEvent(scrollProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(0deg, ${opaque}, ${opaque} ${top}, ${opaque} ${bottomInset}, ${transparent})`
            )
        }
        else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(0deg, ${transparent}, ${opaque} ${topInset}, ${opaque} ${bottom}, ${opaque})`
            )
        }
        else if (
            scrollProgress.getPrevious() === 0 ||
            scrollProgress.getPrevious() === 1
         ){
            animate(
                maskImage,
                `linear-gradient(0deg, ${transparent}, ${opaque} ${topInset}, ${opaque} ${bottomInset}, ${transparent})`
            )
         }

        })
        return maskImage
}