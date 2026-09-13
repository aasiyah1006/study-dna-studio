// LOCKIN Adaptive Architecture Types

export type ConfidenceLevel = "LOW" | "MEDIUM" | "HIGH";
export type KnowledgeState = "KNOWN" | "INFERRED" | "UNKNOWN";

export type MethodCategory =
  "retrieval" | "understanding" | "visual" | "notes" | "problem_solving" | "planning" | "exam_prep";

export interface StudyMethod {
  id: string;
  name: string;
  category: MethodCategory;
  tagline: string;
  description: string;
  bestFor: string[];
  cognitiveLoad: "low" | "medium" | "high";
  activeMinutesMin: number;
  activeMinutesMax: number;
  instructions: string[];
}

export interface MethodEvidence {
  methodId: string;
  methodName: string;
  subject: string;
  attemptsCount: number;
  completedCount: number;
  abandonedCount: number;
  averageRating: number; // 1-5 self-reported effectiveness
  studentPreference: number; // 1-5 preference ("I like this")
  difficultyRating: number; // 1-5 average perceived difficulty
  evidenceSource: "OBSERVED_TELEMETRY" | "SELF_REPORT" | "DIAGNOSTIC_HYPOTHESIS";
  confidence: ConfidenceLevel;
  verdict:
    | "STRONG_SIGNAL"
    | "PROMISING"
    | "PREFERRED_BUT_UNPROVEN"
    | "HIGH_FRICTION"
    | "INSUFFICIENT_DATA";
  summary: string;
}

export interface MethodExperiment {
  id: string;
  hypothesis: string;
  subject: string;
  methodA: string; // e.g. "outline_notes"
  methodB: string; // e.g. "active_recall"
  sessionsCompletedA: number;
  sessionsCompletedB: number;
  currentStatus: "RUNNING" | "CONCLUDED";
  conclusion?: string;
}

export interface FocusProfile {
  comfortableDurationMin: number;
  maxObservedDurationMin: number;
  estimatedDropOffPointMin: number;
  preferredSessionLengthMin: number;
  breakDurationMin: number;
  breakCadenceType: "brisk_walk" | "screen_free_rest" | "hydration_stretch";
  confidence: ConfidenceLevel;
  state: KnowledgeState;
  reason: string;
  evidenceText: string;
  whatChanged: string;
}

export interface EnergyProfile {
  peakWindow: string; // e.g. "9:00 PM – 11:30 PM"
  lowEnergyWindow: string; // e.g. "2:00 PM – 4:00 PM"
  optimalStudyHours: string;
  energySessionCorrelation: string;
  confidence: ConfidenceLevel;
  state: KnowledgeState;
  reason: string;
  evidenceText: string;
  whatChanged: string;
}

export interface BehaviorProfile {
  startingFriction: "LOW" | "MODERATE" | "HIGH";
  startDelayAvgMinutes: number;
  abandonmentTendency: "LOW" | "MODERATE" | "HIGH";
  overplanningTendency: "LOW" | "HIGH";
  consistencyScore: number; // 0-100
  recoveryAfterMissed: "RESILIENT" | "HIGH_GUILT_DROP";
  confidence: ConfidenceLevel;
  state: KnowledgeState;
  reason: string;
  evidenceText: string;
  whatChanged: string;
}

export interface StudyDnaModel {
  studentId: string;
  studentName: string;
  focus: FocusProfile;
  energy: EnergyProfile;
  behavior: BehaviorProfile;
  preferences: {
    likesNotes: boolean;
    likesVisuals: boolean;
    likesPracticeProblems: boolean;
    likesFlashcards: boolean;
    prefersSolo: boolean;
  };
  methodEvidence: Record<string, MethodEvidence>;
  activeExperiments: MethodExperiment[];
  lastUpdated: string;
  overallCalibrationPercent: number;
}

export type TelemetryEventType =
  | "session_started"
  | "session_completed"
  | "session_abandoned"
  | "method_selected"
  | "method_completed"
  | "method_skipped"
  | "break_taken"
  | "break_extended"
  | "task_started_late"
  | "task_completed"
  | "feedback_submitted"
  | "confidence_reported"
  | "difficulty_reported"
  | "effectiveness_reported";

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: TelemetryEventType;
  subject: string;
  taskTitle: string;
  methodId: string;
  plannedDurationMin: number;
  actualDurationMin: number;
  abandonedAtMin?: number;
  energyReported?: "LOW" | "MEDIUM" | "HIGH";
  effectivenessRating?: number; // 1-5
  difficultyRating?: number; // 1-5
  confidenceReported?: number; // 1-5
  feedbackNote?: string;
  studentId: string;
}

export interface MethodRecommendation {
  methodId: string;
  methodName: string;
  category: MethodCategory;
  matchScore: number;
  whyThis: string;
  evidenceSummary: string;
  isExperiment?: boolean;
}

export interface StudyPlanItem {
  id: string;
  blockNumber: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  recommendedMethod: StudyMethod;
  whyThisDuration: string;
  whyThisMethod: string;
  adaptationNote: string;
  startingFrictionProtocol: string;
  isMinimumViable: boolean;
}

export interface AdaptationHistoryItem {
  id: string;
  timestamp: string;
  triggerEvent: string;
  beforeState: string;
  afterState: string;
  reasoning: string;
  metricImpact: string;
}
