"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface AnimatedGridProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
}

const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  className = "",
  intensity = "medium",
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const lightsRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!gridRef.current || !lightsRef.current || dimensions.width === 0) return;

    const gridSize = 50;
    const lightLines: HTMLElement[] = [];
    const isMobile = dimensions.width < 768; // Mobile breakpoint

    // Create animated light lines
    const createLightLine = (direction: "horizontal" | "vertical") => {
      const line = document.createElement("div");
      line.className = `absolute ${
        direction === "horizontal" ? "h-0.5 w-64" : "w-0.5 h-64"
      }`;
      
      // Create gradient effect with green colors
      line.style.background = direction === "horizontal"
        ? "linear-gradient(90deg, transparent, rgba(115, 226, 167, 0.8), rgba(28, 124, 84, 0.6), transparent)"
        : "linear-gradient(180deg, transparent, rgba(115, 226, 167, 0.8), rgba(28, 124, 84, 0.6), transparent)";
      
      line.style.boxShadow = "0 0 10px rgba(115, 226, 167, 0.5), 0 0 20px rgba(28, 124, 84, 0.3)";
      line.style.filter = "blur(0.5px)";
      
      if (direction === "horizontal") {
        const startY = Math.random() * dimensions.height;
        line.style.top = `${startY}px`;
        line.style.left = "-256px";
        
        gsap.to(line, {
          x: dimensions.width + 256,
          duration: 4 + Math.random() * 3,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 3,
        });
      } else {
        const startX = Math.random() * dimensions.width;
        line.style.left = `${startX}px`;
        line.style.top = "-256px";
        
        gsap.to(line, {
          y: dimensions.height + 256,
          duration: 4 + Math.random() * 3,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 3,
        });
      }

      lightsRef.current?.appendChild(line);
      lightLines.push(line);
    };

    // Create multiple light lines - Reduced count for mobile
    let lightCount: number;
    if (isMobile) {
      // Mobile: significantly reduced
      lightCount = intensity === "low" ? 1 : intensity === "medium" ? 1 : 2;
    } else {
      // Desktop: original count
      lightCount = intensity === "low" ? 2 : intensity === "medium" ? 3 : 4;
    }
    
    for (let i = 0; i < lightCount; i++) {
      createLightLine(i % 2 === 0 ? "horizontal" : "vertical");
    }

    // Create additional delayed lines - Reduced for mobile
    setTimeout(() => {
      const delayedCount = isMobile 
        ? Math.max(0, Math.floor(lightCount / 2))
        : Math.max(1, Math.floor(lightCount / 2));
      for (let i = 0; i < delayedCount; i++) {
        createLightLine(i % 2 === 0 ? "vertical" : "horizontal");
      }
    }, 2000);

    // Animate grid intersection points
    const gridPoints = gridRef.current.querySelectorAll(".grid-point");
    gridPoints.forEach((point, index) => {
      gsap.to(point, {
        opacity: 0.3 + Math.random() * 0.2,
        scale: 1 + Math.random() * 0.3,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (index % 20) * 0.1,
      });
    });

    return () => {
      // Cleanup
      lightLines.forEach((line) => line.remove());
    };
  }, [dimensions, intensity]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Grid Pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(115, 226, 167, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(115, 226, 167, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.4,
        }}
      >
        {/* Grid intersection points - Reduced count */}
        {Array.from({ length: 50 }).map((_, i) => {
          const x = (i % 10) * 10;
          const y = Math.floor(i / 10) * 10;
          return (
            <div
              key={i}
              className="grid-point absolute w-1 h-1 bg-[#73E2A7] rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                opacity: 0.2,
              }}
            />
          );
        })}
      </div>

      {/* Animated Light Lines */}
      <div ref={lightsRef} className="absolute inset-0" />

      {/* Additional grid overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(28, 124, 84, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(28, 124, 84, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          opacity: 0.3,
        }}
      />
    </div>
  );
};

export default AnimatedGrid;
