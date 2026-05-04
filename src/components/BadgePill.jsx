export default function BadgePill({ children, tone = "mint" }) {
  const tones = {
    mint: "bg-rock-mint text-rock-moss",
    dark: "bg-rock-green text-white",
    soft: "bg-rock-mist text-rock-moss",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
