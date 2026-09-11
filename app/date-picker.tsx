"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./date-picker.module.css";

const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
const parse = (value: string) => new Date(`${value}T12:00:00`);
const add = (value: string, days: number) => { const date=parse(value); date.setDate(date.getDate()+days); return iso(date); };
const label = (value: string) => parse(value).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
type Field = "arrival" | "departure";

export default function DatePicker({onChange,error}: {onChange:()=>void;error:boolean}) {
 const [arrival,setArrival]=useState("");
 const [departure,setDeparture]=useState("");
 const [active,setActive]=useState<Field|null>(null);
 const [month,setMonth]=useState("");
 const [focused,setFocused]=useState("");
 const [today,setToday]=useState("");
 const root=useRef<HTMLDivElement>(null);
 const triggers=useRef<Partial<Record<Field,HTMLButtonElement|null>>>({});
 const minimum=active==="departure" && arrival ? add(arrival,1) : today;
 function focusDay(value:string) {
  setFocused(value);setMonth(value.slice(0,7));
  requestAnimationFrame(()=>root.current?.querySelector<HTMLButtonElement>(`[data-date="${value}"]`)?.focus());
 }
 function open(field:Field) {
  if(active===field){setActive(null);return;}
  const now=iso(new Date());setToday(now);
  const min=field==="departure" && arrival ? add(arrival,1):now;
  const selected=field==="arrival"?arrival:departure;
  const value=selected && selected>=min?selected:min;
  setActive(field);focusDay(value);
 }
 function close() {if(active)triggers.current[active]?.focus();setActive(null);}
 function select(value:string) {
  onChange();
  if(active==="arrival") {
   setArrival(value);
   if(departure && departure<=value)setDeparture("");
   setActive("departure");focusDay(departure>value?departure:add(value,1));
  } else {setDeparture(value);close();}
 }
 function moveMonth(amount:number) {
  const date=parse(`${month}-01`);date.setMonth(date.getMonth()+amount);
  let next=iso(date);if(next<minimum)next=minimum;
  focusDay(next);
 }
 function keyboard(event:KeyboardEvent<HTMLButtonElement>,value:string) {
  const offset:Record<string,number>={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7};
  if(event.key in offset){event.preventDefault();const next=add(value,offset[event.key]);focusDay(next<minimum?minimum:next);}
  if(event.key==="PageUp"||event.key==="PageDown"){event.preventDefault();moveMonth(event.key==="PageUp"?-1:1);}
  if(event.key==="Home"||event.key==="End"){event.preventDefault();const weekday=(parse(value).getDay()+6)%7;const next=add(value,event.key==="Home"?-weekday:6-weekday);focusDay(next<minimum?minimum:next);}
 }
 const first=month?parse(`${month}-01`):null;
 const offset=first?(first.getDay()+6)%7:0;
 const count=first?new Date(first.getFullYear(),first.getMonth()+1,0).getDate():0;
 return <div ref={root} className={styles.dates} onKeyDown={event=>{if(event.key==="Escape"){event.preventDefault();close();}}}>
  <input type="hidden" name="arrival" value={arrival}/><input type="hidden" name="departure" value={departure}/>
  <div className={styles.triggers}>{(["arrival","departure"] as Field[]).map(field=>{const value=field==="arrival"?arrival:departure;const name=field==="arrival"?"Check-in":"Check-out";return <button key={field} ref={element=>{triggers.current[field]=element;}} type="button" aria-expanded={active===field} aria-controls="stay-calendar" data-invalid={error || undefined} aria-describedby={error?"booking-error":undefined} aria-label={`${name}: ${value?label(value):"Choose date"}`} onClick={()=>open(field)} className={active===field?styles.activeTrigger:undefined}><span>{name}</span><span>{value?label(value):"Choose date"}<svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14v12H3zM6 2v5M14 2v5M3 9h14" stroke="currentColor" strokeWidth="1"/></svg></span></button>;})}</div>
  {active && first && <div id="stay-calendar" role="region" aria-label={`Choose ${active==="arrival"?"check-in":"check-out"} date`} className={styles.calendar}>
   <p className={styles.prompt}>{active==="arrival"?"When would you like to arrive?":"And when will you leave?"}</p>
   <div className={styles.month}><button type="button" aria-label="Previous month" disabled={month<=minimum.slice(0,7)} onClick={()=>moveMonth(-1)}>←</button><h4 aria-live="polite">{first.toLocaleDateString("en-GB",{month:"long",year:"numeric"})}</h4><button type="button" aria-label="Next month" onClick={()=>moveMonth(1)}>→</button></div>
   <div className={styles.weekdays} aria-hidden="true">{["Mo","Tu","We","Th","Fr","Sa","Su"].map(day=><span key={day}>{day}</span>)}</div>
   <div className={styles.days} role="group" aria-label="Dates">{Array.from({length:offset},(_,i)=><span key={`empty-${i}`}/>)}{Array.from({length:count},(_,i)=>{const value=`${month}-${String(i+1).padStart(2,"0")}`;const selected=value===arrival||value===departure;return <button type="button" key={value} data-date={value} disabled={value<minimum} tabIndex={value===focused?0:-1} aria-label={parse(value).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})} aria-pressed={selected} aria-current={value===today?"date":undefined} data-range={arrival && departure && value>arrival && value<departure?"true":undefined} onClick={()=>select(value)} onKeyDown={event=>keyboard(event,value)}>{i+1}</button>;})}</div>
   <div className={styles.bottom}><span>A slower pace starts here.</span><button type="button" onClick={close}>Close</button></div>
  </div>}
 </div>;
}

