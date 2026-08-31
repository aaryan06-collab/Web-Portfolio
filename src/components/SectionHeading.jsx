import { motion } from 'framer-motion';

export default function SectionHeading({ pre, accent, className }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className={className}
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
      >
        {pre && <span>{pre}</span>}
        {accent && (
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            {pre ? ' ' : ''}{accent}
          </span>
        )}
      </motion.h2>
      <motion.div
        variants={{
          hidden: { width: 0, opacity: 0 },
          visible: { width: 80, opacity: 1 },
        }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="h-1 bg-accent mx-auto mb-16 rounded-full"
      />
    </motion.div>
  );
}
