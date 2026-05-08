import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import Avatar from "./Avatar.jsx";
import { avatarImages } from "../data/avatarData.js";
import { hasUnreadNotifications } from "../utils/notificationStatus.js";

export default function Header({ avatar = "A", avatarImage = avatarImages.alexChen }) {
  const hasUnread = hasUnreadNotifications();

  return (
    <header className="flex h-16 items-center justify-between border-b border-rock-mist bg-rock-paper px-5">
      <Link to="/home" className="flex items-center gap-3">
        <Avatar
          src={avatarImage}
          alt="Alex Chen"
          fallback={avatar}
          className="h-10 w-10 text-sm ring-2 ring-white"
        />
        <span className="text-lg font-black tracking-normal text-rock-green">RockBond</span>
      </Link>
      <Link
        to="/notifications"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-rock-green transition hover:bg-rock-mist"
      >
        <Bell aria-hidden size={22} strokeWidth={2.3} />
        {hasUnread && <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-rock-paper" />}
      </Link>
    </header>
  );
}
