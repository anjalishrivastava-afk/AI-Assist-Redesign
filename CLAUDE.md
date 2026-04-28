# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # tsc + vite build (type-check then bundle)
npm run preview    # Preview production build locally
```

There is no test runner configured in this project.

## Architecture

This is a **React 19 + TypeScript + Vite** single-page application — an agent workspace UI for Exotel with AI-powered suggestions during voice/chat interactions. There is no routing, no global state library (Redux/Zustand/Context) — state flows through React hooks and props.

### Layout

`AppShell` is the root layout: a 3-column grid with `InboxSidebar` (left), the interaction area (center), and `AIAssistContainer` (right). Mode (`voice` | `chat`) and interaction state (`active` | `ended`) are held in `AppShell` and passed down as props.

### Key hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useMode` | Tracks `'voice'` or `'chat'` mode |
| `useInteractionState` | `active` ↔ `ended` transitions |
| `useCallTimer` | Formats elapsed call time as `MM:SS` |
| `useStreamingTranscript` | Animates transcript reveal turn-by-turn |
| `useFeedback` | Thumb up/down + reason + comment state for suggestions |
| `useAutoScroll` | Scrolls feed to bottom when new items appear |

### AI Assist panel (`src/components/aiAssist/`)

The right panel switches between `AssistTabbedPanel` (during active call) and `WrapUpView` (after call ends). `AssistTabbedPanel` has three tabs: **Suggestions**, **Transcript**, and **Disposition**.

The Suggestions tab renders `LiveWorkspace`, which builds a chronological feed from transcript turns, inline suggestion groups, and Ask AI Q&A blocks. `StickyAskAIInput` stays pinned at the bottom.

### Interaction area (`src/components/interaction/`)

`VoiceInteraction` and `ChatInteraction` render in the center column based on mode. `ChatInteraction` includes a `Composer` for typed replies.

### Mock data (`src/mocks/`)

All data is mocked — no real API calls. Files: `inbox.ts`, `voiceTranscript.ts`, `chatTranscript.ts`, `suggestions.ts`, `disposition.ts`, `sentiment.ts`, `aiChat.ts`.

### Styling

**Tailwind CSS 4** (via `@tailwindcss/vite`) + custom Signal CSS variables defined in `src/index.css` (`--signal-canvas`, `--signal-surface`, `--signal-border`, etc.). Custom animations (`fadeIn`, `slideUp`, `shimmer`, `pulse-border`) are also defined there.

### Design system

`@exotel-npm-dev/signal-design-system` (MUI-based, internal package). Wrap the app with `ExotelThemeProvider`. Prefer Signal components (`Box`, `Stack`, `Button`, `Tabs`, `Avatar`, etc.) over raw HTML where they exist. Thin wrappers for project-specific patterns live in `src/components/ds/` and `src/components/ui/`.
