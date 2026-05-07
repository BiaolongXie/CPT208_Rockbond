import { Crown, Diamond, Hexagon, Medal, Star, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import BadgePill from "./BadgePill.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function QuestCard({ quest, to }) {
  const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));
  const rankName = quest.rankProgress?.currentRank;
  const RankIcon = getRankIcon(rankName);
  const rankTone = getRankTone(rankName);
  const Wrapper = to ? Link : "article";
  const wrapperProps = to ? { to, className: "block rounded-[28px] bg-white p-5 shadow-soft" } : { className: "rounded-[28px] bg-white p-5 shadow-soft" };

  return (
    <Wrapper {...wrapperProps}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <BadgePill>{quest.completed ? "Completed" : "Active Quest"}</BadgePill>
        <BadgePill tone="soft">
          <span className="inline-flex items-center gap-1">
            <Medal aria-hidden size={13} />
            {quest.currentRank || "Progress"}
          </span>
        </BadgePill>
      </div>
      <div className="flex items-start gap-3">
        <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${rankTone}`}>
          <RankIcon aria-hidden size={22} strokeWidth={2.4} />
        </div>
        <h2 className="text-2xl font-black text-rock-ink">{quest.title}</h2>
      </div>
      <p className="mt-2 text-sm leading-5 text-zinc-600">{quest.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm font-bold">
        <span>
          Progress ({quest.current}/{quest.target})
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mt-2.5">
        <ProgressBar value={quest.current} max={quest.target} />
      </div>
      {quest.completed && (
        <p className="mt-4 rounded-2xl bg-rock-mint px-4 py-3 text-sm font-semibold text-rock-green">
          Quest complete. Nice steady progress.
        </p>
      )}
    </Wrapper>
  );
}

function getRankIcon(rankName) {
  const icons = {
    Bronze: Hexagon,
    Silver: Hexagon,
    Gold: Medal,
    Platinum: Diamond,
    Diamond: Trophy,
    Master: Star,
    Legend: Crown,
  };
  return icons[rankName] || Hexagon;
}

function getRankTone(rankName) {
  const tones = {
    Bronze: "bg-orange-100 text-orange-400",
    Silver: "bg-zinc-100 text-zinc-500",
    Gold: "bg-yellow-100 text-yellow-500",
    Platinum: "bg-cyan-50 text-cyan-500",
    Diamond: "bg-indigo-50 text-indigo-500",
    Master: "bg-purple-50 text-purple-600",
    Legend: "bg-rock-ink text-white",
  };
  return tones[rankName] || "bg-orange-100 text-orange-400";
}
