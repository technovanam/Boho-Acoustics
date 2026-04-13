import { motion } from "framer-motion";

const clientLogos = [
  { src: "/-ngdqro5t5x.avif", alt: "Client logo 1" },
  { src: "/2137.jpg", alt: "Client logo 2" },
  { src: "/Screenshot 2026-04-13 131601.png", alt: "Kalpataru logo" },
  { src: "/download.jpg", alt: "Client logo 3" },
  { src: "/images (1).png", alt: "Client logo 4" },
  { src: "/images.jpg", alt: "Client logo 5" },
  { src: "/images.png", alt: "Client logo 6" },
  { src: "/Pvrcinemas_logo.jpg", alt: "PVR Cinemas logo" },
  { src: "/Rajhans_Cinemas.webp", alt: "Rajhans Cinemas logo" },
  { src: "/unnamed.png", alt: "Client logo 7" },
];

const ClientsSection = () => {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-[#090909] via-[#0f1118] to-[#090909] border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,184,77,0.16),transparent_42%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_45%)]" />

      <div className="relative z-10 container px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-200/90"
        >
          Trusted by teams we have worked with
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-3 text-center text-3xl sm:text-4xl lg:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-sky-300"
        >
          Brands & Venues
        </motion.h2>

        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={logo.src}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group relative rounded-2xl border border-amber-200/40 bg-amber-100/10 p-4 sm:p-5 flex items-center justify-center min-h-28 sm:min-h-32 lg:min-h-36"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-amber-300/10 via-transparent to-sky-300/10" />
              <div className="w-full h-16 sm:h-20 lg:h-24 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;