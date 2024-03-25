export function useDrawer() {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  return {
    open,
    openDrawer: () => setOpen(true),
    closeDrawer: () => setOpen(false),

    confirmLoading,
    startConfirmLoading: () => setConfirmLoading(true),
    stopConfirmLoading: () => setConfirmLoading(false),
  } as const
}
