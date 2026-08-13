"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ALLOWED_VIDEO_TYPES, validateVideoFileMeta } from "@/lib/file-validation";
import {
  estimateCredits,
  formatDuration,
  MAX_MVP_DURATION_SECONDS,
  type ProcessingQuality,
} from "@/lib/pricing";
import type { JobState } from "@/lib/job-state";

type StudioState = "idle" | JobState;

const ACCEPTED_TYPES = ALLOWED_VIDEO_TYPES.join(",");

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4.5 10.2 3.3 3.3 7.7-7.7" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4.5 7.5A6 6 0 1 1 4 12M4.5 7.5V3.8M4.5 7.5h3.7" />
    </svg>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function VideoCleanupStudio() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<ProcessingQuality>("standard");
  const [authorized, setAuthorized] = useState(false);
  const [state, setState] = useState<StudioState>("idle");
  const [progress, setProgress] = useState(0);

  const credits = useMemo(() => {
    if (!duration || duration <= 0) return null;
    return estimateCredits(duration, quality);
  }, [duration, quality]);

  const isBusy = state === "queued" || state === "processing";
  const canProcess = Boolean(file && duration && authorized && !error && !isBusy);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function clearFile() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setDuration(null);
    setAuthorized(false);
    setState("idle");
    setProgress(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function chooseFile(nextFile: File | undefined) {
    if (!nextFile) return;

    const validation = validateVideoFileMeta(nextFile);
    if (!validation.ok) {
      setError(validation.message);
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const nextUrl = URL.createObjectURL(nextFile);
    setFile(nextFile);
    setPreviewUrl(nextUrl);
    setDuration(null);
    setAuthorized(false);
    setState("ready");
    setProgress(0);
    setError(null);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    chooseFile(event.target.files?.[0]);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    chooseFile(event.dataTransfer.files?.[0]);
  }

  function onVideoMetadata(event: React.SyntheticEvent<HTMLVideoElement>) {
    const videoDuration = event.currentTarget.duration;
    if (!Number.isFinite(videoDuration) || videoDuration <= 0) {
      setError("We could not read this video's duration.");
      return;
    }
    if (videoDuration > MAX_MVP_DURATION_SECONDS) {
      setError("For this MVP, videos must be 60 seconds or shorter.");
      return;
    }
    setDuration(videoDuration);
    setError(null);
  }

  async function runDemoProcessing() {
    if (!canProcess) return;
    setState("queued");
    setProgress(8);
    await wait(350);
    setState("processing");

    const checkpoints = [18, 31, 47, 62, 76, 88, 96, 100];
    for (const checkpoint of checkpoints) {
      await wait(220);
      setProgress(checkpoint);
    }

    setState("completed");
  }

  if (!file || !previewUrl) {
    return (
      <div className="studio-card studio-empty">
        <div
          className="drop-zone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            onChange={onInputChange}
            aria-label="Choose a video"
            tabIndex={-1}
          />
          <button type="button" onClick={() => inputRef.current?.click()}>
            <span className="upload-icon"><UploadIcon /></span>
            <strong>Drop your video here</strong>
            <span>or click to browse</span>
          </button>
          <div className="drop-meta">
            <span>MP4 · MOV · WEBM</span>
            <span>Up to 100 MB · 60 sec</span>
          </div>
        </div>
        {error && <p className="studio-error" role="alert">{error}</p>}
        <div className="studio-empty-footer">
          <span>Files stay in your browser in this frontend-only slice.</span>
          <span>Provider storage is not connected yet.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="studio-card studio-active" aria-busy={isBusy}>
      <div className="studio-toolbar">
        <div className="file-identity">
          <span className="status-dot" />
          <div>
            <strong>{file.name}</strong>
            <span>
              {formatBytes(file.size)}
              {duration ? ` · ${formatDuration(duration)}` : " · reading duration…"}
            </span>
          </div>
        </div>
        <button className="reset-button" type="button" onClick={clearFile} disabled={isBusy}>
          <ResetIcon />
          Replace
        </button>
      </div>

      <div className="studio-workspace">
        <div className="video-stage">
          <video
            src={previewUrl}
            controls
            playsInline
            aria-label="Selected video preview"
            onLoadedMetadata={onVideoMetadata}
          />
          {state === "processing" && (
            <div className="processing-overlay">
              <div className="scan-line" />
              <span>Analysing selected frames</span>
            </div>
          )}
          {state === "completed" && (
            <div className="result-banner">
              <CheckIcon /> Workflow verified
            </div>
          )}
        </div>

        <aside className="studio-controls">
          <div className="control-section">
            <span className="control-label">Removal mode</span>
            <button className="mode-option selected" type="button" aria-pressed="true">
              <span className="radio-indicator" />
              <span>
                <strong>Auto clean</strong>
                <small>Automatic overlay detection</small>
              </span>
            </button>
            <button className="mode-option" type="button" disabled>
              <span className="radio-indicator" />
              <span>
                <strong>Select area</strong>
                <small>Manual mask · next phase</small>
              </span>
            </button>
          </div>

          <div className="control-section">
            <span className="control-label">Quality</span>
            <div className="segmented-control" role="group" aria-label="Processing quality">
              <button
                className={quality === "standard" ? "selected" : ""}
                type="button"
                aria-pressed={quality === "standard"}
                onClick={() => setQuality("standard")}
                disabled={isBusy}
              >
                Standard
              </button>
              <button
                className={quality === "high" ? "selected" : ""}
                type="button"
                aria-pressed={quality === "high"}
                onClick={() => setQuality("high")}
                disabled={isBusy}
              >
                High
              </button>
            </div>
          </div>

          <div className="estimate-box">
            <div>
              <span>Estimated usage</span>
              <strong>{credits ?? "—"} credits</strong>
            </div>
            <small>
              {quality === "high" ? "2 credits / second" : "1 credit / second"}
            </small>
          </div>

          <label className="authorization-check">
            <input
              type="checkbox"
              checked={authorized}
              onChange={(event) => setAuthorized(event.target.checked)}
              disabled={isBusy}
            />
            <span className="custom-checkbox"><CheckIcon /></span>
            <span>I own this video or have permission to modify it.</span>
          </label>

          {error && <p className="studio-error compact-error" role="alert">{error}</p>}

          {isBusy ? (
            <div className="progress-panel" aria-live="polite">
              <div className="progress-copy">
                <strong>{state === "queued" ? "Preparing job" : "Cleaning video"}</strong>
                <span>{progress}%</span>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Cleanup progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
              <small>This is a deterministic demo state; no paid API is called.</small>
            </div>
          ) : state === "completed" ? (
            <div className="complete-panel">
              <div className="complete-title"><CheckIcon /><strong>Workflow complete</strong></div>
              <p>
                The UI and job-state path are connected. A real cleaned output will
                replace this state when the provider adapter is added.
              </p>
              <button type="button" onClick={() => { setState("ready"); setProgress(0); }}>
                Run again
              </button>
            </div>
          ) : (
            <button
              className="process-button"
              type="button"
              disabled={!canProcess}
              onClick={runDemoProcessing}
            >
              <span>Run cleanup demo</span>
              <span>{credits ? `${credits} cr` : "—"}</span>
            </button>
          )}
        </aside>
      </div>

      <div className="studio-statusbar">
        <span>Frontend MVP</span>
        <span>Private local preview</span>
        <span>AI provider: not connected</span>
      </div>
    </div>
  );
}
