import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// Import VANTA.NET effect from vanta dist bundle
// @ts-ignore - vanta doesn't provide standard TS declarations
import NET from "vanta/dist/vanta.net.min";
// @ts-ignore
import CLOUDS from "vanta/dist/vanta.clouds.min";

interface VantaBackgroundProps {
  className?: string;
  effectType?: "net" | "clouds";
  color?: number;
  backgroundColor?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
}

export default function VantaBackground({
  className = "absolute inset-0 w-full h-full z-0 pointer-events-auto",
  effectType = "net",
  color = 0xffffff,
  backgroundColor = 0x0b0b0e,
  points = 12.0,
  maxDistance = 22.0,
  spacing = 16.0,
}: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    let effectInstance: any = null;

    try {
      const initFn = effectType === "clouds" ? CLOUDS : NET;
      if (typeof initFn === "function") {
        effectInstance = initFn({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: color,
          backgroundColor: backgroundColor,
          points: points,
          maxDistance: maxDistance,
          spacing: spacing,
        });
        setVantaEffect(effectInstance);
      }
    } catch (err) {
      console.warn("Vanta.js initialization error:", err);
    }

    return () => {
      if (effectInstance && typeof effectInstance.destroy === "function") {
        effectInstance.destroy();
      }
    };
  }, [effectType, color, backgroundColor, points, maxDistance, spacing]);

  return (
    <div
      ref={vantaRef}
      className={className}
      style={{ minHeight: "100%", width: "100%" }}
    />
  );
}
