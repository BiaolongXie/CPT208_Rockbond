import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Award, Cloud, MessageSquare, MoreVertical, Mountain, Trophy, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar.jsx";
import BadgePill from "../components/BadgePill.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { getAvatarImageByName } from "../data/avatarData.js";
import { buildFriendProfile, notifications, seedChatMessages } from "../data/mockData.js";
import {
  getChats,
  getFriendRequests,
  getFriends,
  getUserNotifications,
  saveChats,
  saveFriendRequests,
  saveFriends,
} from "../utils/storage.js";
import { markNotificationsRead } from "../utils/notificationStatus.js";

const tabs = [
  { id: "all", label: "All" },
  { id: "partners", label: "Partners" },
  { id: "circles", label: "Circles" },
  { id: "system", label: "System" },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [following, setFollowing] = useState(false);
  const [friendRequests, setFriendRequests] = useState(getFriendRequests());
  const [userNotifications] = useState(getUserNotifications());

  useEffect(() => {
    markNotificationsRead();
  }, []);

  const requestNotifications = friendRequests
    .filter((request) => request.status === "pending")
    .map((request) => ({
      id: request.id,
      category: "partners",
      type: "friend_request",
      title: request.fromName,
      action: `wants to add ${request.toName}`,
      body: request.message,
      time: "Just now",
      avatar: request.fromName.slice(0, 1),
      avatarImage: getAvatarImageByName(request.fromName),
      request,
    }));

  const visibleNotifications = useMemo(() => {
    const allNotifications = [...requestNotifications, ...userNotifications, ...notifications];
    return allNotifications.filter((item) => activeTab === "all" || item.category === activeTab);
  }, [activeTab, friendRequests, userNotifications]);

  function acceptRequest(request) {
    const updatedRequests = friendRequests.map((item) =>
      item.id === request.id ? { ...item, status: "accepted", acceptedAt: new Date().toISOString() } : item
    );
    setFriendRequests(updatedRequests);
    saveFriendRequests(updatedRequests);

    const friend = buildFriendProfile(request.toFriendId);
    const friends = getFriends();
    if (!friends.some((item) => item.id === friend.id)) {
      saveFriends([...friends, { id: friend.id, name: friend.name, addedAt: new Date().toISOString() }]);
    }

    const chats = getChats();
    if (!chats[friend.id]) {
      saveChats({ ...chats, [friend.id]: seedChatMessages(friend) });
    }
  }

  function rejectRequest(request) {
    const updatedRequests = friendRequests.map((item) =>
      item.id === request.id ? { ...item, status: "rejected", rejectedAt: new Date().toISOString() } : item
    );
    setFriendRequests(updatedRequests);
    saveFriendRequests(updatedRequests);
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-rock-paper px-5 shadow-sm">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green transition hover:bg-rock-mist"
        >
          <ArrowLeft aria-hidden size={24} strokeWidth={2.4} />
        </button>
        <h1 className="mr-auto pl-2 text-xl font-black text-rock-green">Notifications</h1>
        <button
          type="button"
          aria-label="More notification actions"
          className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green transition hover:bg-rock-mist"
        >
          <MoreVertical aria-hidden size={22} strokeWidth={2.5} />
        </button>
      </header>

      <main className="min-h-[calc(100vh-64px)] bg-rock-paper px-5 pb-32 pt-8">
        <div className="mb-8 flex gap-3 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${
                activeTab === tab.id ? "bg-rock-green text-white shadow-lift" : "bg-rock-mint text-rock-moss"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <section className="space-y-5">
          {visibleNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              following={following}
              onFollow={() => setFollowing(true)}
              onAccept={acceptRequest}
              onReject={rejectRequest}
            />
          ))}
        </section>

        <section className="mt-16 flex flex-col items-center text-center text-rock-stone">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-rock-stone shadow-soft">
            <Cloud aria-hidden size={31} strokeWidth={2.2} />
          </div>
          <p className="mt-6 text-base">You're all caught up for today</p>
        </section>
      </main>

      <BottomNav />
    </>
  );
}

function NotificationCard({ notification, following, onFollow, onAccept, onReject }) {
  const isAchievement = notification.type === "achievement";

  return (
    <article
      className={`rounded-[30px] p-5 shadow-soft ${
        isAchievement ? "border border-rock-mint bg-rock-mist/80" : "bg-white"
      }`}
    >
      <div className="flex items-start gap-4">
        <NotificationIcon notification={notification} />

        <div className="min-w-0 flex-1">
          {isAchievement ? (
            <>
              <h2 className="text-xl font-black text-rock-green">{notification.title}</h2>
              <p className="mt-1 text-base leading-6 text-rock-ink">
                You've earned the <span className="font-black">Peak Master</span> badge!
              </p>
            </>
          ) : (
            <>
              <p className="text-base leading-6 text-rock-ink">
                <span className="font-black">{notification.title}</span>
                {notification.action ? ` ${notification.action}` : ""}
              </p>
              {notification.body && (
                <p className="mt-1 text-sm italic leading-5 text-zinc-600">"{notification.body}"</p>
              )}
              {notification.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {notification.tags.map((tag) => (
                    <BadgePill key={tag} tone="soft">
                      {tag}
                    </BadgePill>
                  ))}
                </div>
              )}
              {notification.type === "follow" && (
                <button
                  type="button"
                  onClick={onFollow}
                  className="mt-2 rounded-full bg-rock-green px-5 py-2 text-sm font-black text-white"
                >
                  {following ? "Following" : "Follow Back"}
                </button>
              )}
              {notification.type === "friend_request" && (
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => onAccept(notification.request)}
                    className="rounded-full bg-rock-green px-5 py-2 text-sm font-black text-white"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => onReject(notification.request)}
                    className="rounded-full bg-rock-mist px-5 py-2 text-sm font-black text-rock-moss"
                  >
                    Reject
                  </button>
                </div>
              )}
            </>
          )}
          <p className="mt-2 text-sm text-zinc-600">{notification.time}</p>
        </div>
      </div>
    </article>
  );
}

function NotificationIcon({ notification }) {
  if (notification.avatar) {
    return (
      <div className="relative h-14 w-14 shrink-0">
        <Avatar
          src={notification.avatarImage}
          alt={notification.title}
          fallback={notification.avatar}
          className="h-14 w-14 text-lg"
        />
        {notification.type === "message" && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-rock-moss shadow">
            <MessageSquare aria-hidden size={13} strokeWidth={2.5} />
          </span>
        )}
        {notification.type === "follow" && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rock-mint text-rock-green shadow">
            <UserPlus aria-hidden size={13} strokeWidth={2.5} />
          </span>
        )}
      </div>
    );
  }

  if (notification.type === "achievement") {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rock-green text-white">
        <Trophy aria-hidden size={25} strokeWidth={2.4} />
      </div>
    );
  }

  if (notification.type === "badge_unlocked") {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
        <Award aria-hidden size={25} strokeWidth={2.4} />
      </div>
    );
  }

  if (notification.type === "rank_up") {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rock-green text-white">
        <Trophy aria-hidden size={25} strokeWidth={2.4} />
      </div>
    );
  }

  if (notification.icon === "mountain") {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rock-mint text-rock-green">
        <Mountain aria-hidden size={25} strokeWidth={2.4} />
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rock-mist text-rock-moss">
      <MessageSquare aria-hidden size={24} strokeWidth={2.3} />
    </div>
  );
}
