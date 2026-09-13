import { StudyDnaModel, TelemetryEvent, AdaptationHistoryItem } from "./types";

const STORAGE_KEYS = {
  ACTIVE_PROFILE_ID: "lockin_active_profile_id_v2",
  PROFILES: "lockin_profiles_v2",
  TELEMETRY: "lockin_telemetry_events_v2",
  ADAPTATION_LOG: "lockin_adaptation_history_v2",
};

export const STUDENT_A_PRESET: StudyDnaModel = {
  studentId: "deep_focus_profile",
  studentName: "Deep Focus Profile",
  focus: {
    comfortableDurationMin: 60,
    maxObservedDurationMin: 75,
    estimatedDropOffPointMin: 68,
    preferredSessionLengthMin: 60,
    breakDurationMin: 10,
    breakCadenceType: "hydration_stretch",
    confidence: "HIGH",
    state: "KNOWN",
    reason:
      "Consistent endurance demonstrated across 7 recorded sessions without early abandonment.",
    evidenceText: "7 completed 50-65m blocks with >90% self-rated attention maintenance.",
    whatChanged: "Session blocks permitted up to 60 minutes with 10-minute recovery breaks.",
  },
  energy: {
    peakWindow: "10:00 AM – 1:00 PM",
    lowEnergyWindow: "3:30 PM – 5:30 PM",
    optimalStudyHours: "Morning to early afternoon",
    energySessionCorrelation:
      "Morning blocks exhibit 35% higher task density than late night blocks.",
    confidence: "HIGH",
    state: "KNOWN",
    reason: "Consistent high ratings and zero abandonment during morning study slots.",
    evidenceText: "5 of 6 morning sessions completed cleanly with high focus ratings.",
    whatChanged: "Primary heavy conceptual blocks scheduled before 1:00 PM.",
  },
  behavior: {
    startingFriction: "LOW",
    startDelayAvgMinutes: 4,
    abandonmentTendency: "LOW",
    overplanningTendency: "LOW",
    consistencyScore: 92,
    recoveryAfterMissed: "RESILIENT",
    confidence: "HIGH",
    state: "KNOWN",
    reason:
      "Initiates sessions promptly once scheduled; handles multi-step task lists without dread.",
    evidenceText: "Average start delay under 5 minutes; 92% adherence to initiated blocks.",
    whatChanged: "Plans feature multi-stage deep work sequences without micro-scaffolding.",
  },
  preferences: {
    likesNotes: true,
    likesVisuals: false,
    likesPracticeProblems: true,
    likesFlashcards: false,
    prefersSolo: true,
  },
  methodEvidence: {
    progressive_summarization: {
      methodId: "progressive_summarization",
      methodName: "Progressive Summarization",
      subject: "Biology",
      attemptsCount: 6,
      completedCount: 6,
      abandonedCount: 0,
      averageRating: 4.6,
      studentPreference: 5,
      difficultyRating: 3.2,
      evidenceSource: "OBSERVED_TELEMETRY",
      confidence: "HIGH",
      verdict: "STRONG_SIGNAL",
      summary:
        "High completion and retention when summarizing and distilling structured chapter notes.",
    },
    active_recall: {
      methodId: "active_recall",
      methodName: "Active Recall",
      subject: "Biology",
      attemptsCount: 4,
      completedCount: 4,
      abandonedCount: 0,
      averageRating: 4.8,
      studentPreference: 4,
      difficultyRating: 3.8,
      evidenceSource: "OBSERVED_TELEMETRY",
      confidence: "HIGH",
      verdict: "STRONG_SIGNAL",
      summary: "Excels at recall testing after initial structured note condensation.",
    },
    minimum_viable_session: {
      methodId: "minimum_viable_session",
      methodName: "Minimum Viable Study Sprint",
      subject: "Biology",
      attemptsCount: 1,
      completedCount: 1,
      abandonedCount: 0,
      averageRating: 3.0,
      studentPreference: 2,
      difficultyRating: 1.0,
      evidenceSource: "OBSERVED_TELEMETRY",
      confidence: "LOW",
      verdict: "PROMISING",
      summary:
        "Micro-sprints feel overly fragmented; student prefers uninterrupted 50-60m flow states.",
    },
  },
  activeExperiments: [],
  lastUpdated: "Today 09:15",
  overallCalibrationPercent: 91,
};

export const STUDENT_B_PRESET: StudyDnaModel = {
  studentId: "my_calibrated_profile",
  studentName: "My Calibrated Profile",
  focus: {
    comfortableDurationMin: 22,
    maxObservedDurationMin: 32,
    estimatedDropOffPointMin: 26,
    preferredSessionLengthMin: 20,
    breakDurationMin: 5,
    breakCadenceType: "brisk_walk",
    confidence: "HIGH",
    state: "KNOWN",
    reason:
      "Clear fatigue threshold detected between 24 and 28 minutes; sessions >30m show 75% abandonment.",
    evidenceText:
      "4 of 5 sessions scheduled above 30m were abandoned early; 20-25m blocks have 100% completion.",
    whatChanged:
      "Strict 22-25 minute ceiling on all single study blocks with mandatory movement breaks.",
  },
  energy: {
    peakWindow: "9:00 PM – 11:45 PM",
    lowEnergyWindow: "1:00 PM – 4:00 PM",
    optimalStudyHours: "Late evening surge",
    energySessionCorrelation:
      "Evening sessions show 2.8x higher completion than afternoon attempts.",
    confidence: "HIGH",
    state: "KNOWN",
    reason: "Student experiences morning/afternoon brain fog but hyper-focuses late at night.",
    evidenceText: "Evening blocks show immediate initiation and higher reported satisfaction.",
    whatChanged: "Primary work block shifted to 9:30 PM with zero morning pressure.",
  },
  behavior: {
    startingFriction: "HIGH",
    startDelayAvgMinutes: 28,
    abandonmentTendency: "HIGH",
    overplanningTendency: "HIGH",
    consistencyScore: 54,
    recoveryAfterMissed: "HIGH_GUILT_DROP",
    confidence: "HIGH",
    state: "KNOWN",
    reason:
      "Intimidated by large, ambiguous tasks; tends to procrastinate on phone if the first step is vague.",
    evidenceText:
      "Average initiation lag 28m on large tasks; drops to 3m when presented with micro-sprints.",
    whatChanged:
      "Plans now lead with micro-first actions, 15m minimum viable sessions, and active recall drills.",
  },
  preferences: {
    likesNotes: false,
    likesVisuals: true,
    likesPracticeProblems: false,
    likesFlashcards: true,
    prefersSolo: true,
  },
  methodEvidence: {
    progressive_summarization: {
      methodId: "progressive_summarization",
      methodName: "Progressive Summarization / Passive Notes",
      subject: "Biology",
      attemptsCount: 3,
      completedCount: 1,
      abandonedCount: 2,
      averageRating: 2.1,
      studentPreference: 1,
      difficultyRating: 4.4,
      evidenceSource: "OBSERVED_TELEMETRY",
      confidence: "HIGH",
      verdict: "HIGH_FRICTION",
      summary: "Severe drowsiness and distraction observed during passive reading and outlining.",
    },
    active_recall: {
      methodId: "active_recall",
      methodName: "Active Recall (Drill sprint)",
      subject: "Biology",
      attemptsCount: 5,
      completedCount: 5,
      abandonedCount: 0,
      averageRating: 4.7,
      studentPreference: 4,
      difficultyRating: 3.5,
      evidenceSource: "OBSERVED_TELEMETRY",
      confidence: "HIGH",
      verdict: "STRONG_SIGNAL",
      summary: "Short, gamified retrieval drills keep attention hooked without cognitive drift.",
    },
    whiteboard_dual_coding: {
      methodId: "whiteboard_dual_coding",
      methodName: "Dual-Coding / Visual Flowcharts",
      subject: "Biology",
      attemptsCount: 3,
      completedCount: 3,
      abandonedCount: 0,
      averageRating: 4.9,
      studentPreference: 5,
      difficultyRating: 2.8,
      evidenceSource: "OBSERVED_TELEMETRY",
      confidence: "MEDIUM",
      verdict: "STRONG_SIGNAL",
      summary:
        "Kinesthetic spatial sketching on tablet/whiteboard eliminates starting dread completely.",
    },
  },
  activeExperiments: [
    {
      id: "exp_notes_vs_retrieval_maya",
      hypothesis: "Visual diagramming vs Flashcards for cellular respiration retention",
      subject: "Biology",
      methodA: "whiteboard_dual_coding",
      methodB: "flashcards_spaced",
      sessionsCompletedA: 2,
      sessionsCompletedB: 1,
      currentStatus: "RUNNING",
      conclusion:
        "Preliminary: Visual diagramming has 100% completion and zero distraction triggers.",
    },
  ],
  lastUpdated: "Today 08:30",
  overallCalibrationPercent: 86,
};

export const INITIAL_DEFAULT_PROFILE = STUDENT_B_PRESET;

// Storage Accessors
export function loadAllProfiles(): Record<string, StudyDnaModel> {
  if (typeof window === "undefined") {
    return {
      [STUDENT_A_PRESET.studentId]: STUDENT_A_PRESET,
      [STUDENT_B_PRESET.studentId]: STUDENT_B_PRESET,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (!raw) {
      const initial = {
        [STUDENT_A_PRESET.studentId]: STUDENT_A_PRESET,
        [STUDENT_B_PRESET.studentId]: STUDENT_B_PRESET,
      };
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load profiles", err);
    return {
      [STUDENT_A_PRESET.studentId]: STUDENT_A_PRESET,
      [STUDENT_B_PRESET.studentId]: STUDENT_B_PRESET,
    };
  }
}

export function saveAllProfiles(profiles: Record<string, StudyDnaModel>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  } catch (err) {
    console.error("Failed to save profiles", err);
  }
}

export function getActiveProfileId(): string {
  if (typeof window === "undefined") return STUDENT_B_PRESET.studentId;
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE_ID) || STUDENT_B_PRESET.studentId;
}

export function setActiveProfileId(id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, id);
}

export function getActiveProfile(): StudyDnaModel {
  const profiles = loadAllProfiles();
  const activeId = getActiveProfileId();
  return profiles[activeId] || profiles[STUDENT_B_PRESET.studentId] || STUDENT_B_PRESET;
}

export function saveActiveProfile(profile: StudyDnaModel) {
  const profiles = loadAllProfiles();
  profiles[profile.studentId] = profile;
  saveAllProfiles(profiles);
}

// Telemetry Persistence
export function loadTelemetryEvents(): TelemetryEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TELEMETRY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function appendTelemetryEvent(event: TelemetryEvent) {
  if (typeof window === "undefined") return;
  try {
    const existing = loadTelemetryEvents();
    existing.push(event);
    localStorage.setItem(STORAGE_KEYS.TELEMETRY, JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to append telemetry", err);
  }
}

// Adaptation History
export function loadAdaptationHistory(): AdaptationHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADAPTATION_LOG);
    if (!raw) {
      const defaultLog: AdaptationHistoryItem[] = [
        {
          id: "log-1",
          timestamp: "Yesterday 21:40",
          triggerEvent: "session_abandoned at 24 mins (scheduled 45 mins)",
          beforeState: "Scheduled Duration: 45 min passive review",
          afterState: "Calibrated Duration: 25 min + Active Recall",
          reasoning:
            "Observed severe attention drop-off at min 24. Shifted to sub-30m active retrieval.",
          metricImpact: "Session completion probability increased from 42% to 94%",
        },
        {
          id: "log-2",
          timestamp: "Today 08:30",
          triggerEvent: "Morning diagnostic & session initiation latency analysis",
          beforeState: "Morning study block: 09:00 AM",
          afterState: "Evening primary block: 09:30 PM",
          reasoning:
            "Consistent 28-minute starting delay detected during daytime; high flow observed post-9PM.",
          metricImpact: "Starting friction reduced from HIGH to MODERATE",
        },
      ];
      localStorage.setItem(STORAGE_KEYS.ADAPTATION_LOG, JSON.stringify(defaultLog));
      return defaultLog;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function recordAdaptation(item: AdaptationHistoryItem) {
  if (typeof window === "undefined") return;
  try {
    const existing = loadAdaptationHistory();
    existing.unshift(item);
    localStorage.setItem(STORAGE_KEYS.ADAPTATION_LOG, JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to record adaptation", err);
  }
}

export function resetAllStorageToDefaults() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
  localStorage.removeItem(STORAGE_KEYS.PROFILES);
  localStorage.removeItem(STORAGE_KEYS.TELEMETRY);
  localStorage.removeItem(STORAGE_KEYS.ADAPTATION_LOG);
}
