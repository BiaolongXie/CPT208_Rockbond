import { ArrowLeft, CheckCircle2, LockKeyhole, Share2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import { getAchievementById, mergeUnlockedBadges } from "../data/achievementData.js";
import { getBadges } from "../utils/storage.js";

export default function BadgeDetails() {
  const navigate = useNavigate();
  const { badgeId } = useParams();
  const [shared, setShared] = useState(false);
  const badge = mergeUnlockedBadges(getBadges()).find((item) => item.id === badgeId) || getAchievementById(badgeId);
  const progress = Math.min(100, Math.round((badge.progressCurrent / badge.progressTarget) * 100));

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-rock-paper px-5 shadow-sm">
        <button type="button" aria-label="Go back" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="text-lg font-black text-rock-green">Climb Achievements</h1>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(145deg,#07140c,#6f806e)] text-sm font-black text-white">A</div>
      </header>

      <main className="bg-[linear-gradient(180deg,#eef7eb_0%,#f8f9f5_100%)] px-5 pb-32 pt-6">
        <section className={`relative min-h-[310px] overflow-hidden rounded-[38px] p-6 shadow-lift ${badge.imageClass}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/70" />
          <div className="relative flex h-full min-h-[260px] flex-col justify-end text-white">
            <span className="mb-4 inline-flex w-fit rounded-full bg-white/18 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] backdrop-blur">
              Elite Achievement
            </span>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black leading-10">{badge.title}</h2>
                <p className="mt-1 text-base font-bold text-white/80">{badge.subtitle}</p>
              </div>
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/90 text-rock-green shadow-soft">
                {badge.unlocked ? <CheckCircle2 aria-hidden size={38} strokeWidth={2.5} /> : <LockKeyhole aria-hidden size={38} strokeWidth={2.5} />}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-4">
          <InfoCard label="Class" value={badge.className} />
          <InfoCard label="Terrain" value={badge.terrain} />
        </section>

        <section className="mt-5 rounded-[32px] bg-white p-6 shadow-soft">
          <h3 className="text-lg font-black text-rock-ink">How to Earn</h3>
          <p className="mt-3 text-base leading-6 text-zinc-700">{badge.howToEarn}</p>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm font-bold text-zinc-600">
              <span>{badge.progressCurrent} / {badge.progressTarget}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-rock-mist">
              <div className="h-full rounded-full bg-rock-green" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[32px] bg-white p-6 shadow-soft">
          <span className="inline-flex rounded-full bg-rock-mint px-4 py-2 text-xs font-black text-rock-green">{badge.rarity}</span>
          <h3 className="mt-4 text-lg font-black text-rock-ink">Rarity</h3>
          <p className="mt-2 text-base leading-6 text-zinc-700">{badge.rarityText}</p>
        </section>

        <button
          type="button"
          onClick={() => setShared(true)}
          className="mt-6 flex h-16 w-full items-center justify-center gap-3 rounded-full bg-rock-green text-lg font-black text-white shadow-lift"
        >
          <Share2 aria-hidden size={22} strokeWidth={2.5} />
          {shared ? "Shared to Wall" : "Share Achievement"}
        </button>
      </main>
      <BottomNav />
    </>
  );
}

function InfoCard({ label, value }) {
  return (
    <article className="rounded-[28px] bg-white p-5 shadow-soft">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-zinc-500">{label}</p>
      <p className="mt-2 text-xl font-black text-rock-green">{value}</p>
    </article>
  );
}
