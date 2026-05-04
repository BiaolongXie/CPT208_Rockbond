# RockBond

RockBond is a CPT208 Human-Centric Computing mobile-first web app prototype for beginner-to-intermediate climbers. It combines progress tracking, gentle quests, session logging, climbing partner discovery, community events, and lightweight badge rewards.

## Technology Stack

- React + Vite
- Tailwind CSS
- React Router
- localStorage persistence
- Deployment-ready for Vercel or GitHub Pages

## Core Features

- Mobile-first onboarding with climbing level and goal selection.
- Working navigation across Home, Log Session, Progress, Community, and Profile pages.
- Session logging with validation, saved projects, recent session display, and history.
- Weekly quest progress based on logged sessions.
- Partner invitation, challenge, and event join/save behavior with persistence.
- Badge unlocking for first session, project saving, partner/challenge joining, event exploration, and weekly quest completion.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

### Vercel

Import the GitHub repository into Vercel and use the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages

Build the app with `npm run build`, then publish the `dist` folder using a GitHub Pages workflow or a Pages deployment action.

## Data Handling

The prototype stores all interaction data in browser localStorage:

- `rockbond_userProfile`
- `rockbond_logs`
- `rockbond_sessions`
- `rockbond_questProgress`
- `rockbond_joinedChallenges`
- `rockbond_joinedInvitations`
- `rockbond_joinedEvents`
- `rockbond_badges`

## Background Images

Custom background images can be placed in `public/backgrounds`:

- `explore-map.jpg`
- `gym-card.jpg`
- `event-yoga.jpg`
- `event-social.jpg`
- `progress-quote.jpg`
- `rank-help-hero.jpg`

## Known Limitations

- This is a coursework prototype and does not include authentication or backend sync.
- Community data is predefined mock data.
- Figma was used through exported screenshots in `figma_photo/` because the online Figma link was not directly accessible in this environment.

## AI Usage Statement

AI assistance was used to scaffold and implement the prototype from the requirements document, exported Figma screenshots, and the implementation plan. Main prompts are recorded in `/ai-logs` for CPT208 reflection and transparency.
