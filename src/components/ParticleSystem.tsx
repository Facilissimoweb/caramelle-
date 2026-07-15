import { useEffect, useRef, useState } from "react";
import { Magnet, Sparkles } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

interface ParticleSystemProps {
  lang?: "it" | "en";
}

export default function ParticleSystem({ lang = "it" }: ParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Interaction modes: 'attract' (gently follow mouse) or 'scatter' (flee from mouse)
  const [interactionMode, setInteractionMode] = useState<"attract" | "scatter">("attract");
  const modeRef = useRef<"attract" | "scatter">("attract");

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
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const colors = ["#a3e635", "#F8F7F4", "#b09c85"];

    // Responsive Canvas Resizing using ResizeObserver
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = Math.floor(newWidth);
        height = Math.floor(newHeight);
        
        canvas.width = width;
        canvas.height = height;

        initParticles();
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      handleResize(entries);
    });

    resizeObserver.observe(container);

    const initParticles = () => {
      if (width === 0 || height === 0) return;
      
      // Calculate particle count based on viewport area to remain performant yet beautiful
      const area = width * height;
      const density = 0.00012; // perfect density for constellation lines
      const particleCount = Math.min(Math.max(Math.floor(area * density), 60), 220);
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 1.5 + 0.8;
        const baseAlpha = Math.random() * 0.4 + 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius,
          alpha: baseAlpha,
          baseAlpha,
          color,
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

    // Explosion ripple (Supernova)
    const triggerBurst = (cx: number, cy: number) => {
      particles.forEach((p) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 280) {
          const force = (280 - dist) / 280;
          const angle = dist > 0 ? Math.atan2(dy, dx) : Math.random() * Math.PI * 2;
          
          // Kinetic burst outwards
          const intensity = 8;
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

    // Main Constellation Physics Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const currentMode = modeRef.current;
      const connectionDist = 110; // Connection distance between particles
      const mouseInfluenceDist = 180;

      // 1. Draw Web Filaments (Inter-particle networking)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            // Filaments color blended naturally between particle colors
            const alpha = (1 - dist / connectionDist) * 0.15 * Math.min(p1.alpha, p2.alpha);
            
            // Generate a subtle inline color string with alpha channel
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

      // 2. Update and render particles
      particles.forEach((p) => {
        // Inertial slide / physics dampening
        p.x += p.vx;
        p.y += p.vy;

        // Apply friction/drag so bursts settle down
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Return to natural slight Brownian movement/drift
        const driftForce = 0.03;
        p.vx += (Math.random() - 0.5) * driftForce;
        p.vy += (Math.random() - 0.5) * driftForce;

        // Cap maximum speed to keep it elegant and steady
        const maxSpeed = 1.2;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Screen wrap-around with safety padding
        const pad = 10;
        if (p.x < -pad) p.x = width + pad;
        if (p.x > width + pad) p.x = -pad;
        if (p.y < -pad) p.y = height + pad;
        if (p.y > height + pad) p.y = -pad;

        // Apply mouse-based interaction physics (attract or scatter)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceDist) {
            const force = (mouseInfluenceDist - dist) / mouseInfluenceDist;
            
            if (currentMode === "scatter") {
              // Push away
              p.vx += (dx / (dist || 1)) * force * 0.25;
              p.vy += (dy / (dist || 1)) * force * 0.25;
            } else {
              // Pull in
              p.vx -= (dx / (dist || 1)) * force * 0.22;
              p.vy -= (dy / (dist || 1)) * force * 0.22;
            }
          }
        }

        // Fade brightness back to base levels
        if (p.alpha > p.baseAlpha) {
          p.alpha -= 0.008;
        } else if (p.alpha < p.baseAlpha) {
          p.alpha += 0.005;
        }

        // Draw node
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

      {/* Floating control cockpit (Attract vs Scatter) */}
      <div 
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 pointer-events-auto flex flex-col items-end gap-1.5 select-none"
        id="particle-controls-panel"
      >
        <span className="text-[8px] uppercase tracking-[0.25em] text-[#F8F7F4]/40 font-mono font-bold">
          {lang === "it" 
            ? "Flusso di Particelle (Clicca per Esplosione)" 
            : "Particle Flow (Click for Explosion)"}
        </span>
        <div className="bg-[#111113]/85 backdrop-blur-md border border-[rgba(248,247,244,0.12)] rounded-full p-1 flex items-center gap-1 shadow-2xl">
          <button
            onClick={() => setInteractionMode("attract")}
            title={lang === "it" ? "Attira le particelle" : "Attract particles"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              interactionMode === "attract"
                ? "bg-[#a3e635] text-[#F8F7F4] font-bold shadow-md"
                : "text-[#F8F7F4]/60 hover:text-[#F8F7F4] hover:bg-[rgba(248,247,244,0.05)]"
            }`}
          >
            <Magnet className="w-3 h-3" />
            {lang === "it" ? "Attira" : "Attract"}
          </button>
          
          <button
            onClick={() => setInteractionMode("scatter")}
            title={lang === "it" ? "Allontana le particelle" : "Repel particles"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              interactionMode === "scatter"
                ? "bg-[#a3e635] text-[#F8F7F4] font-bold shadow-md"
                : "text-[#F8F7F4]/60 hover:text-[#F8F7F4] hover:bg-[rgba(248,247,244,0.05)]"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {lang === "it" ? "Spingi" : "Repel"}
          </button>
        </div>
      </div>
    </div>
  );
}
