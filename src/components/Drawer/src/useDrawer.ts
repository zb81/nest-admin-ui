export function useDrawer() {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  return {
    open,
    openDrawer: useCallback(() => setOpen(true), []),
    closeDrawer: useCallback(() => setOpen(false), []),

    confirmLoading,
    startConfirmLoading: useCallback(() => setConfirmLoading(true), []),
    stopConfirmLoading: useCallback(() => setConfirmLoading(false), []),
  } as const
}
