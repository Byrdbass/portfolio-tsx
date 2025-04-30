export const getAnalogousColor = (hsl: { h: number, s: number, l: number }, shift: number = 30): { h: number, s: number, l: number } => {
    let h = (hsl.h + shift) % 360;
    // Make background lighter
    let l = Math.min(hsl.l + 25, 95);
    // Reduce saturation slightly
    let s = Math.max(hsl.s - 10, 10);
    
    return { h, s, l };
  };