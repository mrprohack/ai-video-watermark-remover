export type JobState =
  | "ready"
  | "queued"
  | "processing"
  | "completed"
  | "failed";

const transitions: Record<JobState, readonly JobState[]> = {
  ready: ["queued"],
  queued: ["processing", "failed"],
  processing: ["completed", "failed"],
  completed: [],
  failed: ["queued"],
};

export function canTransition(from: JobState, to: JobState): boolean {
  return transitions[from].includes(to);
}

export function assertTransition(from: JobState, to: JobState): void {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid job transition: ${from} -> ${to}`);
  }
}
