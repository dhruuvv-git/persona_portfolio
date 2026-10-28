import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main3.mp4";
import silhouette from "./assets/p3r_silhouette_clean.png";

/* ─── Oceanic Caustics Canvas for Smooth Flowing Water Animation ─── */
function OceanicCausticsCanvas() {
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

    // Subtle drifting water bubbles / luminous blue particles
    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.0006 + 0.0003,
      swayAmp: Math.random() * 0.012 + 0.004,
      phase: Math.random() * Math.PI * 2,
      baseAlpha: Math.random() * 0.45 + 0.25,
    }));

    const render = () => {
      // Much slower, graceful underwater flow speed
      t += 0.006;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();

      // ── Flowing Ocean Wave Currents (Rich Saturated Cyan & Persona Blue) ──
      for (let i = 0; i < 3; i++) {
        const baseY = h * (0.12 + i * 0.32);
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, baseY);

        // Slow, gentle undulating water current
        for (let x = 0; x <= w; x += 16) {
          const wave =
            Math.sin(x * 0.005 + t * 0.8 + i * 1.4) * 16 +
            Math.cos(x * 0.009 - t * 0.6 + i * 0.8) * 10;
          ctx.lineTo(x, baseY + wave);
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - 40, 0, baseY + 160);
        grad.addColorStop(0, "rgba(0, 220, 255, 0.22)");   // Rich electric cyan
        grad.addColorStop(0.35, "rgba(0, 130, 255, 0.20)"); // Deep vibrant Persona blue
        grad.addColorStop(0.75, "rgba(0, 60, 200, 0.12)");  // Saturated royal blue
        grad.addColorStop(1, "rgba(0, 15, 80, 0)");

        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── Rising Saturated Ocean Specks (Gently Floating) ──
      for (const p of particles) {
        p.y -= p.speedY;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        const px = (p.x + Math.sin(t * 0.8 + p.phase) * p.swayAmp) * w;
        const py = p.y * h;
        const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(t * 1.2 + p.phase));

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 225, 255, ${alpha})`;
        ctx.shadowColor = "#00c3ff";
        ctx.shadowBlur = 6;
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

  return <canvas ref={canvasRef} className="p3-silhouette-caustic-canvas" aria-hidden="true" />;
}

/* ─── Social Links Data Styled as Persona 3 Reload Social Links ─── */
const SOCIAL_LINKS = [
  {
    id: "github",
    numeral: "I",
    title: "GITHUB",
    rank: "MAX",
    handle: "@dhruuvv-git",
    desc: "Open Source Code & Architectures",
    href: "https://github.com/dhruuvv-git",
  },
  {
    id: "linkedin",
    numeral: "II",
    title: "LINKEDIN",
    rank: "MAX",
    handle: "dhruv-goyal-40191b357",
    desc: "Professional Network & Engineering",
    href: "https://www.linkedin.com/in/dhruv-goyal-40191b357?utm_source=share_via",
  },
  {
    id: "instagram",
    numeral: "III",
    title: "INSTAGRAM",
    rank: "7",
    handle: "@dhruuvv__07",
    desc: "Visual Archive & Personal Logs",
    href: "https://www.instagram.com/dhruuvv__07?igsh=MTNidDdicTRqdmNzOA==",
  },
  {
    id: "email",
    numeral: "IV",
    title: "CONTACT",
    rank: "MAX",
    handle: "dhruv10.goyal@gmail.com",
    desc: "Direct Transmission & Inquiries",
    href: "mailto:dhruv10.goyal@gmail.com",
  },
];

export default function Socials({ src }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(SOCIAL_LINKS.length - 1, i + 1));
      if (e.key === "Enter") {
        window.open(SOCIAL_LINKS[active].href, "_blank", "noopener,noreferrer");
      }
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  return (
    <div id="menu-screen" className="p3-socials-root">
      {/* ── Left Side: Flowing Oceanic Video Animation ── */}
      <video className="p3-socials-video" src={src || bgVideo} autoPlay loop muted playsInline preload="auto" />

      {/* ── Floating Polygonal Glass Shards ── */}
      <div className="p3-ambient-particles" aria-hidden="true">
        <div className="p3-shard shard-1" />
        <div className="p3-shard shard-2" />
        <div className="p3-shard shard-3" />
        <div className="p3-shard shard-4" />
      </div>

      {/* ── Right Side: Exact Makoto Yuki & COMMU Silhouette from Screenshot ── */}
      <div className={`p3-silhouette-stage ${mounted ? "mounted" : ""}`}>
        <img
          src={silhouette}
          alt="Persona 3 Reload Social Links Character Silhouette"
          className="p3-silhouette-img"
        />
        {/* Real-time fluid oceanic caustics & wave currents over the blue areas */}
        <OceanicCausticsCanvas />
        {/* Soft atmospheric oceanic sheen */}
        <div className="p3-silhouette-caustic-glow" aria-hidden="true" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,700;1,700&display=swap');

        .p3-socials-root {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #000c30;
        }

        /* ── Full-Screen Oceanic Video Background (Left Side Flow) ── */
        .p3-socials-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        /* ── Floating Polygonal Glass Shards ── */
        .p3-ambient-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          overflow: hidden;
        }
        .p3-shard {
          position: absolute;
          background: rgba(60, 226, 255, 0.28);
          clip-path: polygon(0% 0%, 100% 25%, 80% 100%, 15% 85%);
          filter: blur(1px);
          animation: p3-float-shard 8s infinite linear;
        }
        .shard-1 { top: 18%; left: 14%; width: 50px; height: 70px; animation-duration: 9s; }
        .shard-2 { top: 62%; left: 28%; width: 42px; height: 60px; animation-duration: 7s; animation-delay: 2s; }
        .shard-3 { top: 25%; right: 44%; width: 48px; height: 65px; animation-duration: 11s; animation-delay: 1s; }
        .shard-4 { bottom: 18%; right: 28%; width: 60px; height: 80px; animation-duration: 8.5s; animation-delay: 3s; }

        @keyframes p3-float-shard {
          0%   { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50%  { transform: translateY(-28px) rotate(18deg); opacity: 0.6; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
        }

        /* ── Right Side Silhouette Stage (Screenshot 2 Asset) ── */
        .p3-silhouette-stage {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 58vw;
          z-index: 5;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          /* Dissolves left edge into the flowing video on the left */
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 8%, black 22%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 8%, black 22%);
        }
        .p3-silhouette-stage.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .p3-silhouette-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          animation: p3-silhouette-breathe 5s ease-in-out infinite alternate;
        }

        @keyframes p3-silhouette-breathe {
          0%   { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-6px) scale(1.01); }
        }

        /* ── Real-time Flowing Oceanic Caustics Canvas ── */
        .p3-silhouette-caustic-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          mix-blend-mode: screen;
          z-index: 2;
          opacity: 0.95;
        }

        /* Soft flowing oceanic caustic glow & subtle shimmer */
        .p3-silhouette-caustic-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          z-index: 3;
          background:
            radial-gradient(ellipse 600px 380px at 55% 30%, rgba(60, 226, 255, 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 500px 420px at 75% 65%, rgba(0, 140, 255, 0.15) 0%, transparent 60%);
          animation: p3-caustic-pulse 5s ease-in-out infinite alternate;
        }

        @keyframes p3-caustic-pulse {
          0%   { opacity: 0.65; transform: scale(0.98); }
          100% { opacity: 0.95; transform: scale(1.02); }
        }

        /* ── Left Social Link Stack (Complementing Background) ── */
        .p3-social-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .p3-social-stack {
          position: absolute;
          top: 13vh;
          left: 4vw;
          width: min(48vw, 680px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
          transform: scale(0.92);
          transform-origin: top left;
        }

        /* Header: "LIST" in electric cyan */
        .p3-social-list-tag {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 78px;
          line-height: 0.88;
          color: #a5f6ff;
          letter-spacing: 3px;
          margin-bottom: 6px;
          text-shadow: 4px 4px 0 #05103a, 0 0 20px rgba(60, 226, 255, 0.4);
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .p3-social-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Individual Social Link Card ── */
        .p3-social-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .p3-social-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .p3-social-card {
          position: relative;
          height: 84px;
          background: #0e1d68;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 6px 0 rgba(4, 11, 46, 0.9);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }

        /* ACTIVE CARD: Turns White with Red Notch (Card 0 match) */
        .p3-social-card-wrap.active .p3-social-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #ff2a2a;
          transform: translateX(10px);
        }

        /* Red Accent Tab on top-right of active card */
        .p3-social-card::before {
          content: "";
          position: absolute;
          top: -3px; right: 2%;
          width: 0; height: 6px;
          background: #ff2a2a;
          transition: width 0.2s ease;
        }
        .p3-social-card-wrap.active .p3-social-card::before {
          width: 48px;
        }

        .p3-social-card-inner {
          position: absolute;
          inset: 0;
          padding: 8px 24px 8px 64px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        /* ── Roman Numeral Flag Badge on Left ── */
        .p3-tarot-badge {
          position: absolute;
          top: 8px;
          left: -8px;
          width: 52px;
          height: 64px;
          background: #08103c;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-7deg);
          box-shadow: 0 4px 0 rgba(0, 0, 0, 0.35);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .p3-tarot-badge-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 34px;
          line-height: 1;
          color: #d2fdff;
          letter-spacing: 1.5px;
        }
        .p3-social-card-wrap.active .p3-tarot-badge {
          background: #000000;
          border-color: #000000;
        }
        .p3-social-card-wrap.active .p3-tarot-badge-num {
          color: #ffffff;
        }

        /* ── Title (Social Platform) ── */
        .p3-social-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1.5px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .p3-social-card-wrap.active .p3-social-title {
          color: #000000;
        }

        /* ── Rank Display on Right (RANK MAX / RANK 7) ── */
        .p3-social-rank {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-shrink: 0;
        }
        .p3-social-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .p3-social-rank-num {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 46px;
          line-height: 0.85;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .p3-social-card-wrap.active .p3-social-rank-label,
        .p3-social-card-wrap.active .p3-social-rank-num {
          color: #000000;
        }

        /* ── Bottom Subtitle Bar (Handle / Link description) ── */
        .p3-social-subtitle-bar {
          position: absolute;
          left: 62px;
          right: 14px;
          bottom: 8px;
          height: 28px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 16px;
          transition: background 0.22s ease;
        }
        .p3-social-card-wrap.active .p3-social-subtitle-bar {
          background: #000000;
        }

        .p3-social-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          line-height: 1;
          letter-spacing: 1.5px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .p3-social-card-wrap.active .p3-social-subtitle {
          color: #ffffff;
        }
      `}</style>

      {/* ── Left Social Link Stack ── */}
      <div className="p3-social-overlay">
        <div className="p3-social-stack">
          <div className={`p3-social-list-tag ${mounted ? "mounted" : ""}`}>LIST</div>

          {SOCIAL_LINKS.map((item, index) => (
            <div
              key={item.id}
              className={`p3-social-card-wrap ${active === index ? "active" : ""} ${mounted ? "mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => {
                setActive(index);
                window.open(item.href, "_blank", "noopener,noreferrer");
              }}
            >
              <div className="p3-social-card">
                {/* Left Roman Numeral Flag Badge */}
                <div className="p3-tarot-badge">
                  <span className="p3-tarot-badge-num">{item.numeral}</span>
                </div>

                <div className="p3-social-card-inner">
                  <div className="p3-social-title">{item.title}</div>
                  <div className="p3-social-rank">
                    <span className="p3-social-rank-label">RANK</span>
                    <span className="p3-social-rank-num">{item.rank}</span>
                  </div>
                </div>

                {/* Subtitle Bar with Handle */}
                <div className="p3-social-subtitle-bar">
                  <span className="p3-social-subtitle">
                    {item.handle} &nbsp;—&nbsp; {item.desc}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
