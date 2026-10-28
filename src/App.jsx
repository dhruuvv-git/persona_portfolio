import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import mainMenuVideo from './assets/main_menu_asset.mp4'
import main1 from './assets/main1.mp4'
import aboutBg from './assets/about_bg.gif'
import P3Menu from './P3Menu'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import Projects from './Projects'
import './App.css'

function BackButton() {
  const location = useLocation()
  const navigate  = useNavigate()
  if (location.pathname === '/') return null
  return (
    <button
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        top: '18px',
        left: '18px',
        zIndex: 9999,
        fontFamily: "'Anton', sans-serif",
        fontSize: '18px',
        letterSpacing: '3px',
        color: 'rgba(255,255,255,0.9)',
        background: 'rgba(0,0,0,0.62)',
        border: '1.5px solid rgba(255,255,255,0.22)',
        padding: '9px 20px 9px 16px',
        clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
        cursor: 'pointer',
        pointerEvents: 'all',
        transition: 'background 0.18s ease, color 0.18s ease',
        userSelect: 'none',
        lineHeight: 1,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#c4001a'; e.currentTarget.style.borderColor = 'transparent'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.62)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
    >
      ← MENU
    </button>
  )
}

/* ── Eager Background Asset Preloader (eliminates sub-menu loading lag) ── */
function BackgroundPreloader() {
  useEffect(() => {
    // 1. Preload and decode video into hardware buffer
    const v = document.createElement('video')
    v.src = main1
    v.preload = 'auto'
    v.muted = true
    v.playsInline = true
    v.load()

    // 2. Pre-cache the projects background GIF in memory
    const img = new Image()
    img.src = aboutBg

    // 3. Register high-priority preload hints in <head>
    const linkVideo = document.createElement('link')
    linkVideo.rel = 'preload'
    linkVideo.as = 'video'
    linkVideo.href = main1
    linkVideo.type = 'video/mp4'
    document.head.appendChild(linkVideo)

    const linkImg = document.createElement('link')
    linkImg.rel = 'preload'
    linkImg.as = 'image'
    linkImg.href = aboutBg
    document.head.appendChild(linkImg)

    return () => {
      try {
        document.head.removeChild(linkVideo)
        document.head.removeChild(linkImg)
      } catch (_) {}
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: -9999,
        left: -9999,
        width: 1,
        height: 1,
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -9999,
      }}
    >
      {/* Kept in DOM to maintain active preloaded cache buffer across all sub-menus */}
      <video
        src={main1}
        preload="auto"
        muted
        playsInline
        autoPlay
      />
      <img src={aboutBg} alt="" loading="eager" />
    </div>
  )
}

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video
        src={mainMenuVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <P3Menu onNavigate={(page) => {
        if (page === 'github') {
          window.open('https://github.com/dhruuvv-git', '_blank', 'noopener,noreferrer')
        } else {
          navigate(`/${page}`)
        }
      }} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <>
      <BackgroundPreloader />
      <BackButton />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition variant="default"><MenuScreen /></PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition variant="socials"><AboutMe src={main1} /></PageTransition>
          } />
          <Route path="/resume" element={
            <PageTransition variant="socials"><ResumePage src={main1} /></PageTransition>
          } />
          <Route path="/socials" element={
            <PageTransition variant="socials"><Socials src={main1} /></PageTransition>
          } />
          <Route path="/projects" element={
            <PageTransition variant="socials"><Projects /></PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
