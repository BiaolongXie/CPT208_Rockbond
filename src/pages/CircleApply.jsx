import { useMemo, useState } from "react";
import { ArrowLeft, Clock3, Send, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BadgePill from "../components/BadgePill.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { circleMembers, findCircleById } from "../data/circleData.js";
import { getCircleApplications, saveCircleApplications } from "../utils/storage.js";

export default function CircleApply() {
  const navigate = useNavigate();
  const { circleId } = useParams();
  const circle = useMemo(() => findCircleById(circleId), [circleId]);
  const [applications, setApplications] = useState(getCircleApplications());
  const existingApplication = applications.find((item) => item.circleId === circle.id && item.status === "pending");
  const [story, setStory] = useState(
    existingApplication?.story || "I've been climbing for 3 years, mostly focused on bouldering in the Peak District..."
  );

  function submitApplication() {
    if (!story.trim() || existingApplication) return;
    const nextApplications = [
      {
        id: `circle_application_${Date.now()}`,
        circleId: circle.id,
        circleTitle: circle.title,
        story: story.trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      ...applications,
    ];
    setApplications(nextApplications);
    saveCircleApplications(nextApplications);
  }

  return (
    <>
      <header className="flex h-16 items-center bg-white px-5 shadow-sm">
        <button type="button" aria-label="Go back" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="mx-auto pr-10 text-base font-medium text-rock-green">{circle.title}</h1>
      </header>

      <main className="min-h-screen bg-rock-paper px-5 pb-32 pt-6">
        <section className="text-center">
          <BadgePill tone="mint">Application</BadgePill>
          <h2 className="mt-5 text-lg font-medium">Join the Circle</h2>
          <p className="mx-auto mt-3 max-w-[340px] text-base leading-6 text-zinc-700">
            Share your journey with us. We're a community of outdoor enthusiasts who value authentic connections and stewardship.
          </p>
        </section>

        <section className="mt-9 rounded-[42px] bg-white p-8 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rock-green text-rock-mint">
              <circle.Icon aria-hidden size={22} strokeWidth={2.4} />
            </div>
            <div>
              <h3 className="text-base font-medium">Personal Introduction</h3>
              <p className="text-base text-zinc-500">Help us get to know you better</p>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] bg-rock-mist/70 p-5 text-base italic leading-7 text-zinc-700">
            "{circle.title} is more than just climbers; we're a tribe. Tell us about your favorite crag, your climbing philosophy, or what you hope to find in our circle."
          </div>

          <label htmlFor="circle-story" className="mt-8 block text-base font-medium">
            Your Story
          </label>
          <textarea
            id="circle-story"
            value={story}
            onChange={(event) => setStory(event.target.value)}
            disabled={Boolean(existingApplication)}
            className="mt-3 min-h-40 w-full resize-none rounded-[28px] border border-rock-stone/35 bg-white p-5 text-base leading-6 outline-rock-green disabled:text-zinc-500"
          />

          <div className="mt-6 grid grid-cols-2 gap-4">
            <InfoCard Icon={ShieldCheck} title="Member Review" detail="Apps are reviewed by core members" />
            <InfoCard Icon={Clock3} title="Typical Wait" detail="Response within 48 hours" />
          </div>

          <button
            type="button"
            onClick={submitApplication}
            disabled={Boolean(existingApplication) || !story.trim()}
            className="mt-9 inline-flex h-16 w-full items-center justify-center gap-3 rounded-full bg-rock-green text-lg font-medium text-white shadow-lift disabled:bg-rock-stone"
          >
            {existingApplication ? "Application Sent" : "Send Application"}
            {!existingApplication && <Send aria-hidden size={22} strokeWidth={2.4} />}
          </button>
        </section>

        <section className="mt-8 flex items-center gap-3 rounded-[24px] bg-white/75 p-4 shadow-soft">
          <div className="flex -space-x-2">
            {circleMembers.slice(0, 3).map((name) => (
              <span key={name} className="flex h-10 w-10 items-center justify-center rounded-full bg-rock-green text-sm font-black text-white ring-2 ring-white">
                {name.slice(0, 1)}
              </span>
            ))}
          </div>
          <p className="text-base leading-5 text-zinc-700">Join {circle.members.replace(/members/i, "others")} already in this circle</p>
        </section>
      </main>
      <BottomNav />
    </>
  );
}

function InfoCard({ Icon, title, detail }) {
  return (
    <article className="rounded-[26px] bg-white p-4 shadow-soft">
      <Icon aria-hidden className="text-rock-green" size={22} strokeWidth={2.3} />
      <h3 className="mt-3 text-base font-medium leading-5">{title}</h3>
      <p className="mt-2 text-xs leading-4 text-zinc-600">{detail}</p>
    </article>
  );
}
