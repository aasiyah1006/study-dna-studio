import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  FlaskConical,
  Brain,
  ShieldAlert,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Award,
} from "lucide-react";
import { useState } from "react";
import { PageShell, Scribble } from "@/components/lockin/site";
import { Button } from "@/components/ui/button";
import { useLockin } from "@/lib/lockin/store";
import { StudyDnaModel } from "@/lib/lockin/types";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Diagnostic Onboarding (12-Factor Cognitive Baseline) — LOCKIN" },
      {
        name: "description",
        content:
          "A 12-factor diagnostic identifying your strengths, weaknesses, and evidence-backed study methods.",
      },
    ],
  }),
  component: OnboardingComponent,
});

const steps = [
  {
    num: "01",
    factor: "CIRCADIAN RHYTHM",
    q: "when does your brain actually switch on?",
    sub: "Be brutally honest. No points for pretending you're a 5 AM cold-shower monk.",
    options: [
      {
        label: "Early Morning (6:00 AM – 9:30 AM)",
        tag: "EARLY_BIRD",
        note: "High natural cortisol window before the world wakes up.",
      },
      {
        label: "Midday Surge (11:00 AM – 2:00 PM)",
        tag: "MIDDAY",
        note: "Post-coffee alertness peak; solid for analytical work.",
      },
      {
        label: "Late Afternoon (3:30 PM – 6:30 PM)",
        tag: "AFTERNOON",
        note: "Second cognitive wind before dinner.",
      },
      {
        label: "Night Owl / Goblin Mode (9:00 PM – 12:30 AM)",
        tag: "NIGHT_OWL",
        note: "Zero distractions, quiet room, hyperfocus activation.",
      },
    ],
  },
  {
    num: "02",
    factor: "FOCUS STAMINA CLIFF",
    q: "how long can you study before your brain starts buffering?",
    sub: "On a normal Tuesday afternoon—not when you have an exam in 2 hours.",
    options: [
      {
        label: "15 – 20 minutes (sprint goblin)",
        tag: "SPAN_SHORT",
        note: "High intensity bursts; anything longer triggers burnout.",
      },
      {
        label: "25 – 35 minutes (classic baseline)",
        tag: "SPAN_MEDIUM",
        note: "Balanced stamina; standard intervals work cleanly.",
      },
      {
        label: "45 – 60 minutes (deep synthesis tank)",
        tag: "SPAN_DEEP",
        note: "Solid endurance; frequent breaks actually disrupt flow.",
      },
      {
        label: "Under 15 minutes (severe brain rot / burned out)",
        tag: "SPAN_BURNOUT",
        note: "Dopamine receptors fried; requires micro-first rescue sprints.",
      },
    ],
  },
  {
    num: "03",
    factor: "INITIATION FRICTION",
    q: "what is the #1 boss fight preventing you from starting?",
    sub: "We design around your friction point rather than judging you for it.",
    options: [
      {
        label: "Phone / TikTok / Reels doomscrolling black hole",
        tag: "FRICTION_PHONE",
        note: "Initiation dopamine hijacked by short-form feeds.",
      },
      {
        label: "Task ambiguity (staring at a huge syllabus and freezing)",
        tag: "FRICTION_OVERWHELM",
        note: "Too many variables causes cognitive paralysis.",
      },
      {
        label: "Aesthetic procrastination (cleaning desk, picking fonts)",
        tag: "FRICTION_AESTHETIC",
        note: "Pretending to prepare instead of doing the hard work.",
      },
      {
        label: "I start easily, but quit the moment it gets boring",
        tag: "FRICTION_LOW",
        note: "Low initiation barrier, high maintenance friction.",
      },
    ],
  },
  {
    num: "04",
    factor: "RETRIEVAL MECHANISM",
    q: "how do you feel about testing yourself vs reading?",
    sub: "Active recall burns mental calories. How does your brain handle it?",
    options: [
      {
        label: "I prefer solving raw practice problems under pressure",
        tag: "PRACTICE_PROBLEMS",
        note: "Kinesthetic learner who needs concrete question outputs.",
      },
      {
        label: "I like blank-sheet blurting (dumping everything from memory)",
        tag: "BLURTING_DRILLS",
        note: "Exposes knowledge gaps fast without waiting for test results.",
      },
      {
        label: "I prefer rapid-fire flashcards & Anki intervals",
        tag: "FLASHCARDS",
        note: "Atomized discrete facts with spaced repetitions.",
      },
      {
        label: "I avoid testing myself because getting things wrong stresses me out",
        tag: "TEST_AVOIDANT",
        note: "Low-stakes micro-testing needed to de-escalate anxiety.",
      },
    ],
  },
  {
    num: "05",
    factor: "VERBAL & TEACH-BACK MASTERY",
    q: "when a concept makes zero sense, what unlocks it?",
    sub: "Testing your affinity for the Feynman Technique & Talking to the Wall.",
    options: [
      {
        label: "Pacing around the room and talking to the wall out loud",
        tag: "WALL_EXPLAIN",
        note: "Feynman mastery: vocalization instantly reveals false understanding.",
      },
      {
        label: "Explaining it to an imaginary 5-year-old in simple analogies",
        tag: "TALK_OUT_LOUD",
        note: "Strips away academic jargon to expose core logic.",
      },
      {
        label: "Sketching out visual diagrams and interconnected arrows",
        tag: "VISUAL_MAP",
        note: "Translates abstract ideas into spatial relationships.",
      },
      {
        label: "Re-reading the textbook paragraph 12 times in dead silence",
        tag: "PASSIVE_REREAD",
        note: "High risk of illusion of competence; needs active prompt.",
      },
    ],
  },
  {
    num: "06",
    factor: "SPATIAL & STRUCTURAL MAPPING",
    q: "how does your brain organize complex relationships?",
    sub: "Testing suitability for Loomis Structural Mapping & Dual-Coding.",
    options: [
      {
        label: "High-density flowcharts & spatial concept maps (Loomis method)",
        tag: "LOOMIS_DIAGRAMS",
        note: "Dual-coding: pairing spatial geometry with verbal terms.",
      },
      {
        label: "Hierarchical bullet lists with strict indentation",
        tag: "BULLET_OUTLINES",
        note: "Linear, logical categorization.",
      },
      {
        label: "Chronological timelines and sequential step-by-step numbers",
        tag: "SEQUENTIAL_STEPS",
        note: "Procedural memory for step-by-step derivations.",
      },
      {
        label: "No diagrams—just pure audio / vocal voice memos",
        tag: "AUDIO_MEMOS",
        note: "Auditory retention; podcast-style self-recitations.",
      },
    ],
  },
  {
    num: "07",
    factor: "SPACED REPETITION AFFINITY",
    q: "what is your real, unvarnished relationship with flashcards?",
    sub: "Are flashcards an engine for you, or an unreviewed guilt pile?",
    options: [
      {
        label: "I use Anki / Quizlet daily and clear my reviews religiously",
        tag: "ANKI_POWER",
        note: "Proven spaced repetition habit; high algorithmic yield.",
      },
      {
        label: "I make 300 aesthetic cards and never review them once",
        tag: "FLASHCARD_REGULAR",
        note: "Card creation fallacy: creating cards is not studying them.",
      },
      {
        label: "Only useful for vocabulary, drug names, and exact formulas",
        tag: "FLASHCARD_TARGETED",
        note: "Selective utility: best for discrete atomized items.",
      },
      {
        label: "I hate flashcards. I need full context and problem synthesis",
        tag: "FLASHCARD_HATER",
        note: "Holistic thinker: flashcards cause fragmented thinking.",
      },
    ],
  },
  {
    num: "08",
    factor: "SENSORY ENVIRONMENT",
    q: "what sound does your brain need to lock in?",
    sub: "Auditory input drastically alters your cognitive load threshold.",
    options: [
      {
        label: "Absolute, dead silence (earplugs or noise-canceling headphones)",
        tag: "DEAD_SILENCE",
        note: "Low cognitive bandwidth for extraneous environmental audio.",
      },
      {
        label: "Brown noise, heavy rain, or steady binaural drone",
        tag: "BROWN_NOISE",
        note: "Broadband sound masks speech centers and calms wandering thoughts.",
      },
      {
        label: "Video game OSTs, synthwave, or fast lo-fi beats",
        tag: "LOFI_BEATS",
        note: "Rhythmic stimulation provides baseline dopamine without lyrics.",
      },
      {
        label: "A noisy coffee shop or library with people moving around",
        tag: "COFFEE_SHOP",
        note: "Ambient cafe bustle prevents hyper-vigilance.",
      },
    ],
  },
  {
    num: "09",
    factor: "NOTE-TAKING REALITY CHECK",
    q: "be honest: what do your study notes look like?",
    sub: "Distinguishing between aesthetic performance and actual encoding.",
    options: [
      {
        label: "Pastel highlighters, clean calligraphy, looks like Pinterest",
        tag: "AESTHETIC_TRAP",
        note: "Dangerous trap: spending hours decorating without testing recall.",
      },
      {
        label: "Messy chicken-scratch on scrap paper that gets thrown away",
        tag: "MESSY_SCRATCH",
        note: "High efficiency: using writing as a thinking tool, not a museum.",
      },
      {
        label: "Progressive summaries (highlighting core 20%, bolding top 5%)",
        tag: "PROGRESSIVE_NOTES",
        note: "Tiago Forte distillation method: high conceptual compression.",
      },
      {
        label: "I rarely take notes—I just jump straight into practice",
        tag: "ZERO_NOTES",
        note: "Pure action bias: highly effective if paired with error reviews.",
      },
    ],
  },
  {
    num: "10",
    factor: "CADENCE & PACING",
    q: "how do rigid timers make you feel?",
    sub: "Fixed Pomodoro (25/5) vs Flowmodoro (open-ended focus tracking).",
    options: [
      {
        label: "Fixed 25/5 Pomodoro keeps me accountable and structured",
        tag: "FIXED_POMODORO",
        note: "Thrives on predictable boundaries and scheduled rests.",
      },
      {
        label: "Timers give me anxiety; I prefer Flowmodoro (timer counts UP)",
        tag: "FLOWMODORO",
        note: "Focus until natural stamina breaks, then take proportional rest.",
      },
      {
        label: "Short 15-minute micro-sprints with quick physical stretches",
        tag: "MICRO_SPRINT",
        note: "High energy turnover; resets focus before fatigue sets in.",
      },
      {
        label: "One single 4-hour manic hyperfocus session before the deadline",
        tag: "PANIC_BURST",
        note: "Adrenaline-dependent: massive cognitive debt afterwards.",
      },
    ],
  },
  {
    num: "11",
    factor: "SOCIAL & ACCOUNTABILITY",
    q: "who do you study best around?",
    sub: "Environmental body-doubling vs isolated deep isolation.",
    options: [
      {
        label: "Solo monk in my room with the door locked and phone in drawer",
        tag: "SOLO_LOCKIN",
        note: "Maximum cognitive isolation; zero social interruptions.",
      },
      {
        label: "Silent body-doubling (Study Discord stream or silent library)",
        tag: "BODY_DOUBLING",
        note: "Presence of others working creates subtle social accountability.",
      },
      {
        label: "With an active study partner who quizzes me on questions",
        tag: "STUDY_PARTNER",
        note: "Social teach-backs and competitive motivation.",
      },
      {
        label: "Doesn't matter as long as I have a clear checklist to cross off",
        tag: "CHECKLIST_FOCUSED",
        note: "Task-oriented motivation independent of social setting.",
      },
    ],
  },
  {
    num: "12",
    factor: "REBOUND RESILIENCE",
    q: "what happens when you miss a planned study block?",
    sub: "How you handle missed sessions determines whether you maintain momentum.",
    options: [
      {
        label: "Spiral into guilt, feel like a failure, give up for the week",
        tag: "SHAME_SPIRAL",
        note: "Catastrophic thinking: Lockin will disable guilt-trips and downscale goals.",
      },
      {
        label: "Plan a delusional 10-hour 'revenge grind' session tomorrow",
        tag: "REVENGE_PLAN",
        note: "Overcompensation trap: leads to compounding exhaustion.",
      },
      {
        label: "Adapt the plan down to an immediate 15-minute rescue sprint",
        tag: "RESCUE_SPRINT",
        note: "Elite adaptation: keeping the streak alive with zero friction.",
      },
      {
        label: "Shrug it off, adjust schedule calmly, and start fresh",
        tag: "HEALTHY_DETACH",
        note: "Strong psychological resilience; ideal for iterative calibration.",
      },
    ],
  },
];

function OnboardingComponent() {
  const { submitOnboarding } = useLockin();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [calibratedProfile, setCalibratedProfile] = useState<StudyDnaModel | null>(null);

  const current = steps[step];
  const isComplete = step >= steps.length;

  const handleSelect = (tag: string) => {
    const nextAnswers = { ...answers, [step]: tag };
    setAnswers(nextAnswers);

    if (step + 1 >= steps.length) {
      const profile = submitOnboarding(nextAnswers);
      setCalibratedProfile(profile);
      setStep(steps.length);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <PageShell>
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* PROGRESS BAR HEADER */}
        <div className="flex justify-between items-center font-mono text-xs border-2 border-foreground bg-card p-3 shadow-hard-sm">
          <span className="font-bold flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            12-FACTOR STUDY DNA DIAGNOSTIC
          </span>
          <div className="hidden sm:flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`w-4 h-2 border border-foreground transition-all ${
                  i < step ? "bg-accent" : i === step ? "bg-primary animate-pulse" : "bg-background"
                }`}
              />
            ))}
          </div>
          <span className="font-bold">
            {isComplete
              ? "COMPLETE (12/12)"
              : `FACTOR ${step + 1 < 10 ? `0${step + 1}` : step + 1} / 12`}
          </span>
        </div>

        {/* QUESTION VIEW */}
        {!isComplete && current && (
          <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 border border-primary bg-primary/10 text-primary font-bold">
                  {current.factor}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  QUESTION {current.num} OF 12
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase leading-tight text-foreground">
                {current.q}
              </h1>
              <p className="text-sm font-mono text-muted-foreground">{current.sub}</p>
            </div>

            <div className="space-y-3 pt-2">
              {current.options.map((opt, i) => (
                <button
                  key={opt.tag}
                  type="button"
                  onClick={() => handleSelect(opt.tag)}
                  className="w-full text-left p-4 sm:p-5 border-2 border-foreground bg-background hover:bg-secondary hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all shadow-hard-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 cursor-pointer group"
                >
                  <div>
                    <span className="font-bold text-base block group-hover:text-primary">
                      {opt.label}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground block mt-0.5">
                      {opt.note}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold border border-foreground px-2 py-1 bg-card shrink-0">
                    SELECT 0{i + 1}
                  </span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer pt-2"
              >
                <ArrowLeft className="size-3" /> Back to previous question
              </button>
            )}
          </section>
        )}

        {/* RESULT: COMPLETE DIAGNOSTIC SYNTHESIS */}
        {isComplete && calibratedProfile && (
          <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard space-y-8">
            <div className="border-b-2 border-foreground pb-6 space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs px-2.5 py-1 bg-primary text-primary-foreground font-black uppercase">
                <FlaskConical className="size-3.5" />
                12-FACTOR DIAGNOSTIC COMPLETE // BASELINE SEEDED
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
                YOUR COGNITIVE BASELINE HAS BEEN SEEDED.
              </h1>
              <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                We analyzed your focus stamina, circadian peak, audio dependencies, and retrieval
                habits. Below are your{" "}
                <strong>
                  identified superpowers, vulnerabilities, and recommended method arsenal
                </strong>
                .
              </p>
              <Scribble className="text-base text-primary font-bold pt-1 block">
                “stop fighting your brain. your routine now adapts to your real focus limits.”
              </Scribble>
            </div>

            {/* STRENGTHS VS WEAKNESSES IDENTIFIED */}
            <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
              {/* STRENGTHS */}
              <div className="p-5 border-2 border-primary/50 bg-primary/5 space-y-3">
                <div className="flex items-center gap-2 font-black text-primary uppercase text-sm">
                  <Award className="size-4" /> IDENTIFIED COGNITIVE STRENGTHS
                </div>
                <ul className="space-y-2 text-foreground/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>High-Yield Vocalization:</strong> Explaining concepts out loud (Wall /
                      Feynman) breaks through false understanding rapidly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Rapid Sprint Burst:</strong> High cognitive speed when tasks are
                      capped at{" "}
                      <strong>{calibratedProfile.focus.comfortableDurationMin} minutes</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Spatial Schema Memory:</strong> Visual maps and flowchart diagrams
                      anchor long-term retention.
                    </span>
                  </li>
                </ul>
              </div>

              {/* WEAKNESSES / VULNERABILITIES */}
              <div className="p-5 border-2 border-destructive/50 bg-destructive/5 space-y-3">
                <div className="flex items-center gap-2 font-black text-destructive uppercase text-sm">
                  <ShieldAlert className="size-4" /> IDENTIFIED VULNERABILITIES
                </div>
                <ul className="space-y-2 text-foreground/90">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <span>
                      <strong>Initiation Inertia:</strong> High risk of phone doomscrolling when
                      starting blocks lack concrete, bite-sized tasks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <span>
                      <strong>Stamina Drop-Off Cliff:</strong> Concentration crashes sharply past{" "}
                      <strong>{calibratedProfile.focus.estimatedDropOffPointMin} minutes</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
                    <span>
                      <strong>Post-Miss Guilt Drop:</strong> Vulnerable to shame spirals if a
                      session is missed. Micro-rescue sessions now enforced.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* RECOMMENDED METHOD ARSENAL */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="font-bold text-foreground uppercase tracking-wider text-sm flex items-center gap-1.5">
                  <Zap className="size-4 text-accent" /> YOUR PERSONALIZED METHOD ARSENAL
                </span>
                <span className="text-muted-foreground text-[11px]">
                  Ranked by cognitive compatibility
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                <div className="p-4 border-2 border-foreground bg-secondary space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black text-primary">
                    <span>🥇 #1 TOP MATCH (98%)</span>
                    <span className="border border-primary px-1 bg-primary/10">HIGH ROI</span>
                  </div>
                  <div className="font-bold text-sm text-foreground">Interleaved Problem Sets</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Alternates between contrasting problem types to build discrimination and exam
                    agility.
                  </p>
                </div>

                <div className="p-4 border-2 border-foreground bg-card space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black text-foreground">
                    <span>🥈 #2 MATCH (95%)</span>
                    <span className="border border-border px-1 bg-secondary">SYNTHESIS</span>
                  </div>
                  <div className="font-bold text-sm text-foreground">Cornell Structured Notes</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Cue column for self-testing questions, lecture notes, and 2-sentence bottom
                    synthesis.
                  </p>
                </div>

                <div className="p-4 border-2 border-foreground bg-card space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black text-foreground">
                    <span>🥉 #3 MATCH (93%)</span>
                    <span className="border border-border px-1 bg-secondary">CADENCE</span>
                  </div>
                  <div className="font-bold text-sm text-foreground">Flowmodoro Sprints</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Count-up timer respects your natural focus flow. Break length is proportional
                    without alarm anxiety.
                  </p>
                </div>

                <div className="p-4 border-2 border-foreground bg-card space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black text-foreground">
                    <span>🏅 #4 MATCH (90%)</span>
                    <span className="border border-border px-1 bg-secondary">RETRIEVAL</span>
                  </div>
                  <div className="font-bold text-sm text-foreground">Leitner 5-Box Intervals</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Graduates cards across 5 review boxes so you spend time only on what you
                    actually struggle with.
                  </p>
                </div>
              </div>
            </div>

            {/* SEEDED TELEMETRY METRICS */}
            <div className="grid sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
              <div className="p-3 border-2 border-border bg-background">
                <span className="text-[10px] text-muted-foreground block">FOCUS LIMIT</span>
                <span className="text-xl font-extrabold text-foreground">
                  {calibratedProfile.focus.comfortableDurationMin}m
                </span>
                <span className="text-[10px] text-primary block mt-0.5">
                  cliff at {calibratedProfile.focus.estimatedDropOffPointMin}m
                </span>
              </div>
              <div className="p-3 border-2 border-border bg-background">
                <span className="text-[10px] text-muted-foreground block">PEAK ENERGY</span>
                <span className="text-sm font-bold text-foreground truncate block">
                  {calibratedProfile.energy.peakWindow.split("–")[0]}
                </span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  {calibratedProfile.energy.optimalStudyHours}
                </span>
              </div>
              <div className="p-3 border-2 border-border bg-background">
                <span className="text-[10px] text-muted-foreground block">START FRICTION</span>
                <span className="text-xl font-extrabold text-primary">
                  {calibratedProfile.behavior.startingFriction}
                </span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  micro-actions active
                </span>
              </div>
              <div className="p-3 border-2 border-border bg-background">
                <span className="text-[10px] text-muted-foreground block">CALIBRATION</span>
                <span className="text-xl font-extrabold text-accent">
                  {calibratedProfile.overallCalibrationPercent}%
                </span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  baseline ready
                </span>
              </div>
            </div>

            {/* NEXT ACTIONS */}
            <div className="pt-4 flex flex-wrap gap-4 border-t-2 border-foreground">
              <Button variant="lockin" size="lg" className="text-base px-8 py-6 h-auto" asChild>
                <Link to="/today">
                  GENERATE TODAY'S CALIBRATED PLAN <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button variant="paper" size="lg" className="text-base px-6 py-6 h-auto" asChild>
                <Link to="/study-dna">VIEW FULL STUDY DNA PROFILE</Link>
              </Button>
            </div>
          </section>
        )}
      </main>
    </PageShell>
  );
}
