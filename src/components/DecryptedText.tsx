import React, { useState, useEffect } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  triggerOnHover?: boolean;
}

export function DecryptedText({
  text,
  speed = 40,
  delay = 0,
  className = '',
  triggerOnHover = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=_?';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const startScrambling = () => {
      let iterations = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iterations >= text.length) {
          clearInterval(interval);
        }
        iterations += 1 / 3;
      }, speed);
    };

    if (!triggerOnHover || isHovered) {
      timeout = setTimeout(startScrambling, delay);
    } else {
      setDisplayText(text);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [text, isHovered, triggerOnHover, speed, delay]);

  return (
    <span
      className={className}
      onMouseEnter={() => triggerOnHover && setIsHovered(true)}
      onMouseLeave={() => triggerOnHover && setIsHovered(false)}
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </span>
  );
}
