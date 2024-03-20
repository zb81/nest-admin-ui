import { useMount, useUnmount } from 'ahooks'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: true,
})

export default function Loading() {
  useMount(() => {
    NProgress.start()
  })

  useUnmount(() => {
    NProgress.done()
  })

  return (
    <div></div>
  )
}
