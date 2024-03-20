import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export default function AnimatedRoute({ children, className }: PropsWithChildren<Props>) {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 40 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
