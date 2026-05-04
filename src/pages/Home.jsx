import { Link } from "react-router-dom";
import { Clock3, TrendingUp } from "lucide-react";
import BottomNav from "../components/BottomNav.jsx";
import Header from "../components/Header.jsx";
import QuestCard from "../components/QuestCard.jsx";
import SessionCard from "../components/SessionCard.jsx";
import { getLogs, getUserProfile } from "../utils/storage.js";
import { calculateClimbingProgress } from "../utils/climbingProgress.js";

export default function Home() {
  const profile = getUserProfile();
  const logs = getLogs().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const climbingProgress = calculateClimbingProgress(logs);
  const recentLog = logs[0];
  const totalHours = Math.max(0.5, logs.length * 2.5).toFixed(1);
  const avgGrade = logs.length > 0 ? logs[0].difficultyLevel : profile?.level || "Regular";

  return (
    <>
      <Header avatar="A" />
      <div className="space-y-6 px-5 py-6">
        <section>
          <h1 className="text-3xl font-black tracking-normal text-rock-ink">Morning, Alex</h1>
          <p className="mt-2 text-base text-zinc-600">The crag is calling. Ready for a new climb?</p>
        </section>

        <QuestCard quest={climbingProgress} to="/progress" />

        <section className="grid grid-cols-2 gap-4">
          <div className="rounded-[32px] bg-white/70 p-5 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rock-mint text-rock-green">
              <Clock3 aria-hidden size={22} strokeWidth={2.4} />
            </div>
            <p className="mt-4 text-xs text-zinc-600">Total Hours</p>
            <p className="text-xl font-black">{totalHours}h</p>
          </div>
          <div className="rounded-[32px] bg-rock-mist p-5 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rock-mint text-rock-green">
              <TrendingUp aria-hidden size={22} strokeWidth={2.4} />
            </div>
            <p className="mt-4 text-xs text-zinc-600">Current Level</p>
            <p className="text-xl font-black">{avgGrade}</p>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[36px] bg-rock-green p-6 text-white shadow-lift">
          <div className="absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-white/8" />
          <h2 className="text-xl font-black">Local Crag Alert</h2>
          <p className="mt-3 max-w-[210px] text-base leading-6 text-white/85">
            Castle Rock conditions are perfect today. 3 buddies are heading there.
          </p>
          <div className="mt-5 flex items-center justify-end">
            <Link to="/community" className="rounded-full bg-white px-5 py-3 text-sm font-black text-rock-green shadow-lift">
              Join Session
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Recent Ascents</h2>
            <Link to="/profile" className="text-sm font-bold text-rock-moss">
              View All
            </Link>
          </div>
          <SessionCard session={recentLog ? { ...recentLog, entryType: "log" } : null} compact />
        </section>
      </div>
      <BottomNav />
    </>
  );
}
