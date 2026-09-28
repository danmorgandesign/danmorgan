# CLAUDE.md — danmorgan.co.uk

## Overview
Personal portfolio and design engineering lab for **Dan Morgan** (UX/Product Designer). The site showcases high-fidelity product design work, interactive UI components, and agentic design-to-code workflows integrating **Figma** and **Claude Code**.

---

## Technical Stack & Architecture

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS (configured for semantic CSS variable tokens)
- **Icons & Motion:** Lucide React, Framer Motion
- **Design Systems Bridge:** Figma REST API / Figma MCP Server.
- **AI Agent Context:** Claude Code CLI via `.claude/` rules and repository markdown specs

---

## Core Development Commands

```bash
# Development
npm run dev           # Start local dev server (http://localhost:3000)
npm run build         # Production build test
npm run lint          # Run ESLint checks

# Design Tokens Sync
npm run tokens:sync   # Pull variables from Figma API and generate CSS/Tailwind definitions
