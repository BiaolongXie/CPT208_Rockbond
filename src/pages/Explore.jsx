import { useState } from "react";
import { CalendarDays, Check, Filter, MapPin, Plus, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import BadgePill from "../components/BadgePill.jsx";
import BottomNav from "../components/BottomNav.jsx";
import Header from "../components/Header.jsx";
import { sessionSeeds } from "../data/sessionData.js";
import { unlockBadge } from "../utils/badges.js";
import { getJoinedSessions, setPublicSessionJoined } from "../utils/sessionStore.js";

const tabs = ["All Spots", "Gyms", "Outdoor Crags"];
const spotFilters = [
  { id: "all", label: "All" },
  { id: "beginner", label: "Beginner Friendly" },
  { id: "bouldering", label: "Bouldering" },
  { id: "lead", label: "Lead Climbing" },
  { id: "outdoor", label: "Outdoor" },
  { id: "training", label: "Training" },
];

const climbingSpots = [
  {
    id: "spot_001",
    name: "The Summit Vault",
    type: "Gym",
    distance: "2.4 miles away",
    rating: 4.9,
    badge: "PEBBLE",
    tags: ["Bouldering", "Lead Climbing", "Yoga Studio", "Beginner Friendly"],
    markerClass: "left-[36%] top-[132px]",
    darkMarker: true,
    imageClass: "spot-summit-vault",
  },
  {
    id: "spot_002",
    name: "Peak Fitness",
    type: "Gym",
    distance: "1.8 miles away",
    rating: 4.8,
    badge: "TRAINING",
    tags: ["Training", "Auto Belay", "Beginner Friendly"],
    markerClass: "left-[24%] top-[214px]",
    imageClass: "spot-peak-fitness",
  },
  {
    id: "spot_003",
    name: "Stone Grove",
    type: "Outdoor Crag",
    distance: "6.2 miles away",
    rating: 4.7,
    badge: "CRAG",
    tags: ["Outdoor", "Bouldering", "V2-V7"],
    markerClass: "left-[66%] top-[214px]",
    imageClass: "spot-stone-grove",
  },
  {
    id: "spot_004",
    name: "Campus Climbing Gym",
    type: "Gym",
    distance: "0.9 miles away",
    rating: 4.6,
    badge: "LOCAL",
    tags: ["Top Rope", "Lead Climbing", "Beginner Friendly"],
    markerClass: "left-[70%] top-[142px]",
    imageClass: "spot-campus-gym",
  },
  {
    id: "spot_005",
    name: "Castle Rock",
    type: "Outdoor Crag",
    distance: "9.5 miles away",
    rating: 4.8,
    badge: "OUTDOOR",
    tags: ["Outdoor", "Sport Climbing", "Lead Climbing"],
    markerClass: "left-[48%] top-[288px]",
    imageClass: "spot-castle-rock",
  },
];

const publicSessions = sessionSeeds.filter((session) => session.privacy === "Public");

export default function Explore() {
  const [activeTab, setActiveTab] = useState("All Spots");
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [spotFilter, setSpotFilter] = useState("all");
  const [, setSessionJoinVersion] = useState(0);
  const joinedSessionIds = getJoinedSessions().map((session) => session.id);
  const filteredSpots = climbingSpots.filter((spot) => spotMatchesTab(spot, activeTab) && spotMatchesSearch(spot, query) && spotMatchesFilter(spot, spotFilter));
  const hasActiveFilter = spotFilter !== "all";

  function togglePublicSession(session) {
    const alreadyJoined = joinedSessionIds.includes(session.id);
    setPublicSessionJoined(session, !alreadyJoined);
    setSessionJoinVersion((value) => value + 1);
    if (!alreadyJoined) {
      unlockBadge("event_explorer", "Session Explorer");
    }
  }

  return (
    <>
      <Header avatar="A" />
      <div className="relative min-h-[calc(100vh-64px)] bg-rock-paper">
        <section className="relative h-[410px] overflow-hidden bg-rock-green">
          <div className="absolute inset-0 terrain-map" />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-green/5 via-transparent to-rock-paper/60" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rock-paper via-rock-paper/75 to-transparent" />

          <label className="absolute left-5 right-5 top-5 z-10 flex h-14 items-center gap-3 rounded-full bg-white/92 px-5 shadow-lift backdrop-blur">
            <Search aria-hidden className="text-rock-stone" size={22} strokeWidth={2.3} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent text-base outline-none placeholder:text-slate-400"
              placeholder="Find gyms, crags, or sessions..."
            />
            <button
              type="button"
              aria-label="Open explore filters"
              onClick={() => setFilterOpen((value) => !value)}
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${hasActiveFilter ? "bg-rock-green text-white" : "bg-rock-mint text-rock-green"}`}
            >
              <Filter aria-hidden size={20} strokeWidth={2.4} />
              {hasActiveFilter && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rock-mint ring-2 ring-white" />}
            </button>
          </label>

          {filterOpen && (
            <section className="absolute left-5 right-5 top-[88px] z-20 rounded-[26px] bg-white/94 p-4 shadow-lift backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-black text-rock-green">Spot filters</h2>
                <button type="button" onClick={() => setSpotFilter("all")} className="text-sm font-black text-rock-moss">
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {spotFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setSpotFilter(filter.id)}
                    className={`rounded-full px-4 py-2 text-sm font-black transition ${spotFilter === filter.id ? "bg-rock-green text-white shadow-lift" : "bg-rock-mist text-rock-moss"}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          {filteredSpots.slice(0, 5).map((spot) => (
            <MapMarker key={spot.id} label={spot.name} className={spot.markerClass} dark={spot.darkMarker} />
          ))}
        </section>

        <section className="relative -mt-16 space-y-8 rounded-t-[42px] bg-rock-paper px-5 pb-24 pt-9 shadow-[0_-18px_44px_rgba(6,23,13,0.12)]">
          <div className="grid grid-cols-3 gap-2 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`min-h-10 rounded-full px-3 text-sm font-bold transition ${
                  activeTab === tab ? "bg-rock-green text-white shadow-lift" : "bg-rock-mist text-zinc-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <section>
            <div className="mb-4">
              <h1 className="text-lg font-black text-rock-ink">{activeTab === "Outdoor Crags" ? "Outdoor Crags" : activeTab === "Gyms" ? "Top Rated Gyms" : "Nearby Climbing Spots"}</h1>
            </div>

            {filteredSpots.length > 0 ? (
              <div className="space-y-4">
                {filteredSpots.map((spot) => (
                  <SpotCard key={spot.id} spot={spot} />
                ))}
              </div>
            ) : (
              <section className="rounded-[30px] bg-white p-8 text-center shadow-soft">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rock-mist text-rock-moss">
                  <Search aria-hidden size={24} strokeWidth={2.4} />
                </div>
                <h2 className="mt-4 text-lg font-black text-rock-green">No spots found</h2>
                <p className="mt-2 text-sm leading-5 text-zinc-600">Try a different keyword or clear the filter.</p>
              </section>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-black text-rock-ink">Public Sessions</h2>
            {publicSessions.slice(0, 2).map((session, index) => {
              const saved = joinedSessionIds.includes(session.id);
              return (
                <Link key={session.id} to={`/session/${session.id}`} className="flex items-center gap-4 rounded-[28px] bg-white p-4 shadow-soft">
                  <div className={`event-thumb event-thumb-${index} flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-white`}>
                    <CalendarDays aria-hidden size={24} strokeWidth={2.4} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase text-rock-moss">
                      {[session.date, session.startTime].filter(Boolean).join(" - ")}
                    </p>
                    <h3 className="mt-1 text-base font-black leading-5">{session.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{session.location}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={saved ? `Leave ${session.title}` : `Join ${session.title}`}
                    onClick={(clickEvent) => {
                      clickEvent.preventDefault();
                      togglePublicSession(session);
                    }}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                      saved ? "border-rock-green bg-rock-green text-white" : "border-rock-stone/30 bg-white text-rock-moss"
                    }`}
                  >
                    {saved ? <Check aria-hidden size={21} strokeWidth={2.7} /> : <Plus aria-hidden size={22} strokeWidth={2.6} />}
                  </button>
                </Link>
              );
            })}
          </section>
        </section>

        <Link
          to="/create-session"
          className="fixed bottom-24 left-1/2 z-20 ml-[92px] flex h-14 -translate-x-1/2 items-center gap-2 rounded-full bg-rock-green px-6 font-black text-white shadow-lift"
        >
          <Plus aria-hidden size={22} strokeWidth={2.8} />
          Session
        </Link>
      </div>
      <BottomNav />
    </>
  );
}

function MapMarker({ label, className = "", dark = false }) {
  return (
    <div className={`absolute z-10 -translate-x-1/2 ${className}`}>
      <span className={`block max-w-[104px] truncate rounded-full px-3 py-1.5 text-[11px] font-bold shadow ${dark ? "bg-rock-green text-white" : "bg-white/90 text-rock-ink"}`}>
        {label}
      </span>
      <div className={`mx-auto mt-1 h-4 w-4 rounded-full border-2 border-white shadow ${dark ? "bg-rock-green" : "bg-rock-moss"}`} />
    </div>
  );
}

function SpotCard({ spot }) {
  return (
    <article className="overflow-hidden rounded-[30px] bg-white shadow-soft">
      <div className="relative h-40 bg-[#173021]">
        <div className={`absolute inset-0 ${spot.imageClass}`} />
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-black text-rock-ink shadow">
          <Star aria-hidden className="fill-rock-green text-rock-green" size={15} />
          {spot.rating}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-black">{spot.name}</h2>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-zinc-600">
              <MapPin aria-hidden size={16} />
              {spot.distance}
            </p>
          </div>
          <BadgePill tone={spot.type === "Outdoor Crag" ? "mint" : "soft"}>{spot.badge}</BadgePill>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {spot.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-rock-mist px-3 py-2 text-center text-xs font-semibold leading-4 text-zinc-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function spotMatchesTab(spot, tab) {
  if (tab === "Gyms") return spot.type === "Gym";
  if (tab === "Outdoor Crags") return spot.type === "Outdoor Crag";
  return true;
}

function spotMatchesSearch(spot, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return [spot.name, spot.type, spot.distance, spot.badge, spot.tags]
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

function spotMatchesFilter(spot, filter) {
  const values = [spot.name, spot.type, spot.badge, spot.tags]
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .join(" ")
    .toLowerCase();

  if (filter === "all") return true;
  if (filter === "beginner") return values.includes("beginner friendly");
  if (filter === "bouldering") return values.includes("bouldering");
  if (filter === "lead") return values.includes("lead climbing") || values.includes("top rope");
  if (filter === "outdoor") return spot.type === "Outdoor Crag" || values.includes("outdoor");
  if (filter === "training") return values.includes("training") || values.includes("yoga");
  return true;
}
