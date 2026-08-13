import Link from "next/link";
import type { SeoPageDefinition } from "@/lib/seo-pages";
import { seoPageByPath } from "@/lib/seo-pages";
import { breadcrumbJsonLd, webApplicationJsonLd } from "@/lib/structured-data";

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

export function SeoToolPage({ page }: { page: SeoPageDefinition }) {
  const relatedPages = page.relatedPaths.map(seoPageByPath);

  return (
    <main className="seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(webApplicationJsonLd(page)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd(page)) }}
      />

      <header className="site-header shell seo-site-header">
        <Link className="brand" href="/" aria-label="ClearFrame home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>ClearFrame</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#product">Studio</Link>
          <Link href="/video-watermark-remover">Watermark remover</Link>
          <Link href="/remove-logo-from-video">Logo cleanup</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <Link className="header-cta" href="/#product">
          Open studio <ArrowIcon />
        </Link>
      </header>

      <article>
        <section className="seo-hero shell">
          <nav className="seo-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">ClearFrame</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.h1}</span>
          </nav>

          <div className="seo-hero-grid">
            <div className="seo-hero-copy">
              <h1>{page.h1}</h1>
              <p>{page.summary}</p>
              <div className="seo-hero-actions">
                <Link className="primary-button" href="/#product">
                  Open the cleanup studio <ArrowIcon />
                </Link>
                <a className="text-link" href="#how-it-works">
                  See how this workflow works
                </a>
              </div>
            </div>

            <aside className="seo-intent-panel" aria-label="Workflow summary">
              <div>
                <span>Best fit</span>
                <strong>{page.searchIntent}</strong>
              </div>
              <ul>
                <li>
                  <CheckIcon /> MP4, MOV, WebM
                </li>
                <li>
                  <CheckIcon /> Up to 100 MB in the current MVP
                </li>
                <li>
                  <CheckIcon /> Up to 60 seconds in the current MVP
                </li>
                <li>
                  <CheckIcon /> Usage estimate before processing
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="seo-status-band">
          <div className="shell seo-status-inner">
            <strong>Current MVP status</strong>
            <p>
              Browser upload, validation, quality controls, usage estimates, and job-state UX are implemented. The production AI rendering provider is not connected in this repository yet.
            </p>
          </div>
        </section>

        <section className="seo-content-section shell" aria-labelledby="fit-heading">
          <div className="seo-section-heading">
            <span>Where it fits</span>
            <h2 id="fit-heading">Use this workflow when preserving the original frame matters.</h2>
          </div>
          <div className="seo-row-list">
            {page.useCases.map((useCase, index) => (
              <div key={useCase}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{useCase}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="seo-process-section" id="how-it-works" aria-labelledby="process-heading">
          <div className="shell">
            <div className="seo-section-heading seo-section-heading-light">
              <span>How it works</span>
              <h2 id="process-heading">A preview-first path before expensive reconstruction.</h2>
            </div>
            <div className="seo-process-list">
              {page.steps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="seo-content-section shell" aria-labelledby="quality-heading">
          <div className="seo-section-heading">
            <span>Quality factors</span>
            <h2 id="quality-heading">What can make the result harder to reconstruct?</h2>
          </div>
          <div className="seo-limitations">
            {page.limitations.map((limitation) => (
              <p key={limitation}>{limitation}</p>
            ))}
          </div>
        </section>

        <section className="seo-responsible-section shell" aria-labelledby="responsible-heading">
          <div>
            <span>Responsible use</span>
            <h2 id="responsible-heading">Clean video you have the right to modify.</h2>
          </div>
          <p>{page.responsibleUse}</p>
        </section>

        <section className="seo-related-section shell" aria-labelledby="related-heading">
          <div className="seo-section-heading">
            <span>Related tools</span>
            <h2 id="related-heading">Choose the cleanup job that matches the overlay.</h2>
          </div>
          <div className="seo-related-links">
            {relatedPages.map((related) => (
              <Link key={related.path} href={related.path}>
                <span>{related.h1}</span>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </section>

        <section className="faq-section shell seo-faq-section" aria-labelledby="faq-heading">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2 id="faq-heading">Questions about this cleanup workflow.</h2>
          </div>
          <div className="faq-list seo-faq-list">
            {page.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="seo-final-cta">
          <div className="shell seo-final-cta-inner">
            <div>
              <h2>Inspect your clip before you commit to a render.</h2>
              <p>Start with the current browser-based validation and preview workflow.</p>
            </div>
            <Link className="primary-button" href="/#product">
              Open the cleanup studio <ArrowIcon />
            </Link>
          </div>
        </section>
      </article>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>ClearFrame</span>
          </Link>
          <p>AI video cleanup for content you own or are authorized to edit.</p>
          <Link href="/video-watermark-remover">Video watermark remover</Link>
        </div>
      </footer>
    </main>
  );
}
