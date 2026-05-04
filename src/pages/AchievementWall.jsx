import { ArrowLeft, CheckCircle2, LockKeyhole, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import { mergeUnlockedBadges } from "../data/achievementData.js";
import { getBadges } from "../utils/storage.js";

export default function AchievementWall() {
  const navigate = useNavigate();
  const badges = mergeUnlockedBadges(getBadges());
  const unlockedCount = badges.filter((badge) => badge.unlocked).length;

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-rock-paper px-5 shadow-sm">
        <button type="button" aria-label="Go back" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="text-lg font-black text-rock-green">Climb Achievements</h1>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(145deg,#07140c,#6f806e)] text-sm font-black text-white">A</div>
      </header>

      <main className="bg-[linear-gradient(180deg,#eef7eb_0%,#f8f9f5_100%)] px-5 pb-32 pt-7">
        <section>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-rock-moss">Your Achievements</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black leading-9 text-rock-green">Badge Wall</h2>
              <p className="mt-2 max-w-[270px] text-base leading-6 text-zinc-600">
                Showcase your favorite climbing milestones and keep track of what is still waiting to be unlocked.
              </p>
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-xl font-black text-rock-green shadow-soft">
              {unlockedCount}
            </div>
          </div>
          <button type="button" className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-rock-green text-base font-black text-white shadow-lift">
            <SlidersHorizontal aria-hidden size={20} strokeWidth={2.5} />
            Customise Wall
          </button>
        </section>

        <section className="mt-8 grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <Link key={badge.id} to={`/badge/${badge.id}`} className="group block">
              <article className={`relative min-h-[220px] overflow-hidden rounded-[34px] bg-white p-4 text-center shadow-soft transition group-active:scale-[0.98] ${badge.unlocked ? "" : "opacity-80"}`}>
                <div className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full ${badge.imageClass} shadow-soft ${badge.unlocked ? "" : "grayscale"}`}>
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${badge.unlocked ? "bg-white/90 text-rock-green" : "bg-zinc-100/90 text-zinc-500"}`}>
                    {badge.unlocked ? <badge.Icon aria-hidden size={32} strokeWidth={2.4} /> : <LockKeyhole aria-hidden size={30} strokeWidth={2.4} />}
                  </div>
                </div>
                {badge.unlocked && (
                  <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-rock-green text-white ring-4 ring-white">
                    <CheckCircle2 aria-hidden size={18} strokeWidth={2.6} />
                  </span>
                )}
                <h3 className="mt-5 text-lg font-black leading-5 text-rock-ink">{badge.title}</h3>
                <p className="mt-1 text-sm font-bold text-zinc-500">{badge.subtitle}</p>
                <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-[10px] font-black ${badge.unlocked ? "bg-rock-mint text-rock-green" : "bg-zinc-200 text-zinc-500"}`}>
                  {badge.unlocked ? "UNLOCKED" : "LOCKED"}
                </span>
              </article>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-[34px] bg-white p-6 shadow-soft">
          <div className="flex items-center gap-5">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[conic-gradient(#0d2818_0_72%,#dfe8da_72%_100%)]">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-lg font-black text-rock-green">72%</div>
            </div>
            <div>
              <h3 className="text-lg font-black text-rock-ink">Mastery Progress</h3>
              <p className="mt-1 text-sm leading-5 text-zinc-600">Your overall achievement wall completion across climbing styles.</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Bouldering 78%", "Trad 64%", "Sport 72%"].map((item) => (
              <span key={item} className="rounded-full bg-rock-mist px-4 py-2 text-xs font-black text-rock-green">
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
