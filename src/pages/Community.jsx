import { useState } from "react";
import {
  Check,
  Clock3,
  Filter,
  MessageSquare,
  Mountain,
  Plus,
  Search,
  UserPlus,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import BadgePill from "../components/BadgePill.jsx";
import Header from "../components/Header.jsx";
import Avatar from "../components/Avatar.jsx";
import { avatarImages } from "../data/avatarData.js";
import { circles } from "../data/circleData.js";
import { invitations } from "../data/mockData.js";
import {
  getCircleApplications,
  getCreatedCircles,
  getFriendRequests,
  getFriends,
  getJoinedChallenges,
  saveFriendRequests,
} from "../utils/storage.js";

const defaultActiveCircles = circles.filter((circle) => circle.section === "active");
const discoverCircles = circles.filter((circle) => circle.section === "discover" && circle.id !== "challenge_alpine");
const alpineCircle = circles.find((circle) => circle.id === "challenge_alpine");

const partnerFilters = [
  { id: "all", label: "All" },
  { id: "beginner", label: "Beginner Friendly" },
  { id: "bouldering", label: "Bouldering" },
  { id: "rope", label: "Lead / Top Rope" },
  { id: "outdoor", label: "Outdoor" },
  { id: "friends", label: "Friends" },
  { id: "pending", label: "Pending" },
];

const circleFilters = [
  { id: "all", label: "All" },
  { id: "beginner", label: "Beginner Friendly" },
  { id: "recruiting", label: "Recruiting Now" },
  { id: "outdoor", label: "Outdoor" },
  { id: "joined", label: "Joined" },
  { id: "full", label: "Full" },
  { id: "active", label: "Active Groups" },
  { id: "discover", label: "Discover" },
];

export default function Community() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab") === "circles" ? "circles" : "partners");
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [circleFilter, setCircleFilter] = useState("all");
  const [joinedChallenges] = useState(getJoinedChallenges().filter((item) => item.id !== alpineCircle.id));
  const [circleApplications] = useState(getCircleApplications());
  const [friendRequests, setFriendRequests] = useState(getFriendRequests());
  const [activeRequestId, setActiveRequestId] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const friends = getFriends();
  const createdCircles = getCreatedCircles();
  const activeCircles = [...createdCircles.map(normalizeCreatedCircle), ...defaultActiveCircles];
  const currentFilters = tab === "partners" ? partnerFilters : circleFilters;
  const activeFilter = tab === "partners" ? partnerFilter : circleFilter;
  const hasActiveFilter = activeFilter !== "all";
  const hasSearch = query.trim().length > 0;

  const filteredPartners = invitations.filter((invite) =>
    partnerMatchesSearch(invite, query) && partnerMatchesFilter(invite, partnerFilter, friends, friendRequests)
  );

  const filteredActiveCircles = activeCircles.filter((circle) =>
    circleMatchesSearch(circle, query) && circleMatchesFilter(circle, circleFilter, joinedChallenges, "active")
  );
  const showAlpineCircle = circleMatchesSearch(alpineCircle, query) && circleMatchesFilter(alpineCircle, circleFilter, joinedChallenges, "discover");
  const filteredDiscoverCircles = discoverCircles.filter((circle) =>
    circleMatchesSearch(circle, query) && circleMatchesFilter(circle, circleFilter, joinedChallenges, "discover")
  );

  function openFriendRequest(invite) {
    const isFriend = friends.some((friend) => friend.id === invite.id);
    const hasPending = friendRequests.some((request) => request.toFriendId === invite.id && request.status === "pending");
    if (isFriend) {
      navigate(`/chat/${invite.id}`);
      return;
    }
    if (hasPending) return;

    setActiveRequestId(invite.id);
    setRequestMessage(`Hey ${invite.climberName.split(" ")[0]}, want to connect for a climb sometime?`);
  }

  function closeFriendRequest() {
    setActiveRequestId("");
    setRequestMessage("");
  }

  function sendFriendRequest(invite) {
    const isFriend = friends.some((friend) => friend.id === invite.id);
    const hasPending = friendRequests.some((request) => request.toFriendId === invite.id && request.status === "pending");
    if (isFriend) {
      navigate(`/chat/${invite.id}`);
      return;
    }
    if (hasPending || !requestMessage.trim()) return;

    const updated = [
      {
        id: `request_${Date.now()}`,
        fromName: "Alex Chen",
        toFriendId: invite.id,
        toName: invite.climberName,
        message: requestMessage.trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      ...friendRequests,
    ];
    setFriendRequests(updated);
    saveFriendRequests(updated);
    closeFriendRequest();
  }

  function openCircleApply(circle) {
    if (isCircleJoined(circle, joinedChallenges)) return;
    navigate(`/circle/${circle.id}/apply`);
  }

  function openCircleChat(circle) {
    navigate(`/circle/${circle.id}/chat`);
  }

  function selectTab(nextTab) {
    setTab(nextTab);
    setFilterOpen(false);
  }

  function selectFilter(filterId) {
    if (tab === "partners") {
      setPartnerFilter(filterId);
    } else {
      setCircleFilter(filterId);
    }
  }

  function clearFilter() {
    selectFilter("all");
  }

  return (
    <>
      <Header avatar="A" />
      <div className="space-y-6 px-5 py-6">
        <section>
          <h1 className="text-3xl font-black">Community</h1>
          <p className="mt-2 text-base text-zinc-600">Connect with fellow senders and local crews.</p>
        </section>

        <div className="space-y-3">
          <label className="flex h-14 items-center gap-3 rounded-full bg-white px-5 shadow-soft">
            <Search aria-hidden className="text-rock-stone" size={22} strokeWidth={2.3} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full border-0 bg-transparent text-base outline-none"
              placeholder="Find partners and circles"
            />
            <button
              type="button"
              aria-label="Open community filters"
              onClick={() => setFilterOpen((value) => !value)}
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                hasActiveFilter ? "bg-rock-green text-white" : "bg-rock-mint text-rock-green"
              }`}
            >
              <Filter aria-hidden size={20} strokeWidth={2.4} />
              {hasActiveFilter && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rock-mint ring-2 ring-white" />}
            </button>
          </label>

          {filterOpen && (
            <section className="rounded-[28px] bg-white p-4 shadow-soft">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-black text-rock-green">{tab === "partners" ? "Partner filters" : "Circle filters"}</h2>
                <button type="button" onClick={clearFilter} className="text-sm font-black text-rock-moss">
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => selectFilter(filter.id)}
                    className={`rounded-full px-4 py-2 text-sm font-black transition ${
                      activeFilter === filter.id ? "bg-rock-green text-white shadow-lift" : "bg-rock-mist text-rock-moss"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="grid grid-cols-2 rounded-full bg-rock-mist p-1">
          <button type="button" onClick={() => selectTab("partners")} className={`rounded-full py-3 font-bold ${tab === "partners" ? "bg-white shadow" : "text-zinc-600"}`}>
            Partners
          </button>
          <button type="button" onClick={() => selectTab("circles")} className={`rounded-full py-3 font-bold ${tab === "circles" ? "bg-white shadow" : "text-zinc-600"}`}>
            Circles
          </button>
        </div>

        {tab === "partners" ? (
          <PartnersList
            partners={filteredPartners}
            friends={friends}
            friendRequests={friendRequests}
            activeRequestId={activeRequestId}
            requestMessage={requestMessage}
            onAction={openFriendRequest}
            onMessageChange={setRequestMessage}
            onCancelRequest={closeFriendRequest}
            onSendRequest={sendFriendRequest}
            hasSearch={hasSearch}
            hasFilter={hasActiveFilter}
          />
        ) : (
          <CirclesView
            activeCircles={filteredActiveCircles}
            showAlpineCircle={showAlpineCircle}
            discoverCircles={filteredDiscoverCircles}
            joinedChallenges={joinedChallenges}
            circleApplications={circleApplications}
            onApply={openCircleApply}
            onChat={openCircleChat}
          />
        )}
      </div>
      <BottomNav />
    </>
  );
}

function PartnersList({
  partners,
  friends,
  friendRequests,
  activeRequestId,
  requestMessage,
  onAction,
  onMessageChange,
  onCancelRequest,
  onSendRequest,
  hasSearch,
  hasFilter,
}) {
  if (partners.length === 0) {
    return <EmptyState title="No partners found" detail={hasSearch || hasFilter ? "Try a different keyword or clear the filter." : "New partners will appear here soon."} />;
  }

  return (
    <section className="space-y-4 pb-24">
      {partners.map((invite) => {
        const isFriend = friends.some((friend) => friend.id === invite.id);
        const hasPending = friendRequests.some((request) => request.toFriendId === invite.id && request.status === "pending");
        const isEditing = activeRequestId === invite.id && !isFriend && !hasPending;

        return (
          <article key={invite.id} className="rounded-[32px] bg-white p-5 shadow-soft">
            <div className="flex items-center gap-4">
              <Link to={`/friend/${invite.id}`} className="shrink-0" aria-label={`Open ${invite.climberName} profile`}>
                <Avatar
                  src={invite.avatarImage}
                  alt={invite.climberName}
                  fallback={invite.climberName.slice(0, 1)}
                  className="h-16 w-16 text-xl"
                />
              </Link>
              <Link to={`/friend/${invite.id}`} className="min-w-0 flex-1">
                <h2 className="truncate text-xl font-black">{invite.climberName}</h2>
                <div className="mt-1 flex flex-wrap gap-1">
                  {invite.tags.map((tag) => (
                    <BadgePill key={tag}>{tag}</BadgePill>
                  ))}
                </div>
              </Link>
              <button
                type="button"
                aria-label={isFriend ? `Message ${invite.climberName}` : hasPending ? `${invite.climberName} request pending` : `Add ${invite.climberName}`}
                onClick={() => onAction(invite)}
                disabled={hasPending}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition ${
                  isFriend ? "bg-rock-green text-white" : hasPending ? "bg-rock-mist text-rock-stone" : "bg-rock-mist text-rock-moss hover:bg-rock-mint"
                }`}
              >
                {isFriend ? <MessageSquare aria-hidden size={23} strokeWidth={2.4} /> : hasPending ? <Clock3 aria-hidden size={22} strokeWidth={2.4} /> : <UserPlus aria-hidden size={23} strokeWidth={2.4} />}
              </button>
            </div>

            {isEditing && (
              <div className="mt-5 rounded-[24px] bg-rock-mist/70 p-4">
                <label className="text-sm font-black text-rock-green" htmlFor={`friend-request-${invite.id}`}>
                  Friend request message
                </label>
                <textarea
                  id={`friend-request-${invite.id}`}
                  value={requestMessage}
                  onChange={(event) => onMessageChange(event.target.value)}
                  className="mt-3 min-h-24 w-full resize-none rounded-2xl bg-white p-4 text-sm leading-5 outline-rock-green"
                  placeholder="Write a short intro..."
                />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={onCancelRequest}
                    className="h-11 rounded-full bg-white font-black text-rock-moss"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => onSendRequest(invite)}
                    disabled={!requestMessage.trim()}
                    className="h-11 rounded-full bg-rock-green font-black text-white disabled:opacity-50"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}

function CirclesView({ activeCircles, showAlpineCircle, discoverCircles, joinedChallenges, circleApplications, onApply, onChat }) {
  const hasAnyCircle = activeCircles.length > 0 || showAlpineCircle || discoverCircles.length > 0;

  if (!hasAnyCircle) {
    return <EmptyState title="No circles found" detail="Try a different keyword or clear the filter." />;
  }

  return (
    <section className="space-y-8 pb-28">
      {activeCircles.length > 0 && (
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-medium">My Active Groups</h2>
          <BadgePill>{activeCircles.length} Groups</BadgePill>
        </div>
        <div className="space-y-4">
          {activeCircles.map((circle) => (
            <ActiveCircleCard
              key={circle.id}
              circle={circle}
              joined={isCircleJoined(circle, joinedChallenges)}
              onChat={onChat}
            />
          ))}
        </div>
      </div>
      )}

      {(showAlpineCircle || discoverCircles.length > 0) && (
      <section>
        <h2 className="mb-4 text-lg font-medium">Discover New Circles</h2>
        {showAlpineCircle && (
        <article className="circle-hero relative h-[219px] overflow-hidden rounded-[28px] p-6 shadow-soft">
          <div className="flex flex-wrap gap-2">
            {alpineCircle.tags.map((tag) => (
              <BadgePill key={tag} tone={tag === "Recruiting Now" ? "dark" : "soft"}>{tag}</BadgePill>
            ))}
          </div>
          <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between rounded-[28px] bg-white/55 p-4 shadow backdrop-blur">
            <Link to={`/circle/${alpineCircle.id}`} className="min-w-0">
              <h3 className="text-lg font-medium text-rock-ink">{alpineCircle.title}</h3>
              <p className="mt-2 text-base text-zinc-700">{alpineCircle.members}</p>
            </Link>
            <div className="text-center text-zinc-700">
              <p>Chamonix,</p>
              <p>FR</p>
            </div>
            <button
              type="button"
              onClick={() => onApply(alpineCircle)}
              disabled={hasPendingCircleApplication(circleApplications, alpineCircle.id)}
              className="rounded-full bg-white px-5 py-3 text-xl font-medium text-rock-green shadow disabled:opacity-75"
            >
              {getCircleActionLabel(alpineCircle, joinedChallenges, circleApplications)}
            </button>
          </div>
        </article>
        )}

        {discoverCircles.length > 0 && (
        <div className="mt-4 space-y-4">
          {discoverCircles.map((circle, index) => {
            const joined = isCircleJoined(circle, joinedChallenges);
            return (
              <article key={circle.id} className="flex items-center gap-4 rounded-[28px] bg-white p-4 shadow-soft">
                <Link to={`/circle/${circle.id}`} className={`circle-thumb circle-thumb-${index} h-16 w-16 shrink-0 rounded-full`} aria-label={`Open ${circle.title} details`} />
                <Link to={`/circle/${circle.id}`} className="min-w-0 flex-1">
                  <h3 className="text-base font-medium leading-5">{circle.title}</h3>
                  <p className="mt-1 text-base text-zinc-600">
                    {circle.members} <span className="text-rock-stone">-</span>{" "}
                    <span className={circle.status === "Full" ? "text-red-500" : "text-rock-moss"}>{circle.status}</span>
                  </p>
                  {circle.tags && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {circle.tags.map((tag) => (
                        <BadgePill key={tag} tone={tag === "Beginner Friendly" ? "mint" : "soft"}>{tag}</BadgePill>
                      ))}
                    </div>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={() => onApply(circle)}
                  disabled={joined || hasPendingCircleApplication(circleApplications, circle.id)}
                  aria-label={joined ? `${circle.title} joined` : hasPendingCircleApplication(circleApplications, circle.id) ? `${circle.title} application pending` : `Apply to ${circle.title}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rock-stone/30 text-rock-moss disabled:bg-rock-green disabled:text-white"
                >
                  {joined ? <Check aria-hidden size={20} strokeWidth={2.7} /> : hasPendingCircleApplication(circleApplications, circle.id) ? <Clock3 aria-hidden size={20} strokeWidth={2.5} /> : <Plus aria-hidden size={22} strokeWidth={2.5} />}
                </button>
              </article>
            );
          })}
        </div>
        )}
      </section>
      )}

      <section className="flex items-center justify-between rounded-[30px] border-2 border-dashed border-rock-mint bg-rock-mint/20 p-6">
        <div>
          <h2 className="text-base font-medium text-rock-green">Don't see your tribe?</h2>
          <p className="mt-1 max-w-[220px] text-sm leading-4 text-rock-moss">Start your own circle and invite fellow climbers.</p>
        </div>
        <Link to="/create-circle" className="flex h-12 w-12 items-center justify-center rounded-full bg-rock-green text-white shadow-lift" aria-label="Create a circle">
          <Plus aria-hidden size={24} strokeWidth={2.6} />
        </Link>
      </section>
    </section>
  );
}

function EmptyState({ title, detail }) {
  return (
    <section className="rounded-[30px] bg-white p-8 text-center shadow-soft">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rock-mist text-rock-moss">
        <Search aria-hidden size={24} strokeWidth={2.4} />
      </div>
      <h2 className="mt-4 text-lg font-black text-rock-green">{title}</h2>
      <p className="mt-2 text-sm leading-5 text-zinc-600">{detail}</p>
    </section>
  );
}

function ActiveCircleCard({ circle, joined, onChat }) {
  const Icon = circle.Icon;
  return (
    <article className="rounded-[32px] bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between">
        <Link to={`/circle/${circle.id}`} className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rock-mint text-rock-green">
            <Icon aria-hidden size={25} strokeWidth={2.4} />
          </div>
          <div>
            <h3 className="text-lg font-medium">{circle.title}</h3>
            <p className="text-sm text-zinc-600">{circle.members}</p>
          </div>
        </Link>
        <button type="button" onClick={() => onChat(circle)} aria-label={`Open ${circle.title} chat`} className="text-rock-green">
          <MessageSquare aria-hidden size={23} strokeWidth={2.3} />
        </button>
      </div>
      {circle.description && <p className="mt-6 text-sm leading-5 text-zinc-600">{circle.description}</p>}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {circle.title === "Peak Seekers" && <AvatarStack />}
        {circle.tags.map((tag) => (
          <BadgePill key={tag} tone={tag === "Recruiting Now" ? "mint" : "soft"}>{tag}</BadgePill>
        ))}
        {joined && <BadgePill tone="dark">Joined</BadgePill>}
      </div>
    </article>
  );
}

function normalizeCreatedCircle(circle) {
  return {
    ...circle,
    section: "active",
    Icon: Mountain,
    members: circle.members || "1 member",
    activeMembers: circle.activeMembers || "1 active member",
    tags: circle.tags || [circle.status || "Recruiting Now", "Beginner Friendly"],
  };
}

function AvatarStack() {
  const avatars = [
    { name: "Alex", src: avatarImages.alexChen },
    { name: "Marcus", src: avatarImages.marcusRivera },
    { name: "Jordan", src: avatarImages.jordanChen },
  ];

  return (
    <div className="mr-2 flex -space-x-2">
      {avatars.map((avatar) => (
        <Avatar
          key={avatar.name}
          src={avatar.src}
          alt={avatar.name}
          fallback={avatar.name.slice(0, 1)}
          className="h-6 w-6 text-[10px] ring-2 ring-white"
        />
      ))}
      <span className="flex h-6 w-7 items-center justify-center rounded-full bg-rock-mint text-[10px] font-black text-rock-green ring-2 ring-white">+25</span>
    </div>
  );
}

function textIncludes(values, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return values
    .filter(Boolean)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

function partnerMatchesSearch(invite, query) {
  return textIncludes(
    [invite.climberName, invite.location, invite.skillLevel, invite.goal, invite.tags],
    query
  );
}

function partnerMatchesFilter(invite, filter, friends, friendRequests) {
  const values = [invite.climberName, invite.location, invite.skillLevel, invite.goal, invite.tags]
    .filter(Boolean)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .join(" ")
    .toLowerCase();
  const isFriend = friends.some((friend) => friend.id === invite.id);
  const hasPending = friendRequests.some((request) => request.toFriendId === invite.id && request.status === "pending");

  if (filter === "all") return true;
  if (filter === "beginner") return values.includes("beginner");
  if (filter === "bouldering") return values.includes("boulder");
  if (filter === "rope") return values.includes("lead") || values.includes("top rope");
  if (filter === "outdoor") return values.includes("outdoor") || values.includes("trad") || values.includes("multi-pitch");
  if (filter === "friends") return isFriend;
  if (filter === "pending") return hasPending;
  return true;
}

function circleMatchesSearch(circle, query) {
  return textIncludes(
    [circle.title, circle.members, circle.description, circle.status, circle.location, circle.tags],
    query
  );
}

function circleMatchesFilter(circle, filter, joinedChallenges, section) {
  const values = [circle.title, circle.members, circle.description, circle.status, circle.location, circle.tags]
    .filter(Boolean)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .join(" ")
    .toLowerCase();
  const joined = isCircleJoined(circle, joinedChallenges);

  if (filter === "all") return true;
  if (filter === "beginner") return values.includes("beginner friendly");
  if (filter === "recruiting") return values.includes("recruiting now");
  if (filter === "outdoor") return values.includes("outdoor") || values.includes("alpine") || values.includes("chamonix");
  if (filter === "joined") return joined;
  if (filter === "full") return values.includes("full");
  if (filter === "active") return section === "active";
  if (filter === "discover") return section === "discover";
  return true;
}

function hasPendingCircleApplication(applications, circleId) {
  return applications.some((item) => item.circleId === circleId && item.status === "pending");
}

function getCircleActionLabel(circle, joinedChallenges, applications) {
  if (circle.id !== "challenge_alpine" && isCircleJoined(circle, joinedChallenges)) return "Joined";
  if (hasPendingCircleApplication(applications, circle.id)) return "Pending";
  return "Join";
}

function isCircleJoined(circle, joinedChallenges) {
  return circle.section === "active" || joinedChallenges.some((item) => item.id === circle.id);
}
