"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./stay.module.css";
import photos from "./gallery-images.json";
export default function Gallery() {

 const [active,setActive] = useState(0);
 const dialog = useRef<HTMLDialogElement>(null);
 const [isOpen,setIsOpen] = useState(false);
 useEffect(()=>{if(!isOpen)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous;};},[isOpen]);
 function open(index:number) {setActive(index);setIsOpen(true);dialog.current?.showModal();}
 function next(direction:number) {setActive(index=>(index+direction+photos.length)%photos.length);}
 return <section className={styles.gallery} aria-labelledby="gallery-title">
  <div className={styles.galleryHeading}><div><p className={styles.kicker}>A closer look</p><h2 id="gallery-title">Every corner,<br/><em>a quieter rhythm.</em></h2></div><p>Warm textures. Open views.<br/>A place to make your own.</p></div>
  <div className={styles.galleryGrid}>{photos.map((photo,index)=><button key={photo.src} onClick={()=>open(index)} aria-label={`Open photo ${index+1}: ${photo.alt}`}><picture>{photo.mobileSrc && <source media="(max-width: 650px)" srcSet={photo.mobileSrc} />}<Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 600px) 100vw, 60vw" unoptimized={photo.src.startsWith('/api/')} /></picture><span aria-hidden="true">View photograph ↗</span></button>)}</div>
  <dialog ref={dialog} className={styles.lightbox} aria-label="Northvale photo gallery" onClose={()=>setIsOpen(false)} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();next(1);}if(event.key==='ArrowLeft'){event.preventDefault();next(-1);}}}>
   <button className={styles.close} onClick={()=>dialog.current?.close()} autoFocus aria-label="Close gallery">Close ×</button>
   <div className={styles.fullImage}><picture key={photos[active].src}>{photos[active].mobileSrc && <source media="(max-width: 650px)" srcSet={photos[active].mobileSrc} />}<Image key={photos[active].src} src={photos[active].src} alt={photos[active].alt} fill sizes="100vw" loading="eager" unoptimized /></picture></div>
   <div className={styles.viewerBar}><button onClick={()=>next(-1)} aria-label="Previous photograph">←</button><p aria-live="polite">{active+1} / {photos.length}<span>{photos[active].alt}</span></p><button onClick={()=>next(1)} aria-label="Next photograph">→</button></div>
  </dialog>
 </section>;
}




