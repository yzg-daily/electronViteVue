/// <reference types="vite-plugin-electron/electron-env" />

import {ProcessEnv} from "process";

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬ dist-electron
     * │ ├─┬ main
     * │ │ └── index.js    > Electron-Main
     * │ └─┬ preload
     * │   └── index.mjs   > Preload-Scripts
     * ├─┬ dist
     * │ └── index.html    > Electron-Renderer
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
    /** /dist/ or /public/ */
    RENDERER_DIST: string
    /** 相对路径 */
    __dirname: string
    /** userData url */
    VITE_USER_DATA_URL: string
  }
}
