import { useEffect, useRef, useState } from "react";
import React from "react";
interface NavbarProps {
  color: string;
}
interface MousePosition {
  x: number;
  y: number;
}

interface Hexagon {
  id: string;
  cx: number;
  cy: number;
  points: string;
  isActive: boolean;
  scale: number;
}

const New: React.FC = ({ color }: NavbarProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [hexagons, setHexagons] = useState<Hexagon[]>([]);

  useEffect(() => {
    // Generate hexagon centers based on the pattern
    const generateHexagons = (): void => {
      const hexagons: Hexagon[] = [];
      const hexWidth: number = 75;
      const hexHeight: number = 65;
      const cols: number = Math.ceil(window.innerWidth / hexWidth) + 2;
      const rows: number = Math.ceil(window.innerHeight / hexHeight) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x: number = col * hexWidth + (row % 2) * (hexWidth / 2);
          const y: number = row * hexHeight;

          hexagons.push({
            id: `hex-${row}-${col}`,
            cx: x + 30.9,
            cy: y + 22,
            points: `${x + 30.9},${y + 5} ${x + 48},${y + 13} ${x + 48},${
              y + 31
            } ${x + 30.9},${y + 39} ${x + 14},${y + 31} ${x + 14},${y + 13}`,
            isActive: false,
            scale: 1,
          });
        }
      }
      setHexagons(hexagons);
    };

    generateHexagons();
    window.addEventListener("resize", generateHexagons);
    return () => window.removeEventListener("resize", generateHexagons);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>): void => {
    if (!svgRef.current) return;

    const rect: DOMRect = svgRef.current.getBoundingClientRect();
    const x: number = e.clientX - rect.left;
    const y: number = e.clientY - rect.top;
    setMousePos({ x, y });

    // Update hexagon states
    setHexagons((prev) =>
      prev.map((hex: Hexagon) => {
        const distance: number = Math.sqrt(
          Math.pow(x - hex.cx, 2) + Math.pow(y - hex.cy, 2)
        );

        const isActive: boolean = distance < 200;
        const scale: number = isActive ? 1 + ((200 - distance) / 200) * 0.2 : 1;

        return {
          ...hex,
          isActive,
          scale,
        };
      })
    );
  };

  return (
    <div className="w-full h-full bg-black cursor-none absolute">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 100% 100%"
        onMouseMove={handleMouseMove}
      >
        <defs>
          {/* Original honeycomb pattern for background */}
          <pattern
            id="honeycombPattern"
            x="0"
            y="0"
            width="55"
            height="45"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="30.9,5 48,13 48,31 30.9,39 14,31 14,13"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </pattern>

          {/* Glow filter for active hexagons */}
          <filter id="redGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background pattern */}
        <rect width="100%" height="100%" fill="url(#honeycombPattern)" />

        {/* Interactive hexagons */}
        {hexagons.map((hex: Hexagon) => (
          <polygon
            key={hex.id}
            points={hex.points}
            fill={hex.isActive ? `${color}` : "none"}
            stroke={hex.isActive ? color : "transparent"}
            strokeWidth="1"
            opacity={hex.isActive ? "1" : "0"}
            filter={hex.isActive ? "url(#redGlow)" : "none"}
            transform={`scale(${hex.scale})`}
            transformOrigin={`${hex.cx} ${hex.cy}`}
            className="transition-all duration-200"
          />
        ))}
      </svg>

      {/* Custom cursor */}
    </div>
  );
};

export default New;
