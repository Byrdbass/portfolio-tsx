export const getComplementaryColor = (hsl: { h: number, s: number, l: number }): { h: number, s: number, l: number } => {
    // Shift hue by 180 degrees to get the complementary color
    let h = (hsl.h + 180) % 360;
    
    // Keep the same saturation for a true complementary color
    // Alternatively, you could adjust saturation if you want a specific aesthetic
    let s = hsl.s;
    
    // Adjust lightness to ensure good contrast while maintaining readability
    // This creates a more balanced complementary pair
    let l = 100 - hsl.l;
    
    // Ensure lightness stays in reasonable range to avoid extreme values
    l = Math.max(Math.min(l, 90), 10);
    
    return { h, s, l };
  };