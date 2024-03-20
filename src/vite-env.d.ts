/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_PRIMARY_COLOR: string
  readonly VITE_APP_API_BASE: string
  readonly VITE_APP_API_TIMEOUT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
