import { useMemo, useState } from "react";
import { ArrowLeft, Info, MapPin, Mic, Phone, Plus, Send, Video } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { buildFriendProfile, seedChatMessages } from "../data/mockData.js";
import { getChats, saveChats } from "../utils/storage.js";

export default function ActiveChat() {
  const navigate = useNavigate();
  const { friendId } = useParams();
  const friend = useMemo(() => buildFriendProfile(friendId), [friendId]);
  const chats = getChats();
  const initialMessages = chats[friend.id] || seedChatMessages(friend);
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");

  function persist(nextMessages) {
    setMessages(nextMessages);
    saveChats({ ...getChats(), [friend.id]: nextMessages });
  }

  function sendMessage(value = text) {
    if (!value.trim()) return;
    const next = [
      ...messages,
      {
        id: `message_${Date.now()}`,
        sender: "me",
        text: value.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        createdAt: new Date().toISOString(),
      },
    ];
    persist(next);
    setText("");
  }

  return (
    <main className="flex min-h-screen flex-col bg-rock-paper">
      <header className="flex h-20 items-center gap-4 bg-white px-5 shadow-sm">
        <button type="button" aria-label="Go back" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d2818,#cfeac9)] font-black text-white">
          {friend.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-base font-medium leading-5 text-rock-ink">{friend.name}</h1>
          <p className="text-sm text-rock-moss">Online</p>
        </div>
        <PhoneIcon Icon={Phone} />
        <PhoneIcon Icon={Video} />
        <PhoneIcon Icon={Info} />
      </header>

      <section className="flex-1 space-y-5 overflow-y-auto px-5 pb-36 pt-4">
        <div className="ml-auto w-fit rounded-full bg-rock-mist px-7 py-2 text-xs font-black uppercase tracking-[0.16em] text-rock-green">
          {friend.name.split(" ")[0]} is typing
        </div>
        <div className="mx-auto w-fit rounded-full bg-rock-mist px-5 py-1 text-sm text-zinc-600">Today</div>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </section>

      <section className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 bg-rock-paper px-5 pb-6 pt-3">
        <div className="mb-4 flex gap-3 overflow-x-auto scrollbar-none">
          <button type="button" onClick={() => sendMessage("Sounds like a plan!")} className="shrink-0 rounded-full bg-rock-mist px-5 py-3 text-sm font-medium text-zinc-700">
            Sounds like a plan!
          </button>
          <button type="button" onClick={() => sendMessage("Send location")} className="inline-flex shrink-0 items-center gap-1 rounded-full bg-rock-mist px-5 py-3 text-sm font-medium text-zinc-700">
            Send location <MapPin aria-hidden size={15} />
          </button>
        </div>
        <div className="flex h-16 items-center gap-3 rounded-full bg-white px-4 shadow-soft">
          <button type="button" aria-label="Attach" className="flex h-11 w-11 items-center justify-center rounded-full bg-rock-mist text-rock-green">
            <Plus aria-hidden size={23} />
          </button>
          <input value={text} onChange={(event) => setText(event.target.value)} className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Type a message..." />
          <button type="button" aria-label="Send message" onClick={() => sendMessage()} className="flex h-12 w-12 items-center justify-center rounded-full bg-rock-green text-white shadow-lift">
            {text.trim() ? <Send aria-hidden size={21} /> : <Mic aria-hidden size={22} />}
          </button>
        </div>
      </section>
    </main>
  );
}

function PhoneIcon({ Icon }) {
  return (
    <button type="button" className="text-rock-green">
      <Icon aria-hidden size={22} strokeWidth={2.4} />
    </button>
  );
}

function MessageBubble({ message }) {
  const mine = message.sender === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[82%] ${mine ? "text-right" : ""}`}>
        <div className={`overflow-hidden rounded-[24px] ${mine ? "bg-rock-green text-white" : "bg-white text-rock-ink shadow-soft"}`}>
          {message.image && <div className="chat-route-image h-64" />}
          <p className="p-5 text-base leading-6">{message.text}</p>
        </div>
        <p className="mt-1 px-2 text-xs text-zinc-600">{message.time}</p>
      </div>
    </div>
  );
}
