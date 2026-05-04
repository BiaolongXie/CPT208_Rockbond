import { Link2, MessageSquare, Share2, X } from "lucide-react";
import { useState } from "react";

export default function ShareActionSheet({ open, onClose, title = "Share" }) {
  const [feedback, setFeedback] = useState("");

  if (!open) return null;

  function chooseAction(message) {
    setFeedback(message);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/35 px-4 pb-4" role="dialog" aria-modal="true">
      <section className="mx-auto w-full max-w-[430px] rounded-[30px] bg-white p-5 shadow-lift">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-rock-green">{title}</h2>
          <button type="button" aria-label="Close share actions" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-rock-mist text-rock-green">
            <X aria-hidden size={20} strokeWidth={2.5} />
          </button>
        </div>
        <div className="space-y-3">
          <ActionButton Icon={MessageSquare} label="Share to friends" onClick={() => chooseAction("Ready to share with friends")} />
          <ActionButton Icon={Link2} label="Copy link" onClick={() => chooseAction("Link copied")} />
          <ActionButton Icon={Share2} label="Share to social apps" onClick={() => chooseAction("Ready to share outside RockBond")} />
        </div>
        {feedback && <p className="mt-4 rounded-full bg-rock-mint px-4 py-3 text-center text-sm font-black text-rock-green">{feedback}</p>}
        <button type="button" onClick={onClose} className="mt-4 h-12 w-full rounded-full bg-rock-green font-black text-white">
          Cancel
        </button>
      </section>
    </div>
  );
}

function ActionButton({ Icon, label, onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex h-14 w-full items-center gap-4 rounded-full bg-rock-mist px-5 text-left font-black text-rock-green">
      <Icon aria-hidden size={21} strokeWidth={2.4} />
      {label}
    </button>
  );
}
