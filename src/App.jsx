import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import AchievementWall from "./pages/AchievementWall.jsx";
import BadgeDetails from "./pages/BadgeDetails.jsx";
import CircleApply from "./pages/CircleApply.jsx";
import CircleChat from "./pages/CircleChat.jsx";
import CircleDetails from "./pages/CircleDetails.jsx";
import CircleInvite from "./pages/CircleInvite.jsx";
import Community from "./pages/Community.jsx";
import CreateCircle from "./pages/CreateCircle.jsx";
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

function RequireOnboarding({ children }) {
  return getUserProfile()?.onboardingCompleted ? children : <Navigate to="/onboarding" replace />;
}

function OnboardingRoute() {
  return getUserProfile()?.onboardingCompleted ? <Navigate to="/home" replace /> : <Onboarding />;
}

export default function App() {
  const location = useLocation();
  const isOnboarding = location.pathname === "/onboarding";

  return (
    <AppShell compact={isOnboarding}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/onboarding" element={<OnboardingRoute />} />
        <Route path="/home" element={<RequireOnboarding><Home /></RequireOnboarding>} />
        <Route path="/log-session" element={<RequireOnboarding><LogSession /></RequireOnboarding>} />
        <Route path="/notifications" element={<RequireOnboarding><Notifications /></RequireOnboarding>} />
        <Route path="/achievements" element={<RequireOnboarding><AchievementWall /></RequireOnboarding>} />
        <Route path="/badge/:badgeId" element={<RequireOnboarding><BadgeDetails /></RequireOnboarding>} />
        <Route path="/journey/:entryType/:entryId" element={<RequireOnboarding><JourneySessionDetail /></RequireOnboarding>} />
        <Route path="/friend/:friendId" element={<RequireOnboarding><FriendProfile /></RequireOnboarding>} />
        <Route path="/chat/:friendId" element={<RequireOnboarding><ActiveChat /></RequireOnboarding>} />
        <Route path="/circle/:circleId" element={<RequireOnboarding><CircleDetails /></RequireOnboarding>} />
        <Route path="/circle/:circleId/apply" element={<RequireOnboarding><CircleApply /></RequireOnboarding>} />
        <Route path="/circle/:circleId/invite" element={<RequireOnboarding><CircleInvite /></RequireOnboarding>} />
        <Route path="/circle/:circleId/chat" element={<RequireOnboarding><CircleChat /></RequireOnboarding>} />
        <Route path="/create-circle" element={<RequireOnboarding><CreateCircle /></RequireOnboarding>} />
        <Route path="/create-session" element={<RequireOnboarding><CreateSession /></RequireOnboarding>} />
        <Route path="/session/:sessionId" element={<RequireOnboarding><SessionDetails /></RequireOnboarding>} />
        <Route path="/explore" element={<RequireOnboarding><Explore /></RequireOnboarding>} />
        <Route path="/progress" element={<RequireOnboarding><Progress /></RequireOnboarding>} />
        <Route path="/rank-help" element={<RequireOnboarding><RankHelp /></RequireOnboarding>} />
        <Route path="/community" element={<RequireOnboarding><Community /></RequireOnboarding>} />
        <Route path="/profile" element={<RequireOnboarding><Profile /></RequireOnboarding>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
