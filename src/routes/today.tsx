import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  X,
  Sparkles,
  ShieldAlert,
  Clock,
  BookOpen,
  Info,
  CheckCircle2,
  ListOrdered,
} from "lucide-react";
import { useState } from "react";
import { Bedroom } from "@/components/lockin/bedroom";
import { Eyebrow, PageShell, Scribble } from "@/components/lockin/site";
import { Button } from "@/components/ui/button";
import { useLockin } from "@/lib/lockin/store";
import { getMethodById } from "@/lib/lockin/methods";

export const Route = createFileRoute("/today")({
  head: () => ({
    meta: [
      { title: "Today’s Calibrated Plan — LOCKIN" },
      {
        name: "description",
        content:
          "A focused, evidence-backed study session calibrated specifically to your Study DNA.",
      },
    ],
  }),
  component: TodayComponent,
});

function TodayComponent() {
  const navigate = useNavigate();
  const { profile, todayPlan, recommendations } = useLockin();
  const [showWhy, setShowWhy] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState(todayPlan.recommendedMethod.id);

  const activeMethod = getMethodById(selectedMethodId);
  const isHighFriction = profile.behavior.startingFriction === "HIGH";

  const handleStartSession = () => {
    navigate({
      to: "/session",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        methodId: activeMethod.id,
        duration: todayPlan.durationMinutes,
        subject: todayPlan.subject,
      }),
    });
  };

  return (
    <PageShell>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* TOP STATUS BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border-2 border-foreground bg-card shadow-hard-sm font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-bold uppercase">CURRENT PROFILE: {profile.studentName}</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>STAMINA BASELINE: {profile.focus.comfortableDurationMin}m</span>
            <span>ENERGY WINDOW: {profile.energy.peakWindow.split("–")[0]}</span>
            <span className="font-bold text-foreground">
              CONFIDENCE: {profile.focus.confidence}
            </span>
          </div>
        </div>

        {/* MAIN WORKSPACE GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: ROOM & GREETING */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <Eyebrow>Daily Calibrated Move</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tight">
                okay. here's
                <br />
                today's move.
              </h1>
              <Scribble className="text-base text-primary font-bold">
                “we're not doing the 7-hour productivity fantasy today.”
              </Scribble>
            </div>

            <div className="border-2 border-foreground bg-card p-4 shadow-hard">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-border font-mono text-xs text-muted-foreground">
                <span>STUDY DESK // LEVEL 01</span>
                <span className="text-accent font-bold">LOCKED IN</span>
              </div>
              <div className="aspect-[4/3] bg-background/50 border border-border flex items-center justify-center overflow-hidden">
                <Bedroom compact />
              </div>
              <div className="mt-3 text-xs font-mono text-muted-foreground flex justify-between">
                <span>ROOM TEMPO: CALM</span>
                <span>CAT STATE: ASLEEP</span>
              </div>
            </div>

            {/* STARTING FRICTION ADVICE */}
            <div className="p-4 border-2 border-foreground bg-secondary/50 font-mono text-xs space-y-1.5 shadow-hard-sm">
              <div className="flex items-center gap-1.5 font-bold text-primary">
                <ShieldAlert className="size-4" />
                INITIATION PROTOCOL (STARTING IS THE BOSS FIGHT):
              </div>
              <p className="text-foreground leading-relaxed">
                {todayPlan.startingFrictionProtocol}
              </p>
            </div>
          </div>

          {/* RIGHT: THE CALIBRATED STUDY PLAN */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-2 border-foreground bg-card p-6 sm:p-8 shadow-hard space-y-6">
              {/* HEADER SPEC */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-foreground gap-2">
                <div>
                  <span className="font-mono text-xs text-primary font-bold">
                    BLOCK 01 / SINGLE TARGET
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase tracking-tight mt-0.5">
                    {todayPlan.subject}
                  </h2>
                  <p className="text-sm font-mono text-muted-foreground">
                    Topic: {todayPlan.topic}
                  </p>
                </div>
                <div className="flex sm:flex-col items-end gap-1 text-right">
                  <span className="text-2xl font-extrabold text-foreground">
                    {todayPlan.durationMinutes} MIN
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-accent/20 border border-accent px-1.5 py-0.5 font-bold">
                    EVIDENCE-CALIBRATED
                  </span>
                </div>
              </div>

              {/* WHY THIS DURATION CALLOUT */}
              <div className="p-4 border border-border bg-background/80 space-y-1 text-xs font-mono">
                <div className="flex items-center gap-1.5 font-bold text-muted-foreground">
                  <Clock className="size-3.5 text-primary" />
                  WHY {todayPlan.durationMinutes} MINUTES?
                </div>
                <p className="text-foreground leading-relaxed">{todayPlan.whyThisDuration}</p>
              </div>

              {/* RECOMMENDED METHOD SELECTOR */}
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="font-bold flex items-center gap-1">
                    <BookOpen className="size-3.5 text-primary" />
                    RECOMMENDED COGNITIVE METHOD:
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowInstructions(true)}
                    className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Info className="size-3" /> View Execution Guide
                  </button>
                </div>

                <div className="space-y-2">
                  {recommendations.map((rec) => {
                    const isSelected = rec.methodId === selectedMethodId;
                    return (
                      <button
                        key={rec.methodId}
                        type="button"
                        onClick={() => setSelectedMethodId(rec.methodId)}
                        className={`w-full text-left p-4 border-2 transition-all cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ${
                          isSelected
                            ? "border-foreground bg-secondary font-medium shadow-hard-sm"
                            : "border-border bg-background hover:border-foreground"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-foreground">
                              {rec.methodName}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 border border-border bg-card uppercase">
                              {rec.category}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-mono text-primary font-bold">
                                [PRIMARY CHOICE]
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                            {rec.whyThis}
                          </p>
                        </div>
                        <div className="font-mono text-xs font-bold text-accent shrink-0">
                          {rec.matchScore}% MATCH
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button variant="lockin" size="lg" className="flex-1" onClick={handleStartSession}>
                  START {todayPlan.durationMinutes}M SESSION <ArrowRight className="ml-2 size-5" />
                </Button>

                <Button variant="paper" size="lg" onClick={() => setShowWhy(true)}>
                  <Brain className="mr-1 size-4" /> WHY THIS PLAN?
                </Button>
              </div>

              {/* LATER NOTE */}
              <div className="pt-2 border-t border-border font-mono text-xs text-muted-foreground flex justify-between items-center">
                <span>SESSION STATUS: UNLOCKED</span>
                <span>NOTHING ELSE SCHEDULED TODAY</span>
              </div>
            </div>
          </div>
        </div>

        {/* WHY IS MY PLAN LIKE THIS? DRAWER / OVERLAY */}
        {showWhy && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-end"
            onClick={() => setShowWhy(false)}
          >
            <aside
              className="w-full max-w-md bg-card border-l-2 border-foreground h-full p-6 sm:p-8 space-y-6 overflow-y-auto shadow-hard"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b-2 border-foreground pb-4">
                <Eyebrow>Plan receipt & causal chain</Eyebrow>
                <button
                  type="button"
                  onClick={() => setShowWhy(false)}
                  className="p-1 border border-foreground hover:bg-secondary cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold uppercase">Why is my plan like this?</h2>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  Evidence-based breakdown. No vague horoscope advice.
                </p>
              </div>

              {/* STEP 1: OBSERVED EVIDENCE */}
              <div className="p-4 border-2 border-foreground bg-background space-y-2 font-mono text-xs">
                <span className="text-[10px] text-primary font-bold uppercase">
                  01 // WHAT LOCKIN NOTICED
                </span>
                <p className="font-bold text-foreground text-sm">“{profile.focus.evidenceText}”</p>
                <p className="text-muted-foreground text-[11px]">
                  State: {profile.focus.state} ({profile.focus.confidence} CONFIDENCE)
                </p>
              </div>

              {/* STEP 2: BEHAVIORAL FRICTION */}
              <div className="p-4 border-2 border-foreground bg-background space-y-2 font-mono text-xs">
                <span className="text-[10px] text-primary font-bold uppercase">
                  02 // BEHAVIORAL FRICTION TRIGGER
                </span>
                <p className="font-bold text-foreground text-sm">“{profile.behavior.reason}”</p>
                <p className="text-muted-foreground text-[11px]">
                  Average start lag: {profile.behavior.startDelayAvgMinutes} minutes
                </p>
              </div>

              {/* STEP 3: WHAT CHANGED */}
              <div className="p-4 border-2 border-foreground bg-secondary space-y-2 font-mono text-xs">
                <span className="text-[10px] text-accent font-bold uppercase">
                  03 // WHAT CHANGED IN TODAY'S PLAN
                </span>
                <p className="font-bold text-foreground text-sm">{todayPlan.whyThisDuration}</p>
                <p className="text-foreground text-[11px]">{todayPlan.whyThisMethod}</p>
              </div>

              <div className="text-center pt-2">
                <Scribble className="text-xs text-muted-foreground">
                  your behavior changed the plan. not vibes.
                </Scribble>
              </div>
            </aside>
          </div>
        )}

        {/* METHOD INSTRUCTIONS DRAWER */}
        {showInstructions && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-end"
            onClick={() => setShowInstructions(false)}
          >
            <aside
              className="w-full max-w-md bg-card border-l-2 border-foreground h-full p-6 sm:p-8 space-y-6 overflow-y-auto shadow-hard"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b-2 border-foreground pb-4">
                <Eyebrow>Method execution protocol</Eyebrow>
                <button
                  type="button"
                  onClick={() => setShowInstructions(false)}
                  className="p-1 border border-foreground hover:bg-secondary cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-primary font-bold">
                  {activeMethod.category} METHOD
                </span>
                <h2 className="text-3xl font-extrabold uppercase mt-1">{activeMethod.name}</h2>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  {activeMethod.tagline}
                </p>
              </div>

              <div className="p-4 border-2 border-border bg-background space-y-2 font-mono text-xs">
                <span className="text-[10px] text-muted-foreground font-bold">
                  COGNITIVE LOAD & DURATION:
                </span>
                <div className="flex justify-between font-bold text-foreground">
                  <span>LOAD: {activeMethod.cognitiveLoad.toUpperCase()}</span>
                  <span>
                    WINDOW: {activeMethod.activeMinutesMin}–{activeMethod.activeMinutesMax}m
                  </span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <span className="font-bold text-foreground block">STEP-BY-STEP INSTRUCTIONS:</span>
                {activeMethod.instructions.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-border bg-card flex gap-3 items-start"
                  >
                    <span className="font-bold text-primary shrink-0">0{idx + 1}.</span>
                    <p className="text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              <Button
                variant="lockin"
                className="w-full"
                onClick={() => {
                  setShowInstructions(false);
                  handleStartSession();
                }}
              >
                GOT IT — START SESSION
              </Button>
            </aside>
          </div>
        )}
      </main>
    </PageShell>
  );
}
