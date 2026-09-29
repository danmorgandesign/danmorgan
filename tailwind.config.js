/*
 * Maps tokens.css's semantic tokens into Tailwind theme keys, e.g.
 * `bg-surface-card`, `text-text-primary`, `border-border-subtle`.
 * Not wired into any build yet — see tokens.css for the source values.
 */
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "var(--surface-base)",
          card: "var(--surface-card)",
          disabled: "var(--surface-disabled)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
          link: "var(--text-link)",
        },
        border: {
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        brand: {
          primary: "var(--brand-primary)",
        },
        focus: {
          ring: "var(--focus-ring)",
        },
        status: {
          success: "var(--status-success)",
          warning: "var(--status-warning)",
          error: "var(--status-error)",
          info: "var(--status-info)",
        },
        interactive: {
          "disabled-bg": "var(--interactive-disabled-bg)",
          "disabled-border": "var(--interactive-disabled-border)",
          "disabled-text": "var(--interactive-disabled-text)",
        },
      },
      spacing: {
        "card-padding": "var(--space-card-padding)",
        "element-gap": "var(--space-element-gap)",
      },
      borderRadius: {
        card: "var(--radius-card)",
      },
    },
  },
  plugins: [],
};
