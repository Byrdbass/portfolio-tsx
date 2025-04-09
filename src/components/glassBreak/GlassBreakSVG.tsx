import CrackedGlassSVG  from '../../assets/images/crackedGlassWide.svg?react';
import './glassbreak.css'


interface CrackPoint {
    x: number;
    y: number;
    lines: Array<{
        angle: number;
        length: number;
    }>;
}

const GlassBreakSVG: React.FC<{ cracks: CrackPoint[] }> = ({ cracks }) => {
  return (
    <div className="cracked-glass-container">
      <CrackedGlassSVG className="cracked-glass-base" />
      {cracks.map((crackPoint, idx) => (
        <g key={idx} opacity="0.8">
          {crackPoint.lines.map((line, lineIdx) => {
            const endX = crackPoint.x + Math.cos(line.angle) * line.length;
            const endY = crackPoint.y + Math.sin(line.angle) * line.length;

            return (
              <line
                key={`${idx}-${lineIdx}`}
                x1={crackPoint.x}
                y1={crackPoint.y}
                x2={endX}
                y2={endY}
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.2"
                className="crack-line"
                style={{
                  animationDelay: `${lineIdx * 50}ms`,
                }}
              />
            );
          })}
        </g>
      ))}
    </div>
  );
};

export default GlassBreakSVG;