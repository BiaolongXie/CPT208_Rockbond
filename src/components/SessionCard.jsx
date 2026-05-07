import BadgePill from "./BadgePill.jsx";

export default function SessionCard({ session, compact = false }) {
  if (!session) {
    return (
      <article className={`${compact ? "rounded-[24px] p-4" : "rounded-[28px] p-5"} bg-white shadow-soft`}>
        <h3 className="font-black text-rock-green">No climbing journey yet</h3>
        <p className="mt-2 text-sm leading-5 text-zinc-600">Add a quick log or join a session to start your progress story.</p>
      </article>
    );
  }

  const type = session.entryType === "session" ? "SESSION" : session.isProject ? "PROJECT" : "LOG";
  const title = session.title || session.location;
  const details =
    session.entryType === "session"
      ? [session.location, session.time, session.skillLevel || session.goal].filter(Boolean).join(" - ")
      : [session.climbingType, `${session.routesCompleted} routes`, session.difficultyLevel, formatDuration(session.durationHours)].filter(Boolean).join(" - ");

  return (
    <article className={`${compact ? "rounded-[24px] p-4" : "rounded-[28px] p-5"} bg-white shadow-soft`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-rock-moss">{session.date}</p>
          <h3 className="mt-1 text-lg font-black text-rock-ink">{title}</h3>
          <p className="mt-1 text-sm text-zinc-600">{details}</p>
        </div>
        <BadgePill tone={type === "PROJECT" ? "mint" : type === "SESSION" ? "dark" : "soft"}>{type}</BadgePill>
      </div>
      {!compact && session.notes && <p className="mt-4 text-sm leading-5 text-zinc-600">{session.notes}</p>}
    </article>
  );
}

function formatDuration(hours) {
  const value = Number(hours || 0);
  return value > 0 ? `${value.toFixed(1)}h` : "";
}
