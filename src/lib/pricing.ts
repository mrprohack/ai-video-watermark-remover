export type ProcessingQuality = "standard" | "high";

export const MIN_BILLABLE_SECONDS = 5;
export const MAX_MVP_DURATION_SECONDS = 60;

export function estimateCredits(
  durationSeconds: number,
  quality: ProcessingQuality = "standard",
): number {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new Error("Video duration must be a positive number");
  }

  const billableSeconds = Math.max(
    MIN_BILLABLE_SECONDS,
    Math.ceil(durationSeconds),
  );
  const multiplier = quality === "high" ? 2 : 1;

  return billableSeconds * multiplier;
}

export function formatDuration(seconds: number): string {
  const rounded = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(rounded / 60);
  const remaining = rounded % 60;
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}
