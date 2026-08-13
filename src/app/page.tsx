import { VideoCleanupStudio } from "@/components/video-cleanup-studio";

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

export default function HomePage() {
  return (
    <main>
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="ClearFrame home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>ClearFrame</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#product">Product</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-cta" href="#product">
          Start free <ArrowIcon />
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <h1>Clean unwanted overlays from video.</h1>
          <p className="hero-lede">
            Remove logos, text, timestamps, and watermarks from videos you own
            or have permission to edit — without cropping or frame-by-frame work.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#product">
              Clean a video <ArrowIcon />
            </a>
            <a className="text-link" href="#how">
              See how it works
            </a>
          </div>
          <ul className="trust-list" aria-label="Product benefits">
            <li>
              <CheckIcon /> Preview-first workflow
            </li>
            <li>
              <CheckIcon /> Transparent credit estimate
            </li>
            <li>
              <CheckIcon /> Private-by-design roadmap
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
              <h2>Upload. Inspect. Clean.</h2>
              <p>
                The first product slice is live as an interactive workflow. AI
                provider execution is intentionally isolated for the next phase.
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
            <h2>Built around the decision that matters.</h2>
            <p>
              You should know what will happen, what it may cost, and whether a
              clip is suitable before committing to a full render.
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
            <h3>Review the estimate</h3>
            <p>Duration and quality determine the displayed processing credits.</p>
          </article>
          <article>
            <span>3</span>
            <h3>Process with confidence</h3>
            <p>
              Explicit states make queueing, processing, failure, and completion
              understandable rather than hiding everything behind a spinner.
            </p>
          </article>
        </div>
      </section>

      <section className="capabilities-section">
        <div className="shell capability-layout">
          <div className="capability-copy">
            <span className="section-index light-index">03</span>
            <h2>One cleanup engine. Multiple creator jobs.</h2>
            <p>
              The product architecture expands beyond watermark removal without
              turning the homepage into a crowded editor.
            </p>
          </div>
          <div className="capability-list">
            <div>
              <span>01</span>
              <strong>Static logo removal</strong>
              <p>Corner marks, channel logos, and brand overlays.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Text & timestamp cleanup</strong>
              <p>Dates, lower thirds, captions, and baked-in text.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Moving-mask workflow</strong>
              <p>Planned tracking mode for overlays that change position.</p>
            </div>
            <div>
              <span>04</span>
              <strong>Batch & API</strong>
              <p>Reserved for validated agency and developer demand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section shell" id="pricing">
        <div className="section-heading">
          <span className="section-index">04</span>
          <div>
            <h2>Start with transparent usage.</h2>
            <p>
              Validate demand with free preview behavior and simple usage pricing
              before adding a wall of subscriptions.
            </p>
          </div>
        </div>
        <div className="pricing-grid">
          <article>
            <div>
              <span className="plan-name">Free preview</span>
              <strong>$0</strong>
              <p>Test the workflow and inspect a short preview before paying.</p>
            </div>
            <ul>
              <li><CheckIcon /> One preview allowance</li>
              <li><CheckIcon /> Standard processing</li>
              <li><CheckIcon /> Clear usage estimate</li>
            </ul>
          </article>
          <article className="featured-plan">
            <div>
              <span className="plan-name">Pay as you go</span>
              <strong>$1.49<span>/min</span></strong>
              <p>No forced subscription. Buy processing only when you need it.</p>
            </div>
            <ul>
              <li><CheckIcon /> Full video processing</li>
              <li><CheckIcon /> High-quality option</li>
              <li><CheckIcon /> Job history roadmap</li>
            </ul>
            <a href="#product" className="plan-button">
              Try the studio <ArrowIcon />
            </a>
          </article>
        </div>
      </section>

      <section className="faq-section shell" id="faq">
        <div className="section-heading">
          <span className="section-index">05</span>
          <div>
            <h2>Questions before you upload.</h2>
          </div>
        </div>
        <div className="faq-list">
          <details>
            <summary>Does this remove watermarks from any video?</summary>
            <p>
              The product is intended only for videos you own or are authorized to
              modify. Results also depend on motion, occlusion, background detail,
              and how much of the original scene is hidden.
            </p>
          </details>
          <details>
            <summary>Is the AI processing connected in this repository yet?</summary>
            <p>
              Not in this first slice. The interface, validation, pricing rules,
              and job states are implemented first so the paid provider can be
              integrated behind a tested boundary rather than embedded in the UI.
            </p>
          </details>
          <details>
            <summary>Why show credits before processing?</summary>
            <p>
              Video inference has real per-second cost. A visible estimate makes
              that cost understandable and prevents surprise billing.
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
          <a href="https://github.com/mrprohack/ai-video-watermark-remover">
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
