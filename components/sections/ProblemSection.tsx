"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const explosionTextRef = useRef<HTMLHeadingElement>(null);

  const state = useRef({ progress: 0 });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          state.current.progress = self.progress;
        },
      },
    });

    // Progression from 0 to 1
    tl.to(state.current, { progress: 1, duration: 1, ease: "none" }, 0);

    // Text animations based on scroll progress
    // Text 1: Intro (0 - 0.2)
    tl.fromTo(text1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.05);
    tl.to(text1Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.25);

    // Text 2: Theories (0.3 - 0.5)
    tl.fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.35);
    tl.to(text2Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.55);

    // Text 3: The conflict (0.6 - 0.75)
    tl.fromTo(text3Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.05 }, 0.65);
    tl.to(text3Ref.current, { opacity: 0, scale: 1.05, duration: 0.05 }, 0.78);

    // Explosion text (0.85+)
    tl.fromTo(explosionTextRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.05 }, 0.85);

    // Text 4: Infinities (0.9+)
    tl.fromTo(text4Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.9);

  }, { scope: sectionRef });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);
    resize();

    // Setup quantum particles
    const particles = Array.from({ length: 150 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 2,
      size: 1 + Math.random() * 2,
    }));

    // Setup grid fragments for explosion
    const gridLines: any[] = [];
    const gridSize = 40;
    for (let x = 0; x <= w / 2; x += gridSize) {
      gridLines.push({ type: 'v', pos: x / (w / 2), vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, rot: (Math.random() - 0.5) * 0.1 });
    }
    for (let y = 0; y <= h; y += gridSize) {
      gridLines.push({ type: 'h', pos: y / h, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, rot: (Math.random() - 0.5) * 0.1 });
    }

    const draw = () => {
      const p = state.current.progress;
      const t = performance.now() / 1000;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#050610";
      ctx.fillRect(0, 0, w, h);

      const splitX = w / 2;

      // Phase 1: 0 to 0.5 (Separate)
      // Phase 2: 0.5 to 0.8 (Approaching / vibrating)
      // Phase 3: 0.8 to 1.0 (Explosion)

      const isExplosion = p > 0.8;
      const collisionIntensity = Math.max(0, (p - 0.5) / 0.3); // 0 to 1 as it hits 0.8
      const glitchOffset = collisionIntensity * Math.sin(t * 50) * 20;

      // GR SIDE (Left)
      ctx.save();
      if (!isExplosion) {
        ctx.beginPath();
        ctx.rect(0, 0, splitX + (p > 0.5 ? glitchOffset : 0), h);
        ctx.clip();
      }

      ctx.strokeStyle = `rgba(60, 160, 255, ${isExplosion ? 1 - (p - 0.8) * 5 : 0.3 + collisionIntensity * 0.5})`;
      ctx.lineWidth = 1;

      if (!isExplosion) {
        // Draw smooth grid
        for (let x = 0; x <= splitX; x += gridSize) {
          ctx.beginPath();
          for (let y = 0; y <= h; y += 10) {
            // Warp grid based on sine wave
            const warp = Math.sin(y * 0.01 + t) * 15 * (1 - x / splitX);
            const px = x + warp;
            if (y === 0) ctx.moveTo(px, y);
            else ctx.lineTo(px, y);
          }
          ctx.stroke();
        }
        for (let y = 0; y <= h; y += gridSize) {
          ctx.beginPath();
          for (let x = 0; x <= splitX; x += 10) {
            const warp = Math.sin(x * 0.01 + t) * 15 * (1 - x / splitX);
            const py = y + warp;
            if (x === 0) ctx.moveTo(x, py);
            else ctx.lineTo(x, py);
          }
          ctx.stroke();
        }
      } else {
        // Explosion scatter
        const scatterP = (p - 0.8) * 5; // 0 to 1
        gridLines.forEach(line => {
          ctx.beginPath();
          if (line.type === 'v') {
            const lx = line.pos * (w / 2) + line.vx * scatterP * 50;
            const ly = h / 2 + line.vy * scatterP * 50;
            ctx.moveTo(lx, 0);
            ctx.lineTo(lx + Math.sin(line.rot * scatterP * 10) * h, h);
          } else {
            const ly = line.pos * h + line.vy * scatterP * 50;
            const lx = w / 4 + line.vx * scatterP * 50;
            ctx.moveTo(0, ly);
            ctx.lineTo(splitX + Math.cos(line.rot * scatterP * 10) * splitX, ly);
          }
          ctx.stroke();
        });
      }
      ctx.restore();

      // QM SIDE (Right)
      ctx.save();
      if (!isExplosion) {
        ctx.beginPath();
        ctx.rect(splitX + (p > 0.5 ? glitchOffset : 0), 0, w / 2, h);
        ctx.clip();
      }

      particles.forEach((part, i) => {
        let px = splitX + part.x * (w / 2);
        let py = part.y * h;
        
        if (isExplosion) {
          const scatterP = (p - 0.8) * 5;
          px += (Math.random() - 0.5) * scatterP * 200;
          py += (Math.random() - 0.5) * scatterP * 200;
        }

        // Blinking probability cloud effect
        const alpha = Math.max(0, 0.5 + 0.5 * Math.sin(t * part.speed * 5 + part.phase));
        
        if (alpha > 0.1) {
          ctx.fillStyle = `rgba(0, 229, 255, ${isExplosion ? alpha * (1 - (p-0.8)*5) : alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, part.size + (Math.sin(t * 10 + i) > 0.8 ? 2 : 0), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      // Divider Line
      if (p < 0.8) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.1, collisionIntensity)})`;
        ctx.lineWidth = 1 + collisionIntensity * 4;
        ctx.beginPath();
        ctx.moveTo(splitX + glitchOffset, 0);
        ctx.lineTo(splitX - glitchOffset, h);
        ctx.stroke();

        // Labels
        if (p < 0.4) {
          ctx.font = "12px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(60, 160, 255, 0.8)";
          ctx.textAlign = "center";
          ctx.fillText("RELATIVITÉ GÉNÉRALE", w / 4, h / 2 - 20);
          ctx.font = "10px sans-serif";
          ctx.fillStyle = "rgba(138, 184, 216, 0.6)";
          ctx.fillText("Continu, lisse, déformable", w / 4, h / 2 + 10);

          ctx.font = "12px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(0, 229, 255, 0.8)";
          ctx.fillText("MÉCANIQUE QUANTIQUE", (w / 4) * 3, h / 2 - 20);
          ctx.font = "10px sans-serif";
          ctx.fillStyle = "rgba(138, 184, 216, 0.6)";
          ctx.fillText("Discret, probabiliste, granulaire", (w / 4) * 3, h / 2 + 10);
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[250vh] w-full bg-bg-primary">
      <div ref={containerRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Narrative Overlays */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div ref={text1Ref} className="absolute max-w-xl opacity-0">
            <p className="font-serif text-3xl md:text-5xl text-white mb-6">
              Depuis un siècle, la physique possède deux théories extraordinairement précises.
            </p>
          </div>

          <div ref={text2Ref} className="absolute max-w-2xl opacity-0 flex flex-col md:flex-row gap-12 text-left bg-bg-panel p-8 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex-1">
              <h3 className="text-accent-blue font-mono text-sm mb-3">LA SCÈNE</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                La relativité générale dit que l'espace-temps est un tissu lisse et continu. La masse le courbe. La courbure dicte le mouvement.
              </p>
            </div>
            <div className="flex-1">
              <h3 className="text-accent-cyan font-mono text-sm mb-3">L'ACTEUR</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                La mécanique quantique dit que tout est granulaire, discret, probabiliste. Les particules n'existent pas avant d'être mesurées.
              </p>
            </div>
          </div>

          <div ref={text3Ref} className="absolute max-w-2xl opacity-0 bg-bg-panel/90 p-8 rounded-xl border border-accent-orange/20 backdrop-blur-md shadow-[0_0_50px_rgba(255,160,100,0.1)]">
            <p className="font-serif text-2xl md:text-4xl text-white">
              Mais quand on essaie de les combiner...
            </p>
            <p className="mt-4 text-text-secondary font-sans text-sm md:text-base">
              Ce qui est pourtant indispensable pour décrire le cœur d'un trou noir ou le Big Bang. Comment quantifier l'acteur qui est aussi la scène ?
            </p>
          </div>

          <h2
            ref={explosionTextRef}
            className="absolute font-serif text-[clamp(2rem,6vw,5rem)] font-bold text-accent-red leading-none drop-shadow-[0_0_30px_rgba(255,60,60,0.8)] opacity-0 uppercase mix-blend-screen"
          >
            Les équations explosent.
          </h2>

          <div ref={text4Ref} className="absolute mt-32 max-w-xl opacity-0">
            <p className="font-mono tracking-widest text-sm text-text-muted uppercase">
              On obtient des infinis. Incontrôlables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
