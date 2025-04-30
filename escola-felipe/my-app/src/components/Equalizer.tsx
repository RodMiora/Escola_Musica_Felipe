"use client";
import { useState, useEffect, useCallback } from 'react';

export default function Equalizer({ className }: { className?: string }) {
  const [bars, setBars] = useState<number[]>(() => 
    Array.from({length: 16}, () => Math.random() * 20 + 20) // Valores iniciais entre 20% e 40%
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const animateBars = useCallback(() => {
    setBars(prev => prev.map(() => 
      Math.abs(Math.sin(Date.now() / 100 + Math.random() * 10)) * 60 // Reduzido de 100 para 60
    ));
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(animateBars, 100); // Aumentado de 50ms para 100ms
    return () => clearInterval(interval);
  }, [isAnimating, animateBars]);

  return (
    <div 
      className={`flex items-end justify-center h-full gap-1 ${className}`}
      onMouseEnter={() => setIsAnimating(true)}
      onMouseLeave={() => setIsAnimating(false)}
    >
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-4 bg-gradient-to-t from-orange-500 to-green-500 transition-all duration-500 ease-out" // Aumentado de 300 para 500
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}