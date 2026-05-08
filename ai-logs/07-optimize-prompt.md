1. Routing and Navigation Consistency Optimization
Review the navigation targets of all in-app buttons, cards, and primary CTAs to ensure jump paths align with business semantics. All entry points related to session details must navigate to the specific /session/:sessionId page, avoiding redirection to generalized list pages.

2. First-Time Visit Onboarding Flow
Implement protection logic for first-time visits. If onboardingCompleted: true is missing from local user data, any attempt to access main application routes should redirect the user to /onboarding. Upon completion, users should be directed to /home. Conversely, users who have already completed onboarding should be redirected to /home if they attempt to access /onboarding again.

3. Profile Page User Data Display
Enhance the Profile page to display user information saved during onboarding, including name, location, climbing level, and goal preferences. For legacy users or missing fields, provide sensible default values to ensure stable page rendering.

4. Friend Profile Page Enhancements
Refine the Friend Profile page to showcase their climbing level, training goals, tags, location, and preferred session information. Existing logic for friend requests, friendship status, and chat entry points must remain unchanged.

5. Notification Unread Status and Red Dot Indicators
Implement unread status management for notifications. A red dot indicator should appear on the bell icon in the Header whenever a user receives a new message, friend request, badge unlock, or rank upgrade. Upon entering the Notifications page, current notifications should be marked as read and the red dot hidden. Subsequent new notifications must trigger the indicator again.

6. Real-Time Data Statistics
Replace hardcoded or mock statistical values on the Home and Profile pages with calculations based on real user activity. Total Hours should be derived from the cumulative climbing duration in logs, Climbs from the total routes completed, and Milestones from the actual number of badges unlocked.

7. Add Log Form Improvements
Optimize the "Add Log" form. Set the default value for routes completed to 1 (with a maximum of 99) and include a caption clarifying that this count only includes fully completed routes, not partial attempts. Additionally, add a climbing duration input field to feed into the "Total Hours" statistic on the Home page.

8. Joined Sessions Display and Exit Mechanism
Update the Joined Sessions module on the Home page to display all sessions the user has joined, rather than a fixed subset. Each joined session must provide a "Leave" option; upon leaving, the session should be immediately removed from the list and its status synchronized with localStorage.

9. Public Sessions Display and Deletion Permissions
Update the Public Sessions module on the Explore page to display all public sessions, including those created by the current user. If a session was created by the current user, a "Delete" option must be provided. Once deleted, the session should no longer appear in the Public Sessions list.

10. Community Partners Section Partitioning
Split the Partners tab on the Community page into two distinct sections: My Friends and Recommended Partners. Existing friends should display a message entry point, while recommended partners should show "Add Friend" or "Pending Request" status. Search and filtering logic must apply to both sections simultaneously.

11. Avatar Rendering and Layout Optimization
Standardize and optimize avatar rendering across the application. Avatar images should fill their containers while maintaining their aspect ratio, without white borders, empty spaces, or stretching. Avatars must not overlap level badges or other critical UI elements. In case of image loading failure, the UI should fallback to an initial-based placeholder style.