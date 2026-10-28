import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import main1 from "./assets/main1.mp4";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";



/* ─── Uneven Oceanic Caustics Canvas (Left Side Flow & Shimmering Light) ─── */
function LeftOceanicCausticsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    // 36 organic light dapples with incommensurate frequencies (uneven movement & light)
    const dapples = Array.from({ length: 36 }, (_, i) => {
      const col = (i % 6) / 5.0;
      const row = Math.floor(i / 6) / 5.0;
      return {
        baseX: col * 0.58 + (Math.random() - 0.5) * 0.08,
        baseY: row * 0.90 + (Math.random() - 0.5) * 0.08,
        radius: Math.random() * 50 + 35,
        speed1: Math.random() * 1.1 + 0.7,
        speed2: Math.random() * 0.9 + 0.5,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.18 + 0.09,
      };
    });

    // Angled sunlight shafts across the telephone poles
    const rays = [
      { xTop: 0.46, xBottom: 0.14, width: 100, speed: 0.65, phase: 0 },
      { xTop: 0.35, xBottom: 0.02, width: 140, speed: 0.48, phase: 2.2 },
      { xTop: 0.25, xBottom: -0.06, width: 85, speed: 0.85, phase: 4.3 },
    ];

    // Drifting buoyant water specks
    const specks = Array.from({ length: 18 }, () => ({
      x: Math.random() * 0.55,
      y: Math.random(),
      r: Math.random() * 2 + 1,
      speedY: Math.random() * 0.0006 + 0.0003,
      sway: Math.random() * 0.01 + 0.004,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      t += 0.014;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();

      // ── 1. Uneven Angled Sunlight Shafts ──
      for (const ray of rays) {
        const sway = Math.sin(t * ray.speed + ray.phase) * (w * 0.022);
        const topX = ray.xTop * w + sway;
        const botX = ray.xBottom * w + sway * 1.4;
        const grad = ctx.createLinearGradient(topX, 0, botX, h);
        const alpha = 0.07 + 0.04 * Math.sin(t * 0.75 + ray.phase);
        grad.addColorStop(0, `rgba(110, 240, 255, ${alpha * 1.3})`);
        grad.addColorStop(0.5, `rgba(0, 190, 255, ${alpha * 0.75})`);
        grad.addColorStop(1, "rgba(0, 60, 170, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(topX - ray.width * 0.5, 0);
        ctx.lineTo(topX + ray.width * 0.5, 0);
        ctx.lineTo(botX + ray.width * 1.2, h);
        ctx.lineTo(botX - ray.width * 0.8, h);
        ctx.closePath();
        ctx.fill();
      }

      // ── 2. Organic Shimmering Caustic Light Dapples (Zero Lines) ──
      for (const d of dapples) {
        const dx =
          Math.sin(t * d.speed1 + d.phase) * 20 +
          Math.cos(t * d.speed2 * 0.77 + d.phase * 1.3) * 14;
        const dy =
          Math.cos(t * d.speed1 * 0.85 + d.phase) * 16 +
          Math.sin(t * d.speed2 * 1.23 + d.phase) * 11;

        const px = d.baseX * w + dx;
        const py = d.baseY * h + dy;

        const pulse = 0.5 + 0.5 * Math.sin(t * d.speed1 * 1.3 + d.phase);
        const alpha = d.baseAlpha * (0.6 + 0.55 * pulse);
        const r = d.radius * (0.85 + 0.25 * pulse);

        const radGrad = ctx.createRadialGradient(px, py, 0, px, py, r);
        radGrad.addColorStop(0, `rgba(140, 245, 255, ${alpha})`);
        radGrad.addColorStop(0.45, `rgba(0, 200, 255, ${alpha * 0.5})`);
        radGrad.addColorStop(1, "rgba(0, 80, 210, 0)");

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 3. Gently Drifting Water Specks ──
      for (const s of specks) {
        s.y -= s.speedY;
        if (s.y < -0.05) s.y = 1.05;
        const sx = (s.x + Math.sin(t * 0.9 + s.phase) * s.sway) * w;
        const sy = s.y * h;
        const alpha = 0.25 + 0.2 * Math.sin(t * 1.5 + s.phase);

        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 245, 255, ${alpha})`;
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="sc-left-caustics-canvas" aria-hidden="true" />;
}

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    greeting: "Hola. Salve. Bonjour. こんにちは. This is...",
    upper: ["DHRUV GOYAL", "Age: 20", "CS + Data Science @ NMIMS Chandigarh"],
    lower: "3rd sem CSE specialization Data Science undergrad",
  },
  {
    greeting: null,
    upper: [
      "INTERESTS",
      "System Architecture, Cyber Security, Machine Learning",
      "FORTE",
      "Building high-contrast identity-based pragmatic systems",
    ],
    lower: "interests & forte",
  },
  {
    greeting: null,
    upper: [
      "Languages + Core: Java, Python, SQL, C",
      "Architecture: Apache Kafka, REST API",
      "Data Science: Pandas, NumPy, Matplotlib",
      "Tools: Git, GitHub, Vercel, Electron, Capacitor",
    ],
    lower: "full stack of tools powering the build",
  },
];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "about", label: "ABOUT ME", handle: "@dhruuvv-git", href: "https://github.com/dhruuvv-git", icon: "💻", barIcon: icon1, bars: 1, newBars: [0], counts: ["7"],
    links: ["github.com/dhruuvv-git"],
    stats: [
      { tag: "REP", value: "7",   color: "#9147ff" },
      { tag: "STR", value: "–",   color: "#bf94ff" },
    ],
  },
  {
    id: "funfact", label: "FUN FACT ABOUT ME", handle: "@dhruuvv__07", href: "https://www.instagram.com/dhruuvv__07", icon: "📷", barIcon: icon2, bars: 1, newBars: [0], counts: ["–"],
    links: ["instagram.com/dhruuvv__07"],
    stats: [
      { tag: "FOL", value: "–",   color: "#e1306c" },
      { tag: "PST", value: "–",   color: "#f77737" },
    ],
  },
  {
    id: "wiredfact", label: "TECHSTACKS", handle: "dhruv-goyal", href: "https://www.linkedin.com/in/dhruv-goyal-40191b357", icon: "🔗", barIcon: icon3, bars: 1, newBars: [0], counts: ["50+"],
    links: ["linkedin.com/in/dhruv-goyal-40191b357"],
    stats: [
      { tag: "CON", value: "50+", color: "#0077b5" },
      { tag: "PST", value: "–",   color: "#4a8fff" },
    ],
  },
];

export default function AboutMe({ src = main1 }) {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed]);

  return (
    <div id="menu-screen">
      <video src={src || main1} autoPlay loop muted playsInline preload="auto" />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src || main1} autoPlay loop muted playsInline preload="auto" />
      </div>
      {revealed && <div key={`dim-${active}`} className="sc-dim" />}
      {revealed && REVEAL_CONTENT[active].greeting && (
        <div key={`greeting-${active}`} className="sc-reveal-greeting">
          {REVEAL_CONTENT[active].greeting}
        </div>
      )}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div
                className={`sc-reveal-upper-line${line === line.toUpperCase() && line.length < 20 ? " sc-reveal-upper-heading" : ""}`}
                key={line}
              >{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}
      {revealed && (
        <div key={`portrait-${active}`} className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[active]}
            alt=""
          />
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');

        
        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }

        .sc-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          /* Bright, radiant, high-saturation Persona 3 ocean palette */
          filter: contrast(1.1) saturate(1.22) brightness(1.02);
        }

        /* Persona 3 Oceanic Tone Balance (Soft-light, preserving brightness) */
        .sc-palette-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          user-select: none;
          z-index: 2;
          background:
            linear-gradient(135deg, rgba(0, 30, 95, 0.16) 0%, rgba(0, 60, 160, 0.08) 50%, rgba(0, 20, 80, 0.2) 100%),
            radial-gradient(circle at 15% 85%, rgba(0, 20, 75, 0.24) 0%, transparent 60%);
          mix-blend-mode: soft-light;
        }

        /* Left-Side Uneven Water Caustics Canvas (Zero lines, organic shifting light) */
        .sc-left-caustics-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          user-select: none;
          mix-blend-mode: screen;
          z-index: 3;
          mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 46%, rgba(0,0,0,0.25) 68%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 46%, rgba(0,0,0,0.25) 68%, transparent 100%);
        }

        /* Radiant Persona electric cyan ambient highlight */
        .sc-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          user-select: none;
          z-index: 4;
          background: radial-gradient(ellipse 750px 520px at 70% 32%, rgba(0, 225, 255, 0.16) 0%, transparent 70%);
          mix-blend-mode: screen;
        }

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 12;
          background: rgba(40, 45, 54, 0.68);
          pointer-events: none;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(-120px) rotate(-20deg) scaleX(0.72);
          }
          60% {
            opacity: 0.96;
            transform: translateX(18px) rotate(-20deg) scaleX(1.03);
          }
          100% {
            opacity: 0.92;
            transform: translateX(0) rotate(-20deg) scaleX(1);
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(78px) skewX(-8deg) scale(0.94);
            filter: blur(8px);
          }
          55% {
            opacity: 0.9;
            transform: translateX(-8px) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 0.96;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-main-portrait-shell {
          position: absolute;
          top: 0;
          right: -3vw;
          z-index: 13;
          pointer-events: none;
          width: 43vw;
          height: 100vh;
          overflow: hidden;
          opacity: 0;
          transform: translateX(24px) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-reveal-panel {
          position: absolute;
          top: 8vh;
          left: -6vw;
          width: 88vw;
          height: 88vh;
          z-index: 12;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215, 13, 44, 0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 14%;
          left: 0%;
          width: 100%;
          height: 52%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          text-align: center;
        }
        .sc-reveal-greeting {
          position: absolute;
          top: 3vh;
          left: 5vw;
          z-index: 20;
          pointer-events: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-style: italic;
          font-size: 20px;
          letter-spacing: 3px;
          color: #c4001a;
          text-transform: uppercase;
          white-space: nowrap;
          animation: sc-reveal-bar-in 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          text-shadow: 0 0 18px rgba(196,0,26,0.45);
        }
        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 16px;
          letter-spacing: 0.5px;
          line-height: 1.25;
          padding: 0 28px;
          text-align: left;
        }
        .sc-reveal-upper-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 3px;
          color: #c4001a;
          margin-top: 8px;
          text-transform: uppercase;
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 74%;
          right: 0;
          width: 56%;
          height: 12%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 15px;
          letter-spacing: 0.4px;
          text-transform: lowercase;
          padding-left: 22px;
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
        }

        /* â”€â”€ Each bar â”€â”€ */
        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        /* red underlay â€” peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill â€” skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 78px;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 80%;
          width: auto;
          max-width: 110px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* footer hints */
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
          position: fixed;
          top: 22px; left: 22px;
          z-index: 40;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px; letter-spacing: 3px;
          color: rgba(255,255,255,0.82);
          background: rgba(0,0,0,0.55);
          border: 1.5px solid rgba(255,255,255,0.18);
          padding: 10px 22px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          cursor: pointer; pointer-events: all;
          text-decoration: none;
          transition: background 0.18s ease, color 0.18s ease;
          user-select: none;
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              setActive(i);
            }}
            onMouseEnter={() => {
              setActive(i);
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}


