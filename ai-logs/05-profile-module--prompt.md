Please complete the Profile module for the RockBond Web App based on the Figma designs and the requirements document.

The Profile module is where users show their climbing identity, achievements, badges, and climbing journey. It must be mobile-first and should closely match the visual structure in Figma.

Rebuild the /profile page so it looks closer to figma_photo/Profile.png. The top section should show the user avatar, rank or level, username, and location. Show core user stats such as total climbs and milestones. Keep the bottom navigation visible without covering the page content.

Add an Achievements section on the Profile page that shows representative or recent achievement badges. Add a See all link on the right side of the Achievements title, and make it navigate to /achievements. The badge cards shown on Profile should also be clickable and should navigate to /badge/:badgeId. Badge unlock state should be calculated from rockbond_badges. Unlocked badges should appear highlighted and vibrant, while locked badges should look gray or faded with a lock state.

Create the /achievements page based on figma_photo/Achievement Badge Wall.png. The page should include a back button, the title Climb Achievements, and the user's avatar. Add introductory text, a Customise Wall button, and a two-column badge grid. Unlocked badges should show colored icons or avatars with a green checkmark, while locked badges should appear grayed out. At the bottom, show Mastery Progress with overall progress and category progress such as Bouldering, Trad, and Sport.

Create the /badge/:badgeId page based on figma_photo/Badge Details.png. The page should show a large badge hero card, badge name, level tag, Class, Terrain, How to Earn, progress, and Rarity. The Share Achievement button only needs local UI feedback and should not call a real sharing API.

At the bottom of Profile, add a Climbing Journey section that merges personal logs and community sessions into one feed. Use rockbond_logs for personal climbing logs or projects created through Quick Log, and use rockbond_sessions for sessions created or joined by the user. Sort journey items by date or createdAt in descending order. Each item should show a title, description, date, thumbnail, and a type tag such as LOG, PROJECT, or SESSION. If there is no real data, show Figma-style fallback content.

Each Climbing Journey item should be clickable. Create the /journey/:entryType/:entryId page to show the details of a specific journey record. This page is different from the Explore module's /session/:sessionId page, so do not replace or change the temporary event detail page.

The Journey detail page should follow figma_photo/Session Detail.png. It should include a top bar with a back button, the title Session Detail, and a share icon. Show the record title, location, date, and four stat cards for Grade, Attempts, Duration, and Conditions. Also show two horizontal image cards, Session Notes, tags, an Effort Map, and a View on Map preview. Use data from rockbond_logs or rockbond_sessions when available. If data is missing, use Figma-style fallback data such as Midnight Lightning.

Use a unified achievement data source for badge properties, and merge it with rockbond_badges from localStorage to determine unlocked status. Profile statistics should be calculated dynamically from logs, sessions, and badges where possible. All user-generated content should remain in localStorage. Do not add external APIs or a backend.

Record the needed Profile, Badge, and Journey Detail background filenames in public/backgrounds/README.md. This should include badge hero images, badge thumbnails, journey detail main and secondary images, and map previews. If images are missing, use CSS colors or gradients as fallback so the UI remains visually consistent.

After implementation, test that /profile closely resembles the Figma design, the See all link opens /achievements, badge clicks open /badge/:badgeId, back navigation works, journey items open /journey/:entryType/:entryId, real logs and sessions appear correctly in Journey, Explore's /session/:sessionId remains unaffected, bottom navigation does not overlap content, and npm run build passes.
