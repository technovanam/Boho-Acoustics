import WhatsAppContactChooser from "@/components/WhatsAppContactChooser";

const FloatingWhatsApp = () => {
  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <WhatsAppContactChooser
        triggerLabel=""
        icon
          triggerClassName="h-12 w-12 rounded-full border-0 bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.35)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 hover:bg-[#25D366] hover:text-white hover:shadow-[0_16px_30px_rgba(37,211,102,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-14 sm:w-14"
          iconClassName="h-12 w-12 scale-[1.25] sm:scale-[1.35] lg:scale-[1.45]"
      />
    </div>
  );
};

export default FloatingWhatsApp;
