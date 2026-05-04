Please complete the Explore module for the RockBond Web App based on the Figma designs and the requirements document.

Explore should be the main place where users discover climbing venues, community events, and temporary sessions. The page must be mobile-first and should closely follow the visual structure in Figma.

Implement and refine the /explore page. The compass icon in the bottom navigation should link to /explore and show the active state on this page. The Progress page should remain at /progress, but it should no longer be the main bottom navigation entry. Keep the standard RockBond Header at the top of Explore.

The top section should be a map-style hero area with a search bar, filter button, and map markers. Use a dark green topographic-style background that feels close to Figma, but do not use a static screenshot as the whole UI. The transition between the map area and the lower content panel should feel smooth and natural, not like a harsh cut. The lower content area should be a white panel with large rounded corners and category tabs for All Spots, Gyms, and Outdoor Crags.

Add multiple mock climbing venues, including both gyms and outdoor crags. Each venue should include name, type, rating, distance, location, tags, difficulty range, and a background image class. Venue cards should show a background image or CSS fallback, name, rating, distance, tags, and type. Users should be able to search by venue name, location, type, or tags. Users should also be able to filter by categories such as All, Gym, Outdoor, Beginner Friendly, and Top Rated. Search and filter should work together and only affect the current view, with no need to save these states to localStorage.

Show Community Events in Explore as temporary sessions or events that users can join or save. Each event card should be clickable and should navigate to /session/:sessionId. The button on the right side of the card should start as a Plus icon. Clicking it should change it to a Check icon, and clicking it again should change it back to Plus. Clicking this button must not trigger the card navigation. Save this joined or saved state in localStorage.

Add a floating + Session button near the bottom right. It should sit closer to the right edge but should not touch or overlap the bottom navigation bar. Clicking it should navigate to /create-session.

Implement the /create-session page based on the Figma Create Session screen. The form should include title, grade range, location, date, start time, notes, privacy, and partner invitations. Clicking Create & Share should save the new session into rockbond_sessions and redirect to the newly created session detail page.

Implement the /session/:sessionId page based on the Figma Session screen. The page should include a hero image, location, difficulty range, title, Join Session button, About section, Time, Level, Participants, and Discussion. Clicking Join Session should mark the session as joined and persist this state in localStorage. The Discussion input should let users post comments, and those comments should remain after refresh.

Keep the data boundary clear. Explore sessions are temporary community activities and should use rockbond_sessions. Quick Log should write to rockbond_logs, not rockbond_sessions. Do not confuse Explore sessions with personal climbing logs or projects shown in Profile.

Record all required background image filenames in public/backgrounds/README.md, including maps, venue cards, event thumbnails, create-session location maps, and session hero images. If images are missing, use CSS fallback gradients or colors so the UI still works.

After implementation, test that /explore renders correctly with the map, search, filter, tabs, and venue cards; search and filter update results correctly; event cards navigate to details; the Plus and Check toggle works and persists; creating a session saves to localStorage and redirects correctly; joined sessions and discussion comments persist after refresh; and npm run build passes.
