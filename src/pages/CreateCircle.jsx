import { ArrowLeft, Check, Lock, Mountain, Send, UsersRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import { getCreatedCircles, getJoinedChallenges, saveCreatedCircles, saveJoinedChallenges } from "../utils/storage.js";

const focusOptions = ["Outdoor", "Bouldering", "Training"];

export default function CreateCircle() {
  const navigate = useNavigate();
  const [name, setName] = useState("Weekend Send Crew");
  const [focus, setFocus] = useState("Outdoor");
  const [description, setDescription] = useState("A small circle for planning weekend climbs and sharing beta.");
  const [privacy, setPrivacy] = useState("Recruiting Now");
  const [created, setCreated] = useState(false);

  function createCircle() {
    const id = `circle_${Date.now()}`;
    const circle = {
      id,
      section: "active",
      title: name.trim() || "New Climbing Circle",
      members: "1 member",
      activeMembers: "1 active member",
      location: "Local climbing area",
      status: privacy,
      slogan: "Built by your crew",
      description: description.trim() || "A small circle for planning climbs and sharing beta.",
      mission: description.trim() || "A small circle for planning climbs and sharing beta.",
      activeSince: "Just now",
      ascents: 0,
      crags: 0,
      tags: [privacy, focus, "Beginner Friendly"],
      detailTags: [focus, privacy, "Local Crew"],
      createdAt: new Date().toISOString(),
    };
    saveCreatedCircles([circle, ...getCreatedCircles()]);
    saveJoinedChallenges([
      {
        id,
        title: circle.title,
        focus,
        status: privacy,
        description: circle.description,
        joinedAt: new Date().toISOString(),
      },
      ...getJoinedChallenges(),
    ]);
    setCreated(true);
    window.setTimeout(() => navigate("/community?tab=circles"), 750);
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-white px-5 shadow-sm">
        <button type="button" aria-label="Back to circles" onClick={() => navigate("/community?tab=circles")} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="text-lg font-black text-rock-green">Create Circle</h1>
        <div className="h-10 w-10" />
      </header>

      <main className="bg-rock-paper px-5 pb-32 pt-6">
        <section className="rounded-[36px] bg-rock-green p-6 text-white shadow-lift">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-rock-mint">
            <UsersRound aria-hidden size={29} strokeWidth={2.4} />
          </div>
          <h2 className="mt-5 text-3xl font-black">Start a Circle</h2>
          <p className="mt-2 max-w-[290px] text-base leading-6 text-white/82">Create a local crew for shared goals, safer planning, and better climbing days.</p>
        </section>

        <section className="mt-6 space-y-6">
          <label className="block">
            <span className="text-sm font-black text-rock-moss">Circle name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} className="mt-3 h-14 w-full rounded-full bg-white px-5 shadow-soft outline-rock-green" />
          </label>

          <div>
            <p className="text-sm font-black text-rock-moss">Focus</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {focusOptions.map((item) => (
                <button key={item} type="button" onClick={() => setFocus(item)} className={`rounded-full px-5 py-3 font-black ${focus === item ? "bg-rock-green text-white" : "bg-white text-rock-moss shadow-soft"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-black text-rock-moss">Description</span>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="mt-3 min-h-28 w-full resize-none rounded-[28px] bg-white p-5 shadow-soft outline-rock-green" />
          </label>

          <div className="grid grid-cols-2 rounded-full bg-white p-1 shadow-soft">
            {["Recruiting Now", "Invite Only"].map((item) => (
              <button key={item} type="button" onClick={() => setPrivacy(item)} className={`flex h-12 items-center justify-center gap-2 rounded-full font-black ${privacy === item ? "bg-rock-green text-white" : "text-zinc-700"}`}>
                {item === "Recruiting Now" ? <Mountain aria-hidden size={18} /> : <Lock aria-hidden size={18} />}
                {item}
              </button>
            ))}
          </div>

          <button type="button" onClick={createCircle} className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-rock-green text-lg font-black text-white shadow-lift">
            {created ? <Check aria-hidden size={22} /> : <Send aria-hidden size={22} />}
            {created ? "Circle Created" : "Create Circle"}
          </button>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
