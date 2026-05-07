import { ArrowLeft, CalendarDays, Calculator, Crown, Diamond, Hexagon, Medal, Route, Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import { getCurrentSeasonId } from "../utils/rankProgression.js";

const tiers = [
  { name: "Bronze", detail: "Starter Tier", icon: Hexagon, color: "text-orange-400", bg: "bg-orange-100" },
  { name: "Silver", detail: "6 XP Reached", icon: Hexagon, color: "text-zinc-500", bg: "bg-zinc-100" },
  { name: "Gold", detail: "18 XP Total", icon: Medal, color: "text-yellow-500", bg: "bg-yellow-100" },
  { name: "Platinum", detail: "42 XP Total", icon: Diamond, color: "text-cyan-500", bg: "bg-cyan-50" },
  { name: "Diamond", detail: "90 XP Total", icon: Trophy, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Master", detail: "186 XP Total", icon: Star, color: "text-purple-600", bg: "bg-purple-50" },
];

const upgradePath = [
  ["Bronze", "Silver", "+6 XP"],
  ["Silver", "Gold", "+12 XP"],
  ["Gold", "Platinum", "+24 XP"],
  ["Platinum", "Diamond", "+48 XP"],
  ["Diamond", "Master", "+96 XP"],
  ["Master", "Legend", "+108 XP"],
];

const xpExamples = [
  ["V0 x 1 route", "+1 XP"],
  ["V1 x 1 route", "+2 XP"],
  ["V2 x 2 routes", "+6 XP"],
  ["V3 x 2 routes", "+8 XP"],
  ["V4 x 3 routes", "+15 XP"],
  ["V8 x 6 routes", "+54 XP"],
];

export default function RankHelp() {
  const navigate = useNavigate();
  const seasonId = getCurrentSeasonId();

  return (
    <>
      <header className="flex h-16 items-center gap-3 rounded-b-[22px] bg-rock-paper px-5 shadow-sm">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green transition hover:bg-rock-mist"
        >
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="text-lg font-black text-rock-green">Rank Progression</h1>
      </header>

      <main className="space-y-8 bg-rock-paper px-5 pb-32 pt-9">
        <section className="mountain-help-hero overflow-hidden rounded-[30px] p-6 shadow-lift">
          <h2 className="mt-16 text-2xl font-black text-white">Level Up Your Game</h2>
          <p className="mt-2 max-w-[280px] text-base leading-6 text-white/78">
            Track your ascent through the ranks of the global climbing community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-rock-ink">Climbing Tiers</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {tiers.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>
          <article className="mt-3 flex items-center gap-4 rounded-[28px] bg-rock-green p-5 text-white shadow-lift">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <Crown aria-hidden size={31} strokeWidth={2.4} />
            </div>
            <div>
              <h3 className="text-xl font-black">Legend</h3>
              <p className="mt-1 text-sm text-white/80">294 XP Total - The Apex</p>
            </div>
          </article>
        </section>

        <section>
          <h2 className="text-2xl font-black text-rock-ink">Upgrade Path</h2>
          <div className="mt-5 overflow-hidden rounded-[30px] border border-rock-mist bg-white/70">
            {upgradePath.map(([from, to, xp]) => (
              <div key={`${from}-${to}`} className="flex items-center justify-between border-b border-rock-mist px-5 py-4 last:border-b-0">
                <p className="font-medium">
                  {from} <span className="text-rock-stone">{"->"}</span> <span className="font-black text-rock-green">{to}</span>
                </p>
                <span className="rounded-full bg-rock-mint px-3 py-1 text-sm font-bold text-rock-moss">{xp}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border-y border-rock-green bg-white p-6 shadow-soft">
          <h2 className="inline-flex items-center gap-2 text-2xl font-black text-rock-ink">
            <Calculator aria-hidden size={24} strokeWidth={2.4} />
            XP Calculation
          </h2>
          <div className="mt-8 flex items-center justify-between">
            <p className="font-medium">Per route</p>
            <span className="rounded-full bg-rock-green px-5 py-2 font-mono text-sm text-white">Grade + 1 = XP</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="font-medium">Per log</p>
            <span className="rounded-full bg-rock-mint px-5 py-2 font-mono text-sm text-rock-green">Route XP x Routes</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {xpExamples.map(([label, xp]) => (
              <div key={label} className="rounded-lg bg-rock-mist/70 px-3 py-3 font-black text-rock-ink">
                {label} <span className="float-right">{xp}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm italic leading-5 text-zinc-600">
            * A single Quick Log can include multiple completed routes. RockBond multiplies the selected V grade XP by the routes completed in that log.
          </p>
        </section>

        <section className="rounded-[30px] bg-rock-green p-6 text-white shadow-lift">
          <h2 className="inline-flex items-center gap-2 text-2xl font-black">
            <CalendarDays aria-hidden size={24} strokeWidth={2.4} />
            Season Rules
          </h2>
          <div className="mt-5 space-y-4 text-base leading-6 text-white/82">
            <p>Each RockBond season follows the calendar year: January 1 to December 31.</p>
            <p>Rank and milestone progress use only Quick Logs from the current season. Your older logs stay in your Climbing Journey, but a new year starts a fresh rank climb.</p>
          </div>
          <div className="mt-5 rounded-[24px] bg-white/12 p-4">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-white/78">
              <Route aria-hidden size={18} strokeWidth={2.4} />
              Current season
            </p>
            <p className="mt-1 text-2xl font-black">{seasonId}</p>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}

function TierCard({ tier }) {
  const Icon = tier.icon;

  return (
    <article className="rounded-[28px] bg-white p-5 text-center shadow-soft">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${tier.bg} ${tier.color}`}>
        <Icon aria-hidden size={28} strokeWidth={2.4} />
      </div>
      <h3 className="mt-3 font-black leading-5 text-rock-ink">{tier.name}</h3>
      <p className="text-xs text-zinc-600">{tier.detail}</p>
    </article>
  );
}
