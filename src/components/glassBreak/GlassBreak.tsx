import React, { useState, useRef, useEffect } from 'react';
import './GlassBreak.css';

interface CrackPoint {
    x: number;
    y: number;
    lines: Array<{
        angle: number;
        length: number;
    }>;
}

const GlassBreak: React.FC = () => {
    const [revealed, setRevealed] = useState(false);
    const [cracked, setCracked] = useState(false);
    const [cracks, setCracks] = useState<CrackPoint[]>([]);
    const phoneRef = useRef<HTMLDivElement>(null);
    const glassRef = useRef<HTMLDivElement>(null);
    const [disappearing, setDisappearing] = useState(false);

    // Trigger reveal animation on component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setRevealed(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Generate random crack patterns
    const generateCracks = () => {
        if (!glassRef.current) return;

        const rect = glassRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Create main impact point
        const mainCrack: CrackPoint = {
            x: centerX,
            y: centerY,
            lines: []
        };

        // Generate between 12-17 main cracks from the center
        const numLines = 12 + Math.floor(Math.random() * 5);

        for (let i = 0; i < numLines; i++) {
            const angle = (i / numLines) * Math.PI * 2;
            const length = 40 + Math.random() * 60;

            mainCrack.lines.push({
                angle,
                length
            });
        }

        // Generate 6-10 secondary crack points
        const secondaryCracks: CrackPoint[] = [];
        const numSecondary = 6 + Math.floor(Math.random() * 4);

        for (let i = 0; i < numSecondary; i++) {
            const distFromCenter = 30 + Math.random() * 60;
            const angle = Math.random() * Math.PI * 2;

            const x = centerX + Math.cos(angle) * distFromCenter;
            const y = centerY + Math.sin(angle) * distFromCenter;

            const secondaryCrack: CrackPoint = {
                x,
                y,
                lines: []
            };

            // 4-7 lines per secondary crack
            const numSecondaryLines = 4 + Math.floor(Math.random() * 4);

            for (let j = 0; j < numSecondaryLines; j++) {
                const lineAngle = (j / numSecondaryLines) * Math.PI * 2;
                const lineLength = 20 + Math.random() * 40;

                secondaryCrack.lines.push({
                    angle: lineAngle,
                    length: lineLength
                });
            }

            secondaryCracks.push(secondaryCrack);
        }

        setCracks([mainCrack, ...secondaryCracks]);
    };

    const handleCrackGlass = () => {
        if (cracked) return;
        
        generateCracks();
        setCracked(true);
        
        // Add shaking animation
        if (phoneRef.current) {
          phoneRef.current.classList.add('shaking');
          setTimeout(() => {
            if (phoneRef.current) {
              phoneRef.current.classList.remove('shaking');
              
              // Set timer to make phone disappear after crack animation completes
              setTimeout(() => {
                setDisappearing(true);
              }, 1500); // Wait for cracks to fully form
            }
          }, 500);
        }
      };

    return (
        <div className="container">
            <div
                ref={phoneRef}
                className={`phone ${revealed ? 'revealed' : ''} 
                ${disappearing ? 'disappearing' : ''}`}
            >
                {/* Phone frame */}
                <div className="phone-frame">
                    {/* Phone notch */}
                    <div className="phone-notch"></div>

                    {/* Phone screen (glass layer) */}
                    <div
                        ref={glassRef}
                        className="phone-screen"
                    >
                        {/* Glass reflection overlay */}
                        <div className="glass-reflection"></div>

                        {/* Cracks SVG overlay */}
                        {cracked && (
                            <svg className="cracks-overlay" path="../../assets/images/crackedGlassWide.svg">
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
                                                    strokeWidth="1.5" // Increased from 0.5
                                                    strokeOpacity="0.2" // Increased from 0.8
                                                    className="crack-line"
                                                    style={{
                                                        animationDelay: `${lineIdx * 50}ms`,
                                                    }}
                                                />
                                            );
                                        })}
                                    </g>
                                ))}
                            </svg>
                        )}

                        {/* Content of the phone screen */}
                        <div className="phone-content">
                            <h3 className="phone-title">Mobile View</h3>
                            <p className="phone-description">Welcome to my portfolio</p>
                            <button
                                onClick={handleCrackGlass}
                                className="desktop-mode-button"
                            >
                                Desktop Mode
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cracked pieces that fall when glass breaks (optional) */}
            {cracked && (
                <div className="falling-pieces">
                    {Array.from({ length: 15 }).map((_, i) => {
                        const size = 5 + Math.random() * 15;
                        const left = 50 + Math.random() * 200 - 100;
                        const delay = Math.random() * 0.5;

                        return (
                            <div
                                key={i}
                                className="glass-shard"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    left: `${left}px`,
                                    animationDelay: `${delay}s`,
                                }}
                            ></div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default GlassBreak;