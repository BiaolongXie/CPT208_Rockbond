import { NavLink } from "react-router-dom";
import { Compass, Home, Plus, UserRound, UsersRound } from "lucide-react";

const items = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/community", label: "Community", Icon: UsersRound },
  { to: "/log-session", label: "Log", Icon: Plus, primary: true },
  { to: "/explore", label: "Explore", Icon: Compass },
  { to: "/profile", label: "Profile", Icon: UserRound },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2">
      <div className="bg-white/92 shadow-[0_-16px_36px_rgba(6,23,13,0.12)] backdrop-blur-xl">
        <div className="grid h-16 grid-cols-5 items-center border-t border-white/80 px-5">
        {items.map(({ Icon, ...item }) => (
          <NavLink key={item.to} to={item.to} aria-label={item.label} className="mx-auto flex h-16 w-16 items-center justify-center">
            {({ isActive }) => (
              <span
                className={`flex items-center justify-center rounded-full transition duration-200 ${
                  item.primary
                    ? "h-16 w-16 -translate-y-5 bg-rock-green text-white shadow-lift ring-4 ring-rock-mint/80"
                    : isActive
                      ? "h-12 w-12 bg-rock-stone text-white"
                      : "h-10 w-10 text-rock-stone hover:bg-rock-mist/70 hover:text-rock-green"
                }`}
              >
                <Icon aria-hidden strokeWidth={item.primary ? 2.8 : 2.2} size={item.primary ? 31 : isActive ? 26 : 23} />
              </span>
            )}
          </NavLink>
        ))}
        </div>
      </div>
    </nav>
  );
}
