import { motion } from 'framer-motion'

import { itemLeftVariants, itemRightVariants } from '@/constants/variants'

interface Props {
  className?: string
}

export function VariantsItemLeft({ children, className }: PWC<Props>) {
  return (
    <motion.div
      className={className}
      variants={itemLeftVariants}
    >
      {children}
    </motion.div>
  )
}

export function VariantsItemRight({ children, className }: PWC<Props>) {
  return (
    <motion.div
      className={className}
      variants={itemRightVariants}
    >
      {children}
    </motion.div>
  )
}
