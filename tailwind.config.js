/*
 * Maps tokens.css into Tailwind theme keys. Colors are semantic-only —
 * primitives (slate-500, lime-300, etc.) are deliberately NOT exposed as
 * Tailwind classes, only the semantic layer.
 *
 * Colors use separate textColor/backgroundColor/borderColor/ringColor keys
 * instead of one shared `colors` object. Tailwind treats each as its own
 * namespace, so short names like "disabled" or "strong" can be reused across
 * categories (bg-disabled, border-disabled, text-disabled) without colliding
 * — a flat shared `colors` object would force verbose disambiguated names
 * (interactive-disabled-bg) or produce real clashes (surface-disabled and
 * interactive-disabled-bg both wanting the bare key "disabled"). Each token
 * is placed in the categories its Figma `scopes` field actually declares
 * (ALL_FILLS -> backgroundColor, STROKE_COLOR -> borderColor, TEXT_FILL ->
 * textColor); focus-ring maps to ringColor since that's the Tailwind utility
 * a focus ring actually uses (ring-2 ring-focus), not border-.
 *
 * font-size/spacing/line-height/letter-spacing map the primitive scales
 * directly, since there's no semantic layer for those yet.
 * Not wired into any build yet — see tokens.css for the source values.
 */
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    extend: {
      textColor: {
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        link: "var(--text-link)",
        disabled: "var(--interactive-disabled-text)",
      },
      backgroundColor: {
        base: "var(--surface-base)",
        card: "var(--surface-card)",
        muted: "var(--surface-disabled)",
        brand: "var(--brand-primary)",
        disabled: "var(--interactive-disabled-bg)",
        strong: "var(--border-strong)",
        success: "var(--status-success)",
        warning: "var(--status-warning)",
        error: "var(--status-error)",
        info: "var(--status-info)",
      },
      borderColor: {
        subtle: "var(--border-subtle)",
        strong: "var(--border-strong)",
        disabled: "var(--interactive-disabled-border)",
        success: "var(--status-success)",
        warning: "var(--status-warning)",
        error: "var(--status-error)",
        info: "var(--status-info)",
      },
      ringColor: {
        focus: "var(--focus-ring)",
      },

      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        24: "var(--space-24)",
        "card-padding": "var(--space-card-padding)",
        "element-gap": "var(--space-element-gap)",
      },

      borderRadius: {
        card: "var(--radius-card)",
      },

      fontSize: {
        xs: ["var(--font-size-xs)", { lineHeight: "var(--line-height-xs)" }],
        sm: ["var(--font-size-sm)", { lineHeight: "var(--line-height-sm)" }],
        base: ["var(--font-size-base)", { lineHeight: "var(--line-height-base)" }],
        lg: ["var(--font-size-lg)", { lineHeight: "var(--line-height-lg)" }],
        xl: ["var(--font-size-xl)", { lineHeight: "var(--line-height-xl)" }],
        "2xl": ["var(--font-size-2xl)", { lineHeight: "var(--line-height-2xl)" }],
        "3xl": ["var(--font-size-3xl)", { lineHeight: "var(--line-height-3xl)", letterSpacing: "var(--letter-spacing-3xl)" }],
        "4xl": ["var(--font-size-4xl)", { lineHeight: "var(--line-height-4xl)", letterSpacing: "var(--letter-spacing-4xl)" }],
        "5xl": ["var(--font-size-5xl)", { lineHeight: "var(--line-height-5xl)", letterSpacing: "var(--letter-spacing-5xl)" }],
        "6xl": ["var(--font-size-6xl)", { lineHeight: "var(--line-height-6xl)", letterSpacing: "var(--letter-spacing-6xl)" }],
      },

      lineHeight: {
        xs: "var(--line-height-xs)",
        sm: "var(--line-height-sm)",
        base: "var(--line-height-base)",
        lg: "var(--line-height-lg)",
        xl: "var(--line-height-xl)",
        "2xl": "var(--line-height-2xl)",
        "3xl": "var(--line-height-3xl)",
        "4xl": "var(--line-height-4xl)",
        "5xl": "var(--line-height-5xl)",
        "6xl": "var(--line-height-6xl)",
      },

      letterSpacing: {
        "3xl": "var(--letter-spacing-3xl)",
        "4xl": "var(--letter-spacing-4xl)",
        "5xl": "var(--letter-spacing-5xl)",
        "6xl": "var(--letter-spacing-6xl)",
      },
    },
  },
  plugins: [],
};
