"use client";

import Modal from "./Modal";

export default function VideoLightbox({
  src,
  label,
  open,
  onClose,
}: {
  src: string;
  label: string;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} label={label}>
      <div className="relative w-full">
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-teal/20 blur-3xl"
        />
        <video
          key={src}
          src={src}
          autoPlay
          controls
          playsInline
          className="w-full rounded-[1.75rem] bg-black shadow-2xl"
        />
      </div>
    </Modal>
  );
}
