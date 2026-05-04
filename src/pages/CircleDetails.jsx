import { useMemo } from "react";
import { ArrowLeft, Compass, Map, MessageSquare, Pin, Search, SmilePlus } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BadgePill from "../components/BadgePill.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { circleMembers, findCircleById } from "../data/circleData.js";
import { getCircleApplications, getJoinedChallenges } from "../utils/storage.js";

export default function CircleDetails() {
  const navigate = useNavigate();
  const { circleId } = useParams();
  const circle = useMemo(() => findCircleById(circleId), [circleId]);
  const joined = circle.section === "active" || getJoinedChallenges().some((item) => item.id === circle.id);
  const pending = getCircleApplications().some((item) => item.circleId === circle.id && item.status === "pending");

  return (
    <>
      <header className="flex h-16 items-center gap-4 bg-white px-5 shadow-sm">
        <button type="button" aria-label="Go back" onClick={() => navigate("/community?tab=circles")} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="mr-auto text-lg font-black text-rock-green">Circles</h1>
        <Search aria-hidden className="text-rock-green" size={23} strokeWidth={2.4} />
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rock-mint font-black text-rock-green">A</div>
      </header>

      <main className="bg-rock-paper px-5 pb-32 pt-7">
        <section className="circle-detail-hero relative min-h-[352px] overflow-hidden rounded-[42px] p-6 shadow-lift">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/65" />
          <div className="relative mt-48">
            {circle.tags.includes("Beginner Friendly") && <BadgePill tone="mint">Beginner Friendly</BadgePill>}
            <h2 className="mt-5 text-lg font-medium text-white">{circle.title}</h2>
            <p className="mt-1 text-lg italic text-white/90">{circle.slogan}</p>
          </div>
        </section>

        <section className="mt-7 rounded-[34px] bg-white/80 p-6 shadow-soft">
          <h3 className="inline-flex items-center gap-2 text-base font-medium text-rock-green">
            <Compass aria-hidden size={20} strokeWidth={2.4} />
            Our Mission
          </h3>
          <p className="mt-6 text-lg leading-8 text-zinc-700">{circle.mission}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {circle.detailTags.map((tag) => (
              <BadgePill key={tag} tone="mint">{tag}</BadgePill>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[30px] bg-rock-green p-6 text-white shadow-lift">
          <p className="text-sm uppercase tracking-[0.16em] text-rock-mint/80">Active Since</p>
          <p className="mt-2 text-base">{circle.activeSince}</p>
          <div className="mt-9 grid grid-cols-2 gap-4">
            <div>
              <p className="text-4xl font-black text-rock-mint">{circle.ascents}</p>
              <p className="uppercase tracking-[0.14em] text-rock-mint/75">Ascents</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-rock-mint">{circle.crags}</p>
              <p className="uppercase tracking-[0.14em] text-rock-mint/75">Crags</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="inline-flex items-center gap-2 text-base font-medium">
              <SmilePlus aria-hidden size={21} strokeWidth={2.4} />
              Circle Members
            </h3>
            <button type="button" className="text-sm text-rock-moss">View All (48)</button>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            {circleMembers.map((name) => (
              <div key={name}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d2818,#d7a24c)] text-lg font-black text-white ring-2 ring-rock-mint">
                  {name.slice(0, 1)}
                </div>
                <p className="mt-2 text-sm text-zinc-700">{name}</p>
              </div>
            ))}
            <Link to={`/circle/${circle.id}/apply`} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-rock-stone text-2xl text-rock-stone">+</div>
              <p className="mt-2 text-sm text-zinc-700">Invite</p>
            </Link>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-base font-medium">Latest Activity</h3>
          <div className="mt-5 space-y-4">
            <ActivityItem Icon={Pin} title="New meet-up at Clear Creek" detail="Posted 2 hours ago" />
            <ActivityItem Icon={Map} title="Map updated for 'The Bastion'" detail="Updated yesterday" />
          </div>
        </section>

        {!joined && !pending && (
          <Link to={`/circle/${circle.id}/apply`} className="mx-auto mt-8 flex h-14 max-w-[230px] items-center justify-center rounded-full bg-rock-mint font-black text-rock-green">
            Apply to Join
          </Link>
        )}

        <Link to={`/circle/${circle.id}/chat`} className="mx-auto mt-6 flex h-16 max-w-[250px] items-center justify-center gap-3 rounded-full bg-rock-green text-base font-medium text-white shadow-lift">
          <MessageSquare aria-hidden size={21} strokeWidth={2.4} />
          Enter Circle Chat
        </Link>
      </main>
      <BottomNav />
    </>
  );
}

function ActivityItem({ Icon, title, detail }) {
  return (
    <article className="flex items-center gap-4 rounded-[26px] bg-white p-4 shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rock-mint text-rock-green">
        <Icon aria-hidden size={22} strokeWidth={2.4} />
      </div>
      <div>
        <h4 className="text-base font-medium">{title}</h4>
        <p className="text-sm text-zinc-600">{detail}</p>
      </div>
    </article>
  );
}
