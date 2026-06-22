"use client";

import { useEffect, useRef } from "react";
import BackgroundVideo from "@/components/media/BackgroundVideo";
import { useApp } from "@/context/AppContext";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  body: string;
  videoSrc?: string;
  closeLabel: string;
}

export default function PhenomenonModal({
  open,
  onClose,
  title,
  subtitle,
  body,
  videoSrc,
  closeLabel,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handler = () => onClose();
    dialog.addEventListener("close", handler);
    return () => dialog.removeEventListener("close", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[200] m-0 h-full max-h-none w-full max-w-none border-0 bg-black/85 p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c10] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        {videoSrc && (
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <BackgroundVideo
              src={videoSrc}
              className="absolute inset-0 h-full w-full object-cover"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] to-transparent" />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-orange">
            {subtitle}
          </p>
          <h3 className="mt-2 font-sans text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">{body}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-8 inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
