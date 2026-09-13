import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import {
  Check,
  Pause,
  Play,
  Square,
  AlertTriangle,
  FastForward,
  Flame,
  ArrowRight,
  Shield,
  Smartphone,
} from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { PageShell, Scribble } from "@/components/lockin/site";
import { Button } from "@/components/ui/button";
import { useLockin } from "@/lib/lockin/store";
import { getMethodById } from "@/lib/lockin/methods";

export const Route = createFileRoute("/session")({
  head: () => ({
    meta: [
      { title: "Live Study Session — LOCKIN" },
      {
        name: "description",
        content: "Calibrated study sprint with real-time focus telemetry tracking.",
      },
    ],
  }),
  component: SessionComponent,
});

function SessionComponent() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/session" }) as Record<string, unknown>;
  const { profile, todayPlan, recordTelemetry } = useLockin();

  const durationMin = useMemo(() => {
    return Number(search?.duration) || todayPlan.durationMinutes || 25;
  }, [search, todayPlan]);

  const methodId = useMemo(() => {
    return (search?.methodId as string) || todayPlan.recommendedMethod.id;
  }, [search, todayPlan]);

  const subject = (search?.subject as string) || todayPlan.subject || "Biology";
  const activeMethod = getMethodById(methodId);

  const totalSeconds = durationMin * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [distractionCount, setDistractionCount] = useState(0);

  // Timer Tick
  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running, secondsLeft]);

  const elapsedSeconds = totalSeconds - secondsLeft;
  const elapsedMinutes = Math.max(1, Math.round(elapsedSeconds / 60));

  const handleFinishSession = useCallback(() => {
    setRunning(false);
    recordTelemetry({
      type: "session_completed",
      plannedDurationMin: durationMin,
      actualDurationMin: elapsedMinutes,
      subject,
      methodId,
    });
    navigate({
      to: "/feedback",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        status: "completed",
        methodId,
        planned: durationMin,
        actual: elapsedMinutes,
        subject,
      }),
    });
  }, [durationMin, elapsedMinutes, methodId, navigate, recordTelemetry, subject]);

  // Auto-finish on zero
  useEffect(() => {
    if (secondsLeft === 0) {
      handleFinishSession();
    }
  }, [secondsLeft, handleFinishSession]);

  const handleAbandonSession = () => {
    setRunning(false);
    const abandonedAt = Math.max(1, elapsedMinutes);
    recordTelemetry({
      type: "session_abandoned",
      plannedDurationMin: durationMin,
      actualDurationMin: abandonedAt,
      abandonedAtMin: abandonedAt,
      subject,
      methodId,
    });
    navigate({
      to: "/feedback",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        status: "abandoned",
        methodId,
        planned: durationMin,
        actual: abandonedAt,
        subject,
      }),
    });
  };

  // Demo simulator functions for judges
  const fastForwardToMin = (targetMin: number) => {
    const remaining = Math.max(10, (durationMin - targetMin) * 60);
    setSecondsLeft(remaining);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const progressPercent = Math.min(
    100,
    Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100),
  );

  return (
    <PageShell bare>
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* TOP STATUS BAR */}
        <div className="flex justify-between items-center font-mono text-xs border-2 border-foreground bg-card p-3 shadow-hard-sm">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                running ? "bg-accent animate-ping" : "bg-muted-foreground"
              }`}
            />
            <span className="font-bold">LOCKIN LIVE / BLOCK 01 — {subject.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <span>METHOD: {activeMethod.name}</span>
            <span className="hidden sm:inline">STUDENT: {profile.studentName.split(" ")[0]}</span>
          </div>
        </div>

        {/* CLOCK & CIRCLE DISPLAY */}
        <section className="border-2 border-foreground bg-card p-6 sm:p-10 shadow-hard text-center space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-primary font-bold tracking-wider uppercase">
              {subject} · {activeMethod.name}
            </span>
            <div className="text-6xl sm:text-8xl font-sans font-black tracking-tight text-foreground">
              {mm}:{ss}
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              {elapsedMinutes} of {durationMin} min elapsed ({progressPercent}% complete)
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full max-w-md mx-auto h-3 border-2 border-foreground bg-background overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* MAIN CONTROLS */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              variant="paper"
              size="lg"
              onClick={() => setRunning(!running)}
              className="font-mono text-xs font-bold min-w-[140px]"
            >
              {running ? (
                <>
                  <Pause className="mr-2 size-4" /> PAUSE FOCUS
                </>
              ) : (
                <>
                  <Play className="mr-2 size-4" />{" "}
                  {secondsLeft === totalSeconds ? "START FOCUS" : "RESUME"}
                </>
              )}
            </Button>

            <Button
              variant="lockin"
              size="lg"
              onClick={handleFinishSession}
              className="font-mono text-xs font-bold"
            >
              <Square className="mr-2 size-4" /> FINISH BLOCK & LOG
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleAbandonSession}
              className="font-mono text-xs border-2 border-destructive text-destructive hover:bg-destructive/10 cursor-pointer"
            >
              <AlertTriangle className="mr-2 size-4" /> TAP OUT EARLY (TEST ADAPTATION)
            </Button>
          </div>

          {/* TELEMETRY QUICK-INPUTS */}
          <div className="pt-4 border-t border-border flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDistractionCount((c) => c + 1)}
                className="px-2.5 py-1 border border-foreground bg-background hover:bg-secondary flex items-center gap-1.5 cursor-pointer shadow-hard-sm"
              >
                <Smartphone className="size-3 text-destructive" />
                LOG PHONE IMPULSE ({distractionCount})
              </button>
            </div>

            {/* DEMO FAST-FORWARD (FOR COMPETITION JUDGING) */}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <FastForward className="size-3 text-accent" />
              <span className="text-[10px] uppercase font-bold">DEMO FAST-FORWARD:</span>
              <button
                type="button"
                onClick={() => fastForwardToMin(18)}
                className="px-1.5 py-0.5 border border-border bg-background hover:border-foreground text-[10px] cursor-pointer"
                title="Simulate reaching minute 18 (attention drop-off test)"
              >
                18m mark
              </button>
              <button
                type="button"
                onClick={() => fastForwardToMin(durationMin - 1)}
                className="px-1.5 py-0.5 border border-border bg-background hover:border-foreground text-[10px] cursor-pointer"
                title="Simulate 1 min remaining"
              >
                95% done
              </button>
            </div>
          </div>
        </section>

        {/* METHOD INSTRUCTIONS CARD */}
        <section className="border-2 border-foreground bg-card p-6 shadow-hard space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-border pb-2">
            <span className="font-bold uppercase flex items-center gap-1.5 text-primary">
              <Shield className="size-4" />
              YOUR EXECUTION DIRECTIVE: {activeMethod.name}
            </span>
            <span className="text-muted-foreground">
              COGNITIVE LOAD: {activeMethod.cognitiveLoad.toUpperCase()}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {activeMethod.instructions.map((inst, i) => (
              <div
                key={i}
                className="p-3 border border-border bg-background flex gap-2.5 items-start"
              >
                <span className="font-bold text-primary shrink-0">0{i + 1}.</span>
                <p className="text-foreground leading-relaxed">{inst}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-muted-foreground">
            <Scribble className="text-xs">
              “your brain needs to reconstruct knowledge from memory, not reread.”
            </Scribble>
            <span className="text-[10px]">LOCKIN FOCUS ENGINE v2.4</span>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
