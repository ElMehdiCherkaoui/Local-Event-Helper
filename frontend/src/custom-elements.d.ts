// Teach React's JSX about our Lit custom elements so there are no
// TypeScript "unknown element" errors when using them in TSX files.

import type { LehStatCard } from './components/lit/leh-stat-card'
import type { LehSidebarLink } from './components/lit/leh-sidebar-link'

type CustomProps<T> = Partial<
  Omit<T, keyof HTMLElement> & {
    class?: string
    key?: string
    style?: React.CSSProperties
    children?: React.ReactNode
    ref?: React.Ref<T>
  }
>

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'leh-stat-card': CustomProps<LehStatCard> & {
        'trend-dir'?: 'up' | 'down' | 'flat'
      }
      'leh-sidebar-link': CustomProps<LehSidebarLink> & {
        active?: boolean | string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onLeh_navigate?: (e: any) => void
      }
    }
  }
}
