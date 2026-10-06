import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";


const PHONE = "2349064566528";
const MESSAGE = "Hi Potto! I have a question about Pottolite.";
const HREF = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Potto customer care on WhatsApp"
      className="group fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 sm:right-6"
    >
      <span className="pointer-events-none hidden max-w-0 overflow-hidden rounded-full bg-white py-2 text-sm font-semibold whitespace-nowrap text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-40 group-hover:px-4 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:px-4 group-focus-visible:opacity-100 lg:block">
        Chat with us
      </span>

      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition duration-300 group-hover:scale-110 group-focus-visible:scale-110">
        <HugeiconsIcon icon={WhatsappIcon} size={30} strokeWidth={2} />
      </span>
    </a>
  );
}
