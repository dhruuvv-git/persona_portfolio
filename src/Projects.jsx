import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PROJECTS = [
  {
    id: "01", badge: "01", title: "NO LONGER 365", subtitle: "Gamified Habit Tracker", rank: 7,
    link: "https://github.com/dhruuvv-git/The-No-Longer-365.git",
    desc: "A revolutionary gamified habit tracker with an identity interface. Runs on Android and Windows.",
    tags: ["Electron", "Capacitor", "Gamification"],
  },
  {
    id: "02", badge: "02", title: "LUMIERE", subtitle: "Healthcare Intelligence", rank: 6,
    link: "https://github.com/nipunn-git/lumiere.git",
    desc: "Healthcare intelligence system consolidating fragmented patient data into a unified clean backend.",
    tags: ["REST API", "Data Pipelines", "Healthcare"],
  },
  {
    id: "03", badge: "03", title: "NUTRIDISH", subtitle: "Java OOP Nutrition App", rank: 5,
    link: "https://github.com/dhruuvv-git/NutriDish.git",
    desc: "Standalone Java nutrition and macro-tracking app built on solid Object-Oriented Programming principles.",
    tags: ["Java", "OOP", "Analytics"],
  },
  {
    id: "04", badge: "04", title: "CODE PUSHER", subtitle: "Browser Extension", rank: 8,
    link: "https://github.com/dhruuvv-git/instant-github-code-pusher.git",
    desc: "Lightweight browser extension — push code directly to GitHub without leaving the tab. Zero context-switching.",
    tags: ["Extension", "GitHub API", "DevOps"],
  },
  {
    id: "05", badge: "05", title: "TUNE BREACH", subtitle: "Acoustic Intelligence", rank: 6,
    link: "https://github.com/dhruuvv-git/tune_breach",
    desc: "Sub-cent pitch detection, deep harmonic chord exploration, and real-time audio visualization.",
    tags: ["DSP", "FFT", "WebGL"],
  },
  {
    id: "06", badge: "06", title: "SOLACE", subtitle: "Incident Response Vault", rank: 9,
    link: "https://github.com/dhruuvv-git/solace",
    desc: "Privacy-first triage workspace for digital extortion and synthetic media. SHA-256 vault + Mimi browser extension.",
    tags: ["SHA-256", "Chrome Ext", "Security"],
  },
  {
    id: "07", badge: "07", title: "THE RECETARIO", subtitle: "Digital Cookbook", rank: 4,
    link: "https://github.com/dhruuvv-git/The-Recetario",
    desc: "Personalized digital cookbook — store, organize and discover recipes in a beautifully minimal interface.",
    tags: ["UI/UX", "Data Schema"],
  },
];

export default function Projects({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
      if (e.key === "Enter") window.open(PROJECTS[active].link, "_blank", "noopener,noreferrer");
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active]);

  const p = PROJECTS[active];

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
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
        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }
        .resume-stack {
          position: absolute;
          top: 14vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          pointer-events: none;
          transform: scale(0.86);
          transform-origin: top left;
        }
        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 80px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 4px 12px;
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
          height: 90px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }
        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 10px 22px 10px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .resume-badge {
          position: absolute;
          top: 8px; left: -10px;
          width: 52px; height: 62px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px; color: #d2fdff;
          letter-spacing: 1px; transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge { background: #000; border-color: #000; }
        .resume-card-wrap.active .resume-badge-text { color: #fff; }
        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 44px; line-height: 0.9;
          letter-spacing: 1px; color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title { color: #000; }
        .resume-rank {
          display: flex; align-items: center; gap: 10px;
          margin-top: 2px; flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 2px; color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 58px; line-height: 0.82; color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number { color: #000; }
        .resume-subtitle-bar {
          position: absolute; left: 64px; right: 14px; bottom: 10px;
          height: 30px; background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex; align-items: center; padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar { background: #000; }
        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; line-height: 1; letter-spacing: 1px; color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle { color: #fff; }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh; right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133, 244, 255, 0.16), 16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
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
        .resume-open-link {
          display: inline-block; margin-top: 16px;
          font-family: 'Anton', sans-serif; font-size: 22px;
          letter-spacing: 2px; color: #040e2e;
          background: #ff2a2a; padding: 8px 18px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          pointer-events: all; cursor: pointer;
          text-decoration: none; transition: background 0.18s ease;
        }
        .resume-open-link:hover { background: #ff5555; }
          position: fixed;
          top: 22px; left: 22px;
          z-index: 40;
          font-family: 'Anton', sans-serif;
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

        <div className="resume-detail-panel">
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
            <a
              className="resume-open-link"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              [ENTER] OPEN REPO ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


