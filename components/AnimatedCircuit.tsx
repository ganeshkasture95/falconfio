"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedCircuit: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Animate gradient stops to create flowing pulse effect
    const gradientConfigs = [
      { id: "blue-pulse-1", duration: 2.5, delay: 0 },
      { id: "blue-pulse-2", duration: 3, delay: 0.8 },
      { id: "pink-pulse-1", duration: 2.8, delay: 0.3 },
      { id: "pink-pulse-2", duration: 3.2, delay: 0.6 },
      { id: "orange-pulse-1", duration: 2.6, delay: 0.4 },
      { id: "orange-pulse-2", duration: 2.9, delay: 0.7 },
    ];

    gradientConfigs.forEach((config) => {
      const gradientElement = svgRef.current?.querySelector(
        `#${config.id}`
      ) as SVGLinearGradientElement;
      if (!gradientElement) return;

      const stops = Array.from(gradientElement.querySelectorAll("stop"));
      if (stops.length < 2) return;

      // Animate the middle stop to create flowing effect
      stops.forEach((stop, index) => {
        if (index === 1 || (index > 0 && index < stops.length - 1)) {
          const baseOffset = parseFloat(stop.getAttribute("offset") || "0.05");
          gsap.to(stop, {
            attr: { offset: `${Math.min(1, baseOffset + 0.4)}` },
            duration: config.duration,
            delay: config.delay,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        }
      });
    });

    // Animate path drawing and continuous flow - find all paths with gradient strokes
    const allPaths = Array.from(svgRef.current.querySelectorAll("path"));
    const animatedPaths = allPaths.filter((path) => {
      const stroke = path.getAttribute("stroke");
      return stroke && stroke.startsWith("url(#") && stroke.includes("pulse");
    }) as SVGPathElement[];
    
    animatedPaths.forEach((pathElement, index) => {
      if (!pathElement) return;
      
      const length = pathElement.getTotalLength();
      if (length === 0) return;

      // Initialize path for animation
      pathElement.style.strokeDasharray = `${length} ${length * 1.5}`;
      pathElement.style.strokeDashoffset = `${length}`;

      // Initial draw animation
      gsap.to(pathElement, {
        strokeDashoffset: 0,
        duration: 1.2 + index * 0.1,
        delay: index * 0.15,
        ease: "power2.out",
      });

      // Continuous flowing animation - create a moving dash effect
      gsap.to(pathElement, {
        strokeDashoffset: -length * 2,
        duration: 3 + index * 0.3,
        repeat: -1,
        ease: "none",
        delay: 1.2 + index * 0.15,
      });
    });

    // Animate connection nodes (circles) with pulse
    const nodes = Array.from(svgRef.current.querySelectorAll("circle[fill]"));
    nodes.forEach((node, index) => {
      gsap.to(node, {
        scale: 1.3,
        opacity: 0.9,
        duration: 1.2 + (index % 3) * 0.2,
        delay: index * 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg
        ref={svgRef}
        fill="none"
        height="264"
        role="img"
        viewBox="0 0 891 264"
        width="100%"
        className="w-full h-auto"
        aria-label="Animated circuit board showing data flow through connections"
      >
        {/* Background paths (static) */}
        <path
          d="M388 96L388 68C388 65.7909 386.209 64 384 64L310 64"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <path
          d="M349 150L73 150C70.7909 150 69 151.791 69 154L69 174"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />

        {/* Animated paths with gradients */}
        <g>
          <path
            d="M547 130L822 130C824.209 130 826 131.791 826 134L826 264"
            stroke="var(--foreground)"
            strokeOpacity="0.1"
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          />
          <path
            d="M547 130L822 130C824.209 130 826 131.791 826 134L826 264"
            stroke="url(#orange-pulse-1)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        <g>
          <path
            d="M349 130L5.00002 130C2.79088 130 1.00001 131.791 1.00001 134L1.00001 264"
            stroke="var(--foreground)"
            strokeOpacity="0.1"
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          />
          <path
            d="M349 130L5.00002 130C2.79088 130 1.00001 131.791 1.00001 134L1.00001 264"
            stroke="url(#blue-pulse-1)"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
        </g>

        <g>
          <path
            d="M547 150L633 150C635.209 150 637 151.791 637 154L637 236C637 238.209 635.209 240 633 240L488 240C485.791 240 484 241.791 484 244L484 264"
            stroke="var(--foreground)"
            strokeOpacity="0.1"
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          />
          <path
            d="M547 150L633 150C635.209 150 637 151.791 637 154L637 236C637 238.209 635.209 240 633 240L488 240C485.791 240 484 241.791 484 244L484 264"
            stroke="url(#pink-pulse-2)"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
        </g>

        <g>
          <path
            d="M388 184L388 194C388 196.209 386.209 198 384 198L77 198C74.7909 198 73 199.791 73 202L73 264"
            stroke="var(--foreground)"
            strokeOpacity="0.1"
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          />
          <path
            d="M388 184L388 194C388 196.209 386.209 198 384 198L77 198C74.7909 198 73 199.791 73 202L73 264"
            stroke="url(#blue-pulse-2)"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
        </g>

        <path
          d="M412 96L412 0"
          stroke="url(#paint0_linear_341_27683)"
          strokeOpacity="0.1"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />

        <g>
          <path
            d="M412 263.5L412 184"
            stroke="var(--foreground)"
            strokeOpacity="0.1"
            style={{
              transform: "scale(-1)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          />
          <path
            d="M412 263.5L412 184"
            stroke="url(#pink-pulse-1)"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
        </g>

        <g>
          <path
            d="M508 96L508 88C508 85.7909 509.791 84 512 84L886 84C888.209 84 890 85.7909 890 88L890 264"
            stroke="var(--foreground)"
            strokeOpacity="0.1"
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          />
          <path
            d="M508 96L508 88C508 85.7909 509.791 84 512 84L886 84C888.209 84 890 85.7909 890 88L890 264"
            stroke="url(#orange-pulse-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        <path
          d="M436 96L436 0"
          stroke="url(#paint1_linear_341_27683)"
          strokeOpacity="0.1"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <path
          d="M436 214L436 184"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          style={{
            transform: "scale(-1)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <path
          d="M460 96L460 64"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <path
          d="M460 239L460 184"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          style={{
            transform: "scale(-1)",
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <path
          d="M484 96L484 24C484 21.7909 485.791 20 488 20L554 20"
          stroke="url(#paint2_linear_341_27683)"
          strokeOpacity="0.1"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <path
          d="M484 184L484 210C484 212.209 485.791 214 488 214L560 214"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <path
          d="M508 184L508 193C508 195.209 509.791 197 512 197L560 197"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />

        {/* Connection nodes */}
        <circle cx="460" cy="64" fill="var(--background)" r="4" opacity="1" />
        <circle
          cx="460"
          cy="64"
          r="3.5"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          opacity="1"
        />
        <circle cx="308" cy="64" fill="var(--background)" r="4" opacity="1" />
        <circle
          cx="308"
          cy="64"
          r="3.5"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          opacity="1"
        />
        <circle cx="69" cy="173" fill="var(--background)" r="4" opacity="1" />
        <circle
          cx="69"
          cy="173"
          r="3.5"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          opacity="1"
        />
        <circle cx="436" cy="214" fill="var(--background)" r="4" opacity="1" />
        <circle
          cx="436"
          cy="214"
          r="3.5"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          opacity="1"
        />
        <circle cx="460" cy="240" fill="var(--background)" r="4" opacity="1" />
        <circle
          cx="460"
          cy="240"
          r="3.5"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          opacity="1"
        />
        <circle cx="560" cy="214" fill="var(--background)" r="4" opacity="1" />
        <circle
          cx="560"
          cy="214"
          r="3.5"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          opacity="1"
        />
        <circle cx="560" cy="197" fill="var(--background)" r="4" opacity="1" />
        <circle
          cx="560"
          cy="197"
          r="3.5"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          opacity="1"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_341_27683"
            x1="412.5"
            x2="412.5"
            y1="-3.27835e-08"
            y2="96"
          >
            <stop stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint1_linear_341_27683"
            x1="436.5"
            x2="436.5"
            y1="-3.27835e-08"
            y2="96"
          >
            <stop stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint2_linear_341_27683"
            x1="554"
            x2="484"
            y1="20"
            y2="96"
          >
            <stop stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>

          {/* Blue pulse gradients */}
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="blue-pulse-1"
            x1="400"
            y1="83"
            x2="350"
            y2="133.75"
          >
            <stop stopColor="#2EB9DF" stopOpacity="0" />
            <stop offset="0.05" stopColor="#2EB9DF" />
            <stop offset="1" stopColor="#2EB9DF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="blue-pulse-2"
            x1="92.3583083662379"
            y1="262.05328740198456"
            x2="90.88223449143698"
            y2="295.0920543662869"
          >
            <stop stopColor="#2EB9DF" stopOpacity="0" />
            <stop offset="0.05" stopColor="#2EB9DF" />
            <stop offset="1" stopColor="#2EB9DF" stopOpacity="0" />
          </linearGradient>

          {/* Pink pulse gradients */}
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="pink-pulse-1"
            x1="400"
            y1="83"
            x2="350"
            y2="133.75"
          >
            <stop stopColor="#FF4A81" stopOpacity="0" />
            <stop offset="0.030" stopColor="#FF4A81" />
            <stop offset="0.27" stopColor="#DF6CF6" />
            <stop offset="1" stopColor="#0196FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="pink-pulse-2"
            x1="479.79209374141647"
            y1="163.55764715682017"
            x2="479.475941878889"
            y2="189.97756656858837"
          >
            <stop stopColor="#FF4A81" stopOpacity="0" />
            <stop offset="0.0564843" stopColor="#FF4A81" />
            <stop offset="0.4616" stopColor="#DF6CF6" />
            <stop offset="1" stopColor="#0196FF" stopOpacity="0" />
          </linearGradient>

          {/* Orange pulse gradients */}
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="orange-pulse-1"
            x1="550.3802368824254"
            y1="187.19577932090033"
            x2="574.0385856478824"
            y2="239.45201774680754"
          >
            <stop stopColor="#FF7432" stopOpacity="0" />
            <stop offset="0.0550784" stopColor="#FF7432" />
            <stop offset="0.373284" stopColor="#F7CC4B" />
            <stop offset="1" stopColor="#F7CC4B" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="orange-pulse-2"
            x1="300"
            y1="140"
            x2="400"
            y2="180"
          >
            <stop stopColor="#FF7432" stopOpacity="0" />
            <stop offset="0.0531089" stopColor="#FF7432" />
            <stop offset="0.415114" stopColor="#F7CC4B" />
            <stop offset="1" stopColor="#F7CC4B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedCircuit;
