import { useState } from "react";
import { CalendarDays, Check, Clock3, Globe2, Lock, MapPin, Send, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import { getSessions, saveSessions } from "../utils/storage.js";

const grades = ["V0", "V1", "V2", "V3", "V4", "V5", "V6+"];
const partners = ["Alex P.", "Maya R.", "Liam W."];

export default function CreateSession() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Morning Crag Session");
  const [grade, setGrade] = useState("V3");
  const [privacy, setPrivacy] = useState("Invite Only");
  const [notes, setNotes] = useState("");
  const [selectedPartners, setSelectedPartners] = useState(["Liam W."]);

  function createSession() {
    const id = `session_${Date.now()}`;
    const newSession = {
      id,
      title: title.trim() || "Morning Crag Session",
      location: "The Sentinel, Yosemite",
      area: "The Sentinel",
      gradeRange: grade,
      date: "Oct 24, 2023",
      startTime: "08:30 AM",
      level: grade === "V0" || grade === "V1" ? "Beginner" : "Intermediate",
      notes: notes.trim() || "Tell your partners about the route, gear needed, or meeting spot.",
      privacy,
      participants: selectedPartners.length > 0 ? selectedPartners : ["Alex Chen"],
      joined: true,
      hosted: true,
      createdAt: new Date().toISOString(),
      discussion: [],
    };
    saveSessions([newSession, ...getSessions()]);
    navigate(`/session/${id}`);
  }

  function togglePartner(name) {
    setSelectedPartners((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]));
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-white px-5 shadow-sm">
        <button type="button" aria-label="Cancel session creation" onClick={() => navigate("/explore")} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <X aria-hidden size={25} strokeWidth={2.5} />
        </button>
        <h1 className="text-lg font-black text-rock-green">New Session</h1>
        <button type="button" aria-label="Create session" onClick={createSession} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <Check aria-hidden size={25} strokeWidth={2.5} />
        </button>
      </header>

      <main className="bg-rock-paper px-5 pb-32 pt-5">
        <FormLabel>Session Title</FormLabel>
        <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-3 h-16 w-full rounded-full bg-white px-6 text-base shadow-soft outline-rock-green" />

        <FormLabel className="mt-6">Target Grade Range</FormLabel>
        <div className="mt-3 flex flex-wrap gap-3">
          {grades.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setGrade(item)}
              className={`h-11 min-w-14 rounded-full border px-5 text-base ${grade === item ? "border-rock-green bg-rock-green text-white" : item === "V3" ? "border-rock-mint bg-rock-mint text-rock-green" : "border-rock-stone/20 bg-white text-zinc-700"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <FormLabel className="mt-7">Location</FormLabel>
        <section className="session-location-map mt-3 flex h-36 items-end rounded-[34px] p-4 shadow-soft">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/78 px-4 py-3 text-base text-rock-ink shadow backdrop-blur">
            <MapPin aria-hidden size={20} strokeWidth={2.3} />
            The Sentinel, Yosemite
          </div>
        </section>

        <div className="mt-7 grid grid-cols-2 gap-4">
          <div>
            <FormLabel>Date</FormLabel>
            <div className="mt-3 flex h-14 items-center gap-3 rounded-full bg-white px-5 shadow-soft">
              <CalendarDays aria-hidden className="text-rock-green" size={21} />
              Oct 24, 2023
            </div>
          </div>
          <div>
            <FormLabel>Start Time</FormLabel>
            <div className="mt-3 flex h-14 items-center gap-3 rounded-full bg-white px-5 shadow-soft">
              <Clock3 aria-hidden className="text-rock-green" size={21} />
              08:30 AM
            </div>
          </div>
        </div>

        <FormLabel className="mt-7">Notes & Beta</FormLabel>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="mt-3 min-h-28 w-full resize-none rounded-[30px] bg-white p-6 text-base shadow-soft outline-rock-green"
          placeholder="Tell your partners about the route, gear needed, or meeting spot..."
        />

        <FormLabel className="mt-7">Session Privacy</FormLabel>
        <div className="mt-3 grid grid-cols-2 rounded-full bg-white p-1 shadow-soft">
          {["Public", "Invite Only"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPrivacy(item)}
              className={`flex h-12 items-center justify-center gap-2 rounded-full font-medium ${privacy === item ? "bg-rock-green text-white shadow" : "text-zinc-700"}`}
            >
              {item === "Public" ? <Globe2 aria-hidden size={18} /> : <Lock aria-hidden size={18} />}
              {item}
            </button>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between">
          <FormLabel>Invite Partners</FormLabel>
        </div>
        <div className="mt-4 flex gap-5 overflow-x-auto pb-2 scrollbar-none">
          {partners.map((name) => {
            const selected = selectedPartners.includes(name);
            return (
            <button key={name} type="button" onClick={() => togglePartner(name)} className="text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d2818,#d7a24c)] text-lg font-black text-white ring-2 ring-white">
                {name.slice(0, 1)}
                <span className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full ${selected ? "bg-rock-green text-white" : "bg-white text-rock-stone shadow"}`}>
                  {selected ? <Check aria-hidden size={15} /> : "+"}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-700">{name}</p>
            </button>
            );
          })}
        </div>

        <button type="button" onClick={createSession} className="mt-9 flex h-16 w-full items-center justify-center gap-3 rounded-full bg-rock-green text-lg font-medium text-white shadow-lift">
          Create & Share
          <Send aria-hidden size={22} strokeWidth={2.4} />
        </button>
        <p className="mx-auto mt-5 max-w-[300px] text-center text-base leading-6 text-zinc-500">
          A notification will be sent to your selected partners.
        </p>
      </main>
      <BottomNav />
    </>
  );
}

function FormLabel({ children, className = "" }) {
  return <label className={`block text-sm font-black text-rock-moss ${className}`}>{children}</label>;
}
