# ExoAssist — AI Assist Redesign

ExoAssist is a unified support widget for contact center agents, surfacing live voice calls, multi-channel chats, and AI-generated reply suggestions in a single interface. It is built as a redesign concept for Exotel's agent desktop, fully aligned with the Signal Design System. The project demonstrates how AI-powered tooling — sentiment analysis, auto-disposition, and contextual suggestions — can be embedded natively into the agent workflow.

🔗 [Live demo](https://placeholder-vercel-url)

---

## Features

- **Multi-channel inbox** — side-by-side view of live voice calls and chat conversations (WhatsApp, Email, Web)
- **AI-suggested replies** — ranked suggestions with confidence scoring (High / Medium / Low) and source attribution
- **Low-confidence warnings** — flagged suggestions prompt the agent to verify before sending
- **Sticky Ask AI composer** — agents can ask free-form questions mid-call and receive in-line AI responses
- **Live voice interface** — mute, hold, transfer, conference, and end-call controls with a live call timer
- **Sentiment indicator** — sparkline and label showing customer sentiment trend across the conversation
- **Auto-disposition** — AI pre-fills disposition, sub-disposition, and call notes; agent reviews and saves
- **Feedback on suggestions** — thumbs up/down with optional reason picker (inaccurate, off-topic, etc.)
- **Wrap-up view** — conversation summary, full transcript with PII redaction, and disposition form post-call
- **Chat composer** — insert AI suggestions directly or edit before sending

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Component library | `@exotel-npm-dev/signal-design-system` v1 (MUI-based) |
| Icons | `@phosphor-icons/react` v2 |
| Utility CSS | Tailwind CSS 4 (via `@tailwindcss/vite`) |

---

## Project Structure

```
src/
├── components/
│   ├── aiAssist/       # Right-panel AI Assist: feed, suggestions, disposition, wrap-up
│   ├── interaction/    # Center-panel voice and chat interaction views
│   ├── layout/         # AppShell, InboxSidebar, ModeToggle
│   ├── ds/             # Thin project-specific wrappers (MessageCard, etc.)
│   └── ui/             # Reusable presentational atoms (ConfidenceBadge, SourceChip, etc.)
├── hooks/              # useMode, useInteractionState, useCallTimer, useFeedback, etc.
└── mocks/              # Static demo data: inbox, transcripts, suggestions, sentiment
```

---

## Getting Started

```bash
npm install
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # Type-check + production bundle
```

---

## Design System Alignment

The project consumes Exotel's **Signal Design System** directly from the internal npm registry (`@exotel-npm-dev/signal-design-system`). The app is wrapped in `ExotelThemeProvider`, which injects the Signal MUI theme — including the Noto Sans typeface, color palette, spacing scale, and border-radius tokens — at runtime. No hand-authored design tokens are used; all component styling is expressed through MUI's `sx` prop against the live theme.

**Phosphor icons** were chosen to match Signal's visual language. Icons use `weight="fill"` for confirmed or active states (e.g. muted mic, resolved call, feedback sent) and the default regular weight for action triggers and neutral UI.

---

## Demo Mode

The app runs entirely in demo mode — no backend or API keys required. All customer data, call transcripts, AI suggestions, and sentiment readings are provided by static mock files in `src/mocks/`. Switching between voice and chat mode, triggering wrap-up, inserting suggestions, and submitting feedback all work end-to-end in the browser.

---

## Credits

Interface design based on original Figma concepts by the Exotel product design team. Component library and design tokens provided by the Signal Design System team at Exotel.
