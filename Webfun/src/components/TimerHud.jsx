import { motion } from 'framer-motion';

export default function TimerHud({ totalSeconds }) {
  const radius  = 18;
  const circum  = 2 * Math.PI * radius;

  return (
    <svg width={48} height={48} className="-rotate-90">
      {/* background track */}
      <circle cx={24} cy={24} r={radius}
              stroke="#444" strokeWidth="4" fill="none" />

      {/* foreground ring drains smoothly */}
      <motion.circle
        cx={24} cy={24} r={radius}
        stroke="#ffff00" strokeWidth="4" fill="none"
        strokeDasharray={circum}
        /* start full → end empty */
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: circum }}
        transition={{ duration: totalSeconds, ease: 'linear' }}
      />
    </svg>
  );
}