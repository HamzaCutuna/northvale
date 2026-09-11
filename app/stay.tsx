"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import styles from "./stay.module.css";

export default function Stay() {



  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const arrival = String(data.get("arrival") ?? "");
    const departure = String(data.get("departure") ?? "");
    const guests = String(data.get("guests") ?? "2");
    const today = new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
    if (arrival < localToday || departure <= arrival) {
      setError("Choose an arrival from today onward and a departure after your arrival.");
      setSummary("");
      return;
    }
    const nights = Math.round((Date.parse(departure)-Date.parse(arrival))/86400000);
    const format = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {day:"numeric",month:"long",year:"numeric"});
    setError("");
    setSummary(`${format(arrival)} — ${format(departure)} · ${nights} ${nights === 1 ? "night" : "nights"} · ${guests} ${guests === "1" ? "guest" : "guests"}. This is a preview of your stay. No availability has been checked and no reservation or payment has been made.`);
  }
  return <div className={styles.continuation}>
    <section id="stay" className={styles.stay} aria-labelledby="stay-title">
      <div className={styles.introduction}>
        <p className={styles.kicker}>A little more time, a little less elsewhere</p>
        <h2 id="stay-title">You could stay<br /><em>a little longer.</em></h2>
        <p className={styles.description}>An evening by the fire. A morning with nowhere to rush.<br /> Make room for a few days that feel like your own.</p>
      </div>
      <form className={styles.booking} onSubmit={submit} onChange={() => {setSummary("");setError("");}}>
        <div className={styles.fields}>
          <label>Arrival<input type="date" required name="arrival" aria-describedby={error ? "booking-error" : undefined} /></label>
          <label>Departure<input type="date" required name="departure" aria-describedby={error ? "booking-error" : undefined} /></label>
          <label>Guests<select name="guests" defaultValue="2"><option value="1">One guest</option><option value="2">Two guests</option><option value="3">Three guests</option><option value="4">Four guests</option></select></label>
          <button type="submit">Plan your stay <span aria-hidden="true">↗</span></button>
        </div>
        <p className={styles.fineprint}>Explore a stay · Northvale is a fictional retreat. Booking preview only.</p>
        {error && <p id="booking-error" role="alert" className={styles.message}>{error}</p>}
        {summary && <p role="status" className={styles.message}>{summary}</p>}
      </form>
      <div className={styles.room}>
        <Image src="/images/stay/09-booking-room.webp" fill sizes="100vw" alt="Warm timber living room with linen seating, a wood stove and lake-facing windows." />
        <p>Space to settle in.<br /><em>Nothing more required.</em></p>
      </div>
    </section>
    <section className={styles.stories} aria-labelledby="stories-title">
      <div className={styles.storyImage}><Image src="/images/stay/12-guest-coffee-wide.webp" fill sizes="100vw" alt="A guest enjoying a quiet cup of coffee on Northvale’s terrace overlooking the lake and mountains." /></div>
      <div className={styles.storyContent}>
        <p className={styles.kicker}>The moments that stay</p>
        <h2 id="stories-title">Less to do.<br /><em>More to remember.</em></h2>
        <div className={styles.quotes}>
          <figure><blockquote>“We came for the view. What we remember most is how quiet everything became.”</blockquote><figcaption>A few days away, together</figcaption></figure>
          <figure><blockquote>“Coffee went cold. The lake kept changing. Neither of us wanted to go inside.”</blockquote><figcaption>A morning without a plan</figcaption></figure>
        </div>
        <p className={styles.sample}>Illustrative guest stories for the Northvale concept.</p>
        <a href="#stay" className={styles.invitation}>Find time for your own story <span aria-hidden="true">↗</span></a>
      </div>
    </section>
    <footer className={styles.footer}><a href="#northvale">Northvale</a><p>A little closer to nowhere.</p><span>A retreat concept by HELUMO</span></footer>
  </div>;
}


