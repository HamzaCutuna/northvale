"use client";

import Image from "next/image";
import NorthvaleMark from "./northvale-mark";
import cabin from "../public/images/northvale-hero.webp";

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export default function NorthvaleHero() {
  return (
    <>
      <a className="skip-link" href="#northvale">
        Skip to the retreat
      </a>

      <main id="northvale" className="hero" tabIndex={-1}>
        <div className="hero-media">
          <Image
            className="hero-image"
            src={cabin}
            alt="Northvale’s warm-lit timber cabin on a rocky lakeshore, with pine forest and dramatic mountains reflected in the evening water."
            fill
            sizes="(max-width: 600px) 1500px, (max-aspect-ratio: 16/9) 177vh, 100vw"
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
          />
        </div>

        <div className="hero-shade" aria-hidden="true" />

        <header className="site-header">
          <a
            className="wordmark"
            href="#northvale"
            aria-label="Northvale home"
          >
            <NorthvaleMark />
            <span>Northvale</span>
          </a>

          <span className="header-note">
            A private lakeside retreat
          </span>

          <nav className="navigation" aria-label="Main navigation">
            <a
              className="nav-link nav-link-current"
              href="#northvale"
              aria-current="page"
            >
              The cabin
            </a>

            <a className="nav-link setting-link" href="/#stay">
              Book your stay <ArrowIcon />
            </a>
          </nav>
        </header>

        <div className="hero-content">
          <p className="eyebrow">
            <span aria-hidden="true" /> Somewhere life slows down
          </p>

          <h1>
            A little closer
            <br />
            to <em>nowhere.</em>
          </h1>

          <div className="hero-invitation">
            <p className="hero-description">
              A quiet cabin beside a mountain lake.
              <br />
              Room to breathe. Time to just be.
            </p>

            <a className="hero-cta" href="/#stay">
              Book your stay <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero-footnote">
          <p className="footnote-message">
            <span aria-hidden="true" />
            Tucked away. Fully present.
          </p>

          <p className="landscape-note">
            Lake <span aria-hidden="true">·</span> Forest{" "}
            <span aria-hidden="true">·</span> Mountain
          </p>
        </div>
      </main>
    </>
  );
}