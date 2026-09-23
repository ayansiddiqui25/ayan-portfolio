"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = { src: string; alt: string; width: number; height: number; caption: string };

export function ZoomImage({ src, alt, width, height, caption }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return <>
    <button type="button" className="image-zoom-trigger" aria-label={`Enlarge ${caption}`} aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </button>
    <dialog ref={dialog} className="image-lightbox" aria-labelledby={captionId} onClose={() => setOpen(false)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
    }}>
      <header><p id={captionId}>{caption}</p><button type="button" className="action action--secondary action--compact" autoFocus onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button></header>
      {open && <img className="image-lightbox__picture" src={src} alt={alt} width={width} height={height} />}
    </dialog>
  </>;
}
