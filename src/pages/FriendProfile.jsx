import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageSquare, Mountain, Send, UserPlus, UsersRound, Video } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar.jsx";
import BadgePill from "../components/BadgePill.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { buildFriendProfile } from "../data/mockData.js";
import {
  getFriendRequests,
  getFriends,
  saveFriendRequests,
} from "../utils/storage.js";

export default function FriendProfile() {
  const navigate = useNavigate();
  const { friendId } = useParams();
  const friend = useMemo(() => buildFriendProfile(friendId), [friendId]);
  const [requests, setRequests] = useState(getFriendRequests());
  const [message, setMessage] = useState(`Hey ${friend.name.split(" ")[0]}, want to connect for a climb sometime?`);
  const [showRequest, setShowRequest] = useState(false);
  const friends = getFriends();
  const isFriend = friends.some((item) => item.id === friend.id);
  const existingRequest = requests.find((item) => item.toFriendId === friend.id && item.status === "pending");

  function sendRequest() {
    if (!message.trim() || existingRequest || isFriend) return;
    const updated = [
      {
        id: `request_${Date.now()}`,
        fromName: "Alex Chen",
        toFriendId: friend.id,
        toName: friend.name,
        message: message.trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      ...requests,
    ];
    setRequests(updated);
    saveFriendRequests(updated);
    setShowRequest(false);
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-rock-paper px-5 shadow-sm">
        <button type="button" aria-label="Go back" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="mr-auto pl-3 text-base font-medium text-rock-green">Summit Chat</h1>
        <Video aria-hidden className="text-rock-green" size={23} strokeWidth={2.4} />
      </header>

      <main className="bg-rock-paper px-5 pb-32 pt-7">
        <section className="text-center">
          <Avatar
            src={friend.avatarImage}
            alt={friend.name}
            fallback={friend.avatar}
            className="mx-auto h-32 w-32 rounded-[34px] text-5xl ring-4 ring-white shadow-soft"
          />
          <BadgePill tone="dark">{friend.level}</BadgePill>
          <h2 className="mt-3 text-lg font-medium text-rock-ink">{friend.name}</h2>
          <p className="mt-1 inline-flex items-center gap-1.5 text-zinc-600">
            <MapPin aria-hidden size={17} />
            {friend.location}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              to={isFriend ? `/chat/${friend.id}` : "#"}
              onClick={(event) => {
                if (!isFriend) event.preventDefault();
              }}
              className={`inline-flex h-14 items-center justify-center gap-2 rounded-full font-black shadow-lift ${
                isFriend ? "bg-rock-green text-white" : "bg-rock-stone/30 text-white"
              }`}
            >
              <MessageSquare aria-hidden size={20} />
              Message
            </Link>
            <button
              type="button"
              onClick={() => setShowRequest((value) => !value)}
              disabled={isFriend || Boolean(existingRequest)}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-rock-mint font-black text-rock-moss disabled:opacity-70"
            >
              {isFriend ? <Check aria-hidden size={19} /> : <UserPlus aria-hidden size={19} />}
              {isFriend ? "Friends" : existingRequest ? "Request Sent" : "Add"}
            </button>
          </div>
        </section>

        {showRequest && !isFriend && !existingRequest && (
          <section className="mt-5 rounded-[28px] bg-white p-5 shadow-soft">
            <label className="text-sm font-black text-rock-green">Friend request message</label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-3 min-h-24 w-full resize-none rounded-2xl bg-rock-mist/60 p-4 outline-rock-green"
            />
            <button type="button" onClick={sendRequest} className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-rock-green px-5 font-black text-white">
              <Send aria-hidden size={17} />
              Send Request
            </button>
          </section>
        )}

        <section className="mt-8 grid grid-cols-2 gap-4">
          <StatCard label="Total Climbs" value={friend.totalClimbs} detail="+12 this month" />
          <StatCard label="Milestones" value={friend.milestones} detail={friend.rankNote} />
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Achievements</h2>
            <button className="text-sm text-rock-moss" type="button">View All</button>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 text-center">
            {[Mountain, Check, CalendarDays].map((Icon, index) => (
              <div key={friend.achievements[index]}>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rock-mint text-rock-green">
                  <Icon aria-hidden size={25} strokeWidth={2.4} />
                </div>
                <p className="mt-2 text-xs">{friend.achievements[index]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <h2 className="text-lg font-medium">Climbing Journey</h2>
          <div className="mt-5 space-y-5 border-l-2 border-rock-mist pl-7">
            <JourneyCard title="Sent 'Eldorado Wall'" meta="2 days ago - Boulder, CO" image />
            <JourneyCard title="Reached 200 Total Climbs" meta="Last week - Milestone" quote="A huge personal goal reached. Ready for the next 200!" />
            <JourneyCard title="Joined 'Peak Performance' Club" meta="2 weeks ago" icon />
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}

function StatCard({ label, value, detail }) {
  return (
    <div className="rounded-[28px] bg-white p-6 text-center shadow-soft">
      <p className="text-sm uppercase tracking-[0.16em] text-zinc-600">{label}</p>
      <p className="mt-4 text-xl font-medium text-rock-ink">{value}</p>
      <p className="mt-1 text-xs font-bold text-rock-moss">{detail}</p>
    </div>
  );
}

function JourneyCard({ title, meta, image = false, quote, icon = false }) {
  return (
    <article className="relative rounded-[24px] bg-white p-5 shadow-soft">
      <span className="absolute -left-[38px] top-4 h-4 w-4 rounded-full bg-rock-green" />
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
            <UsersRound aria-hidden size={22} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-medium leading-5">{title}</h3>
          <p className="text-sm text-zinc-600">{meta}</p>
          {quote && <p className="mt-3 italic text-zinc-600">"{quote}"</p>}
          {image && <div className="friend-route-image mt-3 h-32 rounded-lg" />}
        </div>
      </div>
    </article>
  );
}
