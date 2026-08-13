import Link from "next/link";
import { VideoCleanupStudio } from "@/components/video-cleanup-studio";
import { SEO_PAGES } from "@/lib/seo-pages";
import { webApplicationJsonLd } from "@/lib/structured-data";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
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

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(webApplicationJsonLd()) }}
      />

      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="ClearFrame home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>ClearFrame</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#product">Studio</a>
          <a href="#how">How it works</a>
          <a href="#use-cases">Tools</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-cta" href="#product">
          Start free <ArrowIcon />
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <h1>AI video watermark remover with a preview-first workflow.</h1>
          <p className="hero-lede">
            Prepare logo, text, timestamp, and watermark cleanup for videos you own
            or have permission to edit — with file checks and transparent usage
            estimates before a production AI render.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#product">
              Open the cleanup studio <ArrowIcon />
            </a>
            <Link className="text-link" href="/video-watermark-remover">
              Explore watermark removal
            </Link>
          </div>
          <ul className="trust-list" aria-label="Product benefits">
            <li>
              <CheckIcon /> Preview-first workflow
            </li>
            <li>
              <CheckIcon /> Transparent usage estimate
            </li>
            <li>
              <CheckIcon /> Authorized-content focus
            </li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="frame-window frame-before">
            <div className="scene-sky" />
            <div className="scene-hill hill-one" />
            <div className="scene-hill hill-two" />
            <div className="scene-subject" />
            <div className="sample-watermark">SAMPLE</div>
          </div>
          <div className="frame-window frame-after">
            <div className="scene-sky" />
            <div className="scene-hill hill-one" />
            <div className="scene-hill hill-two" />
            <div className="scene-subject" />
          </div>
          <div className="comparison-label comparison-before">Before</div>
          <div className="comparison-label comparison-after">After</div>
          <div className="comparison-handle">
            <span />
          </div>
        </div>
      </section>

      <section className="studio-section" id="product">
        <div className="shell studio-shell">
          <div className="section-heading studio-heading">
            <span className="section-index">01</span>
            <div>
              <h2>Upload. Inspect. Prepare.</h2>
              <p>
                The browser workflow validates the clip, exposes quality and usage
                choices, and demonstrates explicit job states. Provider-backed AI
                rendering remains a separate production milestone.
              </p>
            </div>
          </div>
          <VideoCleanupStudio />
        </div>
      </section>

      <section className="proof-section shell" id="how">
        <div className="section-heading">
          <span className="section-index">02</span>
          <div>
            <h2>Know the workflow before you commit to a render.</h2>
            <p>
              Video reconstruction has real compute cost and quality tradeoffs. The
              product is designed to surface file suitability, expected usage, and
              processing state instead of hiding them behind one button.
            </p>
          </div>
        </div>

        <div className="process-grid">
          <article>
            <span>1</span>
            <h3>Choose your video</h3>
            <p>MP4, MOV, or WebM. The MVP validates type, size, and duration.</p>
          </article>
          <article>
            <span>2</span>
            <h3>Review quality and usage</h3>
            <p>Duration and quality determine the displayed processing estimate.</p>
          </article>
          <article>
            <span>3</span>
            <h3>Prepare the cleanup job</h3>
            <p>
              Explicit ready, queued, processing, failed, and completed states make
              the future provider integration understandable and testable.
            </p>
          </article>
        </div>
      </section>

      <section className="capabilities-section">
        <div className="shell capability-layout">
          <div className="capability-copy">
            <span className="section-index light-index">03</span>
            <h2>One cleanup product. Distinct video-editing jobs.</h2>
            <p>
              ClearFrame separates high-intent use cases so each page can explain
              the quality factors and workflow that matter for that specific edit.
            </p>
          </div>
          <div className="capability-list">
            <div>
              <span>01</span>
              <strong>Static logo cleanup</strong>
              <p>Old brand marks, channel logos, and owned overlays.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Text & timestamp cleanup</strong>
              <p>Lower thirds, captions, dates, and baked-in text.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Moving-overlay workflow</strong>
              <p>A planned tracking mode for overlays that change position.</p>
            </div>
            <div>
              <span>04</span>
              <strong>Batch & API roadmap</strong>
              <p>Reserved for validated agency and developer demand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-tools-section shell" id="use-cases">
        <div className="section-heading">
          <span className="section-index">04</span>
          <div>
            <h2>Choose the cleanup job that matches your video.</h2>
            <p>
              These pages are intentionally different: each one explains a real
              editing task rather than repeating the same page with swapped keywords.
            </p>
          </div>
        </div>
        <div className="home-tool-links">
          {SEO_PAGES.map((page) => (
            <Link key={page.path} href={page.path}>
              <div>
                <h3>{page.h1}</h3>
                <p>{page.description}</p>
              </div>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>

      <section className="pricing-section shell" id="pricing">
        <div className="section-heading">
          <span className="section-index">05</span>
          <div>
            <h2>Transparent usage before billing goes live.</h2>
            <p>
              The current MVP displays example credit estimates for validation. A
              provider-backed checkout and final production price are not live yet.
            </p>
          </div>
        </div>
        <div className="pricing-grid">
          <article>
            <div>
              <span className="plan-name">Interactive MVP</span>
              <strong>$0</strong>
              <p>Use the browser workflow to validate files and inspect the product flow.</p>
            </div>
            <ul>
              <li><CheckIcon /> File and duration checks</li>
              <li><CheckIcon /> Quality selection</li>
              <li><CheckIcon /> Visible usage estimate</li>
            </ul>
          </article>
          <article className="featured-plan">
            <div>
              <span className="plan-name">Planned pay as you go</span>
              <strong>$1.49<span>/min target</span></strong>
              <p>A validation target, not an active checkout price. Final pricing follows provider integration.</p>
            </div>
            <ul>
              <li><CheckIcon /> Planned full video processing</li>
              <li><CheckIcon /> Planned high-quality option</li>
              <li><CheckIcon /> No forced-subscription target</li>
            </ul>
            <a href="#product" className="plan-button">
              Try the current studio <ArrowIcon />
            </a>
          </article>
        </div>
      </section>

      <section className="faq-section shell" id="faq">
        <div className="section-heading">
          <span className="section-index">06</span>
          <div>
            <h2>Questions before you upload.</h2>
          </div>
        </div>
        <div className="faq-list">
          <details>
            <summary>Does ClearFrame remove watermarks from any video?</summary>
            <p>
              ClearFrame is intended only for videos you own or are authorized to
              modify. Reconstruction quality also depends on motion, occlusion,
              background detail, and how much of the original scene is hidden.
            </p>
          </details>
          <details>
            <summary>Is the production AI processing connected yet?</summary>
            <p>
              Not in this repository milestone. The interface, validation, usage
              rules, authorization check, and job states are implemented first so a
              paid provider can be integrated behind a tested backend boundary.
            </p>
          </details>
          <details>
            <summary>Why show an estimate before processing?</summary>
            <p>
              Video inference has real per-second cost. A visible estimate makes
              expected usage understandable and reduces surprise billing when the
              provider-backed product is introduced.
            </p>
          </details>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>ClearFrame</span>
          </a>
          <p>AI video cleanup for content you own or are authorized to edit.</p>
          <div className="footer-links">
            <Link href="/video-watermark-remover">Tools</Link>
            <a href="https://github.com/mrprohack/ai-video-watermark-remover">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
