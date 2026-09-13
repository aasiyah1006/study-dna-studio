import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Brain,
  ShieldAlert,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { Bedroom } from "@/components/lockin/bedroom";
import { PageShell, Scribble } from "@/components/lockin/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOCKIN — Does Your Study Timetable Suck? Cure The Brain Rot." },
      {
        name: "description",
        content:
          "Stop fighting your brain. LOCKIN learns your actual focus span and builds an adaptive study routine that works.",
      },
    ],
  }),
  component: LandingComponent,
});

function LandingComponent() {
  const [activeTab, setActiveTab] = useState<"crocodilo" | "sahul">("crocodilo");

  return (
    <PageShell>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-24">
        {/* =========================================================
            1. HERO SECTION: PUNCHY BRAIN ROT HOOK + 3D LAYERED ROOM
           ========================================================= */}
        <section className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
          {/* Left Column: Catchy Gen-Z Tagline & Value Hook */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border-2 border-foreground text-foreground font-mono text-xs font-black uppercase tracking-wider">
              <Sparkles className="size-3.5 text-primary" />
              STOP FIGHTING YOUR BRAIN
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase text-foreground">
              YOUR STUDY
              <br />
              TIMETABLE SUCKS.
              <br />
              <span className="text-primary underline decoration-accent decoration-4">
                IT’S TIME TO LOCK IN.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-foreground/90 font-medium leading-relaxed">
              Stop pretending you’re a 5 AM cold-shower monk. Short-form feeds fried our dopamine
              receptors, and rigid timetables only create guilt. LOCKIN measures how your brain{" "}
              <em>actually</em> works and recalibrates an adaptive routine around your real stamina.
            </p>

            {/* Single High-Impact First-Visit CTA */}
            <div className="space-y-3 pt-1">
              <Button
                variant="lockin"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 h-auto"
                asChild
              >
                <Link to="/onboarding">
                  IT’S TIME TO LOCK IN <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>

              <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
                <span>12-factor cognitive baseline · Pinpoints strengths & weaknesses · Free</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Layered Illustrated Room (No frame, no outer border!) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-2xl">
              <Bedroom />
            </div>
          </div>
        </section>

        {/* =========================================================
            2. DESIGNATHON SPOTLIGHT: THE PROBLEM & SOLUTION
           ========================================================= */}
        <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-foreground pb-4 font-mono text-xs">
            <span className="font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="size-4" /> DESIGNATHON CASE STUDY // PRODUCT THESIS
            </span>
            <span className="text-muted-foreground">THE ADAPTIVE COGNITIVE ENGINE</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="p-6 border-2 border-destructive/40 bg-destructive/5 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-destructive uppercase">
                <ShieldAlert className="size-4" /> THE PROBLEM: THE BROKEN ADVICE MACHINE
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-foreground leading-snug">
                Rigid 19th-Century Timetables Ignore Modern Attention Spans
              </h3>
              <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                The entire internet peddles the exact same delusion:{" "}
                <em>
                  “Wake up at 5 AM, study 4 hours straight, use 25/5 Pomodoro, color-code every
                  sentence.”
                </em>
              </p>
              <ul className="font-mono text-xs space-y-2 text-foreground/75 list-disc list-inside">
                <li>
                  Attention spans are fragmented; forcing a 2-hour marathon causes instant
                  paralysis.
                </li>
                <li>
                  When you inevitably crash at minute 20, you open TikTok for “a 5-minute break”.
                </li>
                <li>
                  You wake up 3 hours later in a spiral of shame and abandon studying completely.
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-6 border-2 border-primary/40 bg-primary/5 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-black text-primary uppercase">
                <Brain className="size-4" /> THE SOLUTION: EVIDENCE-DRIVEN RECALIBRATION
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-foreground leading-snug">
                Treat Drop-Offs as Telemetry, Not Moral Failures
              </h3>
              <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                LOCKIN flips the script: hitting a wall is not a failure. It is{" "}
                <strong>high-precision cognitive telemetry</strong>.
              </p>
              <ul className="font-mono text-xs space-y-2 text-foreground/75 list-disc list-inside">
                <li>
                  <strong>Dynamic Block Sizing:</strong> If you burn out at 18m, tomorrow’s sprint
                  is capped at 18m.
                </li>
                <li>
                  <strong>Multimodal Matching:</strong> Tests whether you learn via Blurting,
                  Wall-Teaching, Flashcards, or Loomis Maps.
                </li>
                <li>
                  <strong>Circadian Alignment:</strong> Schedules deep blocks at your real
                  biological peak (even 11:30 PM).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. THE CHILDHOOD FANTASY TIMETABLE (AUTHENTIC NOTEBOOK MEMORY)
           ========================================================= */}
        <section className="relative max-w-2xl mx-auto border-2 border-foreground bg-[#FAF7F2] p-6 sm:p-10 shadow-hard rotate-[-0.5deg]">
          {/* Lined Notebook Paper Header */}
          <div className="border-b-2 border-foreground pb-4 flex justify-between items-center font-mono text-xs text-muted-foreground">
            <span className="font-bold uppercase tracking-widest text-foreground">
              THE "CHILDHOOD DISCIPLINE" NOTEBOOK
            </span>
            <span className="text-destructive font-bold uppercase">LITERALLY NEVER HAPPENED</span>
          </div>

          {/* Timetable Items */}
          <div className="relative py-6 space-y-3 font-mono text-sm text-foreground/70">
            <div className="flex justify-between border-b border-border/80 pb-2">
              <span>07:00 AM — Wake up, brush & achieve inner peace</span>
              <span className="text-xs text-destructive font-bold">snoozed 5 times</span>
            </div>
            <div className="flex justify-between border-b border-border/80 pb-2">
              <span>07:15 AM — 15-minute ice bath & stretch like David Goggins</span>
              <span className="text-xs text-destructive font-bold">still in bed scrolling</span>
            </div>
            <div className="flex justify-between border-b border-border/80 pb-2">
              <span>07:30 AM — 4 hours non-stop Physics & Calculus</span>
              <span className="text-xs text-destructive font-bold">brain melted at 07:48</span>
            </div>
            <div className="flex justify-between border-b border-border/80 pb-2">
              <span>12:00 PM — Become Einstein & read 100 pages</span>
              <span className="text-xs text-destructive font-bold">staring at wall blankly</span>
            </div>

            {/* Giant Bold Red X Across The Entire Timetable */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 400 200" className="w-full h-full text-destructive" fill="none">
                <path
                  d="M 30 20 L 370 180"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 370 20 L 30 180"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Conversational Handwritten Notes */}
          <div className="pt-4 border-t-2 border-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Scribble className="text-lg text-foreground/80">“just be consistent, bro.”</Scribble>
            <Scribble className="text-lg text-primary font-bold">
              → “i’m trying. my brain said absolutely not.”
            </Scribble>
          </div>

          <div className="mt-4 p-3 bg-secondary border border-foreground font-mono text-xs font-bold text-center">
            We’ve all written this fantasy schedule in our notebooks. Nobody on earth has ever
            followed it.
          </div>
        </section>

        {/* =========================================================
            4. THE HARD TRUTH: YOU ARE NOT EVERYONE
           ========================================================= */}
        <section className="space-y-10 text-center max-w-3xl mx-auto">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider">
              THE HARD TRUTH
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground">
              EVERYONE TELLS YOU:
            </h2>
            <div className="flex flex-wrap justify-center gap-3 pt-2 font-mono text-xs font-bold">
              <span className="px-3 py-1.5 bg-card border border-foreground">Wake up at 5.</span>
              <span className="px-3 py-1.5 bg-card border border-foreground">
                Study for 3 hours.
              </span>
              <span className="px-3 py-1.5 bg-card border border-foreground">Use Pomodoro.</span>
              <span className="px-3 py-1.5 bg-card border border-foreground">
                Color code notes.
              </span>
            </div>
          </div>

          <div className="py-2">
            <div className="inline-block px-5 py-2 bg-foreground text-background font-mono text-sm font-bold uppercase tracking-wide">
              COOL. BUT... YOU ARE NOT EVERYONE.
            </div>
          </div>

          {/* 3 Striking Contrast Pillars */}
          <div className="grid sm:grid-cols-3 gap-4 text-left font-mono text-xs">
            <div className="p-4 border-2 border-foreground bg-card space-y-1">
              <div className="text-primary font-bold text-sm uppercase">Focus Stamina</div>
              <p className="text-foreground/90">
                One person can focus for 55 minutes.
                <br />
                <strong className="text-primary">Another taps out at 18m.</strong>
              </p>
            </div>
            <div className="p-4 border-2 border-foreground bg-card space-y-1">
              <div className="text-primary font-bold text-sm uppercase">Learning Modality</div>
              <p className="text-foreground/90">
                One loves textbook reading.
                <br />
                <strong className="text-primary">Another shouts at the wall.</strong>
              </p>
            </div>
            <div className="p-4 border-2 border-foreground bg-card space-y-1">
              <div className="text-primary font-bold text-sm uppercase">Dopamine Wave</div>
              <p className="text-foreground/90">
                One studies sharp at 9 AM.
                <br />
                <strong className="text-primary">Another wakes up at 11 PM.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. BRAIN ROT CHARACTERS: BOMBARDERO CROCODILO VS TUNG TUNG TUNG SAHUL
           ========================================================= */}
        <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard space-y-8">
          <div className="text-center space-y-2">
            <div className="font-mono text-xs text-primary font-bold uppercase">
              EXAM: ORGANIC CHEMISTRY MECHANISMS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground">
              SAME SUBJECT. DIFFERENT BRAINS.
            </h2>
            <p className="font-mono text-xs text-muted-foreground max-w-lg mx-auto">
              Two students facing the exact same syllabus. Why would anyone force them into the same
              3-hour timetable?
            </p>
          </div>

          {/* Two Brain Rot Character Battle Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* BOMBARDERO CROCODILO */}
            <div
              onClick={() => setActiveTab("crocodilo")}
              className={`p-6 border-2 cursor-pointer transition-all ${
                activeTab === "crocodilo"
                  ? "border-foreground bg-secondary shadow-hard-sm"
                  : "border-border bg-background hover:border-foreground"
              }`}
            >
              <div className="flex justify-between items-start pb-3 border-b border-border font-mono text-xs">
                <div>
                  <div className="font-black text-lg text-primary">BOMBARDERO CROCODILO</div>
                  <span className="text-muted-foreground font-bold text-[11px]">
                    Sprint Goblin · High Friction
                  </span>
                </div>
                <span className="px-2 py-0.5 border border-primary bg-primary/10 text-primary font-bold text-[10px]">
                  18M CAPACITY
                </span>
              </div>

              <div className="pt-4 font-mono text-xs space-y-2 text-foreground/90">
                <p>
                  • <strong>Focus Limit:</strong> 18 minutes before dopamine drops
                </p>
                <p>
                  • <strong>Peak Window:</strong> 11:30 PM (Midnight goblin mode)
                </p>
                <p>
                  • <strong>Superpower:</strong> Blurting Method & Teaching the Wall
                </p>
                <p>
                  • <strong>Fatal Trap:</strong> Standard 2-hour Pomodoro (quits at min 19)
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border font-mono text-xs">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                  LOCKIN Adaptive Plan:
                </span>
                <span className="font-black text-primary text-sm">
                  3x 18-min Blurting Sprints + 5m Movement
                </span>
              </div>
            </div>

            {/* TUNG TUNG TUNG SAHUL */}
            <div
              onClick={() => setActiveTab("sahul")}
              className={`p-6 border-2 cursor-pointer transition-all ${
                activeTab === "sahul"
                  ? "border-foreground bg-secondary shadow-hard-sm"
                  : "border-border bg-background hover:border-foreground"
              }`}
            >
              <div className="flex justify-between items-start pb-3 border-b border-border font-mono text-xs">
                <div>
                  <div className="font-black text-lg text-foreground">TUNG TUNG TUNG SAHUL</div>
                  <span className="text-muted-foreground font-bold text-[11px]">
                    Deep Synthesis Architect
                  </span>
                </div>
                <span className="px-2 py-0.5 border border-foreground bg-background text-foreground font-bold text-[10px]">
                  50M CAPACITY
                </span>
              </div>

              <div className="pt-4 font-mono text-xs space-y-2 text-foreground/90">
                <p>
                  • <strong>Focus Limit:</strong> 50 minutes uninterrupted flow
                </p>
                <p>
                  • <strong>Peak Window:</strong> 09:30 AM (Morning clarity)
                </p>
                <p>
                  • <strong>Superpower:</strong> Feynman Technique & Progressive Notes
                </p>
                <p>
                  • <strong>Fatal Trap:</strong> Frequent micro-breaks ruin concentration
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border font-mono text-xs">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                  LOCKIN Adaptive Plan:
                </span>
                <span className="font-black text-foreground text-sm">
                  1x 50-min Deep Synthesis Block
                </span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 space-y-2">
            <div className="text-xl sm:text-2xl font-black uppercase text-foreground">
              SAME EXAM. DIFFERENT ROUTINE.
            </div>
            <Scribble className="text-base text-muted-foreground">
              one size fits nobody. your profile is calibrated to YOU.
            </Scribble>
          </div>
        </section>

        {/* =========================================================
            6. HOW LOCKIN ADAPTS (THE 5-STEP CLOSED LOOP)
           ========================================================= */}
        <section className="space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground">
              LOCKIN LEARNS YOU.
            </h2>
            <p className="font-mono text-xs text-muted-foreground max-w-md mx-auto">
              A closed feedback loop that watches how you actually work and recalibrates tomorrow.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs font-bold">
            <span className="px-3.5 py-2 border-2 border-foreground bg-card shadow-hard-sm">
              YOU
            </span>
            <span className="text-primary text-base font-black">→</span>
            <span className="px-3.5 py-2 border-2 border-foreground bg-card shadow-hard-sm">
              STUDY DNA
            </span>
            <span className="text-primary text-base font-black">→</span>
            <span className="px-3.5 py-2 border-2 border-foreground bg-card shadow-hard-sm">
              TODAY’S PLAN
            </span>
            <span className="text-primary text-base font-black">→</span>
            <span className="px-3.5 py-2 border-2 border-foreground bg-card shadow-hard-sm">
              SESSION
            </span>
            <span className="text-primary text-base font-black">→</span>
            <span className="px-3.5 py-2 border-2 border-foreground bg-card shadow-hard-sm">
              CALIBRATE
            </span>
            <span className="text-primary text-base font-black">→</span>
            <span className="px-3.5 py-2 border-2 border-foreground bg-primary text-primary-foreground shadow-hard-sm">
              LOCKIN ADAPTS
            </span>
          </div>

          <div className="max-w-xl mx-auto font-mono text-xs text-muted-foreground leading-relaxed pt-2">
            When you hit a wall at 18 minutes, that is not a failure. That is high-grade telemetry.
            Tomorrow’s sprint shrinks from 45m to 20m, swaps passive reading for active recall or
            wall-explaining, and moves to your peak energy hour.
          </div>
        </section>

        {/* =========================================================
            7. EXPANDED TOOLKIT: DIVERSE METHODS FOR EVERY BRAIN
           ========================================================= */}
        <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard space-y-8">
          <div className="text-center space-y-2">
            <div className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
              NOT JUST ONE TECHNIQUE // ACCESSIBLE TO ALL LEARNERS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground">
              THE EVIDENCE-BACKED METHOD ARSENAL
            </h2>
            <p className="font-mono text-xs text-muted-foreground max-w-xl mx-auto">
              Not everyone can pace around talking to a wall or write 500 flashcards. LOCKIN matches
              you to the exact method that fits your cognitive style and subject demands.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            {/* Method 1: Interleaving */}
            <div className="p-4 border-2 border-foreground bg-background space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-primary uppercase">PROBLEM SOLVING</span>
                <span className="border border-border px-1">HIGH YIELD</span>
              </div>
              <div className="font-bold text-sm text-foreground">Interleaved Problem Sets</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Mix 3 different problem archetypes in one session. Trains your brain to diagnose{" "}
                <em>which</em> formula to use rather than mechanically repeating steps on autopilot.
              </p>
              <div className="text-[10px] text-foreground/80 pt-1 font-bold">
                Best for: Math, Physics, Chemistry
              </div>
            </div>

            {/* Method 2: Leitner 5-Box */}
            <div className="p-4 border-2 border-foreground bg-background space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-primary uppercase">SPACED RETRIEVAL</span>
                <span className="border border-border px-1">SYSTEMATIC</span>
              </div>
              <div className="font-bold text-sm text-foreground">Leitner 5-Box System</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Cards advance to higher boxes on success and drop to Box 1 on errors. You review
                struggling cards daily and mastered cards only once a month.
              </p>
              <div className="text-[10px] text-foreground/80 pt-1 font-bold">
                Best for: Vocabulary, Anatomy, Case Law
              </div>
            </div>

            {/* Method 3: Cornell Synthesis */}
            <div className="p-4 border-2 border-foreground bg-background space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-primary uppercase">STRUCTURED NOTES</span>
                <span className="border border-border px-1">SYNTHESIS</span>
              </div>
              <div className="font-bold text-sm text-foreground">Cornell 3-Tier Notes</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                A 2.5-inch left column with self-quiz questions, a main lecture column, and a
                2-sentence bottom summary. Built-in active recall without rewriting notes.
              </p>
              <div className="text-[10px] text-foreground/80 pt-1 font-bold">
                Best for: Lectures, History, Social Science
              </div>
            </div>

            {/* Method 4: Flowmodoro */}
            <div className="p-4 border-2 border-foreground bg-background space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-primary uppercase">PACING & CADENCE</span>
                <span className="border border-border px-1">FLOW STATE</span>
              </div>
              <div className="font-bold text-sm text-foreground">Flowmodoro (Count-Up)</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Zero countdown alarms. Stopwatch counts UP until your attention naturally dips, then
                rewards you with a break equal to 1/5th of the elapsed time.
              </p>
              <div className="text-[10px] text-foreground/80 pt-1 font-bold">
                Best for: Coding, Essay Writing, Proofs
              </div>
            </div>

            {/* Method 5: SQ3R */}
            <div className="p-4 border-2 border-foreground bg-background space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-primary uppercase">COMPREHENSION</span>
                <span className="border border-border px-1">INQUIRY</span>
              </div>
              <div className="font-bold text-sm text-foreground">SQ3R Chapter Deconstruction</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Survey headings, formulate questions, read to answer them, recite from memory, and
                review. Bypasses passive highlighter coloring completely.
              </p>
              <div className="text-[10px] text-foreground/80 pt-1 font-bold">
                Best for: Dense Academic Textbooks
              </div>
            </div>

            {/* Method 6: Dual Coding */}
            <div className="p-4 border-2 border-foreground bg-background space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-primary uppercase">SPATIAL SCHEMAS</span>
                <span className="border border-border px-1">VISUAL</span>
              </div>
              <div className="font-bold text-sm text-foreground">Dual Coding & Concept Maps</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Translate paragraphs into interconnected nodes, directional arrows, and causal
                symbols. Anchors linguistic logic into spatial long-term memory.
              </p>
              <div className="text-[10px] text-foreground/80 pt-1 font-bold">
                Best for: Biological Cycles, Network Architecture
              </div>
            </div>

            {/* Method 7: Analogical Teach-Back */}
            <div className="p-4 border-2 border-foreground bg-background space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-primary uppercase">UNDERSTANDING</span>
                <span className="border border-border px-1">SIMPLIFY</span>
              </div>
              <div className="font-bold text-sm text-foreground">Analogical Teach-Back</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Explain complex mechanisms using plain analogies for a 12-year-old. Strips away
                pretentious buzzwords and exposes hidden gaps immediately.
              </p>
              <div className="text-[10px] text-foreground/80 pt-1 font-bold">
                Best for: Quantum Physics, Economics, Legal Logic
              </div>
            </div>

            {/* Method 8: Minimum Viable Sprint */}
            <div className="p-4 border-2 border-foreground bg-background space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-primary uppercase">FRICTION RESCUE</span>
                <span className="border border-border px-1">INITIATION</span>
              </div>
              <div className="font-bold text-sm text-foreground">15m Minimum Viable Sprint</div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                When procrastination and dread are at an all-time high, commit to only 15 minutes of
                frictionless work. Unlocks momentum without activation terror.
              </p>
              <div className="text-[10px] text-foreground/80 pt-1 font-bold">
                Best for: Burnout Recovery, High Starting Dread
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            8. FINAL BOTTOM CALL TO ACTION
           ========================================================= */}
        <section className="text-center py-8 space-y-6">
          <div className="space-y-3 max-w-xl mx-auto">
            <Scribble className="text-xl sm:text-2xl text-primary font-bold">
              “your friend can study for 3 hours. unfortunately, you are not your friend.”
            </Scribble>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mt-2">
              Ready to stop fighting your brain?
            </h2>
            <p className="font-mono text-xs text-muted-foreground">
              Take the 12-question diagnostic to identify your strengths, weaknesses, and optimal
              methods.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <Button variant="lockin" size="lg" className="text-base px-10 py-6 h-auto" asChild>
              <Link to="/onboarding">
                IT’S TIME TO LOCK IN <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
