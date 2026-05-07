import { useMemo, useState } from "react";
import { ArrowLeft, Clock3, LogOut, MoreHorizontal, Plus, Send, TrendingUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar.jsx";
import BadgePill from "../components/BadgePill.jsx";
import BottomNav from "../components/BottomNav.jsx";
import ShareActionSheet from "../components/ShareActionSheet.jsx";
import { avatarImages, getAvatarImageByName } from "../data/avatarData.js";
import { findSeedSession } from "../data/sessionData.js";
import { getSessions } from "../utils/storage.js";
import { setPublicSessionJoined, upsertSession } from "../utils/sessionStore.js";

export default function SessionDetails() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const storedSessions = getSessions();
  const initialSession = useMemo(() => storedSessions.find((item) => item.id === sessionId) || findSeedSession(sessionId), [sessionId]);
  const [session, setSession] = useState(initialSession);
  const [comment, setComment] = useState("");
  const [shareOpen, setShareOpen] = useState(false);

  function persist(nextSession) {
    setSession(nextSession);
    upsertSession(nextSession);
  }

  function toggleSessionJoined() {
    const result = setPublicSessionJoined(session, !session.joined);
    setSession(result.session);
  }

  function addComment() {
    if (!comment.trim()) return;
    persist({
      ...session,
      discussion: [
        ...(session.discussion || []),
        {
          id: `discussion_${Date.now()}`,
          author: "Alex",
          avatar: "A",
          avatarImage: avatarImages.alexChen,
          text: comment.trim(),
          time: "Just now",
          createdAt: new Date().toISOString(),
        },
      ],
    });
    setComment("");
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-white px-5 shadow-sm">
        <button type="button" aria-label="Go back" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="text-lg font-black text-rock-green">Session Details</h1>
        <button type="button" aria-label="More session actions" onClick={() => setShareOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <MoreHorizontal aria-hidden size={24} strokeWidth={2.4} />
        </button>
      </header>

      <main className="bg-rock-paper px-5 pb-32 pt-4">
        <section className="session-hero relative min-h-[420px] overflow-hidden rounded-[36px] p-6 shadow-lift">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/68" />
          <div className="relative mt-64">
            <div className="flex flex-wrap gap-3">
              <BadgePill tone="mint">{session.location}</BadgePill>
              <BadgePill tone="dark">{session.gradeRange}</BadgePill>
            </div>
            <h2 className="mt-3 text-lg font-medium text-white">{session.title}</h2>
            <button
              type="button"
              onClick={toggleSessionJoined}
              className={`mt-4 flex h-16 w-full items-center justify-center gap-3 rounded-full text-lg font-medium text-white shadow-lift ${
                session.joined ? "bg-rock-stone" : "bg-rock-green"
              }`}
            >
              {session.joined ? <LogOut aria-hidden size={22} strokeWidth={2.6} /> : <Plus aria-hidden size={23} strokeWidth={2.7} />}
              {session.joined ? "Leave Session" : "Join Session"}
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-[34px] bg-white/85 p-6 shadow-soft">
          <h3 className="text-lg font-medium">About this Session</h3>
          <p className="mt-3 text-lg leading-7 text-zinc-700">{session.notes}</p>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-4">
          <InfoCard Icon={Clock3} label="Time" value={`${session.startTime} ${session.date}`} />
          <InfoCard Icon={TrendingUp} label="Level" value={session.level} />
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">Participants</h3>
            <BadgePill tone="mint">{session.participants?.length || 0} Going</BadgePill>
          </div>
          <div className="mt-5 flex gap-5 overflow-x-auto pb-2 scrollbar-none">
            {(session.participants || []).map((name) => (
              <div key={name} className="text-center">
                <Avatar
                  src={getAvatarImageByName(name)}
                  alt={name}
                  fallback={name.slice(0, 1)}
                  className="mx-auto h-16 w-16 text-lg"
                />
                <p className="mt-2 text-sm text-zinc-700">{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-base font-medium">Discussion</h3>
          <div className="mt-5 space-y-5">
            {(session.discussion || []).map((item) => (
              <DiscussionItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6 flex h-14 items-center gap-3 rounded-full bg-white px-5 shadow-soft">
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addComment();
              }}
              className="min-w-0 flex-1 bg-transparent outline-none"
              placeholder="Add a comment..."
            />
            <button type="button" aria-label="Send comment" onClick={addComment} className="text-rock-green">
              <Send aria-hidden size={22} strokeWidth={2.5} />
            </button>
          </div>
        </section>
      </main>
      <ShareActionSheet open={shareOpen} onClose={() => setShareOpen(false)} title="Share Session" />
      <BottomNav />
    </>
  );
}

function InfoCard({ Icon, label, value }) {
  return (
    <article className="flex items-center gap-3 rounded-[28px] bg-white p-5 shadow-soft">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
        <Icon aria-hidden size={23} strokeWidth={2.4} />
      </div>
      <div>
        <p className="text-xs text-zinc-600">{label}</p>
        <p className="text-base font-black leading-5">{value}</p>
      </div>
    </article>
  );
}

function DiscussionItem({ item }) {
  return (
    <article className="flex items-start gap-4">
      <Avatar
        src={item.avatarImage || getAvatarImageByName(item.author)}
        alt={item.author}
        fallback={item.avatar || item.author.slice(0, 1)}
        className="h-10 w-10 text-sm"
      />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-black">{item.author}</h4>
          <p className="text-sm text-zinc-500">{item.time}</p>
        </div>
        <p className="rounded-[22px] bg-white p-4 text-base leading-6 shadow-soft">{item.text}</p>
      </div>
    </article>
  );
}
