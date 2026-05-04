export default function ProgressBar({ value, max }) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="h-4 w-full rounded-full bg-rock-mist" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className="h-full rounded-full bg-rock-green transition-all" style={{ width: `${percent}%` }} />
    </div>
  );
}
