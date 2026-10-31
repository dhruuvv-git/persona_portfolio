import { useEffect, useMemo, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import transitionArt from "./assets/transition.jpg";

const DEFAULT_BLOCKS = ["#0d1a3a", "#1a6aff", "#7dd4fc"];
const SOCIAL_STRIPES = [
  { color: "#000000", left: "72vw", width: "24vw", delay: 0 },
  { color: "#00dff7", left: "80vw", width: "14vw", delay: 0.06 },
  { color: "#ffffff", left: "88vw", width: "8vw", delay: 0.12 },
];
const TRANSITION_DURATION = 0.48;
const TRANSITION_EASE = [0.76, 0, 0.24, 1];

function curtainArtwork(color) {
  return {
    backgroundColor: color,
    backgroundImage: `linear-gradient(135deg, rgba(0, 71, 255, 0.32), rgba(60, 226, 255, 0.12) 48%, ${color}99), url(${transitionArt})`,
    backgroundPosition: "center, center",
    backgroundSize: "cover, cover",
    filter: "saturate(1.55) contrast(1.12)",
  };
}

function LocalDateClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let intervalId;
    const firstUpdate = window.setTimeout(() => {
      setNow(new Date());
      intervalId = window.setInterval(() => setNow(new Date()), 60_000);
    }, 60_000 - (Date.now() % 60_000));

    return () => {
      window.clearTimeout(firstUpdate);
      window.clearInterval(intervalId);
    };
  }, []);

  const weekday = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(now);
  const day = new Intl.DateTimeFormat(undefined, { day: "2-digit" }).format(now);
  const month = new Intl.DateTimeFormat(undefined, { month: "long" }).format(now);
  const year = new Intl.DateTimeFormat(undefined, { year: "numeric" }).format(now);
  const time = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(now);

  return (
    <div
      role="group"
      aria-label={`${weekday}, ${month} ${year} ${day}; ${time}`}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(8px, 1.4vh, 18px)",
        padding: "12px 6px",
        background: "#000000",
        fontFamily: "'Anton', sans-serif",
        textAlign: "center",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        transform: "skewX(16deg)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <span style={{ color: "#ffffff", fontSize: "clamp(12px, 2vh, 20px)", letterSpacing: "2px" }}>
        {weekday}
      </span>
      <span style={{ color: "#0047ff", fontSize: "clamp(48px, 7vw, 112px)", lineHeight: 0.82 }}>
        {day}
      </span>
      <span style={{ color: "#477dff", fontSize: "clamp(10px, 1.3vw, 20px)", letterSpacing: "1px", lineHeight: 1.05 }}>
        {month}
        <br />
        {year}
      </span>
      <span style={{ color: "#ffffff", fontSize: "clamp(14px, 1.6vw, 28px)", letterSpacing: "1px" }}>
        {time}
      </span>
    </div>
  );
}

function DefaultTransition({ phase, onCovered, onRevealed }) {
  const first = useAnimationControls();
  const second = useAnimationControls();
  const third = useAnimationControls();
  const controls = useMemo(() => [first, second, third], [first, second, third]);

  useEffect(() => {
    let cancelled = false;

    if (phase === "covering") {
      controls.forEach((control) => control.set({ scaleX: 0, transformOrigin: "left center" }));
      Promise.all([
        ...controls.map((control, index) => control.start({
          scaleX: 1,
          transition: {
            duration: TRANSITION_DURATION,
            delay: index * 0.03,
            ease: TRANSITION_EASE,
          },
        })),
      ]).then(() => {
        if (!cancelled) onCovered();
      });
    }

    if (phase === "revealing") {
      Promise.all([
        ...controls.map((control, index) => control.start({
          scaleX: 0,
          transformOrigin: "right center",
          transition: {
            duration: TRANSITION_DURATION,
            delay: (controls.length - index - 1) * 0.03,
            ease: TRANSITION_EASE,
          },
        })),
      ]).then(() => {
        if (!cancelled) onRevealed();
      });
    }

    if (phase === "idle") {
      controls.forEach((control) => control.set({ scaleX: 0, transformOrigin: "left center" }));
    }

    return () => {
      cancelled = true;
      controls.forEach((control) => control.stop());
    };
  }, [phase, onCovered, onRevealed]);

  return (
    <>
      {DEFAULT_BLOCKS.map((color, index) => (
        <motion.div
          key={color}
          initial={false}
          animate={controls[index]}
          style={{
            position: "fixed",
            inset: 0,
            background: color,
            zIndex: 999 - index,
            transformOrigin: "left center",
            pointerEvents: "auto",
          }}
        />
      ))}
    </>
  );
}

function SocialsTransition({ phase, onCovered, onRevealed }) {
  const cover = useAnimationControls();
  const first = useAnimationControls();
  const second = useAnimationControls();
  const third = useAnimationControls();
  const stripeControls = useMemo(() => [first, second, third], [first, second, third]);

  useEffect(() => {
    let cancelled = false;

    if (phase === "covering") {
      cover.set({ clipPath: "inset(0 100% 0 0)", backgroundPosition: "42% 54%" });
      stripeControls.forEach((control) => control.set({ y: -1200 }));
      Promise.all([
        cover.start({
          clipPath: "inset(0 0% 0 0)",
          backgroundPosition: "61% 46%",
          transition: { duration: 0.48, ease: TRANSITION_EASE },
        }),
        ...stripeControls.map((control, index) => control.start({
          y: 0,
          transition: {
            duration: TRANSITION_DURATION,
            delay: SOCIAL_STRIPES[index].delay,
            ease: TRANSITION_EASE,
          },
        })),
      ]).then(() => {
        if (!cancelled) onCovered();
      });
    }

    if (phase === "revealing") {
      Promise.all([
        cover.start({
          clipPath: "inset(0 0 0 100%)",
          backgroundPosition: "38% 52%",
          transition: { duration: 0.48, ease: TRANSITION_EASE },
        }),
        ...stripeControls.map((control, index) => control.start({
          y: 1200,
          transition: {
            duration: TRANSITION_DURATION,
            delay: SOCIAL_STRIPES[index].delay,
            ease: TRANSITION_EASE,
          },
        })),
      ]).then(() => {
        if (!cancelled) onRevealed();
      });
    }

    if (phase === "idle") {
      cover.set({ clipPath: "inset(0 100% 0 0)", backgroundPosition: "center, center" });
      stripeControls.forEach((control) => control.set({ y: -1200 }));
    }

    return () => {
      cancelled = true;
      cover.stop();
      stripeControls.forEach((control) => control.stop());
    };
  }, [phase, onCovered, onRevealed]);

  return (
    <>
      <motion.div
        initial={false}
        animate={cover}
        style={{
          position: "fixed",
          inset: 0,
          ...curtainArtwork("#00184c"),
          zIndex: 997,
          clipPath: "inset(0 100% 0 0)",
          willChange: "clip-path, background-position",
          pointerEvents: "auto",
        }}
      />
      {SOCIAL_STRIPES.map((stripe, index) => (
        <motion.div
          key={stripe.color}
          initial={false}
          animate={stripeControls[index]}
          style={{
            position: "fixed",
            top: "-6vh",
            left: stripe.left,
            width: stripe.width,
            height: "112vh",
            background: stripe.color,
            zIndex: 1000 - index,
            transform: "skewX(-16deg)",
            transformOrigin: "top",
            pointerEvents: "auto",
          }}
        >
          {index === 0 && (
            <LocalDateClock />
          )}
        </motion.div>
      ))}
    </>
  );
}

export default function PageTransition({ variant, phase, onCovered, onRevealed }) {
  if (variant === "default") {
    return <DefaultTransition phase={phase} onCovered={onCovered} onRevealed={onRevealed} />;
  }

  return <SocialsTransition phase={phase} onCovered={onCovered} onRevealed={onRevealed} />;
}
