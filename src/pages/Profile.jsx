import { Award, Check, Clock3, MapPin, Mountain, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import Header from "../components/Header.jsx";
import { avatarImages } from "../data/avatarData.js";
import { mergeUnlockedBadges } from "../data/achievementData.js";
import { formatShortDate } from "../utils/dateFormat.js";
import { calculateRankProgression } from "../utils/rankProgression.js";
import { getBadges, getLogs, getSessions, getUserProfile } from "../utils/storage.js";

const fallbackJourney = [
  {
    id: "fallback_001",
    entryType: "fallback",
    sourceId: "fallback_001",
    title: "El Dorado Canyon",
    description: "Completed 'The Bastille Crack' (5.7)",
    date: "Oct 12",
    tag: "TRAD",
    icon: Check,
    imageClass: "profile-journey-trad",
  },
  {
    id: "fallback_002",
    entryType: "fallback",
    sourceId: "fallback_002",
    title: "The Spot Gym",
    description: "Sent three V6s in one session!",
    date: "Sep 28",
    tag: "BOULDERING",
    icon: Star,
    imageClass: "profile-journey-gym",
  },
  {
    id: "fallback_003",
    entryType: "fallback",
    sourceId: "fallback_003",
    title: "RMNP Adventure",
    description: "First multi-pitch alpine climb.",
    date: "Aug 15",
    tag: "ALPINE",
    icon: Mountain,
    imageClass: "profile-journey-alpine",
  },
];

export default function Profile() {
  const profile = getUserProfile();
  const logs = getLogs();
  const rankProgress = calculateRankProgression(logs);
  const sessions = getSessions();
  const journeyItems = [
    ...logs.map((log) => ({ ...log, entryType: "log" })),
    ...sessions.map((session) => ({ ...session, entryType: "session" })),
  ].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
  const badges = getBadges();
  const profileBadges = mergeUnlockedBadges(badges).slice(0, 3);
  const climbCount = logs.reduce((sum, log) => sum + Number(log.routesCompleted || 0), 0);
  const milestoneCount = badges.length;
  const displayJourney = journeyItems.length > 0 ? journeyItems.slice(0, 3).map(toJourneyItem) : fallbackJourney;

  return (
    <>
      <Header avatar="A" />
      <div className="space-y-8 px-5 pb-32 pt-9">
        <section className="text-center">
          <Avatar
            src={avatarImages.alexChen}
            alt={profile?.name || "Alex Chen"}
            fallback="A"
            className="mx-auto h-36 w-36 rounded-[42px] text-5xl ring-4 ring-rock-mint shadow-soft"
          />
          <span className="mt-3 inline-flex rounded-full bg-rock-stone px-5 py-2 text-sm font-black text-white shadow">
            {rankProgress.rankLabel}
          </span>
          <h1 className="mt-3 text-4xl font-black text-rock-green">{profile?.name || "Alex Chen"}</h1>
          <p className="mt-1 inline-flex items-center gap-1.5 text-zinc-600">
            <MapPin aria-hidden size={17} strokeWidth={2.2} />
            {profile?.location || "Boulder, Colorado"}
          </p>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="rounded-full bg-white/55 px-6 py-5 text-center shadow-soft">
            <p className="text-2xl font-black text-rock-green">{climbCount}</p>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Climbs</p>
          </div>
          <div className="rounded-full bg-white/55 px-6 py-5 text-center shadow-soft">
            <p className="text-2xl font-black text-rock-green">{milestoneCount}</p>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">Milestones</p>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Achievements</h2>
            <Link to="/achievements" className="text-sm font-bold text-rock-moss">
              See all
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {profileBadges.map((badge, index) => {
              const Icon = badge.Icon || [Mountain, Award, Clock3][index];
              return (
                <Link key={badge.id} to={`/badge/${badge.id}`} className="rounded-[32px] bg-white px-3 py-6 text-center shadow-soft transition active:scale-[0.98]">
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${badge.unlocked ? "bg-rock-green text-white" : "bg-rock-mist text-rock-stone"}`}>
                    <Icon aria-hidden size={25} strokeWidth={2.6} />
                  </div>
                  <p className="mt-4 text-base font-black leading-5">{badge.title}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black">Climbing Journey</h2>
          <div className="relative mt-5 space-y-6 border-l-2 border-rock-mist pl-7">
            {displayJourney.map((item) => (
              <JourneyTimelineItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </>
  );
}

function toJourneyItem(item) {
  const isSession = item.entryType === "session";
  return {
    id: `${item.entryType}_${item.id}`,
    entryType: item.entryType,
    sourceId: item.id,
    title: isSession ? item.title || item.location || "Community Session" : item.location || "Climbing Log",
    description: isSession ? item.notes || "Joined a community climbing session." : `${item.routesCompleted || 1} routes completed at ${item.difficultyLevel || "your level"}.`,
    date: formatJourneyDate(item.date || item.createdAt),
    tag: isSession ? "SESSION" : item.isProject ? "PROJECT" : "LOG",
    icon: isSession ? Star : Check,
    imageClass: isSession ? "profile-journey-gym" : item.isProject ? "profile-journey-alpine" : "profile-journey-trad",
  };
}

function JourneyTimelineItem({ item }) {
  const Icon = item.icon;
  return (
    <Link to={`/journey/${item.entryType}/${item.sourceId}`} className="relative flex items-center gap-4 rounded-[32px] bg-white p-4 shadow-soft transition active:scale-[0.99]">
      <span className="absolute -left-[39px] top-4 flex h-6 w-6 items-center justify-center rounded-full bg-rock-green text-white ring-4 ring-rock-paper">
        <Icon aria-hidden size={14} strokeWidth={2.8} />
      </span>
      <div className={`h-20 w-20 shrink-0 rounded-full ${item.imageClass}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-black leading-5 text-rock-ink">{item.title}</h3>
          <p className="shrink-0 text-sm text-zinc-600">{item.date}</p>
        </div>
        <p className="mt-1 text-base leading-5 text-zinc-700">{item.description}</p>
        <span className="mt-2 inline-flex rounded-full bg-rock-mist px-3 py-1 text-[10px] font-black text-zinc-700">
          {item.tag}
        </span>
      </div>
    </Link>
  );
}

function formatJourneyDate(value) {
  return formatShortDate(value);
}
