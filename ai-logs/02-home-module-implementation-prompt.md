Please complete the Home module for the RockBond Web App based on the Figma design and the requirements document.

The Home page should be the main dashboard after the user enters the app. It should work as the central hub for current climbing status, recent records, active quest progress, and quick access points. The layout must be mobile-first and visually close to the Figma Home Dashboard, using RockBond's dark green brand color, light background, rounded cards, clear hierarchy, and the bottom navigation bar.

Users should enter Home after completing onboarding. If a user profile already exists in localStorage, the app should go directly to Home when opened. Home should display the username or welcome message, current level or rank, active quest, recent ascents, and basic stats such as routes, projects, and progress.

The Active Quest card must be clickable and should redirect to /progress. The Recent Ascents section should not read from sessions. It should show the most recent climbing log or project from rockbond_logs. The center plus button in the bottom navigation should go to /log-session, but this page is for Quick Log and logging climbs or projects, not for creating general sessions.

Progress, total routes, saved projects, and recent improvement should be calculated mainly from rockbond_logs. Home should read from rockbond_userProfile, rockbond_logs, rockbond_questProgress, and rockbond_badges. rockbond_logs represents personal climbing logs or projects, while rockbond_sessions represents temporary activities in the Explore module and should not be used as the source for Recent Ascents.

If no logs exist, show a friendly empty state that guides the user to Quick Log. The notification bell in the header should link to /notifications. The bottom navigation must remain functional, with Home shown as active.

Please use lucide-react icons instead of letter placeholders. Build the UI with real React components and DOM elements, not static screenshots. Make sure the layout is responsive on mobile widths, does not overflow or clip, and that user profile, logs, quest progress, and badge state persist after refresh.

After implementation, run npm run build and make sure it completes successfully.
