# Community Module Implementation Prompt

Complete the Community module for the RockBond Web App based on the Figma design, screenshots in `figma_photo/Community/`, and the requirements document.

## Goal

The Community page is responsible for social connections and circle discovery among users. It no longer handles activities, locations, or session discovery (which belong to the Explore module). The page must be **mobile-first**, with a visual style closely matching the "Partners Discover" and "Circles Discover" pages in Figma.

## Page Structure

The Community page route is `/community` and includes two main tabs:

- `Partners`
- `Circles`

The top section must retain the universal RockBond Header, a search bar, and a segmented control for switching between Partners and Circles. The bottom navigation bar must remain functional, with the "Community" icon in an active state.

## Partners Functional Requirements

The Partners page displays a list of potential climbing partners.

Each **Partner Card** must include:
- User avatar
- Username
- Grade / Climbing proficiency level
- Location or distance
- Short bio
- Tags (e.g., `Bouldering`, `Lead`, `V4-V6`)
- A friend status button on the right

**Interaction Requirements**:
1. Clicking the avatar or name area redirects to `/friend/:friendId`.
2. For users not yet added as friends, the button displays an "Add Friend" icon.
3. Clicking "Add Friend" should not send the request immediately; instead, it should expand a brief **Friend Request Input Area**.
4. Users can edit the request message (e.g., *"Hey Marcus, want to connect for a climb sometime?"*).
5. Upon clicking "Send," the request is written to `rockbond_friendRequests` with a status of `pending`.
6. For sent requests, the button shows a "Pending" state and prevents duplicate sends.
7. Once the recipient accepts, the status changes to "Friend."
8. Once they are friends, the button changes to a "Chat" icon, which redirects to `/chat/:friendId`.
9. **Note**: Do not display "Community Events" at the bottom of the Partners page; event discovery is strictly for the Explore page.

## Friend Request Data Requirements

Use `localStorage` to simulate the friend request workflow:
- `rockbond_friendRequests`
- `rockbond_friends`
- `rockbond_chats`

**Suggested fields for Friend Requests**:
`id`, `fromName`, `toFriendId`, `toName`, `message`, `status` (`pending` / `accepted` / `rejected`), `createdAt`.

The **Notifications** page must display pending requests and provide:
- **Accept**: Update status to `accepted`, write to `rockbond_friends`, and initialize chat data.
- **Reject**: Update status to `rejected`, do not write to friends, and remove the request from the pending notifications list.

## Circles Functional Requirements

The Circles page must replicate the layout from the Figma `circles discover.png`, focusing on visual structure and real state interaction.

**Content Sections**:
1. **My Active Groups**:
    - Display a `3 Groups` pill to the right of the title.
    - Show active group cards (e.g., `Peak Seekers`, `Crag Collective`).
2. **Discover New Circles**:
    - Large background image cards (e.g., `Alpine Pioneers`).
    - Overlay info with glassmorphism effects, member counts, tags, `Recruiting Now` status, and a `Join` button.
    - List items below (e.g., `Gear Nerds Anonymous`, `Indoor Technicians`) with a plus/joined toggle button.
3. **Featured Circles**:
    - Horizontal rounded cards (e.g., `Power Dyno`).
    - Display overlapping avatar stacks, member counts, and a `See all` link.
4. **Create Circle Entry**:
    - A light green dashed-border card at the bottom of the page.
    - Copy: *"Don't see your tribe?"*
    - A circular "Plus" button.

## Circles Interaction

- Join / Plus buttons must persist the "Joined" state in `localStorage`.
- You may reuse `rockbond_joinedChallenges` or an equivalent "Joined Circle" state.
- Once joined, the button should show a "Joined" or "Checked" state.
- States must persist after a page refresh.
- The full "Create Circle" flow is not required for this phase; the card serves as a placeholder entry point.

## UI Requirements

- **Strictly Mobile-First**.
- **Visual Style**: Light green background, white rounded cards, dark green primary buttons, soft shadows, circular avatars, and linear icons.
- **Iconography**: Use `lucide-react` icons; no letter placeholders.
- **Implementation**: Build with real DOM components; do not use screenshots as static pages.
- **Assets**: Reserve a `public/backgrounds/` directory for future circle background images.

## Acceptance Criteria

1. Opening `/community` defaults to the Partners tab.
2. "Community Events" do not appear on the Partners page.
3. Clicking a partner's avatar/name redirects to `/friend/:friendId`.
4. Clicking "Add Friend" expands the request message editor.
5. Sending a request sets status to `pending` and persists it in `localStorage`.
6. Notifications correctly display pending requests with Accept/Reject options.
7. Accepting a request changes the partner's button to "Chat" in the Community list.
8. Rejecting a request removes it from notifications and does not establish a friendship.
9. Clicking the "Chat" button redirects to `/chat/:friendId`.
10. The Circles page layout matches the Figma `circles discover.png`.
11. Circle "Join" states are preserved after a page refresh.
12. Bottom navigation functions correctly with the active state for Community.
13. `npm run build` completes successfully.