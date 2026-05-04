Please optimize the visual style of the **BottomNav** component for the RockBond application.

The current bottom navigation bar feels a bit bulky; I would like it to be more compact. Please reduce the height of the navigation bar to minimize the vertical space it occupies while ensuring that the clickability and clarity of the mobile navigation remain intact.

The central **Add** button needs to be more prominent. Please design it so that the button protrudes slightly upward from the navigation bar, creating a more layered and dynamic mobile navigation effect. This button should remain a dark green circle and continue to serve as the entry point for **Quick Log**, redirecting to `/log-session` without changing its functional purpose.

The default size of the standard navigation icons should be slightly reduced to make the overall look lighter. The currently **active** navigation item needs to be more distinct—for example, the active icon and its background could be slightly scaled up so users can easily identify which page they are on (Home, Community, Explore, or Profile).

Please remove the mobile **gesture indicator** (the simulated iOS home bar); it is no longer needed. Additionally, the bottom navigation bar should not have multiple background layers. Avoid the visual clutter of a rounded navigation bar sitting on top of a rectangular background. The final result should feature a single, clean background for the bottom nav.

If rounded corners for the bar itself look unnatural, please remove them and use a **straight-edge, full-width bottom bar**. The final layout should be: the navigation bar spans the full width and sits flush against the bottom of the screen, the overall height is lower, the central Add button protrudes upward, the active item is slightly enlarged, and inactive items are more lightweight. The overall visual should be concise and polished.

Please only modify the visual styling of the **BottomNav** component. Do **not** change the existing routing, icon mapping, navigation logic, or `localStorage` data logic. After the modifications, please run `npm run build` to ensure the build passes successfully.