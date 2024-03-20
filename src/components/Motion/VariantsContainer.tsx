import { motion } from 'framer-motion'

import { ctnVariants } from '@/constants/variants'

export default function VariantsContainer({ children, className }: PWC<{ className?: string }>) {
  return (
    <motion.div
      variants={ctnVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  )
}
