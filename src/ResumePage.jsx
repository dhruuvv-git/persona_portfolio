import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "NMIMS Chandigarh / 2025–29", rank: 4 },
  { id: "ii", badge: "II", title: "FORTE", subtitle: "Technical Architecture & Core", rank: 5 },
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "Featured Software Index", rank: 5 },
];

const EDUCATION_ROWS = [
  { index: "01", label: "INSTITUTION", value: "NMIMS Chandigarh", badge: "CAMPUS" },
  { index: "02", label: "DEGREE", value: "B.Tech in Computer Science & Engineering", badge: "B.TECH CSE" },
  { index: "03", label: "SPECIALIZATION", value: "Data Science", badge: "DATA SCI" },
  { index: "04", label: "BATCH / COHORT", value: "Batch 2025 — 2029", badge: "2025-29" },
  { index: "05", label: "CURRENT STATUS", value: "Undergraduate Student", badge: "ACTIVE" },
];

const TECHNICAL_FORTE = [
  {
    index: "01",
    title: "UI DESIGN",
    badge: "FRONTEND",
    desc: "Persona-grade high-contrast interfaces, kinetic micro-interactions, responsive typography & tactile brutalist design.",
  },
  {
    index: "02",
    title: "DSA",
    badge: "ALGORITHMS",
    desc: "Core algorithmic problem solving, time/space complexity optimization, graphs, trees & dynamic programming.",
  },
  {
    index: "03",
    title: "CYBERSECURITY",
    badge: "DEFENSE",
    desc: "Defensive paradigms, vulnerability triage, cryptographically secure workflows & application security auditing.",
  },
  {
    index: "04",
    title: "APACHE KAFKA",
    badge: "STREAMING",
    desc: "Event-driven architecture, distributed stream processing, topic partitioning & real-time messaging pipelines.",
  },
  {
    index: "05",
    title: "SYSTEM ARCHITECTURE",
    badge: "SYSTEMS",
    desc: "Scalable modular systems design, fault-tolerant distributed infrastructure, low-latency microservices & API choreography.",
  },
];


const PROJECTS_LIST = [
  {
    id: "01",
    index: 0,
    badge: "01",
    title: "NO LONGER 365",
    subtitle: "Gamified Habit Tracker",
    tags: "Electron · Capacitor · Gamification",
    rank: 7,
  },
  {
    id: "02",
    index: 1,
    badge: "02",
    title: "TUNE BREACH",
    subtitle: "Acoustic Intelligence",
    tags: "DSP · FFT · WebGL · Vercel",
    rank: 6,
  },
  {
    id: "03",
    index: 2,
    badge: "03",
    title: "PARK-D",
    subtitle: "Smart Parking Network",
    tags: "React · Leaflet · Socket.io",
    rank: 8,
  },
  {
    id: "04",
    index: 3,
    badge: "04",
    title: "SOLACE",
    subtitle: "Incident Response Vault",
    tags: "SHA-256 · Chrome Ext · Security",
    rank: 9,
  },
  {
    id: "05",
    index: 4,
    badge: "05",
    title: "THE RECETARIO",
    subtitle: "Digital Cookbook",
    tags: "UI/UX · Data Schema · Clean Web",
    rank: 4,
  },
  {
    id: "06",
    index: 5,
    badge: "06",
    title: "NUTRIDISH",
    subtitle: "Java OOP Nutrition App",
    tags: "Java · OOP · Analytics",
    rank: 5,
  },
  {
    id: "07",
    index: 6,
    badge: "07",
    title: "CODE PUSHER",
    subtitle: "Browser Extension",
    tags: "Extension · GitHub API · DevOps",
    rank: 8,
  },
  {
    id: "08",
    index: 7,
    badge: "08",
    title: "LUMIERE",
    subtitle: "Healthcare Intelligence",
    tags: "REST API · Data Pipelines · Healthcare",
    rank: 6,
  },
];

export default function ResumePage({ src }) {
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
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
      if (e.key === "Enter" && active === 2) {
        navigate("/projects", { state: { projectIndex: 0 } });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline preload="auto" />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline preload="auto" />
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
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
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
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        /* ── Detail Panel & Scroll Container ── */
        .resume-detail-panel {
          position: absolute;
          top: 8.5vh;
          right: 4vw;
          width: min(42vw, 680px);
          max-height: 83vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.97) 0%, rgba(8, 16, 68, 0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: all;
        }
        .resume-detail-panel::-webkit-scrollbar {
          width: 6px;
        }
        .resume-detail-panel::-webkit-scrollbar-track {
          background: rgba(4, 12, 44, 0.6);
        }
        .resume-detail-panel::-webkit-scrollbar-thumb {
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }

        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 84px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
          margin-bottom: 16px;
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 44px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 38px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 34px;
          letter-spacing: 2px;
          line-height: 1;
          color: #0047FF;
        }

        .resume-section-header {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: #85f4ff;
          margin: 18px 0 10px 2px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .resume-section-header::after {
          content: "";
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, #85f4ff 0%, transparent 100%);
        }

        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        /* ── Standard Row ── */
        .resume-detail-row {
          display: grid;
          grid-template-columns: 46px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 52px;
          padding: 6px 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(14, 30, 108, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .resume-detail-row-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1.5px;
          color: #85f4ff;
          opacity: 0.85;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 24px;
          line-height: 1.05;
          color: #f2fcff;
        }
        .resume-detail-row-desc {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 13px;
          line-height: 1.35;
          color: #c7ebff;
          margin-top: 2px;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 6px 11px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          white-space: nowrap;
        }

        /* ── Clickable Project Row (Navigates to Project tab) ── */
        .resume-project-row {
          display: grid;
          grid-template-columns: 46px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 64px;
          padding: 8px 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.16);
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.2);
          text-decoration: none;
        }
        .resume-project-row:hover {
          transform: translateX(6px) scale(1.01);
          background: #ffffff;
          box-shadow: 6px 6px 0 #d63232, inset 0 0 0 2px #000;
        }
        .resume-project-row:hover .resume-project-index {
          color: #000;
        }
        .resume-project-row:hover .resume-project-title {
          color: #000;
        }
        .resume-project-row:hover .resume-project-sub {
          color: #041238;
        }
        .resume-project-row:hover .resume-project-tags {
          color: #0047FF;
        }
        .resume-project-row:hover .resume-project-btn {
          background: #000;
          color: #fff;
        }

        .resume-project-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #8df6ff;
          transition: color 0.18s ease;
        }
        .resume-project-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .resume-project-title {
          font-family: 'Anton', sans-serif;
          font-size: 24px;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 0.5px;
          transition: color 0.18s ease;
        }
        .resume-project-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          letter-spacing: 1px;
          color: #92ecff;
          transition: color 0.18s ease;
        }
        .resume-project-tags {
          font-family: system-ui, sans-serif;
          font-size: 11px;
          color: #85c2ff;
          letter-spacing: 0.5px;
          transition: color 0.18s ease;
        }
        .resume-project-btn {
          font-family: 'Anton', sans-serif;
          font-size: 17px;
          letter-spacing: 1.5px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 13px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          white-space: nowrap;
          transition: all 0.18s ease;
        }

        .resume-detail-bottom {
          position: relative;
          margin-top: 18px;
          padding: 16px 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 10px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .resume-detail-bullet {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          line-height: 1.45;
          color: #edfaff;
        }
        .resume-detail-bullet strong {
          color: #85f4ff;
          font-weight: 600;
        }
      `}</style>

      <div className="resume-overlay">
        {/* ── Left Category Stack ── */}
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>RESUME</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
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

        {/* ── Tab 0: EDUCATION ── */}
        {active === 0 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">01</div>
              <div className="resume-detail-top-title">EDUCATION LOG</div>
              <div className="resume-detail-top-progress">2025–29</div>
            </div>

            <div className="resume-detail-list">
              {EDUCATION_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-content">
                    <div className="resume-detail-row-label">{row.label}</div>
                    <div className="resume-detail-row-title">{row.value}</div>
                  </div>
                  <div className="resume-detail-status">{row.badge}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">ACADEMIC PROFILE</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">
                  • <strong>Undergrad at B.Tech in CSE</strong> with specialization in <strong>Data Science</strong> at <strong>NMIMS Chandigarh</strong>.
                </div>
                <div className="resume-detail-bullet">
                  • <strong>Batch 2025–2029:</strong> Rigorous computer science foundation, distributed architectures, algorithm design, and data intelligence.
                </div>
                <div className="resume-detail-bullet">
                  • Engineering high-contrast, identity-driven applications backed by production-grade software craftsmanship.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 1: FORTE (Technical Core) ── */}
        {active === 1 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">02</div>
              <div className="resume-detail-top-title">TECHNICAL FORTE</div>
              <div className="resume-detail-top-progress">S-RANK</div>
            </div>

            <div className="resume-section-header">CORE ARSENAL & ENGINEERING DISCIPLINES</div>
            <div className="resume-detail-list">
              {TECHNICAL_FORTE.map((item) => (
                <div className="resume-detail-row" key={item.index}>
                  <div className="resume-detail-row-index">{item.index}</div>
                  <div className="resume-detail-row-content">
                    <div className="resume-detail-row-title">{item.title}</div>
                    <div className="resume-detail-row-desc">{item.desc}</div>
                  </div>
                  <div className="resume-detail-status">{item.badge}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">CAPABILITY & ENGINEERING MATRIX</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">
                  • <strong>Architecture & Algorithms:</strong> Deep technical mastery in modular system design, graph/tree problem solving, and low-latency API choreography.
                </div>
                <div className="resume-detail-bullet">
                  • <strong>Security & Real-Time Data:</strong> Production-grade defensive cybersecurity triage coupled with distributed event-streaming pipelines via Apache Kafka.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 2: PROJECTS (Redirects to exact project on click) ── */}
        {active === 2 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">03</div>
              <div className="resume-detail-top-title">PROJECT ARCHIVE</div>
              <div className="resume-detail-top-progress">8 ITEMS</div>
            </div>

            <div className="resume-detail-list">
              {PROJECTS_LIST.map((proj) => (
                <div
                  key={proj.id}
                  className="resume-project-row"
                  onClick={() => navigate("/projects", { state: { projectIndex: proj.index } })}
                  title={`Open ${proj.title} in Projects`}
                >
                  <div className="resume-project-index">{proj.badge}</div>
                  <div className="resume-project-info">
                    <div className="resume-project-title">{proj.title}</div>
                    <div className="resume-project-sub">{proj.subtitle}</div>
                    <div className="resume-project-tags">{proj.tags}</div>
                  </div>
                  <div className="resume-project-btn">OPEN ↗</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">NAVIGATION SHORTCUT</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">
                  Click any project card above to jump directly to its dedicated showcase tab in <strong>PROJECTS</strong>.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
