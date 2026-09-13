import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  RotateCcw,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { PageShell, Scribble, Eyebrow } from "@/components/lockin/site";
import { Button } from "@/components/ui/button";
import { useLockin } from "@/lib/lockin/store";
import { getMethodById } from "@/lib/lockin/methods";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Session Calibration & Feedback — LOCKIN" },
      {
        name: "description",
        content: "Turn your real session outcomes into Study DNA calibration.",
      },
    ],
  }),
  component: FeedbackComponent,
});

function FeedbackComponent() {
  const search = useSearch({ from: "/feedback" }) as Record<string, unknown>;
  const { profile, recordTelemetry } = useLockin();

  const isAbandoned = search?.status === "abandoned";
  const actualMins = Number(search?.actual) || (isAbandoned ? 18 : 25);
  const plannedMins = Number(search?.planned) || 25;
  const methodId = (search?.methodId as string) || "active_recall";
  const activeMethod = getMethodById(methodId);

  const [abandonReason, setAbandonReason] = useState<string>("wall");
  const [quickReaction, setQuickReaction] = useState<"COOKED" | "KINDA" | "LOCKED_IN">("KINDA");
  const [effectivenessRating, setEffectivenessRating] = useState<number>(3);
  const [difficultyRating, setDifficultyRating] = useState<number>(3);
  const [userNote, setUserNote] = useState<string>("");
  const [submitted, setSubmitted] = useState(isAbandoned);

  const handleSelectQuick = (reaction: "COOKED" | "KINDA" | "LOCKED_IN") => {
    setQuickReaction(reaction);
    if (reaction === "COOKED") {
      setEffectivenessRating(1);
    } else if (reaction === "KINDA") {
      setEffectivenessRating(3);
    } else {
      setEffectivenessRating(5);
    }
  };

  const handleSaveFeedback = () => {
    recordTelemetry({
      type: "feedback_submitted",
      methodId,
      actualDurationMin: actualMins,
      effectivenessRating,
      difficultyRating,
      notes:
        userNote ||
        (isAbandoned
          ? `Abandoned at min ${actualMins}: ${abandonReason}`
          : `Quick verdict: ${quickReaction}`),
    });
    setSubmitted(true);
  };

  return (
    <PageShell>
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* TOP STATUS HEADER */}
        <div className="flex justify-between items-center font-mono text-xs border-2 border-foreground bg-card p-3 shadow-hard-sm">
          <span className="font-bold flex items-center gap-1.5 text-foreground">
            <Zap className="size-3.5 text-primary" />
            TELEMETRY CALIBRATION ENGINE
          </span>
          <span className="text-muted-foreground">METHOD: {activeMethod.name.toUpperCase()}</span>
        </div>

        {/* =========================================================
            ABANDONED SESSION / HIT A WALL
           ========================================================= */}
        {isAbandoned && (
          <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard space-y-6">
            <div className="border-b-2 border-foreground pb-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-destructive font-bold">
                <AlertTriangle className="size-4" />
                SESSION INTERRUPTED AT MINUTE {actualMins}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                You hit a wall at {actualMins}m.
              </h1>
              <p className="font-mono text-sm text-foreground/90">
                That is not a moral failure. That is high-grade, useful behavioral data.
              </p>
              <Scribble className="text-base text-primary font-bold block pt-1">
                “standard apps judge you. lockin recalibrates.”
              </Scribble>
            </div>

            {/* WHAT HAPPENED SELECTOR */}
            <div className="space-y-3 font-mono text-xs">
              <span className="font-bold text-foreground block">
                WHAT WAS THE PRIMARY FRICTION TRIGGER?
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "wall",
                    label: "Hit a sudden cognitive cliff / brain melted",
                    sub: "Attention drop-off threshold reached",
                  },
                  {
                    id: "phone",
                    label: "Phone notification / sudden distraction impulse",
                    sub: "Environmental friction spike",
                  },
                  {
                    id: "passive",
                    label: "Method was too boring / passive fatigue",
                    sub: "Method resistance trigger",
                  },
                  {
                    id: "ambiguous",
                    label: "Task was too big or vague to execute",
                    sub: "Task chunking breakdown",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAbandonReason(item.id)}
                    className={`p-3.5 text-left border-2 transition-all cursor-pointer ${
                      abandonReason === item.id
                        ? "border-foreground bg-secondary font-bold shadow-hard-sm"
                        : "border-border bg-background hover:border-foreground"
                    }`}
                  >
                    <span className="block text-foreground">{item.label}</span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* VISUAL ADAPTATION MOMENT */}
            <div className="p-6 border-2 border-foreground bg-secondary/70 space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-primary font-bold text-sm block uppercase">
                  okay. we learned something.
                </span>
                <p className="text-foreground">Here is how LOCKIN is adjusting tomorrow's plan:</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-foreground bg-background space-y-1">
                  <span className="text-[10px] text-muted-foreground font-bold block">BEFORE</span>
                  <div className="text-2xl font-black text-foreground line-through opacity-60">
                    {plannedMins} MIN
                  </div>
                  <div className="text-xs text-muted-foreground">{activeMethod.name}</div>
                </div>

                <div className="p-4 border-2 border-foreground bg-primary text-primary-foreground space-y-1 shadow-hard-sm">
                  <span className="text-[10px] text-primary-foreground/80 font-bold block">
                    AFTER (CALIBRATED)
                  </span>
                  <div className="text-2xl font-black text-primary-foreground">
                    {Math.max(15, actualMins - 2)} MIN
                  </div>
                  <div className="text-xs text-primary-foreground/90 font-bold">
                    ACTIVE RECALL & PRACTICE
                  </div>
                </div>
              </div>

              <div className="p-3 border border-foreground/30 bg-background space-y-1">
                <strong className="text-primary block">WHY?</strong>
                <p className="text-foreground/90">
                  “You tapped out at {actualMins} minutes. Your attention drop-off has been logged.
                  We'll try something different next time.”
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button variant="lockin" size="lg" asChild>
                <Link to="/study-dna">
                  CONFIRM & VIEW STUDY DNA <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button variant="paper" size="lg" asChild>
                <Link to="/today">BACK TO TODAY’S PLAN</Link>
              </Button>
            </div>
          </section>
        )}

        {/* =========================================================
            COMPLETED SESSION / THE CANDID DEBRIEF
           ========================================================= */}
        {!isAbandoned && !submitted && (
          <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard space-y-8">
            <div className="border-b-2 border-foreground pb-4 space-y-2">
              <Scribble className="text-lg text-primary font-bold">“be honest.”</Scribble>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
                DID THAT ACTUALLY WORK?
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                Finished {actualMins}m with {activeMethod.name}. We need cold truth, not politeness.
              </p>
            </div>

            {/* THREE BIG EXPRESSIVE BUTTONS */}
            <div className="space-y-3 font-mono text-xs">
              <span className="font-bold text-foreground block">
                QUICK VERDICT (HOW DID YOUR BRAIN FEEL?):
              </span>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "COOKED",
                    title: "COOKED",
                    sub: "Brain melted / total exhaustion",
                    score: 1,
                  },
                  {
                    id: "KINDA",
                    title: "KINDA",
                    sub: "Decent workout / somewhat stuck",
                    score: 3,
                  },
                  {
                    id: "LOCKED_IN",
                    title: "LOCKED IN",
                    sub: "Crisp flow / actually stuck",
                    score: 5,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectQuick(item.id as "COOKED" | "KINDA" | "LOCKED_IN")}
                    className={`p-4 text-left border-2 transition-all cursor-pointer ${
                      quickReaction === item.id
                        ? "border-foreground bg-primary text-primary-foreground font-bold shadow-hard-sm"
                        : "border-border bg-background hover:border-foreground text-foreground"
                    }`}
                  >
                    <div className="text-lg font-black">{item.title}</div>
                    <div className="text-[11px] opacity-80 mt-1">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* OPTIONAL NOTES */}
            <div className="space-y-2 font-mono text-xs">
              <span className="font-bold text-foreground block">
                OPTIONAL OBSERVATION FOR YOUR STUDY DNA:
              </span>
              <input
                type="text"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="e.g. 'Flashcard blurting helped me spot the 2 enzymes I always confuse.'"
                className="w-full p-3 border-2 border-foreground bg-background text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="pt-2">
              <Button
                variant="lockin"
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleSaveFeedback}
              >
                SAVE TELEMETRY & SEE ADAPTATION <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>
          </section>
        )}

        {/* =========================================================
            POST-COMPLETION ADAPTATION RECEIPT
           ========================================================= */}
        {!isAbandoned && submitted && (
          <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard space-y-6">
            <div className="border-b-2 border-foreground pb-4 space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-accent">
                <CheckCircle2 className="size-4" />
                TELEMETRY LOGGED & STUDY DNA UPDATED
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-foreground">
                okay. we learned something.
              </h2>
            </div>

            {/* Visual Adaptation Before & After */}
            <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 border-2 border-border bg-background space-y-1">
                <span className="text-[10px] text-muted-foreground font-bold block">BEFORE</span>
                <div className="text-2xl font-black text-foreground opacity-60">
                  {plannedMins} MIN
                </div>
                <div className="text-xs text-muted-foreground">{activeMethod.name}</div>
              </div>

              <div className="p-4 border-2 border-foreground bg-secondary space-y-1 shadow-hard-sm">
                <span className="text-[10px] text-primary font-bold block">
                  NEW STUDY DNA SIGNAL
                </span>
                <div className="text-2xl font-black text-primary">
                  {quickReaction === "LOCKED_IN" ? "+4% CONFIDENCE" : "+2% CALIBRATION"}
                </div>
                <div className="text-xs text-foreground font-bold">
                  {quickReaction === "COOKED"
                    ? "Next session contracts to 20m"
                    : "Method promoted to PROVEN"}
                </div>
              </div>
            </div>

            <div className="p-4 border border-foreground/30 bg-secondary/50 font-mono text-xs space-y-1">
              <strong className="text-primary block">WHY?</strong>
              <p className="text-foreground leading-relaxed">
                “You rated this session <strong>{quickReaction}</strong> ({effectivenessRating}/5).
                Lockin uses this evidence to curate tomorrow's method and duration. We'll try
                something even sharper next time.”
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
              <Button variant="lockin" size="lg" asChild>
                <Link to="/study-dna">
                  VIEW UPDATED STUDY DNA <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button variant="paper" size="lg" asChild>
                <Link to="/today">SEE TOMORROW'S PLAN</Link>
              </Button>
            </div>
          </section>
        )}
      </main>
    </PageShell>
  );
}
