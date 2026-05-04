import { Medal, Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import BadgePill from "./BadgePill.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function QuestCard({ quest, to }) {
  const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));
  const Wrapper = to ? Link : "article";
  const wrapperProps = to ? { to, className: "block rounded-[32px] bg-white p-6 shadow-soft" } : { className: "rounded-[32px] bg-white p-6 shadow-soft" };

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
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
          <Mountain aria-hidden size={23} strokeWidth={2.4} />
        </div>
        <h2 className="text-2xl font-black text-rock-ink">{quest.title}</h2>
      </div>
      <p className="mt-3 text-base leading-6 text-zinc-600">{quest.description}</p>
      <div className="mt-6 flex items-center justify-between text-sm font-bold">
        <span>
          Progress ({quest.current}/{quest.target})
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mt-3">
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
