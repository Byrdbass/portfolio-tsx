export interface CrackPoint {
    x: number;
    y: number;
    lines: Array<{
        angle: number;
        length: number;
    }>;
}