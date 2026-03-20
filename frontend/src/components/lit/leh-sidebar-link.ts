import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * A reusable sidebar navigation link.
 *
 * Usage in React JSX:
 *   <leh-sidebar-link href="/admin/users" icon="👥" label="Users" active />
 *
 * Clicking will dispatch a native click so React Router's <Link> or
 * window.location can handle navigation via the `href` attribute.
 */
@customElement('leh-sidebar-link')
export class LehSidebarLink extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      font-size: 0.9375rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.65);
      transition: background 0.18s ease, color 0.18s ease;
      cursor: pointer;
    }

    a:hover {
      background: rgba(255, 255, 255, 0.08);
      color: white;
    }

    a.active {
      background: var(--accent, rgba(99, 102, 241, 0.85));
      color: white;
    }

    .icon {
      font-size: 1.1rem;
      min-width: 1.4rem;
      text-align: center;
    }
  `

  @property() href = '/'
  @property() icon = '🔗'
  @property() label = ''
  @property({ type: Boolean, reflect: true }) active = false

  private _handleClick(e: MouseEvent) {
    e.preventDefault()
    this.dispatchEvent(
      new CustomEvent('leh-navigate', {
        detail: { href: this.href },
        bubbles: true,
        composed: true,
      }),
    )
  }

  override render() {
    return html`
      <a
        href=${this.href}
        class=${this.active ? 'active' : ''}
        @click=${this._handleClick}
      >
        <span class="icon">${this.icon}</span>
        <span>${this.label}</span>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'leh-sidebar-link': LehSidebarLink
  }
}
