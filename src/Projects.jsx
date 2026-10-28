import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import aboutBg from "./assets/about_bg.gif";

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

    // 36 organic light dapples with incommensurate frequencies
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

    // Angled sunlight shafts
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

      // 1. Uneven Angled Sunlight Shafts
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

      // 2. Organic Shimmering Caustic Light Dapples
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

      // 3. Gently Drifting Water Specks
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

const PROJECTS = [
  {
    id: "01", badge: "01", title: "NO LONGER 365", subtitle: "Gamified Habit Tracker", rank: 7,
    link: "https://github.com/dhruuvv-git/The-No-Longer-365.git",
    desc: "A revolutionary gamified habit tracker with an identity interface. Runs on Android and Windows.",
    tags: ["Electron", "Capacitor", "Gamification"],
  },
  {
    id: "02", badge: "02", title: "TUNE BREACH", subtitle: "Acoustic Intelligence", rank: 6,
    link: "https://github.com/dhruuvv-git/tune_breach",
    demo: "https://tunebreach.vercel.app",
    desc: "Sub-cent pitch detection, deep harmonic chord exploration, and real-time audio visualization.",
    tags: ["DSP", "FFT", "WebGL", "Vercel"],
  },
  {
    id: "03", badge: "03", title: "PARK-D", subtitle: "Smart Parking Network", rank: 8,
    link: "https://github.com/jasmineraiiii/Park-d.git",
    demo: "https://park-d.vercel.app",
    desc: "Real-time municipal parking network with live lot occupancy, reservation holds, attendant tools, and dynamic event overflow.",
    tags: ["React", "Leaflet", "Socket.io", "Vercel"],
  },
  {
    id: "04", badge: "04", title: "SOLACE", subtitle: "Incident Response Vault", rank: 9,
    link: "https://github.com/dhruuvv-git/solace",
    demo: "https://solacee-nine.vercel.app",
    desc: "Privacy-first triage workspace for digital extortion and synthetic media. SHA-256 vault + Mimi browser extension.",
    tags: ["SHA-256", "Chrome Ext", "Security", "Vercel"],
  },
  {
    id: "05", badge: "05", title: "THE RECETARIO", subtitle: "Digital Cookbook", rank: 4,
    link: "https://github.com/dhruuvv-git/The-Recetario",
    desc: "Personalized digital cookbook — store, organize and discover recipes in a beautifully minimal interface.",
    tags: ["UI/UX", "Data Schema"],
  },
  {
    id: "06", badge: "06", title: "NUTRIDISH", subtitle: "Java OOP Nutrition App", rank: 5,
    link: "https://github.com/dhruuvv-git/NutriDish.git",
    desc: "Standalone Java nutrition and macro-tracking app built on solid Object-Oriented Programming principles.",
    tags: ["Java", "OOP", "Analytics"],
  },
  {
    id: "07", badge: "07", title: "CODE PUSHER", subtitle: "Browser Extension", rank: 8,
    link: "https://github.com/dhruuvv-git/instant-github-code-pusher.git",
    desc: "Lightweight browser extension — push code directly to GitHub without leaving the tab. Zero context-switching.",
    tags: ["Extension", "GitHub API", "DevOps"],
  },
  {
    id: "08", badge: "08", title: "LUMIERE", subtitle: "Healthcare Intelligence", rank: 6,
    link: "https://github.com/nipunn-git/lumiere.git",
    desc: "Healthcare intelligence system consolidating fragmented patient data into a unified clean backend.",
    tags: ["REST API", "Data Pipelines", "Healthcare"],
  },
];

export default function Projects() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => (i === null ? 0 : Math.max(0, i - 1)));
      if (e.key === "ArrowDown") setActive((i) => (i === null ? 0 : Math.min(PROJECTS.length - 1, i + 1)));
      if (e.key === "Enter") {
        if (active !== null && PROJECTS[active]) {
          window.open(PROJECTS[active].link, "_blank", "noopener,noreferrer");
        }
      }
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active]);

  const p = active !== null ? PROJECTS[active] : null;

  return (
    <div id="menu-screen">
      <img
        src={aboutBg}
        alt=""
        className="sc-bg-img" loading="eager" decoding="sync"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />
      <div className="sc-palette-overlay" aria-hidden="true" />
      <LeftOceanicCausticsCanvas />
      <div className="sc-ambient-glow" aria-hidden="true" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

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
          filter: contrast(1.1) saturate(1.22) brightness(1.02);
        }

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

        .sc-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          user-select: none;
          z-index: 4;
          background: radial-gradient(ellipse 750px 520px at 70% 32%, rgba(0, 225, 255, 0.16) 0%, transparent 70%);
          mix-blend-mode: screen;
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }
        .resume-stack {
          position: absolute;
          top: max(20px, 4.5vh);
          left: 2.8vw;
          width: min(46vw, 680px);
          max-height: calc(100vh - 6vh);
          display: flex;
          flex-direction: column;
          gap: 6px;
          pointer-events: none;
          overflow-y: auto;
          overflow-x: visible;
          padding-right: 12px;
          padding-bottom: 20px;
          scrollbar-width: thin;
          scrollbar-color: rgba(133, 244, 255, 0.3) transparent;
        }
        .resume-stack::-webkit-scrollbar {
          width: 4px;
        }
        .resume-stack::-webkit-scrollbar-thumb {
          background: rgba(133, 244, 255, 0.35);
          border-radius: 4px;
        }
        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 58px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 2px 8px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted { opacity: 1; transform: translateX(0); }
        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted { opacity: 1; transform: translateX(0); }
        .resume-card {
          position: relative;
          height: 68px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 6px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 6px 0 #d63232;
          transform: translateX(6px);
        }
        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 6px 18px 6px 48px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .resume-badge {
          position: absolute;
          top: 6px; left: -8px;
          width: 44px; height: 50px;
          background: #0b113d;
          border: 2.5px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; color: #d2fdff;
          letter-spacing: 1px; transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge { background: #000; border-color: #000; }
        .resume-card-wrap.active .resume-badge-text { color: #fff; }
        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 32px; line-height: 0.92;
          letter-spacing: 1px; color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title { color: #000; }
        .resume-rank {
          display: flex; align-items: center; gap: 8px;
          margin-top: 0px; flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px; letter-spacing: 2px; color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 44px; line-height: 0.82; color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number { color: #000; }
        .resume-subtitle-bar {
          position: absolute; left: 50px; right: 14px; bottom: 7px;
          height: 23px; background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex; align-items: center; padding: 0 14px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar { background: #000; }
        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px; line-height: 1; letter-spacing: 1px; color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle { color: #fff; }

        @keyframes detailFadeIn {
          from {
            opacity: 0;
            transform: translateX(18px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh; right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 72vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133, 244, 255, 0.16), 16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
          animation: detailFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute; inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center; gap: 14px;
          min-height: 92px; padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index { font-family: 'Anton', sans-serif; font-size: 46px; line-height: 1; }
        .resume-detail-top-title { font-family: 'Anton', sans-serif; font-size: 36px; line-height: 0.92; letter-spacing: 1px; }
        .resume-detail-top-progress { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 2px; line-height: 1; }

        .resume-detail-list {
          position: relative; display: flex; flex-direction: column;
          gap: 10px; margin-top: 18px;
        }
        .resume-detail-row {
          display: grid; grid-template-columns: 1fr auto;
          align-items: center; gap: 14px;
          min-height: 48px; padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
          cursor: pointer;
        }
        .resume-detail-row:hover { transform: translateX(4px); background: rgba(12, 26, 94, 1); }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif; font-size: 22px; line-height: 1; color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif; font-size: 18px; line-height: 1; letter-spacing: 1.1px;
          color: #06133b; background: #8df6ff;
          padding: 6px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative; margin-top: 20px; padding: 16px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 26px;
          letter-spacing: 2px; color: #91f5ff; margin-bottom: 12px;
        }
        .resume-detail-bullets { display: flex; flex-direction: column; gap: 8px; }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif; font-size: 18px; line-height: 1.2; color: #edfaff;
        }
        .resume-detail-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .resume-detail-tag {
          font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px;
          color: #040e2e; background: #8df6ff; padding: 4px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
        }
        .resume-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          flex-wrap: wrap;
        }
        .resume-open-link {
          display: inline-flex;
          align-items: center;
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          color: #ffffff;
          background: #ff2a2a;
          padding: 8px 18px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          pointer-events: all;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.2);
          box-shadow: 4px 4px 0 rgba(160, 0, 0, 0.5);
        }
        .resume-open-link:hover {
          color: #000000;
          background: #ffffff;
          transform: translateY(-3px) scale(1.04);
          letter-spacing: 3px;
          box-shadow: 5px 5px 0 #000000, 8px 8px 0 #00d9ff;
        }
        .resume-open-link:active {
          transform: translateY(-1px) scale(0.98);
          box-shadow: 2px 2px 0 #000000;
        }
        .resume-visit-link {
          display: inline-flex;
          align-items: center;
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          color: #040e2e;
          background: #85f4ff;
          padding: 8px 20px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          pointer-events: all;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 4px 4px 0 rgba(0, 180, 255, 0.45);
        }
        .resume-visit-link:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 6px 6px 0 #00d9ff;
        }
      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>PROJECTS</div>
          {PROJECTS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 45}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {p && (
          <div key={p.id} className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">{p.id}</div>
              <div className="resume-detail-top-title">{p.title}</div>
              <div className="resume-detail-top-progress">RANK {p.rank}</div>
            </div>

            <div className="resume-detail-list">
              <div className="resume-detail-row">
                <div className="resume-detail-row-title">{p.subtitle}</div>
                <div className="resume-detail-status">ACTIVE</div>
              </div>
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">PROJECT BRIEF</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">{p.desc}</div>
              </div>
              <div className="resume-detail-tags">
                {p.tags.map(t => (
                  <span key={t} className="resume-detail-tag">{t}</span>
                ))}
              </div>
              <div className="resume-actions">
                <a
                  className="resume-open-link"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [ENTER] OPEN REPO ↗
                </a>
                {p.demo && (
                  <a
                    className="resume-visit-link"
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VISIT ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
