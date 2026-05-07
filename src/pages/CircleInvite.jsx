import { ArrowLeft, Check, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { findCircleById } from "../data/circleData.js";
import { invitations } from "../data/mockData.js";

export default function CircleInvite() {
  const navigate = useNavigate();
  const { circleId } = useParams();
  const circle = useMemo(() => findCircleById(circleId), [circleId]);
  const [selected, setSelected] = useState([invitations[0]?.id].filter(Boolean));
  const [sent, setSent] = useState(false);

  function togglePartner(partnerId) {
    setSelected((current) => (current.includes(partnerId) ? current.filter((id) => id !== partnerId) : [...current, partnerId]));
  }

  function sendInvites() {
    setSent(true);
    window.setTimeout(() => navigate(`/circle/${circle.id}`), 800);
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-white px-5 shadow-sm">
        <button type="button" aria-label="Back to circle" onClick={() => navigate(`/circle/${circle.id}`)} className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green">
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="text-lg font-black text-rock-green">Invite Friends</h1>
        <div className="h-10 w-10" />
      </header>

      <main className="bg-rock-paper px-5 pb-32 pt-6">
        <section className="rounded-[34px] bg-white p-6 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-rock-moss">Circle Invite</p>
          <h2 className="mt-2 text-3xl font-black text-rock-green">{circle.title}</h2>
          <p className="mt-2 text-base leading-6 text-zinc-600">Choose friends to invite into this circle. This is a local prototype invite flow.</p>
        </section>

        <section className="mt-6 space-y-4">
          {invitations.map((partner) => {
            const active = selected.includes(partner.id);
            return (
              <button key={partner.id} type="button" onClick={() => togglePartner(partner.id)} className="flex w-full items-center gap-4 rounded-[28px] bg-white p-4 text-left shadow-soft">
                <Avatar
                  src={partner.avatarImage}
                  alt={partner.climberName}
                  fallback={partner.climberName.slice(0, 1)}
                  className="h-14 w-14 text-lg"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black">{partner.climberName}</h3>
                  <p className="text-sm text-zinc-600">{partner.location}</p>
                </div>
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${active ? "bg-rock-green text-white" : "bg-rock-mist text-rock-stone"}`}>
                  {active && <Check aria-hidden size={18} strokeWidth={2.7} />}
                </span>
              </button>
            );
          })}
        </section>

        <button type="button" onClick={sendInvites} disabled={selected.length === 0 || sent} className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-full bg-rock-green text-lg font-black text-white shadow-lift disabled:opacity-50">
          {sent ? <Check aria-hidden size={22} /> : <Send aria-hidden size={22} />}
          {sent ? "Invites Sent" : `Send ${selected.length} Invite${selected.length === 1 ? "" : "s"}`}
        </button>
      </main>
      <BottomNav />
    </>
  );
}
