import { motion } from 'motion/react';

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative bg-black text-white py-32 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-start-1 lg:col-span-7"
          >
            <h2 className="mb-8 tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 400 }}>
              Истинската увереност
              <br />
              не е въпрос на обем.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-start-9 lg:col-span-4 flex flex-col justify-end space-y-12"
          >
            <div>
              <p className="text-white/60 mb-3 tracking-[0.2em]" style={{ fontSize: '0.75rem' }}>
                01
              </p>
              <p className="text-white/90" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                Тя се усеща.
              </p>
            </div>

            <div>
              <p className="text-white/60 mb-3 tracking-[0.2em]" style={{ fontSize: '0.75rem' }}>
                02
              </p>
              <p className="text-white/90" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                Тя е баланс.
              </p>
            </div>

            <div>
              <p className="text-white/60 mb-3 tracking-[0.2em]" style={{ fontSize: '0.75rem' }}>
                03
              </p>
              <p className="text-white/90" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                Тя е резултат от правилния подход.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
