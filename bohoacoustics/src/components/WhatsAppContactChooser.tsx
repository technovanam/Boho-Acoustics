import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const whatsappContacts = [
  {
    label: "8433900692",
    href: "https://wa.me/918433900692",
  },
  {
    label: "9731150599",
    href: "https://wa.me/919731150599",
  },
];

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
    className={`h-12 w-12 shrink-0 scale-[1.15] origin-center ${className}`}
  >
    <path d="M16.04 3C8.86 3 3.04 8.82 3.04 16c0 2.3.6 4.55 1.74 6.53L3 29l6.66-1.74A12.95 12.95 0 0 0 16.04 29c7.18 0 13-5.82 13-13s-5.82-13-13-13Zm0 23.9c-1.97 0-3.9-.53-5.58-1.53l-.4-.24-3.95 1.03 1.05-3.86-.26-.4a10.85 10.85 0 0 1-1.67-5.9c0-5.97 4.85-10.82 10.82-10.82 2.9 0 5.62 1.13 7.67 3.18A10.78 10.78 0 0 1 26.9 16c0 5.97-4.86 10.9-10.86 10.9Zm5.93-8.13c-.32-.16-1.87-.93-2.16-1.04-.29-.1-.5-.16-.71.16-.21.32-.81 1.04-1 1.25-.18.21-.37.24-.68.08-.32-.16-1.34-.5-2.56-1.58-.95-.85-1.6-1.89-1.79-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.36-.25-.61-.5-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.64s1.13 3.07 1.29 3.28c.16.21 2.21 3.38 5.35 4.74.75.32 1.33.5 1.79.64.75.24 1.44.21 1.98.13.6-.09 1.87-.76 2.14-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" />
  </svg>
);

type WhatsAppContactChooserProps = {
  triggerClassName?: string;
  triggerLabel?: string;
  ariaLabel?: string;
  icon?: boolean;
  fullWidth?: boolean;
  iconClassName?: string;
};

const WhatsAppContactChooser = ({
  triggerClassName = "",
  triggerLabel = "WHATSAPP EXPERT",
  ariaLabel,
  icon = false,
  fullWidth = false,
  iconClassName = "",
}: WhatsAppContactChooserProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-label={ariaLabel ?? (triggerLabel || "Choose WhatsApp contact")}
          className={triggerClassName}
        >
          {icon && <WhatsAppIcon className={iconClassName} />}
          {triggerLabel ? <span>{triggerLabel}</span> : <span className="sr-only">Choose WhatsApp contact</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#050505] border-white/10 rounded-none max-w-md p-0 overflow-hidden">
        <div className="p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
              Choose WhatsApp Number
            </DialogTitle>
          </DialogHeader>

          <p className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed">
            Select the number you want to chat with on WhatsApp.
          </p>

          <div className="mt-6 space-y-3">
            {whatsappContacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-4 py-4 text-white transition-colors hover:border-primary/40 hover:bg-white/[0.04] ${fullWidth ? "w-full" : ""}`}
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <Phone className="h-4 w-4 text-primary" />
                  {contact.label}
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/45">
                  Chat
                </span>
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppContactChooser;