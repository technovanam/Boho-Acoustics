const WHATSAPP_CHAT_LINK = "https://wa.me/919999999999";

const FloatingWhatsApp = () => {
  return (
    <a
      href={WHATSAPP_CHAT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.35)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 hover:shadow-[0_16px_30px_rgba(37,211,102,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-5 w-5 sm:h-7 sm:w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.04 3C8.86 3 3.04 8.82 3.04 16c0 2.3.6 4.55 1.74 6.53L3 29l6.66-1.74A12.95 12.95 0 0 0 16.04 29c7.18 0 13-5.82 13-13s-5.82-13-13-13Zm0 23.9c-1.97 0-3.9-.53-5.58-1.53l-.4-.24-3.95 1.03 1.05-3.86-.26-.4a10.85 10.85 0 0 1-1.67-5.9c0-5.97 4.85-10.82 10.82-10.82 2.9 0 5.62 1.13 7.67 3.18A10.78 10.78 0 0 1 26.9 16c0 5.97-4.86 10.9-10.86 10.9Zm5.93-8.13c-.32-.16-1.87-.93-2.16-1.04-.29-.1-.5-.16-.71.16-.21.32-.81 1.04-1 1.25-.18.21-.37.24-.68.08-.32-.16-1.34-.5-2.56-1.58-.95-.85-1.6-1.89-1.79-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.36-.25-.61-.5-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.64s1.13 3.07 1.29 3.28c.16.21 2.21 3.38 5.35 4.74.75.32 1.33.5 1.79.64.75.24 1.44.21 1.98.13.6-.09 1.87-.76 2.14-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="sr-only">Open WhatsApp chat</span>
    </a>
  );
};

export default FloatingWhatsApp;
