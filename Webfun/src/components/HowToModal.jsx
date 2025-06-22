/* src/components/HowToModal.jsx */
import { motion } from 'framer-motion';          // or '@motionone/react'

export default function HowToModal({ onClose }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="bg-white w-90 border-4 border-yellow-400 rounded-lg
                   p-6 text-black text-sm leading-relaxed font-pixel text-left"
      >
        <h3 className="text-xl mb-4 text-center">How&nbsp;to&nbsp;Play</h3>
        <ul className="list-disc list-inside mb-6">
          <li>Watch the fruits roll by.</li>
          <li>Remember how many of each you saw.</li>
          <li>A number appears—click the fruit that appeared **that** many times.</li>
          <li>Difficulty increases every level!</li>
        </ul>
        <button
          onClick={onClose}
          className="block mx-auto bg-yellow-300 border-2 border-black
                     px-6 py-2 rounded hover:bg-yellow-200
                     shadow-[inset_0_-4px_0_rgba(0,0,0,0.6)]
                       hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6)]
                       transition-transform duration-150
                       hover:scale-105 active:scale-100"
        >
          Got&nbsp;it!
        </button>
      </motion.div>
    </motion.div>
  );
}
