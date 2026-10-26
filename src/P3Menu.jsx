import { useState, useEffect, useRef } from "react";

/* ─── Menu Items Configuration (Left-Right-Left-Right Staggered Layout) ─── */
const ITEMS = [
  {
    id: "about",
    page: "about",
    fontSize: 66,
    offsetX: -70, // LEFT
    offsetY: 0,
    skew: -6,
    skewY: 9,
    words: [
      { initial: "A", rest: "BOUT", clip: "polygon(2% 0%, 98% 3%, 95% 98%, 0% 100%)", rot: -3 },
      { initial: "M", rest: "E",    clip: "polygon(0% 2%, 100% 0%, 96% 100%, 3% 97%)", rot: 4  },
    ],
  },
  {
    id: "projects",
    page: "projects",
    fontSize: 60,
    offsetX: 75,  // RIGHT
    offsetY: 14,
    skew: -10,
    skewY: -9,
    words: [
      { initial: "P", rest: "ROJECTS", clip: "polygon(1% 0%, 99% 2%, 97% 100%, 0% 98%)", rot: 2 },
    ],
  },
  {
    id: "resume",
    page: "resume",
    fontSize: 56,
    offsetX: -50, // LEFT
    offsetY: 12,
    skew: -2,
    skewY: -5,
    words: [
      { initial: "R", rest: "ESUME", clip: "polygon(2% 0%, 98% 3%, 95% 100%, 0% 97%)", rot: -2 },
    ],
  },
  {
    id: "socials",
    page: "socials",
    fontSize: 58,
    offsetX: 65,  // RIGHT
    offsetY: 12,
    skew: -4,
    skewY: 7,
    words: [
      { initial: "S", rest: "OCIALS", clip: "polygon(0% 2%, 100% 0%, 97% 100%, 2% 98%)", rot: 3 },
    ],
  },
];

/* ─── Angled Arrow Polygon Ribbon Shape (Screenshot 1) ─── */
const CLIP_ARROW = (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`;

/* ─── Dual Jelly SVG Polygon Slashes ─── */
const POLY = [
  { blue: "29.5,8.5 150.7,0 108.1,32.7 3.1,47", cyan: "0.3,17 125.1,0 68.8,45.6 24.3,39" },
  { blue: "0,7.1 127.3,0 32.3,64 4.8,58.2",     cyan: "14,0.5 127.4,0 77.4,164 2.3,61.1" },
  { blue: "15.5,0 70.7,0 118.1,32.7 43.1,47",   cyan: "17.3,0 105.1,0 68.8,45.6 24.3,39" },
  { blue: "19.5,0 110.7,0 80.1,32.7 3.1,47",    cyan: "11,3 85.1,0 118.8,45.6 14.3,29" },
];

/* ─── Pixel Reveal Entrance Effect ─── */
const PIXEL_SIZE = 18;

function PixelReveal() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols  = Math.ceil(canvas.width  / PIXEL_SIZE);
    const rows  = Math.ceil(canvas.height / PIXEL_SIZE);
    const total = cols * rows;

    const order = Array.from({ length: total }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    const COLOURS = ["#0a0010", "#1a0030", "#2a0050", "#0d0020", "#150025"];
    for (let k = 0; k < total; k++) {
      const col = order[k] % cols;
      const row = Math.floor(order[k] / cols);
      ctx.fillStyle = COLOURS[k % COLOURS.length];
      ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
    }

    let idx = 0;
    const BATCH = Math.max(1, Math.floor(total / 60));
    let raf;
    const step = () => {
      for (let b = 0; b < BATCH && idx < total; b++, idx++) {
        const col = order[idx] % cols;
        const row = Math.floor(order[idx] / cols);
        ctx.clearRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
      if (idx < total) raf = requestAnimationFrame(step);
      else canvas.style.opacity = "0";
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(step); }, 200);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none", transition: "opacity 0.4s ease" }}
    />
  );
}

/* ─── Main Menu Component ─── */
export default function P3Menu({ onNavigate }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const activate = (idx) => {
    setActive(idx);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter")     onNavigate?.(ITEMS[active].page);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <PixelReveal />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Cinzel:wght@900&display=swap');

        /* ── Chrome Elements ── */
        .p3-stripe  { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; background: #0047FF; z-index: 10; pointer-events: none; }
        .p3-stripe2 { position: absolute; right: 9px; top: 0; bottom: 0; width: 2px; background: rgba(60,226,255,0.3); z-index: 10; pointer-events: none; }

        .p3-name-tag {
          position: absolute;
          top: 18px; left: 22px;
          z-index: 20;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 108px;
          line-height: 0.88;
          letter-spacing: 2px;
          color: rgba(10, 10, 14, 0.64);
          transform: rotate(18deg);
          transform-origin: left top;
          user-select: none;
          pointer-events: none;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .p3-name-tag span:first-child { color: rgba(0, 0, 0, 0.86); }

        /* ── Overlay and Container ── */
        .p3-overlay {
          position: absolute; inset: 0; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .p3-menu {
          position: relative; z-index: 20;
          padding: 40px;
          display: flex; flex-direction: column; align-items: center;
          pointer-events: all;
          gap: 14px;
        }

        /* ── Staggered Left-Right Row ── */
        .p3-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-decoration: none;
          opacity: 0;
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .p3-row.mounted {
          opacity: 1 !important;
        }

        /* Soft persona cyan/blue ambient glow */
        .p3-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 130%; height: 220%;
          background: radial-gradient(ellipse at center, rgba(60, 226, 255, 0.3) 0%, transparent 70%);
          filter: blur(18px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .p3-row.active .p3-glow { opacity: 1; }

        .p3-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        /* ── Pop Shadow Tri (Blue) ── */
        @keyframes p3-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        .p3-shadow-tri {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #0047FF;
          z-index: 1;
          pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .p3-shadow-tri.pop {
          animation: p3-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* ── White Pointed Arrow Ribbon Highlight ── */
        .p3-highlight {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #ffffff;
          z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          box-shadow: 0 4px 20px rgba(0, 71, 255, 0.4);
        }
        .p3-highlight::after {
          content: "";
          position: absolute;
          left: 0; bottom: 0; width: 100%; height: 4px;
          background: #0047FF;
        }

        /* ── Dual Jelly SVG Polygon Slashes (Blue & Cyan) ── */
        .p3-shape-wrapper {
          display: none;
          position: absolute;
          top: -14px; left: -28px; right: -28px; bottom: -14px;
          pointer-events: none;
          z-index: 1;
          perspective: 600px;
        }
        .p3-row.active .p3-shape-wrapper {
          display: block;
        }
        .p3-row:nth-child(odd).active  .p3-shape-wrapper { transform: rotate(-6deg); }
        .p3-row:nth-child(even).active .p3-shape-wrapper { transform: rotate(11deg); }

        .p3-shape {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          overflow: hidden;
          transition: all 0.1s linear;
        }
        .p3-shape svg {
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
        }
        .p3-shape.p3-blue-fill {
          animation: p3jelly 0.45s linear infinite;
          animation-delay: 0.08s;
          opacity: 0.88;
        }
        .p3-shape.p3-cyan-fill {
          mix-blend-mode: screen;
          animation: p3jelly 0.4s linear infinite;
          animation-delay: 0.05s;
        }

        @keyframes p3jelly {
          0%   { width: 100%; transform: scale(1.25,1)   skewX(20deg)  translateY(3px)  rotateX(40deg)  rotateY(10deg)  rotateZ(-10deg); }
          50%  { width: 100%; transform: scale(1.25,1.1) skewX(-15deg) translateY(-2px) translateZ(-30px); }
          100% { width: 100%; transform: scale(1.25,1)   skewX(20deg)  translateY(3px)  rotateX(-40deg) rotateY(-10deg) rotateZ(-15deg); }
        }

        /* ── Word Badge Container ── */
        .p3-words-wrap {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 12px;
          user-select: none;
          padding: 6px 12px;
          transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Tilt bounce on active row */
        .p3-row:nth-child(odd).active  .p3-words-wrap {
          animation: p3tilt 0.16s ease forwards;
        }
        .p3-row:nth-child(even).active .p3-words-wrap {
          animation: p3tiltAlt 0.16s ease forwards;
        }
        @keyframes p3tilt {
          0%   { transform: scale(1)    rotate(-5deg); }
          50%  { transform: scale(1.1) rotate(-5deg); }
          100% { transform: scale(1.05) rotate(-5deg); }
        }
        @keyframes p3tiltAlt {
          0%   { transform: scale(1)    rotate(5deg); }
          50%  { transform: scale(1.1) rotate(5deg); }
          100% { transform: scale(1.05) rotate(5deg); }
        }

        /* ── Word Sticker Badge ── */
        .p3-word-badge {
          display: inline-flex;
          align-items: baseline;
          padding: 6px 16px 4px 16px;
          line-height: 0.95;
          letter-spacing: 2px;
          user-select: none;
          transition: all 0.18s cubic-bezier(0.22, 1, 0.36, 1);

          /* INACTIVE: Deep navy tile with Persona cyan border & text */
          background: rgba(4, 14, 46, 0.85);
          border: 2px solid #3ce2ff;
          box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.7);
          color: #3ce2ff;
          font-family: 'Anton', sans-serif;
        }

        .p3-word-badge .p3-initial {
          font-family: 'Cinzel', serif;
          font-size: 1.15em;
          margin-right: 2px;
          color: #3ce2ff;
        }

        /* ── ACTIVE: Crisp White Badge + Deep Persona Blue Text ── */
        .p3-word-badge.active {
          background: #ffffff;
          border: 3px solid #041238;
          box-shadow: 4px 4px 0px #041238, 7px 7px 0px rgba(0, 71, 255, 0.4);
        }

        /* Active Text: Persona 3 Electric Blue Initial + Deep Blue Rest (No red!) */
        .p3-word-badge.active .p3-initial {
          color: #0047FF;
          -webkit-text-stroke: 1.2px #041238;
          paint-order: stroke fill;
        }

        .p3-word-badge.active .p3-rest {
          color: #041238;
          -webkit-text-stroke: 0.8px #041238;
          paint-order: stroke fill;
        }
      `}</style>

      <div className="p3-overlay">
        <div className="p3-name-tag">
          <span>dhruv's</span>
          <span>persona</span>
        </div>
        <div className="p3-stripe" />
        <div className="p3-stripe2" />

        <nav className="p3-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.48, 1 - dist * 0.18);
            const labelLen = item.words.reduce((acc, w) => acc + w.initial.length + w.rest.length, 0);
            const estW = labelLen * (item.fontSize * 0.58) + 140;
            const estH = item.fontSize * 1.12;
            const poly = POLY[i];

            return (
              <a
                key={item.id}
                href="#"
                className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  transform: `translateX(${item.offsetX}px)`,
                  marginTop: `${item.offsetY}px`,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.(item.page);
                }}
                onMouseEnter={() => activate(i)}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Soft ambient glow */}
                <div className="p3-glow" />

                {/* Staggered skew wrapper */}
                <div
                  className="p3-skew-wrap"
                  style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
                >
                  {/* Popping Blue Triangular Shadow */}
                  <div
                    key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                    className={`p3-shadow-tri${isActive ? " pop" : ""}`}
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: CLIP_ARROW(estW, estH),
                    }}
                  />

                  {/* Sliding White Pointed Arrow Ribbon Highlight */}
                  <div
                    className="p3-highlight"
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: CLIP_ARROW(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />

                  {/* Dual Jelly SVG Polygon Slashes (Blue & Cyan) */}
                  <div className="p3-shape-wrapper">
                    <div className="p3-shape p3-blue-fill">
                      <svg viewBox="0 0 108.1 47" preserveAspectRatio="none">
                        <polygon fill="#0047FF" points={poly.blue} />
                      </svg>
                    </div>
                    <div className="p3-shape p3-cyan-fill">
                      <svg viewBox="0 0 108.1 47" preserveAspectRatio="none">
                        <polygon fill="#3ce2ff" points={poly.cyan} />
                      </svg>
                    </div>
                  </div>

                  {/* Clean Word Badges */}
                  <div className="p3-words-wrap" style={{ opacity, fontSize: `${item.fontSize}px` }}>
                    {item.words.map((w, wIdx) => (
                      <span
                        key={wIdx}
                        className={`p3-word-badge ${isActive ? "active" : ""}`}
                        style={{
                          transform: `rotate(${w.rot}deg)`,
                          clipPath: w.clip,
                        }}
                      >
                        <span className="p3-initial">{w.initial}</span>
                        <span className="p3-rest">{w.rest}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
