export const hslToString = (hsl: { h: number, s: number, l: number }): string => {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
};