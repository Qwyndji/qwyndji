import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
}

export function SpotlightCard({ children, className = '', isDark = true }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 group ${className}`}
    >
      {/* Spotlight hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-350"
        style={{
          opacity,
          background: isDark
            ? `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(168, 195, 212, 0.12), transparent 80%)`
            : `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(115, 143, 189, 0.06), transparent 80%)`,
          zIndex: 1,
        }}
      />
      {/* Shiny border gradient hover follower */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-350"
        style={{
          opacity,
          background: isDark
            ? `radial-gradient(150px circle at ${position.x}px ${position.y}px, rgba(219, 136, 164, 0.35), transparent 80%)`
            : `radial-gradient(150px circle at ${position.x}px ${position.y}px, rgba(238, 198, 199, 0.5), transparent 80%)`,
          zIndex: 0,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
