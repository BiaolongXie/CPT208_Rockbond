---

# RockBond Development Requirements Document

## 1. Project Overview

### 1.1 Project Name

**RockBond**

### 1.2 Project Context

RockBond is a CPT208 Human-Centric Computing coursework project under the **Active Lifestyles / Go Climbers** track. The system is a **mobile-first web app** designed for climbers, especially beginner-to-intermediate climbers and socially motivated student climbers.

The goal is to help users:

* track climbing progress;
* log climbing sessions;
* remember routes and saved projects;
* find climbing partners or group sessions;
* discover events and climbing opportunities;
* stay motivated through playful, low-pressure features.

The system should be developed as a **functional web-based prototype**, not only a static UI mockup. The CPT208 brief requires the system to be a live interactive web app, ideally accessible through a URL, with core functionality, responsive design, source code repository, and evidence of data handling.

---

## 2. Course Requirements to Follow

The system must satisfy the following CPT208 requirements:

### 2.1 Platform Requirement

The system must be a **Web App**, ideally accessible through a public live URL such as:

* Vercel
* GitHub Pages

The course specifies that the system should be a functional prototype demonstrating the proposed solution.

### 2.2 Core Feature Requirement

The system must implement at least **3 must-have playful features** identified in the Requirements List.

For RockBond, the three must-have playful features are:

1. **Session-to-Session Progress Quest**
2. **Climb Circles and Friendly Micro-Challenges**
3. **Exploration and Community Discovery Badges**

### 2.3 Responsive Design Requirement

The system should be optimized for the device direction of the topic. Since Go Climbers is mainly mobile-oriented, the app should be designed as a **mobile-first web app**.

Target design size:

```text
360px × 780px
```

The layout should also remain usable on larger browser screens.

### 2.4 Data Handling Requirement

The system must show how it handles user input or interaction states.

For this prototype, use:

```text
localStorage
```

This is enough for coursework-level functional demonstration unless a backend has already been implemented.

### 2.5 AI / Vibe Coding Requirement

If AI is used for coding, the project must include:

```text
/ai-logs
```

This folder should contain the main prompts used to generate core components, because the coursework requires vibe coding logs and technical reflection if AI is used.

---

## 3. Technical Stack

Use the following stack unless there is a strong reason to change it:

```text
Frontend: React + Vite
Styling: Tailwind CSS
Routing: React Router
State/Data: localStorage
Deployment: Vercel or GitHub Pages
Version Control: GitHub
```

### 3.1 Technical Constraints

* Use free-tier services only.
* Do not use paid APIs.
* Do not require login authentication for the first prototype unless already implemented.
* Do not build a complex backend unless necessary.
* Prioritize a working, testable prototype over unnecessary technical complexity.
* The app must run locally with:

```bash
npm install
npm run dev
```

---

## 4. Design Source and Figma Usage

### 4.1 Figma as UI Template

The Figma file is the main visual and interaction reference.

The agent should follow:

* page layout;
* visual hierarchy;
* color style;
* spacing;
* card structure;
* button placement;
* navigation structure;
* mobile-first screen design.

### 4.2 Figma Does Not Define All Logic

The Figma file should not be treated as the complete product specification. It mainly defines **what the system looks like**.

This requirements document defines:

* what the system does;
* what data should be stored;
* how user actions affect the interface;
* what features must work;
* how the app should be tested.

### 4.3 Design Style

The app should follow a clean, mobile app-like, playful interface.

Suggested style:

```text
Mobile-first
Rounded cards
Clear spacing
Large tap targets
Friendly visual tone
Beginner-friendly
Low-pressure
Not overly competitive
```

Suggested color palette:

```text
Dark green: #0D2818
Light background: #E1E3DF
Accent green: #CFEAC9
```

If the Figma file contains more accurate color tokens, use the Figma values instead.

---

## 5. Target Users

### 5.1 Primary Users

The primary users are:

* student climbers;
* beginner climbers;
* occasional climbers;
* beginner-to-intermediate indoor climbers;
* socially motivated climbers.

### 5.2 Secondary Users

The secondary stakeholders are:

* climbing coaches;
* climbing gym staff;
* climbing event organizers;
* experienced climbers who support beginners.

### 5.3 Key User Problems

Users face the following problems:

1. Progress is difficult to see clearly over time.
2. Users often forget routes, projects, and previous session details.
3. Beginners may feel intimidated or unsure whether they are improving.
4. Social opportunities such as partner-finding or beginner sessions are not always easy to access.
5. Motivation can fade between climbing sessions.
6. Existing tools are either too generic, too complex, or not climbing-specific.

---

## 6. Product Goal

RockBond should combine:

```text
Progress tracking + playful motivation + lightweight climbing community
```

The app should not be only a fitness tracker, and it should not be only a social platform.

It should help users answer:

* What did I climb recently?
* Am I improving?
* What should I try next?
* Who can I climb with?
* What events or opportunities can I join?
* What small playful goal can keep me motivated?

---

# 7. Core Functional Requirements

## FR1. Onboarding

### Description

The system shall provide a simple onboarding flow to understand the user’s climbing level and goals.

### Required UI Elements

* App title: **RockBond**
* Short introduction
* Climbing level selection:

  * Beginner
  * Occasional
  * Regular
  * Experienced
* Goal selection:

  * Track progress
  * Find partners
  * Discover events
  * Stay motivated
* Continue / Start button

### Required Logic

* Save selected level and goals to localStorage.
* After onboarding, navigate user to Home Dashboard.
* If onboarding data already exists, user can go directly to Home Dashboard.

### Suggested localStorage Key

```javascript
rockbond_userProfile
```

---

## FR2. Home Dashboard

### Description

The Home Dashboard is the main entry point of the app. It should show the user’s current quest, recent climbing session, quick actions, and community motivation.

### Required UI Elements

* Header:

  * RockBond logo / title
  * profile icon
* Current Quest card
* Quest progress bar
* Recent Session card
* Quick action button:

  * Log New Session
* Secondary action:

  * Find Partner
  * Discover Event
* Bottom navigation

### Required Logic

* Display current weekly quest.
* Display progress based on logged sessions.
* Display the most recent saved session.
* Navigate to Log Session when user clicks “Log New Session”.
* Navigate to Partner / Community page when user clicks “Find Partner”.

### Example Quest

```text
Complete 2 climbing sessions this week
```

---

## FR3. Session Logging

### Description

The system shall allow users to quickly log a climbing session.

### Required Fields

* Date
* Location / climbing gym
* Climbing type:

  * Bouldering
  * Top rope
  * Lead climbing
  * Mixed
* Routes completed
* Difficulty level
* Session notes
* Saved project checkbox or tag

### Required UI Elements

* Form page
* Clear labels
* Submit button
* Cancel / Back button
* Success feedback after submission

### Required Logic

When the user submits a session:

1. Validate required fields.
2. Save the session to localStorage.
3. Update recent session.
4. Update weekly quest progress.
5. Show confirmation message.
6. Navigate back to Home Dashboard or Session History.

### Suggested localStorage Key

```javascript
rockbond_sessions
```

### Example Data Structure

```javascript
{
  id: "session_001",
  date: "2026-05-04",
  location: "Campus Climbing Gym",
  climbingType: "Bouldering",
  routesCompleted: 8,
  difficultyLevel: "Beginner",
  notes: "Completed several V1 routes and saved one project.",
  savedProject: true,
  createdAt: "2026-05-04T10:00:00Z"
}
```

---

## FR4. Session History

### Description

The system shall provide a simple history view where users can review previous climbing sessions.

### Required UI Elements

* List of logged sessions
* Date
* Location
* Routes completed
* Difficulty level
* Short notes
* Empty state if no sessions exist

### Required Logic

* Read all sessions from localStorage.
* Sort sessions by date or created time.
* Display latest sessions first.
* Allow users to view session details if feasible.

---

## FR5. Progress Dashboard

### Description

The system shall show users their climbing progress in a simple, encouraging way.

### Required UI Elements

* Total sessions
* Total routes completed
* Current weekly quest progress
* Saved projects count
* Recent improvement summary
* Badges or milestones

### Required Logic

Calculate progress from localStorage data.

Example calculations:

```text
Total Sessions = number of saved sessions
Total Routes = sum of routesCompleted
Quest Progress = number of sessions this week / quest target
Saved Projects = number of sessions marked as savedProject
```

### UX Requirement

Progress should feel supportive, not stressful. Avoid aggressive ranking or public comparison.

---

# 8. Must-Have Playful Features

## PF1. Session-to-Session Progress Quest

### Description

Users receive small climbing quests that encourage regular participation and progress.

### Example Quests

```text
Complete 2 climbing sessions this week
Log 10 routes this week
Return to one saved project
Try one new difficulty level
```

### Required UI Elements

* Quest card
* Quest title
* Quest description
* Progress bar
* Progress text
* Completion state

### Required Logic

* Store current quest status.
* Update quest progress after session logging.
* If the user reaches the target, show a completion message.
* Completed quest should unlock progress feedback or badge.

### Suggested localStorage Key

```javascript
rockbond_questProgress
```

### Example Data Structure

```javascript
{
  questId: "weekly_sessions",
  title: "Complete 2 sessions this week",
  target: 2,
  current: 1,
  completed: false
}
```

---

## PF2. Climb Circles and Friendly Micro-Challenges

### Description

Users can join small climbing circles or friendly challenges. This feature supports social motivation without using public leaderboards.

### Required UI Elements

* Circle / challenge cards
* Challenge title
* Participants or small avatar placeholders
* Goal
* Progress
* Join button

### Example Challenges

```text
2 sessions this week
Try one beginner route together
Share one beta tip
Climb with a new partner
```

### Required Logic

* Display a list of predefined circles or challenges.
* User can join a challenge.
* Joined challenge is saved in localStorage.
* Joined state should persist after refresh.

### Suggested localStorage Key

```javascript
rockbond_joinedChallenges
```

### Example Data Structure

```javascript
{
  id: "challenge_001",
  title: "2 Sessions This Week",
  description: "Complete two climbing sessions with your circle this week.",
  participants: 5,
  joined: true
}
```

---

## PF3. Exploration and Community Discovery Badges

### Description

Users unlock lightweight badges by exploring climbing opportunities, joining events, or trying new activities.

### Required UI Elements

* Badge cards
* Badge icon placeholder
* Badge title
* Badge description
* Locked / unlocked state

### Example Badges

```text
First Session Logged
New Partner Joined
Event Explorer
Project Saver
Beginner Session Joined
```

### Required Logic

* Unlock “First Session Logged” after first session.
* Unlock “Project Saver” if user saves a project.
* Unlock “New Partner Joined” after joining a partner invitation or challenge.
* Store unlocked badges in localStorage.

### Suggested localStorage Key

```javascript
rockbond_badges
```

---

# 9. Community and Partner-Finding Features

## FR6. Partner-Finding / Climbing Invitations

### Description

The system shall allow users to browse lightweight climbing invitations.

### Required UI Elements

Each invitation card should include:

* climber name;
* location;
* time;
* skill level;
* climbing goal;
* beginner-friendly tag if applicable;
* Join / Save button.

### Required Logic

* Display predefined invitations.
* User can join or save an invitation.
* Joined or saved state persists after refresh.
* Joining an invitation can unlock a badge.

### Suggested localStorage Key

```javascript
rockbond_joinedInvitations
```

### Example Data Structure

```javascript
{
  id: "invite_001",
  climberName: "Linh",
  location: "Campus Climbing Gym",
  time: "Saturday 3:00 PM",
  skillLevel: "Beginner-friendly",
  goal: "Practice easy bouldering routes",
  joined: true
}
```

---

## FR7. Event Discovery

### Description

The system should show beginner-friendly climbing opportunities or community events.

### Required UI Elements

* Event cards
* Event title
* Location
* Date / time
* Difficulty or audience tag
* Save / Join button

### Example Events

```text
Beginner Bouldering Night
Campus Climbing Meetup
Technique Workshop
Friendly Micro-Challenge Weekend
```

### Required Logic

* Display predefined event data.
* User can save or join events.
* Joined events should persist.
* Joining an event can unlock an exploration badge.

---

# 10. Navigation Requirements

The app should include mobile-first navigation.

## Required Pages

1. Onboarding
2. Home Dashboard
3. Log Session
4. Progress / Quests
5. Community / Partner-Finding
6. Profile / History

## Suggested Routes

```text
/                 → Onboarding or Home
/home             → Home Dashboard
/log-session      → Log Session
/progress         → Progress and Quests
/community        → Partner-Finding and Events
/profile          → Profile and Session History
```

## Bottom Navigation

Suggested bottom nav items:

```text
Home
Log
Progress
Community
Profile
```

---

# 11. Data Model Summary

Use localStorage for prototype data persistence.

## 11.1 User Profile

```javascript
{
  level: "Beginner",
  goals: ["Track progress", "Find partners"],
  onboardingCompleted: true
}
```

Key:

```javascript
rockbond_userProfile
```

---

## 11.2 Sessions

```javascript
[
  {
    id: "session_001",
    date: "2026-05-04",
    location: "Campus Climbing Gym",
    climbingType: "Bouldering",
    routesCompleted: 8,
    difficultyLevel: "Beginner",
    notes: "Completed several routes and saved one project.",
    savedProject: true,
    createdAt: "2026-05-04T10:00:00Z"
  }
]
```

Key:

```javascript
rockbond_sessions
```

---

## 11.3 Quest Progress

```javascript
{
  questId: "weekly_sessions",
  title: "Complete 2 sessions this week",
  target: 2,
  current: 1,
  completed: false
}
```

Key:

```javascript
rockbond_questProgress
```

---

## 11.4 Joined Challenges

```javascript
[
  {
    id: "challenge_001",
    title: "2 Sessions This Week",
    joinedAt: "2026-05-04T10:00:00Z"
  }
]
```

Key:

```javascript
rockbond_joinedChallenges
```

---

## 11.5 Joined Invitations

```javascript
[
  {
    id: "invite_001",
    joinedAt: "2026-05-04T10:00:00Z"
  }
]
```

Key:

```javascript
rockbond_joinedInvitations
```

---

## 11.6 Badges

```javascript
[
  {
    id: "first_session",
    title: "First Session Logged",
    unlockedAt: "2026-05-04T10:00:00Z"
  }
]
```

Key:

```javascript
rockbond_badges
```

---

# 12. Page-by-Page Requirements

## 12.1 Onboarding Page

### Purpose

Help the user set up a basic profile.

### Must Include

* Welcome message
* Climbing level selection
* Goal selection
* Start button

### Interaction

* Save profile.
* Navigate to Home.

---

## 12.2 Home Dashboard

### Purpose

Give users an overview of their progress and next action.

### Must Include

* Current quest
* Progress bar
* Recent session
* Quick log button
* Partner or event suggestion

### Interaction

* Log button opens Log Session.
* Quest progress updates after session logging.
* Recent session updates after session logging.

---

## 12.3 Log Session Page

### Purpose

Allow users to record a climbing session quickly.

### Must Include

* Date input
* Location input
* Climbing type selection
* Routes completed input
* Difficulty level selection
* Notes input
* Saved project checkbox
* Submit button

### Interaction

* Save session.
* Update quest.
* Unlock badges when relevant.
* Return to Home or History.

---

## 12.4 Progress / Quest Page

### Purpose

Show personal climbing progress and playful quests.

### Must Include

* Quest progress
* Total sessions
* Total routes
* Saved projects
* Badges
* Milestones

### Interaction

* Read from localStorage.
* Update automatically based on sessions.

---

## 12.5 Community / Partner Page

### Purpose

Help users find climbing partners, challenges, and events.

### Must Include

* Partner invitation list
* Climb circle / challenge list
* Event discovery cards
* Join / Save buttons

### Interaction

* Save joined invitations.
* Save joined challenges.
* Unlock related badges.

---

## 12.6 Profile / History Page

### Purpose

Show user profile, session history, and achievements.

### Must Include

* User level
* User goals
* Session history
* Badge list
* Saved projects count

### Interaction

* Read user profile and session data.
* Show empty state if no sessions exist.

---

# 13. Accessibility Requirements

The system should follow basic accessibility standards.

## Required

* Use readable font sizes.
* Use sufficient color contrast.
* Buttons must be large enough for mobile tapping.
* Form inputs must have labels.
* Do not rely only on color to show progress or status.
* Use clear feedback after user actions.
* Avoid overcrowded screens.

## Beginner-Friendly Requirement

The app should feel welcoming and low-pressure.

Avoid:

* public leaderboards;
* aggressive ranking;
* shame-based streaks;
* forced social sharing;
* overly advanced climbing terminology without explanation.

---

# 14. Validation and Testing Requirements

The agent should test the following user flows.

## Test Flow 1: First-Time User

1. Open app.
2. Complete onboarding.
3. Arrive at Home Dashboard.
4. Confirm selected level and goals are saved.

Expected result:

```text
User profile persists after refresh.
```

---

## Test Flow 2: Log a Session

1. Go to Log Session.
2. Fill in required fields.
3. Submit session.
4. Return to Home.
5. Check Recent Session.

Expected result:

```text
New session appears in Recent Session and Session History.
```

---

## Test Flow 3: Quest Progress

1. Start with 0 sessions.
2. Log one session.
3. Check weekly quest progress.
4. Log second session.
5. Check quest completion state.

Expected result:

```text
Quest progress updates correctly and shows completion when target is met.
```

---

## Test Flow 4: Join Partner Invitation

1. Go to Community page.
2. Click Join on an invitation.
3. Refresh page.
4. Check joined state remains.

Expected result:

```text
Joined invitation persists after refresh.
```

---

## Test Flow 5: Badge Unlocking

1. Log first session.
2. Check badge list.
3. Join event or challenge.
4. Check relevant badge.

Expected result:

```text
Badges unlock based on user actions.
```

---

# 15. Expected Deliverables

The final development output should include:

```text
React project source code
Mobile-first RockBond web app
Working navigation
Functional session logging
Functional quest progress
Functional community join/save interaction
localStorage data persistence
README.md
/ai-logs folder
Deployment-ready project
```

---

# 16. README Requirements

The `README.md` should include:

```text
Project name
Project overview
Technology stack
Core features
How to run locally
How to build
How to deploy
Known limitations
AI usage statement
```

Example setup instructions:

```bash
npm install
npm run dev
```

Example build command:

```bash
npm run build
```

---

# 17. AI Logs Requirement

Create this folder:

```text
/ai-logs
```

Suggested files:

```text
01-initial-development-prompt.md
02-figma-ui-implementation-prompt.md
03-core-functionality-prompt.md
04-debugging-and-testing-prompt.md
05-readme-and-deployment-prompt.md
```

Each file should contain the actual prompt used with the coding agent.

This is important because CPT208 requires students to explain prompts used, how the code was verified against user requirements, and ethical considerations if vibe coding is used.

---

# 18. Implementation Priorities

The agent should implement features in this order.

## Priority 1: Project Setup

* React + Vite
* Tailwind CSS
* React Router
* Basic folder structure
* Reusable components

## Priority 2: Static UI from Figma

* Onboarding
* Home
* Log Session
* Progress
* Community
* Profile

## Priority 3: Core Functionality

* localStorage data handling
* session logging
* recent session display
* quest progress update
* joined invitation persistence
* badge unlocking

## Priority 4: UX Polish

* responsive layout
* accessibility
* empty states
* success messages
* form validation

## Priority 5: Coursework Submission Support

* README
* `/ai-logs`
* deployment preparation

---

# 19. Folder Structure Suggestion

```text
rockbond/
  public/
  src/
    assets/
    components/
      BottomNav.jsx
      Button.jsx
      Card.jsx
      ProgressBar.jsx
      Badge.jsx
      InvitationCard.jsx
      SessionCard.jsx
    data/
      mockInvitations.js
      mockEvents.js
      mockChallenges.js
    pages/
      Onboarding.jsx
      Home.jsx
      LogSession.jsx
      Progress.jsx
      Community.jsx
      Profile.jsx
    utils/
      storage.js
      quest.js
      badges.js
    App.jsx
    main.jsx
    index.css
  ai-logs/
    01-initial-development-prompt.md
    02-figma-ui-implementation-prompt.md
    03-core-functionality-prompt.md
  README.md
  package.json
```

---

# 20. Final Instruction to Coding Agent

Use the following instruction at the end of your prompt:

```markdown
Important implementation instruction:

Do not create a static-only mockup. The app must be interactive and must demonstrate working user flows. Figma should be used as the visual template, but this requirements document defines the functional behavior. Prioritize the three must-have playful features, mobile-first usability, localStorage data handling, and deployment readiness.

Before coding, inspect the project structure and create a short implementation plan. After coding, test the main flows: onboarding, logging a session, quest progress update, recent session display, joining a partner invitation, badge unlocking, and data persistence after refresh.
```


