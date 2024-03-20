import type { Variants } from 'framer-motion'

export const ctnVariants: Variants = {
  show: {
    transition: { staggerChildren: 0.1 },
  },
} as const

export const itemRightVariants: Variants = {
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.25 },
  },
  hidden: {
    x: 30,
    opacity: 0,
  },
} as const

export const itemLeftVariants: Variants = {
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.25 },
  },
  hidden: {
    x: -30,
    opacity: 0,
  },
} as const
