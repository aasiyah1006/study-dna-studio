import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Eye, Sparkles } from "lucide-react";

interface BedroomProps {
  compact?: boolean;
  className?: string;
}

export function Bedroom({ compact = false, className = "" }: BedroomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isExploded, setIsExploded] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D parallax tilt
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Spring animation variants for staggered layer entrance / alignment
  const layerTransition = {
    type: "spring" as const,
    stiffness: 110,
    damping: 16,
    mass: 0.9,
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full select-none transition-transform duration-200 ease-out cursor-default ${
        compact ? "max-w-md" : "max-w-2xl"
      } ${className}`}
      style={{
        perspective: "1400px",
      }}
      aria-label="3D layered study battlestation with cozy student, desk setup, and twilight window"
    >
      {/* 3D Scene Wrapper */}
      <div
        className="relative w-full transition-transform duration-200 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Soft Ambient Ground Shadow underneath */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-14 bg-foreground/10 rounded-full blur-xl pointer-events-none"
          style={{ transform: "translateZ(-80px)" }}
        />

        {/* Master SVG Composition with 3D Layer Groups */}
        <svg
          viewBox="0 0 820 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block drop-shadow-md"
          aria-hidden="true"
        >
          <defs>
            {/* Monitor Glow */}
            <radialGradient
              id="screenGlowNew"
              cx="440"
              cy="320"
              r="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#93C5FD" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </radialGradient>

            {/* Warm Desk Lamp Ambient */}
            <radialGradient
              id="lampGlowNew"
              cx="320"
              cy="280"
              r="180"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFBEB" stopOpacity="0" />
            </radialGradient>

            {/* Window Twilight Gradient */}
            <linearGradient id="twilightSky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="60%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#312E81" />
            </linearGradient>

            {/* Isometric Wood Planks Pattern */}
            <pattern
              id="isometricWood"
              width="60"
              height="30"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(26.565)"
            >
              <rect width="60" height="30" fill="#F8FAFC" />
              <line x1="0" y1="0" x2="60" y2="0" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="30" y1="0" x2="30" y2="30" stroke="#CBD5E1" strokeWidth="1" />
            </pattern>
          </defs>

          {/* =========================================================================
              LAYER 1: THE BASE / BACK WALL (Foundation Layer, z: -60)
              ========================================================================= */}
          <motion.g
            id="layer-1-base"
            initial={{ y: -60, opacity: 0 }}
            animate={{
              y: isExploded ? -80 : 0,
              opacity: 1,
            }}
            transition={{ ...layerTransition, delay: 0.05 }}
          >
            {/* Back Wall - Left Wing */}
            <polygon
              points="60,280 410,100 410,480 60,660"
              fill="#F1F5F9"
              stroke="#0F172A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Back Wall - Right Wing */}
            <polygon
              points="410,100 760,280 760,660 410,480"
              fill="#E2E8F0"
              stroke="#0F172A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Corner Seam */}
            <line x1="410" y1="100" x2="410" y2="480" stroke="#0F172A" strokeWidth="3.5" />

            {/* Floating Wall Bookshelf (Left Wall) */}
            <g transform="translate(140, 200)">
              {/* Shelf Plank */}
              <polygon
                points="0,60 140,-15 170,-1 30,74"
                fill="#CBD5E1"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              {/* Books */}
              <rect
                x="35"
                y="15"
                width="12"
                height="45"
                fill="#3B82F6"
                stroke="#0F172A"
                strokeWidth="2"
                transform="skewY(-28)"
              />
              <rect
                x="50"
                y="22"
                width="14"
                height="40"
                fill="#10B981"
                stroke="#0F172A"
                strokeWidth="2"
                transform="skewY(-28)"
              />
              <rect
                x="67"
                y="30"
                width="10"
                height="44"
                fill="#F59E0B"
                stroke="#0F172A"
                strokeWidth="2"
                transform="skewY(-28)"
              />
              <rect
                x="80"
                y="38"
                width="15"
                height="38"
                fill="#EC4899"
                stroke="#0F172A"
                strokeWidth="2"
                transform="skewY(-28)"
              />
              {/* Small Potted Plant on Shelf */}
              <ellipse
                cx="140"
                cy="8"
                rx="8"
                ry="4"
                fill="#94A3B8"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <path
                d="M 136,8 C 132,-4 126,-10 132,-16 C 138,-10 138,-2 136,8"
                fill="#10B981"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
              <path
                d="M 142,8 C 146,-2 152,-8 148,-14 C 142,-8 142,-2 142,8"
                fill="#059669"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
            </g>

            {/* Motivational Wall Typography Banner */}
            <g transform="translate(180, 360) skewY(-28)">
              <rect
                x="0"
                y="0"
                width="120"
                height="65"
                fill="#FEF08A"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              <line x1="8" y1="18" x2="112" y2="18" stroke="#0F172A" strokeWidth="2" />
              <text
                x="14"
                y="38"
                fontFamily="monospace"
                fontSize="12"
                fontWeight="900"
                fill="#0F172A"
                letterSpacing="1"
              >
                LOCK IN.
              </text>
              <text
                x="14"
                y="52"
                fontFamily="monospace"
                fontSize="8"
                fontWeight="700"
                fill="#64748B"
              >
                FLOW OVER DISCIPLINE
              </text>
            </g>
          </motion.g>

          {/* =========================================================================
              LAYER 2: THE COZY WINDOW & NIGHT SKY (z: -30)
              ========================================================================= */}
          <motion.g
            id="layer-2-window"
            initial={{ y: -45, opacity: 0 }}
            animate={{
              y: isExploded ? -50 : 0,
              opacity: 1,
            }}
            transition={{ ...layerTransition, delay: 0.12 }}
          >
            {/* Arched Window on Right Wall */}
            <g transform="translate(500, 200) skewY(28)">
              {/* Outer Frame */}
              <rect
                x="0"
                y="0"
                width="180"
                height="210"
                rx="90"
                fill="#0F172A"
                stroke="#0F172A"
                strokeWidth="4"
              />
              {/* Twilight Sky Panes */}
              <rect x="8" y="8" width="164" height="194" rx="82" fill="url(#twilightSky)" />

              {/* Distant City Skyline Silhouette */}
              <path
                d="M 12,170 L 25,170 L 25,145 L 42,145 L 42,170 L 60,170 L 60,130 L 78,130 L 78,170 L 95,170 L 95,150 L 110,150 L 110,170 L 130,170 L 130,138 L 145,138 L 145,170 L 164,170 L 164,194 L 12,194 Z"
                fill="#090D16"
              />

              {/* Twinkling Stars */}
              <circle cx="50" cy="50" r="1.5" fill="#F8FAFC" className="animate-pulse" />
              <circle cx="120" cy="40" r="2" fill="#FDE047" />
              <circle cx="85" cy="70" r="1.5" fill="#E2E8F0" />
              <circle cx="140" cy="85" r="1" fill="#F8FAFC" />
              <circle cx="35" cy="100" r="1.5" fill="#FDE047" />

              {/* Glowing Crescent Moon */}
              <path d="M 130,45 A 14 14 0 0 0 118,65 A 14 14 0 1 1 130,45 Z" fill="#FEF08A" />

              {/* Window Cross Mullions */}
              <line x1="90" y1="8" x2="90" y2="200" stroke="#334155" strokeWidth="4" />
              <line x1="8" y1="110" x2="172" y2="110" stroke="#334155" strokeWidth="4" />

              {/* Window Sill */}
              <rect
                x="-10"
                y="200"
                width="200"
                height="12"
                rx="3"
                fill="#CBD5E1"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
            </g>
          </motion.g>

          {/* =========================================================================
              LAYER 3: THE ISOMETRIC FLOOR & COZY RUG (z: 0)
              ========================================================================= */}
          <motion.g
            id="layer-3-floor"
            initial={{ y: -30, opacity: 0 }}
            animate={{
              y: isExploded ? -20 : 0,
              opacity: 1,
            }}
            transition={{ ...layerTransition, delay: 0.18 }}
          >
            {/* Isometric Floor Diamond */}
            <polygon
              points="410,480 760,660 410,840 60,660"
              fill="#F8FAFC"
              stroke="#0F172A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Floor Plank Guidelines */}
            <line x1="320" y1="525" x2="670" y2="705" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="230" y1="570" x2="580" y2="750" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="140" y1="615" x2="490" y2="795" stroke="#E2E8F0" strokeWidth="1.5" />

            <line x1="500" y1="525" x2="150" y2="705" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="590" y1="570" x2="240" y2="750" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="680" y1="615" x2="330" y2="795" stroke="#E2E8F0" strokeWidth="1.5" />

            {/* Large Circular Sage / Warm Terracotta Woven Rug */}
            <ellipse
              cx="420"
              cy="625"
              rx="210"
              ry="95"
              fill="#D1FAE5"
              stroke="#0F172A"
              strokeWidth="3"
            />
            {/* Inner Rug Ring */}
            <ellipse
              cx="420"
              cy="625"
              rx="170"
              ry="75"
              fill="#A7F3D0"
              stroke="#059669"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </motion.g>

          {/* =========================================================================
              LAYER 4: DESK, MONITORS & TECH BATTLESTATION (z: +30)
              ========================================================================= */}
          <motion.g
            id="layer-4-desk"
            initial={{ y: -15, opacity: 0 }}
            animate={{
              y: isExploded ? 15 : 0,
              opacity: 1,
            }}
            transition={{ ...layerTransition, delay: 0.24 }}
          >
            {/* Desk Lamp Ambient Light Beam Cone */}
            <ellipse cx="360" cy="460" rx="150" ry="70" fill="url(#lampGlowNew)" opacity="0.85" />

            {/* Monitor Screen Glow */}
            <ellipse cx="430" cy="400" rx="160" ry="75" fill="url(#screenGlowNew)" opacity="0.9" />

            {/* Modern Natural Oak Desk Legs */}
            {/* Back Left Leg */}
            <rect x="250" y="440" width="12" height="95" fill="#0F172A" rx="2" />
            {/* Back Right Leg */}
            <rect x="580" y="440" width="12" height="95" fill="#0F172A" rx="2" />
            {/* Front Left Leg */}
            <rect x="230" y="490" width="14" height="105" fill="#0F172A" rx="2" />
            {/* Front Right Leg */}
            <rect x="610" y="490" width="14" height="105" fill="#0F172A" rx="2" />

            {/* Desk Surface (Isometric Tablet Top) */}
            <polygon
              points="240,430 590,430 630,490 220,490"
              fill="#FDE68A"
              stroke="#0F172A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Desk Thickness Edge */}
            <polygon
              points="220,490 630,490 630,504 220,504"
              fill="#D97706"
              stroke="#0F172A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Desk Mat (Charcoal) */}
            <polygon
              points="280,445 540,445 565,482 265,482"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="2"
            />

            {/* Mechanical Keyboard with Backlit Keys */}
            <polygon
              points="350,458 470,458 478,476 344,476"
              fill="#0F172A"
              stroke="#0F172A"
              strokeWidth="2"
            />
            {/* Keyboard Key Rows */}
            <line
              x1="353"
              y1="463"
              x2="467"
              y2="463"
              stroke="#60A5FA"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <line
              x1="351"
              y1="469"
              x2="471"
              y2="469"
              stroke="#34D399"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />

            {/* Ergonomic Wireless Mouse */}
            <ellipse
              cx="498"
              cy="467"
              rx="6"
              ry="9"
              fill="#0F172A"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />

            {/* Dual Monitor Setup */}
            {/* Monitor Stand Base */}
            <ellipse cx="430" cy="438" rx="24" ry="7" fill="#0F172A" />
            <rect x="427" y="375" width="6" height="65" fill="#0F172A" />

            {/* Primary Center-Right Monitor (Active Code & Telemetry) */}
            <g transform="translate(390, 270)">
              {/* Outer Bezel */}
              <rect
                x="0"
                y="0"
                width="160"
                height="105"
                rx="6"
                fill="#0F172A"
                stroke="#0F172A"
                strokeWidth="3.5"
              />
              {/* Screen Glass */}
              <rect x="6" y="6" width="148" height="93" rx="3" fill="#0B132B" />
              {/* Mock Terminal & Graph Lines */}
              <line
                x1="14"
                y1="20"
                x2="60"
                y2="20"
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="30"
                x2="110"
                y2="30"
                stroke="#34D399"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="40"
                x2="85"
                y2="40"
                stroke="#F472B6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="50"
                x2="135"
                y2="50"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Focus Bar / Progress Wave */}
              <rect x="14" y="65" width="125" height="12" rx="3" fill="#1E293B" />
              <rect x="14" y="65" width="92" height="12" rx="3" fill="#10B981" />
              <text
                x="18"
                y="74"
                fontFamily="monospace"
                fontSize="8"
                fontWeight="bold"
                fill="#0F172A"
              >
                FOCUS BLOCK: 22m
              </text>
              <circle cx="140" cy="18" r="3" fill="#10B981" className="animate-ping" />
            </g>

            {/* Secondary Vertical Monitor (Left Side, Angled) */}
            <g transform="translate(295, 260) rotate(-4)">
              <rect
                x="0"
                y="0"
                width="85"
                height="125"
                rx="5"
                fill="#0F172A"
                stroke="#0F172A"
                strokeWidth="3"
              />
              <rect x="5" y="5" width="75" height="115" rx="3" fill="#0F172A" />
              {/* Reference Markdown Document Lines */}
              <line
                x1="12"
                y1="18"
                x2="65"
                y2="18"
                stroke="#FDE047"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="28"
                x2="55"
                y2="28"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="36"
                x2="70"
                y2="36"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="44"
                x2="60"
                y2="44"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="58"
                x2="50"
                y2="58"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="68"
                x2="68"
                y2="68"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="76"
                x2="62"
                y2="76"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="90"
                x2="40"
                y2="90"
                stroke="#34D399"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Desk Clamp Modern Brass Task Lamp */}
            <g transform="translate(250, 390)">
              {/* Base Clamp */}
              <rect x="0" y="20" width="16" height="25" fill="#0F172A" rx="2" />
              {/* Articulated Arm */}
              <line
                x1="8"
                y1="20"
                x2="25"
                y2="-40"
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="25" cy="-40" r="4" fill="#F59E0B" />
              <line
                x1="25"
                y1="-40"
                x2="55"
                y2="-20"
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Lamp Shade (Cone pointing right towards keyboard) */}
              <path
                d="M 50,-30 L 75,-15 L 60,-5 L 45,-15 Z"
                fill="#FEF08A"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
            </g>

            {/* Ceramic Coffee Mug with Steam */}
            <g transform="translate(565, 455)">
              <rect
                x="0"
                y="0"
                width="16"
                height="20"
                rx="3"
                fill="#F43F5E"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <path d="M 16,5 C 22,5 22,15 16,15" stroke="#0F172A" strokeWidth="2" fill="none" />
              {/* Steam Wiggles */}
              <path
                d="M 4,-4 C 2,-8 8,-12 6,-16"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M 11,-3 C 9,-7 15,-11 13,-15"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-pulse"
              />
            </g>

            {/* Small Desk Succulent in Terracotta Pot */}
            <g transform="translate(585, 435)">
              <polygon
                points="2,14 16,14 14,26 4,26"
                fill="#EA580C"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
              <circle cx="9" cy="11" r="5" fill="#10B981" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="6" cy="9" r="4" fill="#059669" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="12" cy="9" r="4" fill="#34D399" stroke="#0F172A" strokeWidth="1.5" />
            </g>
          </motion.g>

          {/* =========================================================================
              LAYER 5: THE COZY STUDENT CHARACTER (z: +60)
              Friendly, stylized, non-scary cozy aesthetic seen from comfortable 3/4 angle
              Oversized sage-green hoodie, modern studio headphones, relaxed posture
              ========================================================================= */}
          <motion.g
            id="layer-5-student"
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: isExploded ? 40 : 0,
              opacity: 1,
            }}
            transition={{ ...layerTransition, delay: 0.3 }}
          >
            {/* Modern Ergonomic Mesh Task Chair */}
            <g transform="translate(370, 460)">
              {/* 5-Star Wheel Base on Floor */}
              <ellipse cx="45" cy="160" rx="35" ry="12" fill="#0F172A" />
              <circle cx="15" cy="165" r="4" fill="#64748B" />
              <circle cx="75" cy="165" r="4" fill="#64748B" />
              <circle cx="45" cy="170" r="4" fill="#64748B" />
              {/* Hydraulic Gas Lift Cylinder */}
              <rect x="42" y="115" width="8" height="48" fill="#334155" />

              {/* Padded Seat Cushion (Comfortable Ergonomic Foam) */}
              <ellipse
                cx="46"
                cy="115"
                rx="42"
                ry="18"
                fill="#1E293B"
                stroke="#0F172A"
                strokeWidth="3"
              />

              {/* Ergonomic Curved Mesh Backrest */}
              <path
                d="M 12,35 C 10,75 20,110 46,110 C 72,110 82,75 80,35 C 78,15 65,5 46,5 C 27,5 14,15 12,35 Z"
                fill="#334155"
                stroke="#0F172A"
                strokeWidth="3.5"
              />
              {/* Breathable Mesh Texture Lines */}
              <line
                x1="24"
                y1="40"
                x2="68"
                y2="40"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="20"
                y1="60"
                x2="72"
                y2="60"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="22"
                y1="80"
                x2="70"
                y2="80"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Padded Armrests */}
              <path
                d="M 6,70 L 6,95 L 20,95"
                stroke="#0F172A"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <rect x="2" y="65" width="20" height="7" rx="3" fill="#0F172A" />
              <path
                d="M 86,70 L 86,95 L 72,95"
                stroke="#0F172A"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <rect x="70" y="65" width="20" height="7" rx="3" fill="#0F172A" />
            </g>

            {/* Cozy Student (Viewed from clean 3/4 behind-right, no scary face) */}
            <g transform="translate(378, 410)">
              {/* Lower Body: Relaxed Heather Grey Sweatpants */}
              <path
                d="M 24,120 C 18,145 12,165 14,185 L 34,185 C 32,165 36,145 42,125 Z"
                fill="#475569"
                stroke="#0F172A"
                strokeWidth="3"
              />
              <path
                d="M 42,125 C 48,145 52,165 50,185 L 70,185 C 72,165 66,145 60,120 Z"
                fill="#334155"
                stroke="#0F172A"
                strokeWidth="3"
              />
              {/* Minimalist Clean White Sneakers resting on rug */}
              <ellipse
                cx="24"
                cy="186"
                rx="14"
                ry="7"
                fill="#F8FAFC"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              <ellipse
                cx="60"
                cy="186"
                rx="14"
                ry="7"
                fill="#F8FAFC"
                stroke="#0F172A"
                strokeWidth="2.5"
              />

              {/* Torso: Oversized Cozy Sage-Green / Forest Hoodie */}
              <path
                d="M 12,70 C 8,110 18,125 40,125 C 62,125 72,110 68,70 C 66,55 58,45 40,45 C 22,45 14,55 12,70 Z"
                fill="#15803D"
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Left Arm extending forward naturally to keyboard */}
              <path
                d="M 18,65 C 2,85 8,105 28,100"
                stroke="#15803D"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 18,65 C 2,85 8,105 28,100"
                stroke="#0F172A"
                strokeWidth="3.5"
                fill="none"
              />
              {/* Left Hand Cuff & Skin resting on desk */}
              <rect
                x="25"
                y="94"
                width="8"
                height="12"
                rx="3"
                fill="#166534"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <ellipse
                cx="36"
                cy="98"
                rx="6"
                ry="4"
                fill="#FDBA74"
                stroke="#0F172A"
                strokeWidth="2"
              />

              {/* Right Arm extending forward to mouse */}
              <path
                d="M 62,65 C 78,85 76,105 60,102"
                stroke="#166534"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 62,65 C 78,85 76,105 60,102"
                stroke="#0F172A"
                strokeWidth="3.5"
                fill="none"
              />
              {/* Right Hand Cuff & Skin on mouse */}
              <rect
                x="52"
                y="96"
                width="8"
                height="12"
                rx="3"
                fill="#14532D"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <ellipse
                cx="62"
                cy="100"
                rx="6"
                ry="4"
                fill="#FDBA74"
                stroke="#0F172A"
                strokeWidth="2"
              />

              {/* Hoodie Back Seam & Kangaroo Pocket Accent */}
              <path
                d="M 28,105 L 52,105"
                stroke="#14532D"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Cozy Dropped Hoodie Hood (resting softly on shoulders) */}
              <path
                d="M 22,48 C 22,35 30,30 40,30 C 50,30 58,35 58,48 C 58,58 50,62 40,62 C 30,62 22,58 22,48 Z"
                fill="#166534"
                stroke="#0F172A"
                strokeWidth="3.5"
              />

              {/* Head & Hair (Friendly, modern wavy haircut viewed from behind) */}
              <path
                d="M 25,26 C 25,6 32,2 40,2 C 48,2 55,6 55,26 C 55,34 50,38 40,38 C 30,38 25,34 25,26 Z"
                fill="#451A03"
                stroke="#0F172A"
                strokeWidth="3.5"
              />
              {/* Hair Texture Accents */}
              <path
                d="M 28,14 C 33,8 38,10 40,6"
                stroke="#78350F"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 44,8 C 48,12 51,14 53,20"
                stroke="#78350F"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Studio Over-Ear Headphones (Matte Black with Cyan Glow Ring) */}
              {/* Headband spanning across top of head */}
              <path
                d="M 23,24 C 23,6 30,-2 40,-2 C 50,-2 57,6 57,24"
                stroke="#0F172A"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 25,22 C 25,8 32,2 40,2 C 48,2 55,8 55,22"
                stroke="#64748B"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Left Ear Cushion */}
              <ellipse
                cx="23"
                cy="25"
                rx="6"
                ry="10"
                fill="#0F172A"
                stroke="#38BDF8"
                strokeWidth="2"
              />
              {/* Right Ear Cushion */}
              <ellipse
                cx="57"
                cy="25"
                rx="6"
                ry="10"
                fill="#0F172A"
                stroke="#38BDF8"
                strokeWidth="2"
              />
            </g>
          </motion.g>

          {/* =========================================================================
              LAYER 6: AMBIENT ACCENTS & FLOATING FOCUS STATUS (z: +90)
              ========================================================================= */}
          <motion.g
            id="layer-6-accents"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isExploded ? 70 : 0,
              opacity: 1,
            }}
            transition={{ ...layerTransition, delay: 0.36 }}
          >
            {/* Sleeping Cozy Orange Tabby Cat on the warm floor beside chair */}
            <g transform="translate(490, 600)">
              {/* Cat Body Curl */}
              <ellipse
                cx="22"
                cy="18"
                rx="20"
                ry="13"
                fill="#FB923C"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              {/* Cat Head */}
              <circle cx="9" cy="14" r="10" fill="#FB923C" stroke="#0F172A" strokeWidth="2.5" />
              {/* Ears */}
              <polygon points="3,6 7,1 9,8" fill="#F97316" stroke="#0F172A" strokeWidth="2" />
              <polygon points="10,6 14,1 15,8" fill="#F97316" stroke="#0F172A" strokeWidth="2" />
              {/* Sleeping Eyes (curved line) */}
              <path d="M 6,15 Q 8,18 10,15" stroke="#0F172A" strokeWidth="1.5" fill="none" />
              {/* Striped Tail wrapped around */}
              <path
                d="M 38,20 C 44,14 44,28 32,27"
                stroke="#EA580C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              {/* Floating "zzz" */}
              <text
                x="36"
                y="8"
                fontFamily="monospace"
                fontSize="9"
                fontWeight="bold"
                fill="#F97316"
                className="animate-bounce"
              >
                z
              </text>
              <text
                x="44"
                y="0"
                fontFamily="monospace"
                fontSize="11"
                fontWeight="black"
                fill="#EA580C"
              >
                Z
              </text>
            </g>

            {/* Floating Futuristic Focus Status Pill */}
            <g transform="translate(480, 220)">
              {/* Pill Container */}
              <rect
                x="0"
                y="0"
                width="145"
                height="34"
                rx="17"
                fill="#0F172A"
                stroke="#10B981"
                strokeWidth="2"
                filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
              />
              {/* Pulse Indicator */}
              <circle cx="16" cy="17" r="4" fill="#10B981" />
              <circle
                cx="16"
                cy="17"
                r="7"
                stroke="#10B981"
                strokeWidth="1.5"
                opacity="0.6"
                className="animate-ping"
              />
              {/* Text */}
              <text
                x="30"
                y="16"
                fontFamily="monospace"
                fontSize="9"
                fontWeight="900"
                fill="#F8FAFC"
                letterSpacing="0.5"
              >
                DEEP SPRINT ACTIVE
              </text>
              <text
                x="30"
                y="26"
                fontFamily="monospace"
                fontSize="8"
                fontWeight="700"
                fill="#34D399"
              >
                18m comfortable block
              </text>
            </g>
          </motion.g>
        </svg>

        {/* INTERACTIVE 3D LAYER ALIGNMENT TOGGLE */}
        <div className="absolute -bottom-4 right-2 sm:right-4 flex items-center gap-2 font-mono text-[11px] z-20">
          <button
            type="button"
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1.5 border-2 border-foreground font-black uppercase flex items-center gap-1.5 transition-all shadow-hard-sm cursor-pointer ${
              isExploded
                ? "bg-accent text-accent-foreground translate-x-[-1px] translate-y-[-1px]"
                : "bg-card text-foreground hover:bg-secondary"
            }`}
            title="Toggle between exploded 3D depth view and snapped aligned room"
          >
            <Layers className="size-3.5" />
            {isExploded ? "ALIGN IN ONE THING" : "EXPLODE 3D LAYERS"}
          </button>
        </div>
      </div>
    </div>
  );
}
