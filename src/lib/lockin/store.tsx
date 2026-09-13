import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  StudyDnaModel,
  StudyPlanItem,
  TelemetryEvent,
  AdaptationHistoryItem,
  MethodRecommendation,
} from "./types";
import {
  getActiveProfile,
  saveActiveProfile,
  loadAllProfiles,
  saveAllProfiles,
  setActiveProfileId,
  STUDENT_A_PRESET,
  STUDENT_B_PRESET,
  loadAdaptationHistory,
  resetAllStorageToDefaults,
} from "./storage";
import {
  generateTodayPlan,
  recommendMethods,
  processTelemetryEvent,
  createProfileFromOnboarding,
} from "./engine";

interface LockinContextType {
  profile: StudyDnaModel;
  todayPlan: StudyPlanItem;
  recommendations: MethodRecommendation[];
  adaptationHistory: AdaptationHistoryItem[];
  allProfiles: Record<string, StudyDnaModel>;
  switchProfile: (profileId: string) => void;
  submitOnboarding: (answers: Record<number, string>) => StudyDnaModel;
  recordTelemetry: (event: Omit<TelemetryEvent, "id" | "timestamp" | "studentId">) => void;
  resetToDefaults: () => void;
  refreshState: () => void;
}

const LockinContext = createContext<LockinContextType | null>(null);

export function LockinProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<StudyDnaModel>(() => getActiveProfile());
  const [adaptationHistory, setAdaptationHistory] = useState<AdaptationHistoryItem[]>(() =>
    loadAdaptationHistory(),
  );
  const [allProfiles, setAllProfiles] = useState<Record<string, StudyDnaModel>>(() =>
    loadAllProfiles(),
  );

  const refreshState = useCallback(() => {
    const current = getActiveProfile();
    setProfile(current);
    setAdaptationHistory(loadAdaptationHistory());
    setAllProfiles(loadAllProfiles());
  }, []);

  const switchProfile = useCallback((profileId: string) => {
    setActiveProfileId(profileId);
    const profiles = loadAllProfiles();
    const next = profiles[profileId] || profiles[STUDENT_B_PRESET.studentId] || STUDENT_B_PRESET;
    setProfile(next);
    setAdaptationHistory(loadAdaptationHistory());
  }, []);

  const submitOnboarding = useCallback((answers: Record<number, string>) => {
    const newProfile = createProfileFromOnboarding(answers);
    setActiveProfileId(newProfile.studentId);
    setProfile(newProfile);
    setAllProfiles(loadAllProfiles());
    setAdaptationHistory(loadAdaptationHistory());
    return newProfile;
  }, []);

  const recordTelemetry = useCallback(
    (eventData: Omit<TelemetryEvent, "id" | "timestamp" | "studentId">) => {
      const fullEvent: TelemetryEvent = {
        ...eventData,
        id: `telem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toISOString(),
        studentId: profile.studentId,
      };

      const { updatedProfile } = processTelemetryEvent(fullEvent, profile);
      setProfile(updatedProfile);
      setAdaptationHistory(loadAdaptationHistory());
      setAllProfiles(loadAllProfiles());
    },
    [profile],
  );

  const resetToDefaults = useCallback(() => {
    resetAllStorageToDefaults();
    setActiveProfileId(STUDENT_B_PRESET.studentId);
    setProfile(STUDENT_B_PRESET);
    setAllProfiles({
      [STUDENT_A_PRESET.studentId]: STUDENT_A_PRESET,
      [STUDENT_B_PRESET.studentId]: STUDENT_B_PRESET,
    });
    setAdaptationHistory(loadAdaptationHistory());
  }, []);

  const todayPlan = generateTodayPlan(profile, "Biology", "Cell respiration");
  const recommendations = recommendMethods(profile, "Biology", "Cell respiration");

  return (
    <LockinContext.Provider
      value={{
        profile,
        todayPlan,
        recommendations,
        adaptationHistory,
        allProfiles,
        switchProfile,
        submitOnboarding,
        recordTelemetry,
        resetToDefaults,
        refreshState,
      }}
    >
      {children}
    </LockinContext.Provider>
  );
}

export function useLockin() {
  const context = useContext(LockinContext);
  if (!context) {
    throw new Error("useLockin must be used within a LockinProvider");
  }
  return context;
}
