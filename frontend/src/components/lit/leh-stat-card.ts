import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * A reusable stat-card web component.
 *
 * Usage in React JSX:
 *   <leh-stat-card label="Total Users" value="1 234" icon="👥" color="blue" />
 */
@customElement('leh-stat-card')
export class LehStatCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: box-shadow 0.2s ease;
    }
    .card:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }

    .icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .blue  { background: #dbeafe; }
    .indigo{ background: #e0e7ff; }
    .green { background: #dcfce7; }
    .red   { background: #fee2e2; }
    .amber { background: #fef3c7; }
    .purple{ background: #f3e8ff; }

    .info { flex: 1; overflow: hidden; }

    .label {
      font-size: 0.8125rem;
      color: #6b7280;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      line-height: 1.2;
      margin-top: 2px;
    }

    .trend {
      font-size: 0.75rem;
      margin-top: 4px;
      font-weight: 500;
    }
    .trend.up   { color: #16a34a; }
    .trend.down { color: #dc2626; }
    .trend.flat { color: #6b7280; }
  `

  @property() label = ''
  @property() value = ''
  @property() icon = '📊'
  @property() color: 'blue' | 'indigo' | 'green' | 'red' | 'amber' | 'purple' = 'blue'
  @property() trend = ''
  @property({ attribute: 'trend-dir' }) trendDir: 'up' | 'down' | 'flat' = 'flat'

  override render() {
    return html`
      <div class="card">
        <div class="icon-wrapper ${this.color}">${this.icon}</div>
        <div class="info">
          <div class="label">${this.label}</div>
          <div class="value">${this.value}</div>
          ${this.trend
            ? html`<div class="trend ${this.trendDir}">${this.trend}</div>`
            : ''}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'leh-stat-card': LehStatCard
  }
}
