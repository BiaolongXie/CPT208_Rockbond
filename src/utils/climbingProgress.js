export function calculateClimbingProgress(logs) {
  const routeCount = logs.reduce((sum, log) => sum + Number(log.routesCompleted || 1), 0);
  const current = Math.min(12, Math.max(8, routeCount));
  const target = 12;
  const remaining = Math.max(0, target - current);

  return {
    title: "Reach Gold Rank",
    description: remaining > 0 ? `${remaining} more climbs to reach Gold rank.` : "Gold rank milestone reached. Keep the momentum going.",
    current,
    target,
    completed: current >= target,
    currentRank: "Silver Tier",
    nextRank: "Gold",
    season: "Season 4",
    label: `${current} / ${target} climbs`,
    remainingLabel: remaining > 0 ? `${remaining} more climbs to reach Gold rank!` : "Gold rank milestone reached!",
  };
}
