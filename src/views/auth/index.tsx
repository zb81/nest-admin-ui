import { motion } from 'framer-motion'
import { Suspense } from 'react'

import loginBoxBg from '@/assets/svg/login-box-bg.svg'
import Logo from '@/components/Logo'
import { VariantsContainer, VariantsItemLeft } from '@/components/Motion'
import ToggleTheme from '@/components/ToggleTheme'
import { itemLeftVariants } from '@/constants/variants'
import { ColorModeContext } from '@/contexts/ThemeContext'
import { isLoggedIn } from '@/utils/auth'
import Loading from '@/views/fallbacks/Loading'

function LoginHeader() {
  const { mode, setMode } = useContext(ColorModeContext)

  return (
    <div className="absolute w-full h-[100px] flex justify-between items-center">
      <motion.div
        className="flex items-center select-none text-white"
        variants={itemLeftVariants}
        initial="hidden"
        animate="show"
      >
        <Logo size="3rem" color="#fff" />
        <h1 className="ml-3 text-xl font-medium">{import.meta.env.VITE_APP_TITLE}</h1>
      </motion.div>
      <ToggleTheme mode={mode} onChange={m => setMode(m)} />
    </div>
  )
}

export default function Auth() {
  if (isLoggedIn())
    return <Navigate to="/" replace />

  return (
    <div className="nest-admin-login h-full">
      <div className="container flex flex-col mx-auto h-full relative">
        <LoginHeader />

        <div className="flex-grow flex">
          <div className="w-1/2 flex">
            <VariantsContainer className="my-auto">
              <motion.img
                variants={itemLeftVariants}
                className="w-1/2 -enter-x -mt-10"
                src={loginBoxBg}
                alt={import.meta.env.VITE_APP_TITLE}
              />
              <VariantsItemLeft className="mt-10 text-white font-medium text-3xl">
                开箱即用的中后台管理系统
              </VariantsItemLeft>
            </VariantsContainer>
          </div>

          <div className="w-1/2 flex-col-center">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
