import { Crown, Medal, Share2, Sparkles, Star, Trophy, X } from "lucide-react";
import { useState } from "react";

const celebrationStyles = {
  Silver: {
    title: "Silver Unlocked",
    subtitle: "Your consistency is turning into real momentum.",
    shell: "from-slate-50 via-emerald-50 to-white text-rock-green",
    orb: "bg-slate-200 text-rock-green",
    accent: "bg-rock-mint text-rock-green",
    Icon: Medal,
  },
  Gold: {
    title: "Gold Breakthrough",
    subtitle: "That climb pushed you into a brighter tier.",
    shell: "from-amber-50 via-yellow-100 to-white text-amber-700",
    orb: "bg-yellow-300 text-amber-900",
    accent: "bg-yellow-200 text-amber-800",
    Icon: Trophy,
  },
  Platinum: {
    title: "Platinum Ascent",
    subtitle: "A sharper tier for a sharper climber.",
    shell: "from-cyan-50 via-emerald-50 to-white text-teal-700",
    orb: "bg-cyan-100 text-teal-700",
    accent: "bg-cyan-100 text-teal-700",
    Icon: Star,
  },
  Diamond: {
    title: "Diamond Surge",
    subtitle: "High-grade effort, crystal-clear progress.",
    shell: "from-blue-50 via-indigo-50 to-white text-indigo-700",
    orb: "bg-blue-100 text-indigo-700",
    accent: "bg-indigo-100 text-indigo-700",
    Icon: Sparkles,
  },
  Master: {
    title: "Master Tier Claimed",
    subtitle: "This is no longer momentum. This is command.",
    shell: "from-rock-green via-[#123727] to-[#07140c] text-white",
    orb: "bg-white/15 text-white",
    accent: "bg-white/15 text-white",
    Icon: Crown,
  },
  Legend: {
    title: "Legend Awakened",
    subtitle: "You reached the apex of this season's wall.",
    shell: "from-[#090b08] via-rock-green to-[#d9b85f] text-white",
    orb: "bg-white/15 text-white",
    accent: "bg-[#f2d95b] text-rock-ink",
    Icon: Crown,
  },
};

export default function RankCelebrationModal({ celebration, onClose }) {
  const [shareFeedback, setShareFeedback] = useState("");

  if (!celebration) return null;

  const style = celebrationStyles[celebration.toRank] || celebrationStyles.Silver;
  const Icon = style.Icon;
  const shareText = `I just ranked up from ${celebration.fromRank} to ${celebration.toRank} in RockBond Season ${celebration.seasonId}!`;

  async function shareRankUp() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "RockBond Rank Up",
          text: shareText,
        });
        setShareFeedback("Ready to share your rank up");
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
        setShareFeedback("Rank up message copied");
        return;
      }
      setShareFeedback("Ready to share your rank up");
    } catch {
      setShareFeedback("Share cancelled");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-rock-ink/45 px-5 backdrop-blur-sm">
      <section className={`relative w-full max-w-[390px] overflow-hidden rounded-[38px] bg-gradient-to-br p-6 shadow-2xl ${style.shell}`}>
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20" />
        <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-white/12" />
        <button
          type="button"
          aria-label="Close rank celebration"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/30 text-current transition hover:bg-white/45 active:scale-95"
        >
          <X aria-hidden size={20} strokeWidth={2.6} />
        </button>

        <div className="relative">
          <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full shadow-soft ring-8 ring-white/25 ${style.orb}`}>
            <Icon aria-hidden size={45} strokeWidth={2.5} />
          </div>
          <p className="mt-7 text-center text-xs font-black uppercase tracking-[0.2em] opacity-75">Rank Up</p>
          <h2 className="mt-2 text-center text-4xl font-black leading-10">{style.title}</h2>
          <p className="mx-auto mt-3 max-w-[280px] text-center text-base leading-6 opacity-80">{style.subtitle}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-[24px] bg-white/20 px-4 py-4 text-center">
              <p className="text-xs font-black uppercase tracking-[0.12em] opacity-70">From</p>
              <p className="mt-1 text-xl font-black">{celebration.fromRank}</p>
            </div>
            <div className="rounded-[24px] bg-white/25 px-4 py-4 text-center">
              <p className="text-xs font-black uppercase tracking-[0.12em] opacity-70">To</p>
              <p className="mt-1 text-xl font-black">{celebration.toRank}</p>
            </div>
          </div>

          <div className={`mt-5 rounded-[26px] px-5 py-4 text-center ${style.accent}`}>
            <p className="text-sm font-black">+{celebration.gainedXP} XP from this log</p>
            <p className="mt-1 text-xs font-bold opacity-75">Season {celebration.seasonId} total: {celebration.totalXP} XP</p>
          </div>

          <button
            type="button"
            onClick={shareRankUp}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white/45 px-5 font-black text-current shadow-soft backdrop-blur transition active:scale-[0.98]"
          >
            <Share2 aria-hidden size={19} strokeWidth={2.5} />
            Share Rank Up
          </button>
          {shareFeedback && <p className="mt-3 rounded-full bg-white/35 px-4 py-2 text-center text-xs font-black">{shareFeedback}</p>}

          <button type="button" onClick={onClose} className="mt-6 min-h-14 w-full rounded-full bg-rock-ink px-5 font-black text-white shadow-lift">
            Keep Climbing
          </button>
        </div>
      </section>
    </div>
  );
}
