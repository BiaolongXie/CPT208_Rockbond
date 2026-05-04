import { Link } from "react-router-dom";
import { CalendarCheck, HelpCircle, Medal, Mountain, Route, UsersRound } from "lucide-react";
import BadgePill from "../components/BadgePill.jsx";
import BottomNav from "../components/BottomNav.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { getLogs, getSessions } from "../utils/storage.js";
import { calculateClimbingProgress } from "../utils/climbingProgress.js";

const fallbackActivities = [
  {
    id: "activity_001",
    title: "Morning Flow - V5",
    meta: "2 hours ago - Bouldering",
    xp: 5,
    icon: Route,
  },
  {
    id: "activity_002",
    title: "Stone Grove Meetup",
    meta: "Yesterday - Community Session",
    xp: 8,
    icon: UsersRound,
  },
  {
    id: "activity_003",
    title: "Technical Traverse - V4",
    meta: "2 days ago - Training",
    xp: 3,
    icon: Route,
  },
  {
    id: "activity_004",
    title: "Weekend Crag Trip",
    meta: "3 days ago - Outdoor",
    xp: 9,
    icon: CalendarCheck,
  },
];

export default function Progress() {
  const logs = getLogs();
  const sessions = getSessions();
  const climbingProgress = calculateClimbingProgress(logs);
  const activities = buildActivities(logs, sessions);

  return (
    <>
      <header className="flex h-20 items-center justify-between bg-rock-paper px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(145deg,#07140c,#6f806e)] text-sm font-black text-white ring-2 ring-white">
            A
          </div>
          <h1 className="text-xl font-black text-rock-green">Climbing Progress</h1>
        </div>
        <Link
          to="/rank-help"
          aria-label="Open rank progression help"
          className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green transition hover:bg-rock-mist"
        >
          <HelpCircle aria-hidden size={24} strokeWidth={2.4} />
        </Link>
      </header>

      <main className="min-h-[calc(100vh-80px)] bg-[linear-gradient(180deg,#eaf7e6_0%,#f7f8f4_100%)] px-5 pb-32 pt-7">
        <section className="flex items-start justify-between">
          <div>
            <p className="text-base uppercase tracking-[0.18em] text-zinc-600">Current Rank</p>
            <h2 className="mt-1 text-lg text-rock-ink">{climbingProgress.currentRank}</h2>
          </div>
          <BadgePill tone="dark">{climbingProgress.season}</BadgePill>
        </section>

        <section className="mt-10 grid grid-cols-3 items-end gap-4 text-center">
          <RankMedal label="Bronze" tone="bronze" />
          <RankMedal label="Silver" active />
          <RankMedal label="Gold" tone="gold" />
        </section>

        <section className="mt-12 rounded-[34px] bg-white/80 p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-zinc-700">Milestone Progress</h2>
            <p className="text-lg font-black text-rock-ink">{climbingProgress.label}</p>
          </div>
          <div className="mt-5">
            <ProgressBar value={climbingProgress.current} max={climbingProgress.target} />
          </div>
          <p className="mt-4 text-center text-sm text-zinc-600">{climbingProgress.remainingLabel}</p>
        </section>

        <section className="mt-9">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black text-rock-ink">Recent Activity</h2>
            <button type="button" className="text-sm font-medium text-rock-moss">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>

        <section className="mountain-quote-card mt-10 overflow-hidden rounded-[30px] p-6 shadow-lift">
          <p className="mt-24 max-w-[290px] text-base leading-6 text-white">
            "The best climber in the world is the one having the most fun."
          </p>
        </section>
      </main>

      <BottomNav />
    </>
  );
}

function buildActivities(logs, sessions) {
  const logActivities = logs.slice(0, 2).map((log) => ({
    id: `log_${log.id}`,
    title: `${log.location} - ${log.difficultyLevel}`,
    meta: `${log.date} - ${log.climbingType}`,
    xp: Math.min(9, Number(log.routesCompleted || 1)),
    icon: Route,
  }));

  const sessionActivities = sessions.slice(0, 2).map((session) => ({
    id: `session_${session.id}`,
    title: session.title || session.location || "Community Session",
    meta: `${session.date || "Recently"} - Community Session`,
    xp: 8,
    icon: UsersRound,
  }));

  const merged = [...logActivities, ...sessionActivities];
  return merged.length > 0 ? merged.slice(0, 4) : fallbackActivities;
}

function RankMedal({ label, active = false, tone = "silver" }) {
  const tones = {
    bronze: "bg-[#d3a16f] text-white",
    silver: "bg-slate-200 text-rock-green",
    gold: "bg-[#f2d95b] text-white",
  };

  return (
    <div className={`flex flex-col items-center ${active ? "scale-110" : ""}`}>
      <div className={`flex items-center justify-center rounded-full ${active ? "h-24 w-24 ring-4 ring-white shadow-soft" : "h-16 w-16"} ${tones[tone]}`}>
        <Medal aria-hidden size={active ? 42 : 28} strokeWidth={2.6} />
      </div>
      <p className={`mt-3 ${active ? "text-xl text-rock-ink" : "text-base text-zinc-600"}`}>{label}</p>
    </div>
  );
}

function ActivityCard({ activity }) {
  const Icon = activity.icon;

  return (
    <article className="flex items-center gap-4 rounded-[32px] bg-white/82 p-5 shadow-soft">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
        <Icon aria-hidden size={23} strokeWidth={2.4} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-medium leading-5 text-rock-ink">{activity.title}</h3>
        <p className="mt-1 text-base leading-5 text-zinc-600">{activity.meta}</p>
      </div>
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-rock-stone/20 bg-rock-mist text-center text-lg font-black text-rock-ink">
        +{activity.xp}
        <br />
        XP
      </div>
    </article>
  );
}
