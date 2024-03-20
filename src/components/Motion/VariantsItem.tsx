import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

import { itemLeftVariants, itemRightVariants } from '@/constants/variants'

type Props = PropsWithChildren<{
  className?: string
}>

export function VariantsItemLeft({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={itemLeftVariants}
    >
      {children}
    </motion.div>
  )
}

export function VariantsItemRight({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={itemRightVariants}
    >
      {children}
    </motion.div>
  )
}
