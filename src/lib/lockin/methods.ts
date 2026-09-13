import { StudyMethod } from "./types";

export const STUDY_METHODS: Record<string, StudyMethod> = {
  // RETRIEVAL & MEMORY
  active_recall: {
    id: "active_recall",
    name: "Active Recall",
    category: "retrieval",
    tagline: "Prompt-driven retrieval with all notes firmly closed.",
    description:
      "Force your brain to reconstruct concepts from memory rather than passively reviewing notes.",
    bestFor: ["Definitions", "Biological pathways", "Formula derivations", "Key concepts"],
    cognitiveLoad: "high",
    activeMinutesMin: 15,
    activeMinutesMax: 35,
    instructions: [
      "Review the core topic prompt or problem header.",
      "Close all notebooks, browsers, and summaries completely.",
      "Write or sketch everything you remember onto blank paper.",
      "Re-open source material only to identify specific blindspots in red.",
    ],
  },
  free_recall_blurting: {
    id: "free_recall_blurting",
    name: "Blurting / Free Recall",
    category: "retrieval",
    tagline: "Rapid memory dump on a blank page against a short timer.",
    description:
      "Unstructured retrieval sprint to reveal mental model holes before structured review.",
    bestFor: ["Chapter overviews", "Historical timelines", "Anatomy terminology"],
    cognitiveLoad: "high",
    activeMinutesMin: 10,
    activeMinutesMax: 20,
    instructions: [
      "Set a strict 8-12 minute timer.",
      "Dump every formula, term, and connection you remember onto a blank page.",
      "Stop when the timer rings.",
      "Annotate omissions in contrasting color.",
    ],
  },
  flashcards_spaced: {
    id: "flashcards_spaced",
    name: "Spaced Flashcard Drills",
    category: "retrieval",
    tagline: "High-frequency targeted card intervals with honest ratings.",
    description: "Systematic testing of atomized facts calibrated by difficulty rating.",
    bestFor: ["Vocabulary", "Drug classifications", "Dates & cases", "Syntax snippets"],
    cognitiveLoad: "medium",
    activeMinutesMin: 15,
    activeMinutesMax: 30,
    instructions: [
      "Read front of card without touching answer.",
      "Speak or write answer before revealing back.",
      "Rate recall speed honestly: Hard, Good, or Easy.",
      "Separate failed cards for immediate same-day re-drilling.",
    ],
  },
  practice_testing: {
    id: "practice_testing",
    name: "Practice Testing",
    category: "retrieval",
    tagline: "Simulated exam conditions targeting high-yield questions.",
    description: "Realistic question answering with post-mortem mistake analysis.",
    bestFor: ["Midterm prep", "Standardized exams", "Application scenarios"],
    cognitiveLoad: "high",
    activeMinutesMin: 20,
    activeMinutesMax: 45,
    instructions: [
      "Select 3-5 challenging questions from question banks or past exams.",
      "Run under realistic time constraints without consulting reference books.",
      "Grade rigorously against official scoring rubrics.",
      "Document root causes in an error log.",
    ],
  },

  // UNDERSTANDING & SYNTHESIS
  feynman_technique: {
    id: "feynman_technique",
    name: "Feynman Teach-Back",
    category: "understanding",
    tagline: "Explain the concept out loud like you're teaching a middle schooler.",
    description:
      "Strip away academic jargon. If you cannot explain it simply, you do not understand it.",
    bestFor: ["Complex mechanisms", "Physics principles", "Philosophy arguments"],
    cognitiveLoad: "high",
    activeMinutesMin: 15,
    activeMinutesMax: 30,
    instructions: [
      "Identify the single sub-mechanism or phenomenon.",
      "Explain the concept out loud in plain, everyday language.",
      "Pinpoint where you stumble or rely on buzzwords.",
      "Go back to source material to refine the analogy.",
    ],
  },
  elaborative_interrogation: {
    id: "elaborative_interrogation",
    name: "Elaborative Interrogation",
    category: "understanding",
    tagline: "Asking 'Why is this fact true?' and 'How does it connect?'",
    description: "Deepens semantic networks by linking newly acquired facts with prior knowledge.",
    bestFor: ["Physiology", "Organic chemistry reactions", "Sociology theories"],
    cognitiveLoad: "medium",
    activeMinutesMin: 15,
    activeMinutesMax: 30,
    instructions: [
      "Pick a specific factual statement from the text.",
      "Ask: Why does this reaction happen in this sequence?",
      "Formulate a causal explanation referencing foundational principles.",
      "Verify explanation against textbook explanations.",
    ],
  },

  // VISUAL & SPATIAL
  whiteboard_dual_coding: {
    id: "whiteboard_dual_coding",
    name: "Dual-Coding & Whiteboard Maps",
    category: "visual",
    tagline: "Translating words into spatial flowcharts and physical schematics.",
    description: "Combines linguistic and visual representations to form dual memory traces.",
    bestFor: ["Biochemical cycles", "Network topologies", "Causal loops"],
    cognitiveLoad: "medium",
    activeMinutesMin: 20,
    activeMinutesMax: 40,
    instructions: [
      "Draw the sequence of entities as interconnected geometric nodes.",
      "Label directional arrows with specific catalysts or causal verbs.",
      "Color-code inputs (blue), outputs (green), and friction points (red).",
      "Re-draw the map from memory on a blank surface.",
    ],
  },

  // NOTES & COMPRESSION
  progressive_summarization: {
    id: "progressive_summarization",
    name: "Progressive Summarization",
    category: "notes",
    tagline: "Layered distillation from raw material to a 1-sentence essence.",
    description:
      "Active note compression: bolding key parts, highlighting top lines, and writing an executive summary.",
    bestFor: ["Dense textbook chapters", "Research papers", "Legal briefs"],
    cognitiveLoad: "medium",
    activeMinutesMin: 20,
    activeMinutesMax: 45,
    instructions: [
      "Pass 1: Read and capture core raw notes.",
      "Pass 2: Bold the critical 20% of statements.",
      "Pass 3: Highlight the absolute vital 5% insights.",
      "Pass 4: Write a 2-sentence executive summary in your own words.",
    ],
  },
  question_based_notes: {
    id: "question_based_notes",
    name: "Question-Based Notes",
    category: "notes",
    tagline: "Turn every heading and bullet point into an interrogative prompt.",
    description: "Prepares raw notes directly for future active recall without passive rereading.",
    bestFor: ["Lecture notes", "Seminar preparation", "Literature reviews"],
    cognitiveLoad: "medium",
    activeMinutesMin: 20,
    activeMinutesMax: 35,
    instructions: [
      "Read a section header or bullet point.",
      "Rewrite it as a specific inquiry: 'Under what conditions does X fail?'",
      "Hide answer underneath or in accordion fold.",
      "Test yourself immediately on the newly framed questions.",
    ],
  },
  cornell_synthesis: {
    id: "cornell_synthesis",
    name: "Cornell Structured Synthesis",
    category: "notes",
    tagline: "Three-tier architecture: Cue Column, Note Area, and 2-sentence Summary.",
    description:
      "Forces active synthesis during lectures and provides instant built-in self-testing cues.",
    bestFor: ["College lectures", "Research seminars", "History & social sciences"],
    cognitiveLoad: "medium",
    activeMinutesMin: 20,
    activeMinutesMax: 40,
    instructions: [
      "Record concise lecture points in the main right-hand column (6-inch width).",
      "Immediately after class, write recall cues & test questions in left margin (2.5-inch cue column).",
      "Cover notes and quiz yourself solely using the cue questions.",
      "Draft a 2-sentence bottom summary synthesizing the core lesson thesis.",
    ],
  },
  leitner_box_system: {
    id: "leitner_box_system",
    name: "Leitner 5-Box Interval System",
    category: "retrieval",
    tagline: "Systematic flashcard migration across graduated review boxes.",
    description:
      "Wrong answers return to Box 1 for daily review; mastered cards graduate toward weekly and monthly intervals.",
    bestFor: ["Medical terminology", "Foreign language vocabulary", "Legal case laws"],
    cognitiveLoad: "medium",
    activeMinutesMin: 15,
    activeMinutesMax: 30,
    instructions: [
      "Start with all cards in Box 1 (reviewed every single day).",
      "If answered correctly, advance the card to Box 2 (reviewed every 3 days).",
      "If answered incorrectly, demote the card back to Box 1 immediately.",
      "Box 5 cards (mastered) are reviewed once every 30 days before exams.",
    ],
  },
  sq3r_comprehension: {
    id: "sq3r_comprehension",
    name: "SQ3R Deep Chapter Deconstruction",
    category: "understanding",
    tagline: "Survey, Question, Read, Retrieve, and Review dense academic text.",
    description:
      "Transforms passive textbook reading into an investigative interrogation before highlighting anything.",
    bestFor: ["Dense STEM textbooks", "Philosophy texts", "Complex case studies"],
    cognitiveLoad: "high",
    activeMinutesMin: 25,
    activeMinutesMax: 50,
    instructions: [
      "Survey: Skim chapter headings, charts, and conclusion summaries in 3 minutes.",
      "Question: Turn major section headings into specific questions to be answered.",
      "Read: Read with the sole objective of answering your formulated questions.",
      "Retrieve: Look away and recite or blurt answers to each question from memory.",
      "Review: Revisit questions and fill remaining knowledge gaps.",
    ],
  },
  flowmodoro_sprint: {
    id: "flowmodoro_sprint",
    name: "Flowmodoro Self-Paced Sprint",
    category: "planning",
    tagline: "Stopwatch counts UP to match natural flow; break length is proportional.",
    description:
      "Eliminates the anxiety of countdown timers. Study until focus naturally flags, then take a proportional rest (e.g. 5 minutes rest per 25 minutes worked).",
    bestFor: [
      "Coding",
      "Essay drafting",
      "Complex mathematical proofs",
      "Students with timer anxiety",
    ],
    cognitiveLoad: "low",
    activeMinutesMin: 15,
    activeMinutesMax: 60,
    instructions: [
      "Start a count-UP stopwatch rather than a countdown alarm.",
      "Work uninterrupted until you feel your focus naturally drift or hit a milestone.",
      "Stop the timer and note the elapsed time (e.g., 35 minutes).",
      "Take a break equal to 1/5th of the elapsed time (7 minutes).",
    ],
  },

  // PROBLEM SOLVING
  deliberate_practice_problems: {
    id: "deliberate_practice_problems",
    name: "Deliberate Problem Sets",
    category: "problem_solving",
    tagline: "Targeting problems right at the edge of your current ability.",
    description: "Solves problems with immediate feedback, avoiding comfortable repetition.",
    bestFor: ["Calculus", "Data structures & algorithms", "Microeconomics"],
    cognitiveLoad: "high",
    activeMinutesMin: 25,
    activeMinutesMax: 60,
    instructions: [
      "Select problems from your hardest unmastered category.",
      "Work through the solution without looking at hints.",
      "Immediately check solution mechanics upon completion.",
      "Log any conceptual missteps in your error ledger.",
    ],
  },
  worked_example_interleaving: {
    id: "worked_example_interleaving",
    name: "Worked Examples + Interleaving",
    category: "problem_solving",
    tagline: "Study solved patterns, then interleave contrasting problem types.",
    description:
      "Prevents mechanical rote-solving by mixing problem types that require discrimination.",
    bestFor: ["Statistics", "Organic chemistry synthesis", "Physics mechanics"],
    cognitiveLoad: "high",
    activeMinutesMin: 25,
    activeMinutesMax: 45,
    instructions: [
      "Study one fully solved exemplary problem, noticing the strategic pivot.",
      "Solve an isomorphic paired problem immediately.",
      "Switch immediately to a different problem archetype to force category discrimination.",
      "Reflect on the trigger cues that dictated each approach.",
    ],
  },

  // PLANNING & BEHAVIORAL INTERVENTION
  minimum_viable_session: {
    id: "minimum_viable_session",
    name: "Minimum Viable Study Sprint",
    category: "planning",
    tagline: "Micro-commitment designed to dissolve massive starting friction.",
    description: "When dread is high, commit to only 15 minutes with a frictionless first action.",
    bestFor: ["High starting procrastination", "Post-burnout restart", "Low-energy evenings"],
    cognitiveLoad: "low",
    activeMinutesMin: 12,
    activeMinutesMax: 20,
    instructions: [
      "Goal is purely initiation, not heroic mastery.",
      "Commit to exactly 15 minutes of low-intimidation work.",
      "Put phone in another room or turn on airplane mode.",
      "When timer rings, you have full permission to stop without guilt.",
    ],
  },
  implementation_intentions: {
    id: "implementation_intentions",
    name: "If-Then Execution Anchoring",
    category: "planning",
    tagline: "Pre-commit explicit situational triggers: 'When X happens, I do Y.'",
    description: "Automates task initiation by attaching study starts to existing daily anchors.",
    bestFor: ["Inconsistent schedules", "Habit formation", "Afternoon slumps"],
    cognitiveLoad: "low",
    activeMinutesMin: 15,
    activeMinutesMax: 30,
    instructions: [
      "State: 'When I close my dinner plate, I immediately open Biology card deck.'",
      "Remove all friction materials beforehand: clear desk, open app.",
      "Start within 30 seconds of the environmental cue trigger.",
    ],
  },
};

export function getMethodById(id: string): StudyMethod {
  return (
    STUDY_METHODS[id] ||
    STUDY_METHODS["active_recall"] || {
      id: "active_recall",
      name: "Active Recall",
      category: "retrieval",
      tagline: "Prompt-driven retrieval with notes closed.",
      description: "Force brain reconstruction.",
      bestFor: ["General study"],
      cognitiveLoad: "high",
      activeMinutesMin: 20,
      activeMinutesMax: 30,
      instructions: ["Close notes.", "Write what you recall.", "Verify."],
    }
  );
}

export function getAllMethods(): StudyMethod[] {
  return Object.values(STUDY_METHODS);
}
