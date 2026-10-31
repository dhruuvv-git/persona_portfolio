import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import mainMenuVideo from './assets/main_menu_asset_final.mp4'
import main1 from './assets/main1.mp4'
import aboutResumeBackground from './assets/main1_loop.mp4'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import './App.css'

const pageLoaders = {
  about: () => import('./AboutMe'),
  resume: () => import('./ResumePage'),
  socials: () => import('./Socials'),
  projects: () => import('./Projects'),
}
const ROUTE_ASSET_WAIT_MS = 2500

const ResumePage = lazy(pageLoaders.resume)
const Socials = lazy(pageLoaders.socials)
const AboutMe = lazy(pageLoaders.about)
const Projects = lazy(pageLoaders.projects)

function prefetchPage(page) {
  pageLoaders[page]?.().catch(() => {})
}

function BackButton({ pathname, disabled }) {
  const navigate  = useNavigate()
  if (pathname === '/') return null
  return (
    <button
      disabled={disabled}
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        top: '18px',
        left: '18px',
        zIndex: disabled ? 900 : 9999,
        fontFamily: "'Anton', sans-serif",
        fontSize: '18px',
        letterSpacing: '3px',
        color: 'rgba(255,255,255,0.9)',
        background: 'rgba(0,0,0,0.62)',
        border: '1.5px solid rgba(255,255,255,0.22)',
        padding: '9px 20px 9px 16px',
        clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
        cursor: 'pointer',
        pointerEvents: disabled ? 'none' : 'all',
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

function waitForMedia(element) {
  if (element instanceof HTMLVideoElement) {
    if (element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA || element.error) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const finish = () => {
        element.removeEventListener('loadeddata', finish)
        element.removeEventListener('error', finish)
        window.clearTimeout(timeout)
        resolve()
      }
      const timeout = window.setTimeout(finish, ROUTE_ASSET_WAIT_MS)
      element.addEventListener('loadeddata', finish, { once: true })
      element.addEventListener('error', finish, { once: true })
    })
  }

  if (element.complete) {
    return element.decode?.().catch(() => {}) ?? Promise.resolve()
  }

  return new Promise((resolve) => {
    const finish = () => {
      element.removeEventListener('load', finish)
      element.removeEventListener('error', finish)
      window.clearTimeout(timeout)
      resolve()
    }
    const timeout = window.setTimeout(finish, ROUTE_ASSET_WAIT_MS)
    element.addEventListener('load', finish, { once: true })
    element.addEventListener('error', finish, { once: true })
  }).then(() => element.decode?.().catch(() => {}))
}

function waitForRouteRoot(container) {
  const findRoot = () => container?.querySelector('#menu-screen')
  const existingRoot = findRoot()
  if (existingRoot) return Promise.resolve(existingRoot)
  if (!container) return Promise.resolve(null)

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const root = findRoot()
      if (root) {
        observer.disconnect()
        window.clearTimeout(timeout)
        resolve(root)
      }
    })
    const timeout = window.setTimeout(() => {
      observer.disconnect()
      resolve(findRoot())
    }, ROUTE_ASSET_WAIT_MS)
    observer.observe(container, { childList: true, subtree: true })
  })
}

async function waitForRouteBackground(container) {
  const root = await waitForRouteRoot(container)
  if (!root) return

  await Promise.all(Array.from(
    root.querySelectorAll('video, img.sc-bg-img, img.p3-silhouette-img'),
    waitForMedia,
  ))
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
}

function MenuScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    Object.keys(pageLoaders).forEach(prefetchPage)
  }, [])

  return (
    <div id="menu-screen" className="p3-menu-screen">
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
      <P3Menu onPrefetch={prefetchPage} onNavigate={(page) => {
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
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionPhase, setTransitionPhase] = useState('idle')
  const [transitionVariant, setTransitionVariant] = useState(
    location.pathname === '/' ? 'default' : 'socials',
  )
  const routeHostRef = useRef(null)
  const requestedLocationRef = useRef(location)
  const displayLocationRef = useRef(location)
  const transitionPhaseRef = useRef('idle')

  const changeTransitionPhase = useCallback((phase) => {
    transitionPhaseRef.current = phase
    setTransitionPhase(phase)
  }, [])

  useEffect(() => {
    requestedLocationRef.current = location

    if (location.pathname === displayLocationRef.current.pathname) {
      if (transitionPhaseRef.current === 'idle') {
        displayLocationRef.current = location
        setDisplayLocation(location)
      }
      return
    }

    if (transitionPhaseRef.current === 'idle') {
      setTransitionVariant(location.pathname === '/' ? 'default' : 'socials')
      changeTransitionPhase('covering')
    } else if (transitionPhaseRef.current === 'revealing') {
      setTransitionVariant(location.pathname === '/' ? 'default' : 'socials')
      changeTransitionPhase('covering')
    }
  }, [location, changeTransitionPhase])

  const handleCovered = useCallback(() => {
    const nextLocation = requestedLocationRef.current
    displayLocationRef.current = nextLocation
    setDisplayLocation(nextLocation)
    changeTransitionPhase('covered')
  }, [changeTransitionPhase])

  const handleRevealed = useCallback(() => {
    changeTransitionPhase('idle')
  }, [changeTransitionPhase])

  useEffect(() => {
    if (transitionPhase !== 'covered') return undefined
    let cancelled = false

    const revealWhenReady = async () => {
      if (location.pathname !== displayLocation.pathname) {
        displayLocationRef.current = location
        setDisplayLocation(location)
        return
      }

      await waitForRouteBackground(routeHostRef.current)
      if (cancelled) return

      if (requestedLocationRef.current.pathname !== displayLocationRef.current.pathname) {
        const nextLocation = requestedLocationRef.current
        displayLocationRef.current = nextLocation
        setDisplayLocation(nextLocation)
        return
      }

      changeTransitionPhase('revealing')
    }

    revealWhenReady()
    return () => { cancelled = true }
  }, [transitionPhase, displayLocation, location, changeTransitionPhase])

  return (
    <>
      <BackButton pathname={displayLocation.pathname} disabled={transitionPhase !== 'idle'} />
      <div ref={routeHostRef}>
        <Routes location={displayLocation}>
          <Route path="/" element={
            <MenuScreen />
          } />
          <Route path="/about" element={
            <Suspense fallback={null}>
              <AboutMe src={aboutResumeBackground} />
            </Suspense>
          } />
          <Route path="/resume" element={
            <Suspense fallback={null}>
              <ResumePage src={aboutResumeBackground} />
            </Suspense>
          } />
          <Route path="/socials" element={
            <Suspense fallback={null}>
              <Socials src={main1} />
            </Suspense>
          } />
          <Route path="/projects" element={
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
          } />
        </Routes>
      </div>
      <PageTransition
        variant={transitionVariant}
        phase={transitionPhase}
        onCovered={handleCovered}
        onRevealed={handleRevealed}
      />
    </>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
