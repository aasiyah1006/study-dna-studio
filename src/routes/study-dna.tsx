import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  History,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { Eyebrow, PageShell, Scribble } from "@/components/lockin/site";
import { Button } from "@/components/ui/button";
import { useLockin } from "@/lib/lockin/store";

export const Route = createFileRoute("/study-dna")({
  head: () => ({
    meta: [
      { title: "Study DNA — LOCKIN" },
      {
        name: "description",
        content: "This is what LOCKIN has learned about how you actually study.",
      },
    ],
  }),
  component: StudyDnaComponent,
});

function StudyDnaComponent() {
  const { profile, adaptationHistory } = useLockin();
  const [expandedTrait, setExpandedTrait] = useState<string | null>("focus");

  const toggleExpand = (traitKey: string) => {
    setExpandedTrait((prev) => (prev === traitKey ? null : traitKey));
  };

  return (
    <PageShell>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* =========================================================
            HEADER: "THIS IS WHAT LOCKIN HAS LEARNED ABOUT YOU."
           ========================================================= */}
        <section className="border-b-2 border-foreground pb-6 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <Eyebrow>YOUR STUDY DNA PROFILE</Eyebrow>
            {/* Single Profile Status Badge */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 border-2 border-foreground bg-primary text-primary-foreground font-bold shadow-hard-sm">
                ACTIVE: {profile.studentName}
              </span>
              <Button variant="paper" size="sm" className="h-7 text-xs font-mono" asChild>
                <Link to="/onboarding">
                  <RotateCcw className="size-3 mr-1" /> Retake 12-Factor Diagnostic
                </Link>
              </Button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
            THIS IS WHAT LOCKIN HAS LEARNED ABOUT YOU.
          </h1>

          <p className="font-mono text-xs text-muted-foreground max-w-2xl leading-relaxed">
            Not a personality badge or generic quiz result. A living, causal model calibrated by
            your actual sessions, dropped-off timers, and candid feedback.
          </p>

          <div className="pt-1 flex items-center gap-3 font-mono text-xs">
            <span className="px-2 py-0.5 border border-foreground bg-secondary font-bold">
              CALIBRATION CONFIDENCE: {profile.overallCalibrationPercent}%
            </span>
            <span className="text-muted-foreground">LAST UPDATED: {profile.lastUpdated}</span>
          </div>
        </section>

        {/* =========================================================
            CLEAN, BOLD STAT BLOCKS WITH "WHY?" EXPANDABLES
           ========================================================= */}
        <section className="space-y-4">
          <div className="flex justify-between items-center font-mono text-xs text-muted-foreground">
            <span className="font-bold uppercase text-foreground">CORE OBSERVED TRAITS</span>
            <span>CLICK "WHY?" TO SEE THE EVIDENCE</span>
          </div>

          <div className="space-y-4">
            {/* 1. FOCUS CAPACITY */}
            <div className="border-2 border-foreground bg-card shadow-hard-sm">
              <div
                onClick={() => toggleExpand("focus")}
                className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer hover:bg-secondary/40 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="font-mono text-xs text-muted-foreground font-bold">
                    YOUR FOCUS CAPACITY
                  </span>
                  <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                    YOUR FOCUS: {profile.focus.comfortableDurationMin} MIN ·{" "}
                    <span className="text-primary">{profile.focus.confidence} CONFIDENCE</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="font-mono text-xs font-bold border border-foreground px-3 py-1.5 bg-background hover:bg-foreground hover:text-background flex items-center gap-1.5 shrink-0"
                >
                  WHY?{" "}
                  {expandedTrait === "focus" ? (
                    <ChevronUp className="size-3.5" />
                  ) : (
                    <ChevronDown className="size-3.5" />
                  )}
                </button>
              </div>

              {/* Expandable Evidence Card */}
              {expandedTrait === "focus" && (
                <div className="border-t-2 border-foreground p-5 bg-[#FAF7F2] font-mono text-xs space-y-3">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-muted-foreground font-bold block">
                        WHAT LOCKIN OBSERVED:
                      </span>
                      <p className="text-foreground">{profile.focus.evidenceText}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-primary font-bold block">
                        WHAT CHANGED IN YOUR PLAN:
                      </span>
                      <p className="text-foreground">{profile.focus.whatChanged}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/80 text-muted-foreground text-[11px] flex justify-between">
                    <span>
                      Observed drop-off wall: ~{profile.focus.estimatedDropOffPointMin} minutes
                    </span>
                    <span>State: {profile.focus.state}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. ENERGY PROFILE */}
            <div className="border-2 border-foreground bg-card shadow-hard-sm">
              <div
                onClick={() => toggleExpand("energy")}
                className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer hover:bg-secondary/40 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="font-mono text-xs text-muted-foreground font-bold">
                    YOUR ENERGY WINDOW
                  </span>
                  <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                    YOUR ENERGY: {profile.energy.peakWindow.split("–")[0]} ·{" "}
                    <span className="text-primary">{profile.energy.confidence} CONFIDENCE</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="font-mono text-xs font-bold border border-foreground px-3 py-1.5 bg-background hover:bg-foreground hover:text-background flex items-center gap-1.5 shrink-0"
                >
                  WHY?{" "}
                  {expandedTrait === "energy" ? (
                    <ChevronUp className="size-3.5" />
                  ) : (
                    <ChevronDown className="size-3.5" />
                  )}
                </button>
              </div>

              {/* Expandable Evidence Card */}
              {expandedTrait === "energy" && (
                <div className="border-t-2 border-foreground p-5 bg-[#FAF7F2] font-mono text-xs space-y-3">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-muted-foreground font-bold block">
                        WHAT LOCKIN OBSERVED:
                      </span>
                      <p className="text-foreground">{profile.energy.evidenceText}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-primary font-bold block">
                        WHAT CHANGED IN YOUR PLAN:
                      </span>
                      <p className="text-foreground">{profile.energy.whatChanged}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/80 text-muted-foreground text-[11px] flex justify-between">
                    <span>Window: {profile.energy.peakWindow}</span>
                    <span>State: {profile.energy.state}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. STARTING FRICTION */}
            <div className="border-2 border-foreground bg-card shadow-hard-sm">
              <div
                onClick={() => toggleExpand("friction")}
                className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer hover:bg-secondary/40 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="font-mono text-xs text-muted-foreground font-bold">
                    YOUR STARTING FRICTION
                  </span>
                  <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                    YOUR STARTING FRICTION: {profile.behavior.state.toUpperCase()} ·{" "}
                    <span className="text-primary">{profile.behavior.confidence} CONFIDENCE</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="font-mono text-xs font-bold border border-foreground px-3 py-1.5 bg-background hover:bg-foreground hover:text-background flex items-center gap-1.5 shrink-0"
                >
                  WHY?{" "}
                  {expandedTrait === "friction" ? (
                    <ChevronUp className="size-3.5" />
                  ) : (
                    <ChevronDown className="size-3.5" />
                  )}
                </button>
              </div>

              {/* Expandable Evidence Card */}
              {expandedTrait === "friction" && (
                <div className="border-t-2 border-foreground p-5 bg-[#FAF7F2] font-mono text-xs space-y-3">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-muted-foreground font-bold block">
                        WHAT LOCKIN OBSERVED:
                      </span>
                      <p className="text-foreground">{profile.behavior.evidenceText}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-primary font-bold block">
                        WHAT CHANGED IN YOUR PLAN:
                      </span>
                      <p className="text-foreground">{profile.behavior.whatChanged}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/80 text-muted-foreground text-[11px] flex justify-between">
                    <span>
                      Average start delay: {profile.behavior.startDelayAvgMinutes} minutes
                    </span>
                    <span>State: {profile.behavior.state}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================
            METHOD EFFECTIVENESS MATRIX
           ========================================================= */}
        <section className="border-2 border-foreground bg-card p-6 shadow-hard-sm space-y-4">
          <div className="flex justify-between items-center font-mono text-xs pb-3 border-b border-border">
            <span className="font-bold uppercase text-foreground">
              METHOD EFFECTIVENESS FOR YOUR BRAIN
            </span>
            <span className="text-muted-foreground">CALIBRATED BY SESSION RATINGS</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 font-mono text-xs">
            {Object.values(profile.methodEvidence || {}).map((method) => (
              <div
                key={method.methodId}
                className="p-4 border-2 border-border bg-background space-y-2"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-foreground">{method.methodName}</span>
                  <span
                    className={`px-1.5 py-0.5 border text-[10px] font-bold ${
                      method.verdict === "STRONG_SIGNAL"
                        ? "bg-accent/20 border-accent text-foreground"
                        : method.verdict === "HIGH_FRICTION"
                          ? "bg-destructive/20 border-destructive text-destructive"
                          : "bg-secondary border-border text-muted-foreground"
                    }`}
                  >
                    {method.verdict.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="text-xl font-black text-foreground">{method.averageRating}/5.0</div>
                <p className="text-[11px] text-muted-foreground leading-snug">{method.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            EVIDENCE & ADAPTATION LEDGER
           ========================================================= */}
        <section className="border-2 border-foreground bg-[#FAF7F2] p-6 shadow-hard-sm space-y-4">
          <div className="flex items-center justify-between font-mono text-xs pb-3 border-b-2 border-foreground">
            <span className="font-bold uppercase flex items-center gap-1.5 text-foreground">
              <History className="size-4 text-primary" />
              EVIDENCE & ADAPTATION LEDGER
            </span>
            <span className="text-muted-foreground">
              TOTAL LOGGED: {adaptationHistory.length} EVENTS
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {adaptationHistory.map((item) => (
              <div
                key={item.id}
                className="p-3.5 border border-foreground/30 bg-background flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{item.description}</span>
                    <span className="text-[10px] text-muted-foreground">({item.timestamp})</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">Trigger: {item.trigger}</div>
                </div>
                <div className="px-2 py-1 bg-secondary border border-border text-[11px] font-bold text-primary shrink-0">
                  {item.impact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA TO RETURN TO WORKSPACE */}
        <div className="pt-2 flex justify-between items-center font-mono text-xs">
          <Button variant="lockin" size="lg" asChild>
            <Link to="/today">
              GO TO TODAY’S PLAN <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
          <Scribble className="text-sm text-primary font-bold hidden sm:block">
            “lockin learns you, not the ideal student.”
          </Scribble>
        </div>
      </main>
    </PageShell>
  );
}
