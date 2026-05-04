# Home Module Implementation Prompt

Based on the Figma design and requirements document, complete the Home module for the RockBond Web App.

## Goal

The Home page serves as the primary dashboard once a user enters the app. It acts as the central hub for viewing current climbing status, recent records, task progress, and quick access points. The page must be **mobile-first**, with a visual style closely aligned with the Figma Home Dashboard: dark green brand colors, light background, rounded cards, clear information hierarchy, and a bottom navigation bar.

## Functional Requirements

1. **Access Control**: Users enter the Home page after completing the initial Onboarding.
2. **Persistence**: If a user profile already exists in `localStorage`, the app should direct the user straight to the Home page upon opening.
3. **Status Display**: The Home page must display basic user status, including:
    - Username or a welcome message.
    - Current level/rank.
    - Active Quest (Current active task).
    - Recent Ascents (Most recent climbing records).
    - Basic stats (e.g., routes, projects, progress, etc.).
4. **Active Quest Interaction**: The Active Quest card must be clickable, redirecting the user to `/progress` (Climbing Progress page).
5. **Recent Ascents Logic**: This section should no longer read from "sessions." Instead, it must fetch the most recent climbing log or project from `rockbond_logs`.
6. **Quick Log Entry**: Accessible via the plus (+) button in the center of the bottom nav, redirecting to `/log-session`. Note: This page is for logging specific climbs/projects, not creating general sessions.
7. **Data Calculation**: Displays for progress, routes, saved projects, and recent improvements should be calculated primarily based on `rockbond_logs`.
8. **Authenticity**: Maintain real interaction and data persistence; do not use static mockups.

## Data Requirements

Use `localStorage` for data persistence. The Home page primarily reads from:

- `rockbond_userProfile`
- `rockbond_logs`
- `rockbond_questProgress`
- `rockbond_badges`

**Note:**
- `rockbond_logs` represents individual user climbing logs/projects.
- `rockbond_sessions` represents temporary activities/sessions in the Explore module and should **not** be used as the data source for Recent Ascents.
- If no logs exist, display a friendly **empty state** to guide the user to "Quick Log."

## Page Interaction

- **Active Quest Card**: Click to jump to `/progress`.
- **Quick Log / Center Plus Button**: Click to jump to `/log-session`.
- **Header Notification Bell**: Click to jump to `/notifications`.
- **Bottom Navigation**: Must remain functional with the "Home" tab in an active state.
- **State Consistency**: User profile, recent logs, task progress, and badge status must persist after a page refresh.

## UI Requirements

- **Strictly Mobile-First**: The layout must be optimized for mobile screens with a centered max-width container for the main content.
- **Visual Structure** (Refer to Figma Home Dashboard):
    - Top brand/user info area.
    - Card-style Active Quest.
    - Recent Ascents block.
    - Statistics cards grid.
    - Bottom navigation bar.
- **Iconography**: Use `lucide-react` icons; do not use letter placeholders.
- **Implementation**: Must be built with real DOM components; do not use screenshots as static backgrounds.

## Acceptance Criteria

1. Users can successfully enter Home after finishing Onboarding.
2. User profile is retained after refreshing, and the app directs straight to Home.
3. After adding a new "Quick Log," the "Recent Ascents" on the Home page updates to show the latest entry.
4. The Active Quest card correctly redirects to `/progress`.
5. The Header notification button correctly redirects to `/notifications`.
6. The Home tab in the bottom navigation reflects the correct active state.
7. The page layout is responsive and free of overflow or clipping on mobile widths.
8. `npm run build` completes successfully.
