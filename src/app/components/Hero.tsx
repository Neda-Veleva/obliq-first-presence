import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-60"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative h-full flex items-end pb-32 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-white mb-6 tracking-tight uppercase" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.95, fontWeight: 400, letterSpacing: '-0.03em' }}>
            истинската красота
            <br />
            идва от вътре.
          </h1>
          <p className="text-white/70 max-w-md ml-auto uppercase" style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
            by dr. mihaylov
          </p>
        </motion.div>
      </div>

    </section>
  );
}
