import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import mainMenuVideo from './assets/main_menu_asset_final.mp4'
import main1 from './assets/main1.mp4'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import './App.css'

const ResumePage = lazy(() => import('./ResumePage'))
const Socials = lazy(() => import('./Socials'))
const AboutMe = lazy(() => import('./AboutMe'))
const Projects = lazy(() => import('./Projects'))

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
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translateZ(0)",
          willChange: "transform",
          pointerEvents: "none",
        }}
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
      <BackButton />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition variant="default"><MenuScreen /></PageTransition>
          } />
          <Route path="/about" element={
            <Suspense fallback={null}>
              <PageTransition variant="socials"><AboutMe src={main1} /></PageTransition>
            </Suspense>
          } />
          <Route path="/resume" element={
            <Suspense fallback={null}>
              <PageTransition variant="socials"><ResumePage src={main1} /></PageTransition>
            </Suspense>
          } />
          <Route path="/socials" element={
            <Suspense fallback={null}>
              <PageTransition variant="socials"><Socials src={main1} /></PageTransition>
            </Suspense>
          } />
          <Route path="/projects" element={
            <Suspense fallback={null}>
              <PageTransition variant="socials"><Projects /></PageTransition>
            </Suspense>
          } />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
