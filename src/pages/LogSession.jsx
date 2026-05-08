import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header.jsx";
import { syncLogBadges } from "../utils/badges.js";
import { formatMonthYear, formatNumericDate } from "../utils/dateFormat.js";
import { calculateRankProgression, getCurrentSeasonId, getLogXP } from "../utils/rankProgression.js";
import { getLogs, getShownRankCelebrations, saveLogs, savePendingRankCelebration } from "../utils/storage.js";
import { notifyRankUp } from "../utils/userNotifications.js";

const today = new Date().toISOString().slice(0, 10);
const climbingTypes = ["Bouldering", "Top rope", "Lead climbing", "Mixed"];
const difficultyGrades = ["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8"];

export default function LogSession() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    date: today,
    location: "Campus Climbing Gym",
    climbingType: "Bouldering",
    routesCompleted: 1,
    durationHours: 2,
    difficultyLevel: "V3",
    notes: "",
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function submit(event) {
    event.preventDefault();
    const durationHours = Number(form.durationHours);
    if (
      !form.date ||
      !form.location.trim() ||
      Number(form.routesCompleted) <= 0 ||
      Number(form.routesCompleted) > 99 ||
      !Number.isFinite(durationHours) ||
      durationHours < 0.25 ||
      durationHours > 12
    ) {
      setError("Please add a date, location, 1-99 completed routes, and 0.25-12 climbing hours.");
      return;
    }

    const log = {
      ...form,
      id: `log_${Date.now()}`,
      location: form.location.trim(),
      routesCompleted: Number(form.routesCompleted),
      durationHours,
      isProject: false,
      createdAt: new Date().toISOString(),
    };
    const existingLogs = getLogs();
    const previousRank = calculateRankProgression(existingLogs);
    const logs = [log, ...existingLogs];
    const nextRank = calculateRankProgression(logs);
    saveLogs(logs);
    syncLogBadges(logs);
    queueRankCelebration(previousRank, nextRank, log);
    navigate("/home", { state: { message: "Quick log saved successfully." } });
  }

  return (
    <>
      <Header avatar="A" />
      <form onSubmit={submit} className="space-y-5 px-5 py-6">
        <div>
          <p className="text-sm font-bold uppercase text-rock-moss">Quick log</p>
          <h1 className="mt-1 text-3xl font-black">Log Project</h1>
          <p className="mt-2 text-sm leading-5 text-zinc-600">Record a climb, route note, or project you want to remember.</p>
        </div>

        {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}

        <label className="block">
          <span className="text-sm font-bold">Date</span>
          <DatePicker value={form.date} onChange={(value) => updateSelectField("date", value)} />
        </label>

        <label className="block">
          <span className="text-sm font-bold">Location or gym</span>
          <input className="mt-2 h-[58px] w-full rounded-3xl border-0 bg-white px-5 shadow-soft outline-rock-green" name="location" value={form.location} onChange={updateField} />
        </label>

        <label className="block">
          <span className="text-sm font-bold">Climbing type</span>
          <CustomSelect value={form.climbingType} options={climbingTypes} onChange={(value) => updateSelectField("climbingType", value)} />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-bold">Routes completed</span>
            <input className="mt-2 h-[58px] w-full rounded-3xl border-0 bg-white px-5 shadow-soft outline-rock-green" min="1" max="99" type="number" name="routesCompleted" value={form.routesCompleted} onChange={updateField} />
            <p className="mt-2 text-xs leading-4 text-zinc-500">Count only routes you completed from start to finish, not partial attempts.</p>
          </label>
          <label className="block">
            <span className="text-sm font-bold">Difficulty</span>
            <CustomSelect value={form.difficultyLevel} options={difficultyGrades} onChange={(value) => updateSelectField("difficultyLevel", value)} compact />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-bold">Climbing duration</span>
          <div className="mt-2 flex h-[58px] items-center rounded-3xl bg-white px-5 shadow-soft focus-within:outline focus-within:outline-2 focus-within:outline-rock-green">
            <input
              className="min-w-0 flex-1 border-0 bg-transparent text-base outline-none"
              min="0.25"
              max="12"
              step="0.25"
              type="number"
              name="durationHours"
              value={form.durationHours}
              onChange={updateField}
            />
            <span className="ml-3 text-sm font-black text-rock-moss">hours</span>
          </div>
          <p className="mt-2 text-xs leading-4 text-zinc-500">Used for Total Hours on Home. Count your actual climbing time for this log.</p>
        </label>

        <label className="block">
          <span className="text-sm font-bold">Log notes</span>
          <textarea className="mt-2 min-h-28 w-full resize-none rounded-3xl border-0 bg-white px-5 py-4 shadow-soft outline-rock-green" name="notes" value={form.notes} onChange={updateField} placeholder="What felt good? What route should you return to?" />
        </label>

        <div className="flex gap-3 pt-2">
          <Link to="/home" className="flex min-h-14 flex-1 items-center justify-center rounded-full bg-rock-mist font-black text-rock-moss">
            Cancel
          </Link>
          <button type="submit" className="min-h-14 flex-[1.4] rounded-full bg-rock-green font-black text-white shadow-lift">
            Save Log
          </button>
        </div>
      </form>
    </>
  );

  function updateSelectField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }
}

function queueRankCelebration(previousRank, nextRank, log) {
  if (nextRank.currentIndex <= previousRank.currentIndex) return;

  const seasonId = getCurrentSeasonId();
  const celebrationKey = `${seasonId}:${nextRank.currentRank}`;
  const alreadyShown = getShownRankCelebrations().includes(celebrationKey);
  if (alreadyShown) return;

  const celebration = {
    id: celebrationKey,
    seasonId,
    fromRank: previousRank.currentRank,
    toRank: nextRank.currentRank,
    totalXP: nextRank.totalXP,
    gainedXP: getLogXP(log),
    createdAt: new Date().toISOString(),
  };
  savePendingRankCelebration(celebration);
  notifyRankUp(celebration);
}

function CustomSelect({ value, options, onChange, compact = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-2">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-[58px] w-full items-center justify-between rounded-[28px] bg-white px-5 text-left text-base font-black text-rock-ink shadow-soft ring-1 ring-transparent transition focus:outline-none focus:ring-rock-green"
      >
        <span>{value}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rock-mist text-rock-green">
          <ChevronDown aria-hidden className={`transition ${open ? "rotate-180" : ""}`} size={19} strokeWidth={2.6} />
        </span>
      </button>

      {open && (
        <div className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-[28px] bg-white p-2 shadow-lift ring-1 ring-rock-mint ${compact ? "grid grid-cols-3 gap-1" : "space-y-1"}`}>
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex min-h-11 items-center justify-between rounded-[22px] px-4 text-left text-sm font-black transition ${
                  selected ? "bg-rock-green text-white" : "text-rock-ink hover:bg-rock-mist"
                }`}
              >
                <span>{option}</span>
                {selected && <Check aria-hidden size={17} strokeWidth={2.7} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const baseDate = new Date(`${value}T00:00:00`);
  const safeDate = Number.isNaN(baseDate.getTime()) ? new Date() : baseDate;
  const [viewDate, setViewDate] = useState(new Date(safeDate));
  const days = buildDateChoices(viewDate);

  function shiftMonth(amount) {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  }

  return (
    <div className="relative mt-2">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-[58px] w-full items-center justify-between rounded-3xl bg-white px-5 text-left text-base font-black text-rock-ink shadow-soft ring-1 ring-transparent transition focus:outline-none focus:ring-rock-green"
      >
        <span>{formatDisplayDate(value)}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rock-mist text-rock-green">
          <CalendarDays aria-hidden size={18} strokeWidth={2.5} />
        </span>
      </button>

      {open && (
        <section className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-[30px] bg-white p-4 shadow-lift ring-1 ring-rock-mint">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-rock-moss">Choose date</p>
              <h2 className="mt-1 text-lg font-black text-rock-green">{formatMonthYear(viewDate)}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-rock-mist text-rock-green">
                <ChevronLeft aria-hidden size={19} strokeWidth={2.6} />
              </button>
              <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-rock-mist text-rock-green">
                <ChevronRight aria-hidden size={19} strokeWidth={2.6} />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-black text-zinc-500">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={`${day}-${index}`} className="py-2">
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const selected = day.value === value;
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => {
                    onChange(day.value);
                    setOpen(false);
                  }}
                  className={`flex h-10 items-center justify-center rounded-full text-sm font-black transition ${
                    selected ? "bg-rock-green text-white shadow" : day.inMonth ? "text-rock-ink hover:bg-rock-mist" : "text-zinc-400 hover:bg-rock-mist"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => {
              const todayDate = new Date(`${today}T00:00:00`);
              setViewDate(todayDate);
              onChange(today);
              setOpen(false);
            }}
            className="mt-4 h-11 w-full rounded-full bg-rock-mist text-sm font-black text-rock-green"
          >
            Today
          </button>
        </section>
      )}
    </div>
  );
}

function buildDateChoices(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 35 }, (_, index) => {
    const item = new Date(start);
    item.setDate(start.getDate() + index);
    return {
      label: item.getDate(),
      value: toDateInputValue(item),
      inMonth: item.getMonth() === month,
    };
  });
}

function formatDisplayDate(value) {
  return formatNumericDate(`${value}T00:00:00`, value);
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
