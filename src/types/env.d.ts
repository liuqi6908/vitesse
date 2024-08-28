interface Env {
  /** ---------- 仅开发模式 ---------- */
  /** 启动端口（默认值：3000） */
  VITE_PORT?: string | number
  /** 基础路径（默认值：`/`） */
  VITE_BASE?: string

  /** 代理目标 */
  VITE_PROXY_TARGET?: string
  /** API基础路径（默认值：`/api`） */
  VITE_API_BASE?: string

  /** 应用名称 */
  VITE_APP_NAME?: string
  /** 应用图标路径 */
  VITE_APP_LOGO?: string
}

interface ImportMeta {
  env: Env & ImportMetaEnv
}
