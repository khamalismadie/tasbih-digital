/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADMOB_APP_ID: string
    readonly VITE_ADMOB_BANNER_AD_UNIT_ID: string
    readonly VITE_ADMOB_TEST_BANNER_AD_UNIT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
