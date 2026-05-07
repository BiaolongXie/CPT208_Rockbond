import { calculateRankProgression } from "./rankProgression.js";

export function calculateClimbingProgress(logs) {
  const rankProgress = calculateRankProgression(logs);
  const current = rankProgress.xpIntoRank;
  const target = rankProgress.rankSpan;
  const remaining = rankProgress.xpToNextRank;

  return {
    title: `Reach ${rankProgress.nextRank} Rank`,
    description: remaining > 0 ? `${remaining} XP more to reach ${rankProgress.nextRank} rank.` : `${rankProgress.currentRank} rank milestone reached. Keep the momentum going.`,
    current,
    target,
    completed: remaining === 0,
    currentRank: rankProgress.rankLabel,
    nextRank: rankProgress.nextRank,
    season: `Season ${rankProgress.seasonId}`,
    label: `${current} / ${target} XP`,
    remainingLabel: remaining > 0 ? `${remaining} XP more to reach ${rankProgress.nextRank} rank!` : `${rankProgress.currentRank} rank milestone reached!`,
    progressPercent: rankProgress.progressPercent,
    totalXP: rankProgress.totalXP,
    rankProgress,
  };
}
