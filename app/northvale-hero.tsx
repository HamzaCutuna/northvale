"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import cabin from "../public/images/northvale-hero.webp";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function NorthvaleMark() {
  return (
    <svg className="brand-mark" width="29" height="31" viewBox="0 0 29 31" fill="none" aria-hidden="true">
      <path d="M3 26V6l23 20V6M3 6l11.5 10L26 6" stroke="currentColor" strokeWidth="1.15" />
      <path d="M14.5 16v12" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  );
}

export default function NorthvaleHero() {
  const settingDialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);

  function openSetting() {
    if (!settingDialog.current || settingDialog.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    settingDialog.current.showModal();
  }

  function restoreScroll() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  useEffect(() => restoreScroll, []);

  return (
    <>
      <a className="skip-link" href="#northvale">Skip to the retreat</a>
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
          <a className="wordmark" href="#northvale" aria-label="Northvale home">
            <NorthvaleMark />
            <span>Northvale</span>
          </a>
          <span className="header-note">A private lakeside retreat</span>
          <nav className="navigation" aria-label="Main navigation">
            <a className="nav-link nav-link-current" href="#northvale" aria-current="page">The cabin</a>
            <button className="nav-link setting-link" type="button" onClick={openSetting} aria-haspopup="dialog">
              The setting <ArrowIcon />
            </button>
          </nav>
        </header>
        <div className="hero-content">
          <p className="eyebrow"><span aria-hidden="true" /> Somewhere life slows down</p>
          <h1>A little closer<br />to <em>nowhere.</em></h1>
          <div className="hero-invitation">
            <p className="hero-description">
              A quiet cabin beside a mountain lake.<br />
              Room to breathe. Time to just be.
            </p>
            <button className="hero-cta" type="button" onClick={openSetting} aria-haspopup="dialog">
              View the setting <ArrowIcon />
            </button>
          </div>
        </div>
        <div className="hero-footnote">
          <p className="footnote-message"><span aria-hidden="true" />Tucked away. Fully present.</p>
          <p className="landscape-note">Lake <span aria-hidden="true">·</span> Forest <span aria-hidden="true">·</span> Mountain</p>
        </div>
      </main>
      <dialog
        ref={settingDialog}
        className="setting-dialog"
        aria-labelledby="setting-title"
        aria-describedby="setting-description"
        onClose={restoreScroll}
        onClick={(event) => {
          if (event.target === event.currentTarget) settingDialog.current?.close();
        }}
      >
        <div className="setting-toolbar">
          <span className="setting-brand">Northvale <span>/ The setting</span></span>
          <button className="close-setting" type="button" onClick={() => settingDialog.current?.close()} autoFocus>
            Close view
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        </div>
        <figure className="setting-figure">
          <div className="setting-image-wrap">
            <Image
              src={cabin}
              className="setting-image"
              alt="The full Northvale setting: a dark timber cabin with a glazed gable and amber interior, sheltered by conifers beside a still mountain lake."
              fill
              sizes="100vw"
              placeholder="blur"
            />
          </div>
          <figcaption className="setting-caption">
            <h2 id="setting-title">Nothing to do. <em>Nowhere else to be.</em></h2>
            <p id="setting-description">Dark timber. Warm light. A lake that holds the mountains.<br />A small place to feel a little further away.</p>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
