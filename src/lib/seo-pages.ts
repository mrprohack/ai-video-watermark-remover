export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoStep = {
  title: string;
  body: string;
};

export type SeoPageDefinition = {
  path: string;
  title: string;
  description: string;
  h1: string;
  searchIntent: string;
  summary: string;
  useCases: string[];
  steps: SeoStep[];
  limitations: string[];
  faqs: SeoFaq[];
  responsibleUse: string;
  relatedPaths: string[];
};

export const SEO_PAGES: SeoPageDefinition[] = [
  {
    path: "/video-watermark-remover",
    title: "AI Video Watermark Remover Online | ClearFrame",
    description:
      "Explore a preview-first AI video watermark remover workflow for logos, text, timestamps, and overlays on videos you own or have permission to edit.",
    h1: "AI video watermark remover for clean, authorized edits.",
    searchIntent: "Remove watermark from video with an AI-assisted workflow",
    summary:
      "ClearFrame is designed around a simple idea: before committing to an expensive video render, you should be able to inspect the file, understand the expected workflow, and see a transparent usage estimate. The current MVP demonstrates that browser-based preparation flow while the production AI rendering provider remains a separate integration milestone.",
    useCases: [
      "Cleaning an old logo or channel mark from footage you created",
      "Preparing owned social clips with outdated text or visual overlays",
      "Evaluating a clip before committing to a full AI reconstruction render",
      "Restoring authorized archive footage where an overlay covers useful image detail",
    ],
    steps: [
      {
        title: "Upload and validate the clip",
        body: "The browser checks the video format, file size, and duration before the workflow continues, so unsupported files are rejected early.",
      },
      {
        title: "Review quality and usage",
        body: "Choose the available quality level and inspect the transparent estimate instead of discovering the expected usage only after processing starts.",
      },
      {
        title: "Prepare for AI reconstruction",
        body: "The current MVP demonstrates job states and preparation. Full provider-backed video reconstruction remains a separate production integration milestone.",
      },
    ],
    limitations: [
      "Complex motion and moving overlays require stronger temporal tracking than a static corner mark.",
      "Faces, hair, hands, patterned clothing, and detailed backgrounds can make reconstruction more difficult.",
      "The repository currently demonstrates preparation and job-state UX; the production AI rendering provider is not connected yet.",
    ],
    faqs: [
      {
        question: "Can ClearFrame remove every watermark perfectly?",
        answer:
          "No. Quality depends on how much of the original scene is covered, background motion, occlusion, texture, and whether the overlay moves. A responsible product should expose those limitations rather than promise perfect removal for every clip.",
      },
      {
        question: "Does the current repository process the full AI render?",
        answer:
          "Not yet. The current build implements the browser upload, validation, quality selection, usage estimate, authorization check, and explicit job-state experience. Provider-backed AI rendering is intentionally isolated as a later backend milestone.",
      },
      {
        question: "What video formats are accepted in the MVP?",
        answer:
          "The current client workflow accepts MP4, MOV, and WebM files, with an MVP limit of 100 MB and 60 seconds. A future backend must independently verify the real media container and duration instead of trusting browser metadata.",
      },
    ],
    responsibleUse:
      "Use ClearFrame only with video you own, created yourself, licensed for modification, or have explicit permission to edit. The product is not intended to remove rights-management information without authorization.",
    relatedPaths: [
      "/remove-logo-from-video",
      "/remove-text-from-video",
      "/remove-date-stamp-from-video",
    ],
  },
  {
    path: "/remove-logo-from-video",
    title: "Remove Logo from Video with AI | ClearFrame",
    description:
      "Plan AI-assisted logo removal from video with file checks, preview-first controls, transparent usage estimates, and clear guidance for authorized content.",
    h1: "Remove a logo from video without cropping the frame.",
    searchIntent: "Remove a logo or brand overlay from an authorized video",
    summary:
      "Logo cleanup is different from simply cropping a corner: the hidden scene has to be reconstructed while preserving nearby texture, motion, and subjects. ClearFrame focuses this workflow on logos and brand overlays in footage you own or are allowed to modify, with an interactive MVP that validates the video and makes processing choices understandable before full AI rendering is connected.",
    useCases: [
      "Removing your previous brand mark after a rebrand",
      "Cleaning an outdated channel logo from original creator footage",
      "Restoring a client-owned master where a temporary logo was baked into the export",
      "Keeping the original frame composition when cropping would remove important content",
    ],
    steps: [
      {
        title: "Check the logo and surrounding scene",
        body: "A small static logo over sky or a flat wall is usually a different reconstruction problem from a logo crossing people, hair, products, or moving texture.",
      },
      {
        title: "Keep the full composition",
        body: "The workflow is designed around reconstructing the covered region instead of solving every logo problem by cutting away part of the original frame.",
      },
      {
        title: "Review the workflow before rendering",
        body: "ClearFrame validates the clip and exposes quality and usage choices first. Provider-backed reconstruction will live behind a controlled backend boundary when connected.",
      },
    ],
    limitations: [
      "A logo overlapping a face, hair, fingers, or another moving foreground subject is harder to reconstruct convincingly.",
      "Transparent or animated brand marks can require tracking across multiple frames rather than one static mask.",
      "This repository does not yet execute the final AI reconstruction render; it demonstrates the preparation workflow.",
    ],
    faqs: [
      {
        question: "Is logo removal the same as cropping a video?",
        answer:
          "No. Cropping changes the composition and removes part of every frame. Reconstruction aims to refill only the covered region, which can preserve the original framing when the scene provides enough information for a plausible result.",
      },
      {
        question: "What kinds of logos are easier to clean?",
        answer:
          "Small, static marks over visually simple areas are generally more predictable than large, semi-transparent, animated, or moving logos that overlap detailed subjects.",
      },
      {
        question: "Can I use this on a third-party video?",
        answer:
          "Only when you have the necessary rights or permission to modify that footage. ClearFrame is positioned for owned, licensed, commissioned, or otherwise authorized content.",
      },
    ],
    responsibleUse:
      "Only remove logos from footage you own or are authorized to modify, such as your own rebranded exports or client material supplied with permission.",
    relatedPaths: [
      "/video-watermark-remover",
      "/remove-text-from-video",
      "/remove-date-stamp-from-video",
    ],
  },
  {
    path: "/remove-text-from-video",
    title: "Remove Text from Video with AI | ClearFrame",
    description:
      "Explore an AI-assisted workflow for removing baked-in text, lower thirds, captions, and overlays from videos you own or are authorized to edit.",
    h1: "Remove unwanted text from video while keeping the scene.",
    searchIntent: "Remove baked-in text or captions from an authorized video",
    summary:
      "Baked-in text can cover moving backgrounds, faces, products, or fine detail, so a useful cleanup workflow needs more than a blur box. This ClearFrame page focuses on text overlays, lower thirds, and captions, explaining what affects reconstruction quality while connecting you to the same preview-first video preparation experience used across the product.",
    useCases: [
      "Cleaning an outdated lower third from your original interview footage",
      "Removing baked-in promotional text from an owned master before repurposing it",
      "Preparing creator footage where a caption export cannot be recovered separately",
      "Restoring a clean background for a new title or language-specific graphic",
    ],
    steps: [
      {
        title: "Identify the text region",
        body: "Text that stays in one place is usually easier to reason about than captions or titles that animate, resize, or move across the frame.",
      },
      {
        title: "Judge what sits behind the letters",
        body: "Flat backgrounds, skies, walls, and slow texture changes can be more predictable than detailed faces, hands, products, or fast camera motion.",
      },
      {
        title: "Use the preview-first preparation flow",
        body: "Validate the clip and inspect quality and usage controls before a future provider-backed reconstruction job is submitted.",
      },
    ],
    limitations: [
      "Large captions covering faces or important foreground subjects may not have enough visible context for a natural reconstruction.",
      "Animated typography and rapidly changing camera motion can require frame-aware tracking to avoid flicker.",
      "The live repository currently demonstrates the workflow and does not yet call the final AI rendering provider.",
    ],
    faqs: [
      {
        question: "Can this remove hardcoded subtitles?",
        answer:
          "Hardcoded subtitles are part of the rendered image, so they require visual reconstruction rather than simply disabling a subtitle track. Difficulty depends on what the subtitle covers and how the scene changes behind it.",
      },
      {
        question: "Will the cleaned area always match the original background?",
        answer:
          "Not necessarily. When the source video never shows what was behind the text, an AI system has to infer a plausible replacement. The best workflows make that uncertainty clear and allow users to inspect results before final use.",
      },
      {
        question: "Is this page intended for removing copyright information?",
        answer:
          "No. It is intended for text and overlays in content you own or are authorized to edit. Rights-management information should not be removed without proper authority.",
      },
    ],
    responsibleUse:
      "Use text cleanup on video you own, commissioned, licensed for modification, or otherwise have permission to edit. Do not remove ownership or rights-management information without authorization.",
    relatedPaths: [
      "/video-watermark-remover",
      "/remove-logo-from-video",
      "/remove-date-stamp-from-video",
    ],
  },
  {
    path: "/remove-date-stamp-from-video",
    title: "Remove Date Stamp from Video with AI | ClearFrame",
    description:
      "Clean date and time overlays from authorized video with a focused AI-assisted workflow, quality guidance, file validation, and transparent estimates.",
    h1: "Remove date and time stamps from video cleanly.",
    searchIntent: "Remove a date or timestamp from an authorized video",
    summary:
      "Date and time stamps are often fixed in one region of a frame, which makes them a good fit for a focused cleanup workflow when you own the footage or have permission to edit it. ClearFrame explains the quality factors that matter around timestamps and connects the task to a browser-based preparation flow with validation, preview controls, and transparent estimates.",
    useCases: [
      "Cleaning a camera date stamp from your own archived footage",
      "Preparing family, event, or documentary footage for a modern re-edit",
      "Removing a timecode-style overlay from an authorized review export when a clean master is unavailable",
      "Restoring a corner region without cropping useful image area from the frame",
    ],
    steps: [
      {
        title: "Check whether the stamp is fixed",
        body: "A timestamp that remains in one corner is usually simpler than a graphic that changes position, scales, or crosses moving subjects.",
      },
      {
        title: "Inspect the background around it",
        body: "Reconstruction is more predictable when nearby frames reveal enough surrounding texture to infer the covered region consistently.",
      },
      {
        title: "Validate before full processing",
        body: "Use the browser workflow to check format, duration, quality selection, and expected usage before the production AI provider is connected.",
      },
    ],
    limitations: [
      "A stamp covering faces, detailed objects, or fast motion can be significantly harder than one over a static corner background.",
      "Changing date text still occupies a similar region, but compression artifacts and camera movement can affect reconstruction consistency.",
      "The current MVP stops at the preparation and job-state layer; final provider-backed rendering is a later milestone.",
    ],
    faqs: [
      {
        question: "Are date stamps easier to remove than moving watermarks?",
        answer:
          "They can be when the stamp remains fixed and the surrounding background is visually consistent. Moving overlays usually require more tracking and temporal consistency across frames.",
      },
      {
        question: "Can I remove a timestamp without cropping the video?",
        answer:
          "The intended workflow is reconstruction of the covered region, which preserves the original frame dimensions. Whether the result looks natural depends on the scene information available around the timestamp.",
      },
      {
        question: "What is the current ClearFrame MVP limit?",
        answer:
          "The browser workflow currently accepts MP4, MOV, and WebM files up to 100 MB and 60 seconds. Those limits can change once a production storage and rendering backend is introduced.",
      },
    ],
    responsibleUse:
      "Use timestamp cleanup only on footage you own or have permission to modify, including your own camera archives, commissioned material, or licensed video.",
    relatedPaths: [
      "/video-watermark-remover",
      "/remove-logo-from-video",
      "/remove-text-from-video",
    ],
  },
];

export function seoPageByPath(path: string): SeoPageDefinition {
  const page = SEO_PAGES.find((candidate) => candidate.path === path);
  if (!page) throw new Error(`Unknown SEO page: ${path}`);
  return page;
}
