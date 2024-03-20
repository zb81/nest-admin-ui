import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

import { ctnVariants } from '@/constants/variants'

export default function VariantsContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
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
