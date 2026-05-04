import { useMemo, useState } from "react";
import { ArrowLeft, Mic, Search, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { findCircleById, seedCircleMessages } from "../data/circleData.js";
import { getCircleChats, saveCircleChats } from "../utils/storage.js";

export default function CircleChat() {
  const navigate = useNavigate();
  const { circleId } = useParams();
  const circle = useMemo(() => findCircleById(circleId), [circleId]);
  const storedChats = getCircleChats();
  const initialMessages = storedChats[circle.id] || seedCircleMessages(circle);
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");

  function persist(nextMessages) {
    setMessages(nextMessages);
    saveCircleChats({ ...getCircleChats(), [circle.id]: nextMessages });
  }

  function sendMessage() {
    if (!text.trim()) return;
    const nextMessages = [
      ...messages,
      {
        id: `circle_message_${Date.now()}`,
        sender: "me",
        avatar: "A",
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        createdAt: new Date().toISOString(),
      },
    ];
    persist(nextMessages);
    setText("");
  }

  return (
    <main className="flex min-h-screen flex-col bg-rock-paper">
      <header className="flex h-20 items-center gap-4 bg-white px-5 shadow-sm">
        <button type="button" aria-label="Go back" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-black leading-5 text-rock-green">{circle.title}</h1>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-rock-moss">{circle.activeMembers}</p>
        </div>
        <Search aria-hidden className="text-rock-green" size={23} strokeWidth={2.4} />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d2818,#6d8777)] font-black text-white ring-2 ring-rock-mint">
          {circle.title.slice(0, 1)}
        </div>
      </header>

      <section className="flex-1 space-y-7 overflow-y-auto px-5 pb-28 pt-6">
        <div className="mx-auto w-fit rounded-full bg-rock-mist px-5 py-1 text-sm text-zinc-600">Today, August 12</div>
        {messages.map((message) => (
          <CircleMessage key={message.id} message={message} />
        ))}
      </section>

      <section className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 bg-rock-paper px-5 pb-6 pt-3">
        <div className="flex h-16 items-center gap-3 rounded-full bg-white px-3 shadow-soft">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") sendMessage();
            }}
            className="min-w-0 flex-1 bg-rock-mist/70 px-4 py-3 outline-none"
            placeholder="Message the nomads..."
          />
          <button type="button" aria-label="Send message" onClick={sendMessage} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rock-green text-white">
            {text.trim() ? <Send aria-hidden size={21} strokeWidth={2.4} /> : <Mic aria-hidden size={22} strokeWidth={2.4} />}
          </button>
        </div>
      </section>
    </main>
  );
}

function CircleMessage({ message }) {
  const mine = message.sender === "me";
  return (
    <article className={`flex items-end gap-3 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d2818,#d7a24c)] text-sm font-black text-white">
          {message.avatar}
        </div>
      )}
      <div className={`max-w-[78%] ${mine ? "text-right" : ""}`}>
        <p className="mb-1 px-2 text-sm text-zinc-700">{mine ? "Me" : message.sender}</p>
        <div className={`overflow-hidden rounded-[32px] ${mine ? "bg-rock-green text-white" : "bg-white text-rock-ink shadow-soft"}`}>
          {message.image && <div className="circle-chat-route h-32" />}
          <p className="p-5 text-base leading-6">{message.text}</p>
        </div>
        <p className="mt-1 px-2 text-xs text-zinc-600">{message.time}</p>
      </div>
    </article>
  );
}
