export const rankThresholds = [
  { name: "Bronze", threshold: 0 },
  { name: "Silver", threshold: 6 },
  { name: "Gold", threshold: 18 },
  { name: "Platinum", threshold: 42 },
  { name: "Diamond", threshold: 90 },
  { name: "Master", threshold: 186 },
  { name: "Legend", threshold: 294 },
];

export function getCurrentSeasonId(date = new Date()) {
  return String(date.getFullYear());
}

export function getSeasonBounds(seasonId = getCurrentSeasonId()) {
  const year = Number(seasonId);
  return {
    startsAt: `${year}-01-01`,
    endsAt: `${year}-12-31`,
  };
}

export function getLogSeasonId(log) {
  const rawDate = log?.date || log?.createdAt;
  const date = rawDate ? new Date(rawDate) : new Date();
  if (Number.isNaN(date.getTime())) return getCurrentSeasonId();
  return getCurrentSeasonId(date);
}

export function filterLogsBySeason(logs = [], seasonId = getCurrentSeasonId()) {
  return logs.filter((log) => getLogSeasonId(log) === String(seasonId));
}

export function getGradeXP(difficultyLevel) {
  const match = /^V(\d+)$/i.exec(String(difficultyLevel || "").trim());
  if (!match) return 1;
  return Number(match[1]) + 1;
}

export function getLogXP(log) {
  const routeCount = Math.max(1, Number(log?.routesCompleted || 1));
  return getGradeXP(log?.difficultyLevel || log?.grade) * routeCount;
}

export function calculateRankProgression(logs = [], seasonId = getCurrentSeasonId()) {
  const seasonLogs = filterLogsBySeason(logs, seasonId);
  const totalXP = seasonLogs.reduce((sum, log) => sum + getLogXP(log), 0);
  const currentIndex = rankThresholds.reduce((bestIndex, rank, index) => (totalXP >= rank.threshold ? index : bestIndex), 0);
  const current = rankThresholds[currentIndex];
  const next = rankThresholds[currentIndex + 1] || null;
  const currentThreshold = current.threshold;
  const nextThreshold = next?.threshold ?? current.threshold;
  const xpIntoRank = totalXP - currentThreshold;
  const xpToNextRank = next ? Math.max(0, nextThreshold - totalXP) : 0;
  const rankSpan = next ? nextThreshold - currentThreshold : Math.max(1, totalXP - currentThreshold || 1);
  const progressPercent = next ? Math.min(100, Math.round((xpIntoRank / rankSpan) * 100)) : 100;

  return {
    totalXP,
    seasonId: String(seasonId),
    seasonLogs,
    currentRank: current.name,
    nextRank: next?.name || "Apex",
    currentIndex,
    currentThreshold,
    nextThreshold,
    xpIntoRank,
    xpToNextRank,
    rankSpan,
    progressPercent,
    rankLabel: `${current.name} Tier`,
    recentActivities: buildRecentActivities(seasonLogs),
  };
}

function buildRecentActivities(logs) {
  return logs.slice(0, 4).map((log) => ({
    id: `log_${log.id}`,
    title: `${log.location || "Climbing Log"} - ${log.difficultyLevel || "V0"}`,
    meta: `${log.date || "Recently"} - ${log.climbingType || "Climbing"}`,
    xp: getLogXP(log),
  }));
}
