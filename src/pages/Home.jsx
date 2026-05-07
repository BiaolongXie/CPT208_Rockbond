import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock3, TrendingUp, UsersRound } from "lucide-react";
import BottomNav from "../components/BottomNav.jsx";
import Header from "../components/Header.jsx";
import QuestCard from "../components/QuestCard.jsx";
import RankCelebrationModal from "../components/RankCelebrationModal.jsx";
import SessionCard from "../components/SessionCard.jsx";
import { clearPendingRankCelebration, getLogs, getPendingRankCelebration, getShownRankCelebrations, saveShownRankCelebrations } from "../utils/storage.js";
import { calculateClimbingProgress } from "../utils/climbingProgress.js";
import { getJoinedSessions } from "../utils/sessionStore.js";

export default function Home() {
  const [rankCelebration, setRankCelebration] = useState(() => {
    const pending = getPendingRankCelebration();
    if (pending?.id && getShownRankCelebrations().includes(pending.id)) {
      clearPendingRankCelebration();
      return null;
    }
    return pending;
  });
  const logs = getLogs().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const climbingProgress = calculateClimbingProgress(logs);
  const recentLog = logs[0];
  const joinedSessions = getJoinedSessions().slice(0, 2);
  const totalHours = Math.max(0.5, logs.length * 2.5).toFixed(1);

  return (
    <>
      <Header avatar="A" />
      <div className="space-y-5 px-5 py-5">
        <section>
          <h1 className="text-3xl font-black tracking-normal text-rock-ink">Morning, Alex</h1>
          <p className="mt-2 text-base text-zinc-600">The crag is calling. Ready for a new climb?</p>
        </section>

        <QuestCard quest={climbingProgress} to="/progress" />

        <section className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-[22px] bg-white/70 p-3 shadow-soft">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
              <Clock3 aria-hidden size={20} strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-zinc-600">Total Hours</p>
              <p className="text-lg font-black leading-tight">{totalHours}h</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[22px] bg-rock-mist p-3 shadow-soft">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
              <TrendingUp aria-hidden size={20} strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-zinc-600">Current Rank</p>
              <p className="truncate text-lg font-black leading-tight">{climbingProgress.currentRank}</p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[26px] bg-rock-green p-4 text-white shadow-lift">
          <div className="absolute -right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-white/8" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-black leading-tight">Local Crag Alert</h2>
              <p className="mt-1 max-w-[210px] text-xs leading-4 text-white/85">
                Castle Rock conditions are perfect today. 3 buddies are heading there.
              </p>
            </div>
            <Link to="/community" className="shrink-0 rounded-full bg-white px-3.5 py-2 text-xs font-black text-rock-green shadow-lift">
              Join Session
            </Link>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Joined Sessions</h2>
            <Link to="/explore" className="text-sm font-bold text-rock-moss">
              Find More
            </Link>
          </div>
          {joinedSessions.length > 0 ? (
            <div className="space-y-3">
              {joinedSessions.map((session) => (
                <JoinedSessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <Link to="/explore" className="flex items-center gap-3 rounded-[24px] bg-white p-4 shadow-soft">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
                <UsersRound aria-hidden size={21} strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-rock-green">No joined sessions yet</h3>
                <p className="mt-1 text-sm leading-5 text-zinc-600">Join a public session from Explore to see it here.</p>
              </div>
            </Link>
          )}
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Recent Ascents</h2>
            <Link to="/profile" className="text-sm font-bold text-rock-moss">
              View All
            </Link>
          </div>
          <SessionCard session={recentLog ? { ...recentLog, entryType: "log" } : null} compact />
        </section>
      </div>
      <RankCelebrationModal celebration={rankCelebration} onClose={closeRankCelebration} />
      <BottomNav />
    </>
  );

  function closeRankCelebration() {
    if (rankCelebration?.id) {
      const shown = getShownRankCelebrations();
      if (!shown.includes(rankCelebration.id)) {
        saveShownRankCelebrations([...shown, rankCelebration.id]);
      }
    }
    clearPendingRankCelebration();
    setRankCelebration(null);
  }
}

function JoinedSessionCard({ session }) {
  return (
    <Link to={`/session/${session.id}`} className="flex items-center gap-3 rounded-[24px] bg-white p-4 shadow-soft transition active:scale-[0.99]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rock-green text-white">
        <CalendarDays aria-hidden size={21} strokeWidth={2.5} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-black text-rock-ink">{session.title || "Public Session"}</h3>
        <p className="mt-1 truncate text-sm text-zinc-600">
          {[session.location, session.date, session.startTime].filter(Boolean).join(" - ")}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-rock-mist px-3 py-1 text-[10px] font-black text-rock-moss">
        JOINED
      </span>
    </Link>
  );
}
