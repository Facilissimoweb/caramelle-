import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// Import VANTA effects from vanta dist bundle
// @ts-ignore - vanta doesn't provide standard TS declarations
import NET from "vanta/dist/vanta.net.min";
// @ts-ignore
import CLOUDS from "vanta/dist/vanta.clouds.min";
// @ts-ignore
import HALO from "vanta/dist/vanta.halo.min";

interface VantaBackgroundProps {
  className?: string;
  effectType?: "net" | "clouds" | "halo";
  color?: number;
  baseColor?: number;
  backgroundColor?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
  amplitudeFactor?: number;
  size?: number;
}

export default function VantaBackground({
  className = "absolute inset-0 w-full h-full z-0 pointer-events-auto",
  effectType = "halo",
  color = 0xffffff,
  baseColor = 0x111528,
  backgroundColor = 0x07070a,
  points = 12.0,
  maxDistance = 22.0,
  spacing = 16.0,
  amplitudeFactor = 1.2,
  size = 1.5,
}: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    let effectInstance: any = null;

    try {
      let initFn = HALO;
      if (effectType === "net") initFn = NET;
      else if (effectType === "clouds") initFn = CLOUDS;

      if (typeof initFn === "function") {
        const config: any = {
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: backgroundColor,
        };

        if (effectType === "halo") {
          config.baseColor = baseColor;
          config.color = color;
          config.amplitudeFactor = amplitudeFactor;
          config.size = size;
          config.xOffset = 0;
          config.yOffset = 0;
        } else if (effectType === "net") {
          config.color = color;
          config.points = points;
          config.maxDistance = maxDistance;
          config.spacing = spacing;
        }

        effectInstance = initFn(config);
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
  }, [effectType, color, baseColor, backgroundColor, points, maxDistance, spacing, amplitudeFactor, size]);

  return (
    <div
      ref={vantaRef}
      className={className}
      style={{ minHeight: "100%", width: "100%" }}
    />
  );
}
