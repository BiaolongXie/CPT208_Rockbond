import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import AchievementWall from "./pages/AchievementWall.jsx";
import BadgeDetails from "./pages/BadgeDetails.jsx";
import CircleApply from "./pages/CircleApply.jsx";
import CircleChat from "./pages/CircleChat.jsx";
import CircleDetails from "./pages/CircleDetails.jsx";
import Community from "./pages/Community.jsx";
import CreateSession from "./pages/CreateSession.jsx";
import Explore from "./pages/Explore.jsx";
import FriendProfile from "./pages/FriendProfile.jsx";
import Home from "./pages/Home.jsx";
import JourneySessionDetail from "./pages/JourneySessionDetail.jsx";
import LogSession from "./pages/LogSession.jsx";
import Notifications from "./pages/Notifications.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Profile from "./pages/Profile.jsx";
import Progress from "./pages/Progress.jsx";
import RankHelp from "./pages/RankHelp.jsx";
import ActiveChat from "./pages/ActiveChat.jsx";
import SessionDetails from "./pages/SessionDetails.jsx";
import { getUserProfile } from "./utils/storage.js";

function RootRedirect() {
  return <Navigate to={getUserProfile()?.onboardingCompleted ? "/home" : "/onboarding"} replace />;
}

export default function App() {
  const location = useLocation();
  const isOnboarding = location.pathname === "/onboarding";

  return (
    <AppShell compact={isOnboarding}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/log-session" element={<LogSession />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/achievements" element={<AchievementWall />} />
        <Route path="/badge/:badgeId" element={<BadgeDetails />} />
        <Route path="/journey/:entryType/:entryId" element={<JourneySessionDetail />} />
        <Route path="/friend/:friendId" element={<FriendProfile />} />
        <Route path="/chat/:friendId" element={<ActiveChat />} />
        <Route path="/circle/:circleId" element={<CircleDetails />} />
        <Route path="/circle/:circleId/apply" element={<CircleApply />} />
        <Route path="/circle/:circleId/chat" element={<CircleChat />} />
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/session/:sessionId" element={<SessionDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/rank-help" element={<RankHelp />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
