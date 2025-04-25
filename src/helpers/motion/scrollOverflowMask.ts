import { animate, useMotionValue, useMotionValueEvent, MotionValue } from "motion/react";
import { mask } from "motion/react-client";

const top = "0%";
const bottom = "100%";
const topInset = "20%";
const bottomInset = "80%";
const transparent = '#0000';
const opaque = "#000";

export default function useScrollOverflowMask(scrollProgress: MotionValue<number>):MotionValue<string> {
    const maskImage = useMotionValue(
        `linear-gradient(0deg, ${opaque}, ${opaque} ${top}, ${opaque} ${bottomInset}, ${transparent})`
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
                `linear-gradient(1deg, ${transparent}, ${opaque} ${topInset}, ${opaque} ${bottom}, ${opaque})`
            )
        }
        else if (
            scrollProgress.getPrevious() === 0 ||
            scrollProgress.getPrevious() === 1
         ){
            animate(
                maskImage,
                `linear-gradient(2deg, ${transparent}, ${opaque} ${topInset}, ${opaque} ${bottomInset}, ${transparent})`
            )
         }

        })
        return maskImage
}