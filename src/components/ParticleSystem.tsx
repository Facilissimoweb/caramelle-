import { useEffect, useRef, useState } from "react";
import { Magnet, Sparkles, Orbit } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  planetId: number; // The planet this particle orbits/swarms
  angle: number; // Current angular position
  orbitDistance: number; // Radial distance from planet
  orbitSpeed: number; // Speed of rotation
  color: string; // Tailored color to match parent planet
}

interface CelestialPlanet {
  id: number;
  name: string;
  subtitle: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  ringRadius: number;
  baseOrbitX: number; // Center of floating orbit
  baseOrbitY: number; // Center of floating orbit
  floatAngle: number; // Floating offset phase
  floatSpeed: number; // Speed of floating motion
}

interface ParticleSystemProps {
  lang?: "it" | "en";
}

export default function ParticleSystem({ lang = "it" }: ParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Modes: 'orbit' (default planetary gravity), 'attract' (dense compression), 'scatter' (cosmic wind)
  const [interactionMode, setInteractionMode] = useState<"orbit" | "attract" | "scatter">("orbit");
  const modeRef = useRef<"orbit" | "attract" | "scatter">("orbit");

  // Keep ref in sync for the animation loop
  useEffect(() => {
    modeRef.current = interactionMode;
  }, [interactionMode]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let planets: CelestialPlanet[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Responsive Canvas Resizing using ResizeObserver
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = Math.floor(newWidth);
        height = Math.floor(newHeight);
        
        canvas.width = width;
        canvas.height = height;

        initPlanets();
        initParticles();
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      handleResize(entries);
    });

    resizeObserver.observe(container);

    const initPlanets = () => {
      if (width === 0 || height === 0) return;

      // Define 3 dynamic planets based on screen dimensions
      planets = [
        {
          id: 0,
          name: "Aether",
          subtitle: "CORE STACK",
          x: width * 0.35,
          y: height * 0.5,
          baseOrbitX: width * 0.35,
          baseOrbitY: height * 0.5,
          radius: Math.min(width * 0.04, 32),
          color: "#E35930", // Signature Copper
          glowColor: "rgba(227, 89, 48, 0.35)",
          ringRadius: Math.min(width * 0.08, 65),
          floatAngle: 0,
          floatSpeed: 0.003,
        },
        {
          id: 1,
          name: "Stella",
          subtitle: "DESIGN SYSTEM",
          x: width * 0.75,
          y: height * 0.35,
          baseOrbitX: width * 0.75,
          baseOrbitY: height * 0.35,
          radius: Math.min(width * 0.03, 24),
          color: "#F8F7F4", // Elegant Cream White
          glowColor: "rgba(248, 247, 244, 0.35)",
          ringRadius: Math.min(width * 0.06, 48),
          floatAngle: Math.PI * 0.6,
          floatSpeed: 0.002,
        },
        {
          id: 2,
          name: "Nova",
          subtitle: "AI LOGIC",
          x: width * 0.55,
          y: height * 0.75,
          baseOrbitX: width * 0.55,
          baseOrbitY: height * 0.75,
          radius: Math.min(width * 0.025, 18),
          color: "#b09c85", // Bronze/Earth-gold
          glowColor: "rgba(176, 156, 133, 0.3)",
          ringRadius: Math.min(width * 0.05, 38),
          floatAngle: Math.PI * 1.2,
          floatSpeed: 0.004,
        }
      ];
    };

    const initParticles = () => {
      if (width === 0 || height === 0 || planets.length === 0) return;
      
      // Significantly increase the number of particles to build gorgeous thick planetary rings (250 - 380)
      const density = 0.00018; // rich density multiplier
      const particleCount = Math.min(Math.max(Math.floor(width * height * density), 180), 380);
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        // Distribute particles evenly across the 3 planets
        const planetId = i % planets.length;
        const targetPlanet = planets[planetId];
        
        // Randomize orbital ring parameters
        const orbitDistance = targetPlanet.ringRadius * (0.4 + Math.random() * 1.8);
        const angle = Math.random() * Math.PI * 2;
        
        // Orbital speed decreases with distance (Keplerian-inspired style)
        const orbitSpeed = (0.015 + Math.random() * 0.015) * (targetPlanet.ringRadius / orbitDistance);
        
        const radius = Math.random() * 1.6 + 0.6;
        const baseAlpha = Math.random() * 0.5 + 0.2;

        // Position particle along its orbital ring path around its parent planet
        const x = targetPlanet.x + Math.cos(angle) * orbitDistance;
        const y = targetPlanet.y + Math.sin(angle) * orbitDistance;

        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          radius,
          alpha: baseAlpha,
          baseAlpha,
          planetId,
          angle,
          orbitDistance,
          orbitSpeed,
          color: targetPlanet.color,
        });
      }
    };

    // Global pointer tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= -100 && x <= width + 100 && y >= -100 && y <= height + 100) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = { x: null, y: null };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (x >= -50 && x <= width + 50 && y >= -50 && y <= height + 50) {
        mouseRef.current = { x, y };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    // Explosion ripple
    const triggerBurst = (cx: number, cy: number) => {
      particles.forEach((p) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 320) {
          const force = (320 - dist) / 320;
          const angle = dist > 0 ? Math.atan2(dy, dx) : Math.random() * Math.PI * 2;
          
          // Violent kinetic velocity burst outwards
          const intensity = 10;
          p.vx += Math.cos(angle) * force * intensity;
          p.vy += Math.sin(angle) * force * intensity;
          p.alpha = Math.min(p.baseAlpha * 2.2, 1.0);
        }
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      if (clickX >= 0 && clickX <= width && clickY >= 0 && clickY <= height) {
        triggerBurst(clickX, clickY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const clickX = touch.clientX - rect.left;
      const clickY = touch.clientY - rect.top;

      if (clickX >= 0 && clickX <= width && clickY >= 0 && clickY <= height) {
        triggerBurst(clickX, clickY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Main Celestial Physics Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const currentMode = modeRef.current;
      const connectionDist = 75; // Shorter line connection distance for planetary clusters
      const mouseInfluenceDist = 200;

      // 1. Update Planet Motions (Floating slowly)
      planets.forEach((planet) => {
        planet.floatAngle += planet.floatSpeed;
        planet.x = planet.baseOrbitX + Math.sin(planet.floatAngle) * 20;
        planet.y = planet.baseOrbitY + Math.cos(planet.floatAngle * 0.7) * 15;

        // Render beautiful atmospheric glowing core
        const grad = ctx.createRadialGradient(
          planet.x, planet.y, 0,
          planet.x, planet.y, planet.radius * 2.5
        );
        grad.addColorStop(0, planet.color);
        grad.addColorStop(0.3, planet.color + "44"); // semi transparent
        grad.addColorStop(1, "rgba(17, 17, 19, 0)"); // fade out

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Render Solid Core Sphere
        ctx.shadowBlur = 15;
        ctx.shadowColor = planet.color;
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Render a subtle orbital dashboard ring around each planet
        ctx.strokeStyle = planet.color + "1a"; // ultra subtle
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Elegant Planet HUD/labels inside the cosmic view
        ctx.fillStyle = "rgba(248, 247, 244, 0.45)";
        ctx.font = "bold 8px monospace";
        ctx.letterSpacing = "2px";
        ctx.textAlign = "center";
        ctx.fillText(planet.name.toUpperCase(), planet.x, planet.y - planet.radius - 12);
        
        ctx.fillStyle = planet.color + "a0";
        ctx.font = "5px monospace";
        ctx.fillText(planet.subtitle, planet.x, planet.y - planet.radius - 4);
      });

      // 2. Draw Inter-particle Networking (Stellar dust filaments)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          // Particles can only network if they share the same gravity well (planetId)
          if (p1.planetId !== p2.planetId) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.16 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = p1.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect particles to mouse if close
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceDist) {
            const alpha = (1 - dist / mouseInfluenceDist) * 0.22 * p1.alpha;
            ctx.strokeStyle = `rgba(227, 89, 48, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 3. Update Particle Celestial Dynamics & Render Nodes
      particles.forEach((p) => {
        const planet = planets[p.planetId];
        if (!planet) return;

        // Normal Drift & Inertial recovery
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95; // apply dampening
        p.vy *= 0.95;

        // Calculate theoretical orbital target coordinates
        p.angle += p.orbitSpeed;
        const targetX = planet.x + Math.cos(p.angle) * p.orbitDistance;
        const targetY = planet.y + Math.sin(p.angle) * p.orbitDistance;

        // Apply mode-specific steering behaviors
        if (currentMode === "orbit") {
          // Gravitational pull returning to steady orbital loop
          const pullStrength = 0.06;
          p.x += (targetX - p.x) * pullStrength;
          p.y += (targetY - p.y) * pullStrength;
        } else if (currentMode === "attract") {
          // Draw directly to the planet's core (collapse state)
          const pullStrength = 0.08;
          const coreX = planet.x + Math.cos(p.angle) * (planet.radius * 1.3);
          const coreY = planet.y + Math.sin(p.angle) * (planet.radius * 1.3);
          p.x += (coreX - p.x) * pullStrength;
          p.y += (coreY - p.y) * pullStrength;
        } else if (currentMode === "scatter") {
          // Scatter outwards from core
          const dx = p.x - planet.x;
          const dy = p.y - planet.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < planet.ringRadius * 2) {
            const push = (planet.ringRadius * 2 - dist) * 0.008;
            p.vx += (dx / (dist || 1)) * push;
            p.vy += (dy / (dist || 1)) * push;
          }
        }

        // Apply Pointer gravity influence
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceDist) {
            const force = (mouseInfluenceDist - dist) / mouseInfluenceDist;
            if (currentMode === "scatter") {
              p.vx += (dx / (dist || 1)) * force * 1.2;
              p.vy += (dy / (dist || 1)) * force * 1.2;
            } else {
              // Mouse acts as a black hole / secondary massive body, bending orbital trails
              p.vx -= (dx / (dist || 1)) * force * 0.8;
              p.vy -= (dy / (dist || 1)) * force * 0.8;
            }
          }
        }

        // Fade brightness back to base
        if (p.alpha > p.baseAlpha) {
          p.alpha -= 0.01;
        }

        // Render particle
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="particle-system-container"
      className="absolute inset-0 w-full h-full z-10 pointer-events-none mix-blend-screen"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating planetary control cockpit */}
      <div 
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 pointer-events-auto flex flex-col items-end gap-1.5 select-none"
        id="particle-controls-panel"
      >
        <span className="text-[8px] uppercase tracking-[0.25em] text-[#F8F7F4]/40 font-mono font-bold">
          {lang === "it" 
            ? "Gravità Celeste (Clicca per Supernova)" 
            : "Celestial Gravity (Click for Supernova)"}
        </span>
        <div className="bg-[#111113]/85 backdrop-blur-md border border-[rgba(248,247,244,0.12)] rounded-full p-1 flex items-center gap-1 shadow-2xl">
          <button
            onClick={() => setInteractionMode("orbit")}
            title={lang === "it" ? "In orbita" : "Orbit mode"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              interactionMode === "orbit"
                ? "bg-[#E35930] text-[#F8F7F4] font-bold shadow-md"
                : "text-[#F8F7F4]/60 hover:text-[#F8F7F4] hover:bg-[rgba(248,247,244,0.05)]"
            }`}
          >
            <Orbit className="w-3 h-3" />
            {lang === "it" ? "Orbita" : "Orbit"}
          </button>
          
          <button
            onClick={() => setInteractionMode("attract")}
            title={lang === "it" ? "Fondi / Attira" : "Collapse / Attract"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              interactionMode === "attract"
                ? "bg-[#E35930] text-[#F8F7F4] font-bold shadow-md"
                : "text-[#F8F7F4]/60 hover:text-[#F8F7F4] hover:bg-[rgba(248,247,244,0.05)]"
            }`}
          >
            <Magnet className="w-3 h-3" />
            {lang === "it" ? "Fondi" : "Attract"}
          </button>
          
          <button
            onClick={() => setInteractionMode("scatter")}
            title={lang === "it" ? "Spargi / Allontana" : "Disperse / Scatter"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              interactionMode === "scatter"
                ? "bg-[#E35930] text-[#F8F7F4] font-bold shadow-md"
                : "text-[#F8F7F4]/60 hover:text-[#F8F7F4] hover:bg-[rgba(248,247,244,0.05)]"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {lang === "it" ? "Espandi" : "Scatter"}
          </button>
        </div>
      </div>
    </div>
  );
}
