import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { syncLogBadges } from "../utils/badges.js";
import { getLogs, saveLogs } from "../utils/storage.js";

const today = new Date().toISOString().slice(0, 10);

export default function LogSession() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    date: today,
    location: "Campus Climbing Gym",
    climbingType: "Bouldering",
    routesCompleted: 6,
    difficultyLevel: "Beginner",
    notes: "",
    isProject: false,
  });

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.date || !form.location.trim() || Number(form.routesCompleted) <= 0) {
      setError("Please add a date, location, and at least one completed route.");
      return;
    }

    const log = {
      ...form,
      id: `log_${Date.now()}`,
      location: form.location.trim(),
      routesCompleted: Number(form.routesCompleted),
      createdAt: new Date().toISOString(),
    };
    const logs = [log, ...getLogs()];
    saveLogs(logs);
    syncLogBadges(logs);
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
          <input className="mt-2 w-full rounded-3xl border-0 bg-white px-5 py-4 shadow-soft outline-rock-green" type="date" name="date" value={form.date} onChange={updateField} />
        </label>

        <label className="block">
          <span className="text-sm font-bold">Location or gym</span>
          <input className="mt-2 w-full rounded-3xl border-0 bg-white px-5 py-4 shadow-soft outline-rock-green" name="location" value={form.location} onChange={updateField} />
        </label>

        <label className="block">
          <span className="text-sm font-bold">Climbing type</span>
          <select className="mt-2 w-full rounded-3xl border-0 bg-white px-5 py-4 shadow-soft outline-rock-green" name="climbingType" value={form.climbingType} onChange={updateField}>
            <option>Bouldering</option>
            <option>Top rope</option>
            <option>Lead climbing</option>
            <option>Mixed</option>
          </select>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-bold">Routes completed</span>
            <input className="mt-2 w-full rounded-3xl border-0 bg-white px-5 py-4 shadow-soft outline-rock-green" min="1" type="number" name="routesCompleted" value={form.routesCompleted} onChange={updateField} />
          </label>
          <label className="block">
            <span className="text-sm font-bold">Difficulty</span>
            <select className="mt-2 w-full rounded-3xl border-0 bg-white px-5 py-4 shadow-soft outline-rock-green" name="difficultyLevel" value={form.difficultyLevel} onChange={updateField}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>V4+</option>
              <option>V6+</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-bold">Log notes</span>
          <textarea className="mt-2 min-h-28 w-full resize-none rounded-3xl border-0 bg-white px-5 py-4 shadow-soft outline-rock-green" name="notes" value={form.notes} onChange={updateField} placeholder="What felt good? What route should you return to?" />
        </label>

        <label className="flex items-center justify-between rounded-3xl bg-white px-5 py-4 shadow-soft">
          <span>
            <span className="block font-black">Mark as project</span>
            <span className="text-sm text-zinc-600">Mark a route to revisit later.</span>
          </span>
          <input className="h-6 w-6 accent-rock-green" type="checkbox" name="isProject" checked={form.isProject} onChange={updateField} />
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
}
