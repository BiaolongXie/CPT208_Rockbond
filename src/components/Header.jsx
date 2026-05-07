import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import Avatar from "./Avatar.jsx";
import { avatarImages } from "../data/avatarData.js";

export default function Header({ avatar = "A", avatarImage = avatarImages.alexChen }) {
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
        className="flex h-10 w-10 items-center justify-center rounded-full text-rock-green transition hover:bg-rock-mist"
      >
        <Bell aria-hidden size={22} strokeWidth={2.3} />
      </Link>
    </header>
  );
}
