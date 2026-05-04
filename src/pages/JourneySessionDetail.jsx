import { ArrowLeft, Clock3, Map, MapPin, NotebookText, Share2, Target, ThermometerSun } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import { getLogs, getSessions } from "../utils/storage.js";

export default function JourneySessionDetail() {
  const navigate = useNavigate();
  const { entryType, entryId } = useParams();
  const detail = buildJourneyDetail(entryType, entryId);

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-rock-paper px-5 shadow-sm">
        <button type="button" aria-label="Back to profile" onClick={() => navigate("/profile")} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="text-lg font-black text-rock-green">Session Detail</h1>
        <button type="button" aria-label="Share journey entry" className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <Share2 aria-hidden size={21} strokeWidth={2.4} />
        </button>
      </header>

      <main className="bg-[linear-gradient(180deg,#eef7eb_0%,#f8f9f5_100%)] px-5 pb-32 pt-6">
        <section>
          <h2 className="text-4xl font-black leading-10 text-rock-green">{detail.title}</h2>
          <p className="mt-3 flex items-center gap-2 text-base font-bold text-zinc-600">
            <MapPin aria-hidden size={18} strokeWidth={2.3} />
            {detail.location}
          </p>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-rock-moss">{detail.date}</p>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-4">
          <StatCard icon={Target} label="Grade" value={detail.grade} />
          <StatCard icon={NotebookText} label="Attempts" value={detail.attempts} />
          <StatCard icon={Clock3} label="Duration" value={detail.duration} />
          <StatCard icon={ThermometerSun} label="Conditions" value={detail.conditions} />
        </section>

        <section className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          <div className="journey-detail-main h-52 min-w-[245px] rounded-[34px] shadow-lift" />
          <div className="journey-detail-side h-52 min-w-[145px] rounded-[34px] shadow-soft" />
        </section>

        <section className="mt-6 rounded-[32px] bg-white p-6 shadow-soft">
          <h3 className="text-lg font-black text-rock-ink">Session Notes</h3>
          <p className="mt-3 text-base leading-7 text-zinc-700">{detail.notes}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {detail.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-rock-mist px-4 py-2 text-xs font-black text-rock-green">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[32px] bg-white p-6 shadow-soft">
          <h3 className="text-lg font-black text-rock-ink">Effort Map</h3>
          <div className="mt-5 grid grid-cols-7 items-end gap-2">
            {[35, 62, 44, 78, 56, 88, 68].map((height, index) => (
              <div key={height} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-full bg-rock-green" style={{ height: `${height}px` }} />
                <span className="text-[10px] font-bold text-zinc-500">{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="journey-detail-map mt-6 overflow-hidden rounded-[32px] p-5 shadow-soft">
          <div className="rounded-[28px] bg-white/88 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rock-green text-white">
                <Map aria-hidden size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-base font-black text-rock-ink">View on Map</h3>
                <p className="text-sm text-zinc-600">{detail.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}

function buildJourneyDetail(entryType, entryId) {
  const logs = getLogs();
  const sessions = getSessions();
  const fallback = {
    title: "Midnight Lightning",
    location: "Columbia Boulder, Yosemite NP",
    date: "OCT 24, 2023",
    grade: "V8",
    attempts: "12",
    duration: "2.5h",
    conditions: "42°F",
    notes:
      "Finally cracked the lower crux after several controlled attempts. The cooler conditions helped with friction, and the final send felt calm rather than rushed.",
    tags: ["High Friction", "Project Sent", "Technical"],
  };

  if (entryType === "log") {
    const log = logs.find((item) => item.id === entryId);
    if (!log) return fallback;
    return {
      title: log.routeName || log.location || "Climbing Log",
      location: log.location || "Local climbing spot",
      date: formatDetailDate(log.date || log.createdAt),
      grade: log.difficultyLevel || log.grade || "V4",
      attempts: String(log.attempts || log.routesCompleted || 1),
      duration: log.duration || "2h",
      conditions: log.conditions || "Indoor",
      notes: log.notes || `Logged ${log.routesCompleted || 1} routes and kept steady progress at ${log.difficultyLevel || "your current level"}.`,
      tags: [log.climbingType || "Climbing", log.isProject ? "Project" : "Log", log.difficultyLevel || "Progress"],
    };
  }

  if (entryType === "session") {
    const session = sessions.find((item) => item.id === entryId);
    if (!session) return fallback;
    return {
      title: session.title || "Community Session",
      location: session.location || "Partner climbing spot",
      date: formatDetailDate(session.date || session.createdAt),
      grade: session.gradeRange || session.level || "V3-V6",
      attempts: String(session.participants?.length || 4),
      duration: session.startTime || "Evening",
      conditions: session.privacy || "Group",
      notes: session.notes || "Joined a shared climbing session and built momentum with partners.",
      tags: ["Session", session.level || "Mixed Level", session.joined ? "Joined" : "Hosted"],
    };
  }

  return fallback;
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <article className="rounded-[28px] bg-white p-5 shadow-soft">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rock-mint text-rock-green">
        <Icon aria-hidden size={21} strokeWidth={2.4} />
      </div>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-black text-rock-ink">{value}</p>
    </article>
  );
}

function formatDetailDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "Today";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}
