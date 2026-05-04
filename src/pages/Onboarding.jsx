import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CalendarDays, Handshake, LineChart, Sparkles } from "lucide-react";
import BadgePill from "../components/BadgePill.jsx";
import { saveUserProfile } from "../utils/storage.js";

const levels = ["Beginner", "Occasional", "Regular", "Experienced"];
const goals = ["Track progress", "Find partners", "Discover events", "Stay motivated"];
const goalIcons = {
  "Track progress": LineChart,
  "Find partners": Handshake,
  "Discover events": CalendarDays,
  "Stay motivated": Sparkles,
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [level, setLevel] = useState("Regular");
  const [selectedGoals, setSelectedGoals] = useState(["Find partners"]);

  function toggleGoal(goal) {
    setSelectedGoals((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal]
    );
  }

  function start() {
    saveUserProfile({
      name: "Alex Chen",
      level,
      goals: selectedGoals,
      location: "Boulder, Colorado",
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
    });
    navigate("/home");
  }

  return (
    <div className="min-h-screen bg-rock-paper">
      <section className="relative h-[360px] overflow-hidden bg-rock-green">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#0d2818_0%,#315a46_48%,#cfeac9_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-rock-paper to-transparent" />
        <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-7 py-3 text-sm text-rock-green shadow-soft">
          <span className="h-2 w-2 rounded-full bg-rock-green" />
          Step 2 of 3: Preferences
        </div>
        <div className="absolute bottom-12 left-8 right-8 text-center text-white">
          <BadgePill>Welcome to the Crag</BadgePill>
          <h1 className="mt-5 text-4xl font-black tracking-normal">RockBond</h1>
          <p className="mt-4 text-lg leading-7 text-white/90">
            Connect with local climbers, track your progress, and conquer new heights together.
          </p>
        </div>
      </section>

      <section className="space-y-8 px-5 pb-10">
        <div>
          <h2 className="text-xl font-black">What are your goals?</h2>
          <div className="mt-5 space-y-4">
            {goals.map((goal) => {
              const active = selectedGoals.includes(goal);
              const Icon = goalIcons[goal];
              return (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`flex min-h-20 w-full items-center justify-between rounded-[32px] bg-white px-5 py-4 text-left shadow-soft ring-2 transition ${
                    active ? "ring-rock-green" : "ring-transparent"
                  }`}
                >
                  <span className={`mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${active ? "bg-rock-mint text-rock-green" : "bg-rock-mist text-rock-stone"}`}>
                    <Icon aria-hidden size={23} strokeWidth={2.3} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-black">{goal}</span>
                    <span className="mt-1 block text-sm leading-4 text-zinc-600">
                      {goal === "Find partners"
                        ? "Find a reliable belay mate or bouldering crew"
                        : "Build a friendly habit that fits your climbing life"}
                    </span>
                  </span>
                  <span className={`ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${active ? "bg-rock-green text-white" : "bg-rock-mist text-rock-stone"}`}>
                    {active && <Check aria-hidden size={17} strokeWidth={2.8} />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black">Current skill level?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {levels.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLevel(item)}
                className={`rounded-full px-6 py-3 text-sm font-bold transition ${
                  level === item ? "bg-rock-green text-white shadow-lift" : "bg-rock-mist text-zinc-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 pt-4">
          <button type="button" className="px-6 py-4 font-bold text-zinc-600">
            Back
          </button>
          <button
            type="button"
            onClick={start}
            disabled={selectedGoals.length === 0}
            className="min-h-16 flex-1 rounded-[28px] bg-rock-green px-8 text-xl font-black text-white shadow-lift disabled:opacity-50"
          >
            Get Climbing
          </button>
        </div>
      </section>
    </div>
  );
}
