import { getUserNotifications, saveUserNotifications } from "./storage.js";

export function addUserNotification(notification) {
  const current = getUserNotifications();
  if (current.some((item) => item.id === notification.id)) {
    return current;
  }

  const next = [
    {
      category: "system",
      time: "Just now",
      createdAt: new Date().toISOString(),
      ...notification,
    },
    ...current,
  ];
  saveUserNotifications(next);
  return next;
}

export function notifyBadgeUnlocked(badge) {
  return addUserNotification({
    id: `badge_${badge.id}`,
    type: "badge_unlocked",
    title: "Badge Unlocked!",
    action: badge.title,
    body: `You unlocked the ${badge.title} badge.`,
  });
}

export function notifyRankUp(celebration) {
  return addUserNotification({
    id: `rank_${celebration.id}`,
    type: "rank_up",
    title: "Rank Up!",
    action: `${celebration.fromRank} to ${celebration.toRank}`,
    body: `You reached ${celebration.toRank} Tier with ${celebration.totalXP} XP.`,
  });
}
