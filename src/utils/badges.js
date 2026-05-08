import { getBadges, saveBadges } from "./storage.js";
import { notifyBadgeUnlocked } from "./userNotifications.js";

export function unlockBadge(id, title) {
  const current = getBadges();
  if (current.some((badge) => badge.id === id)) {
    return current;
  }

  const badge = {
    id,
    title,
    unlockedAt: new Date().toISOString(),
  };
  const updated = [
    ...current,
    badge,
  ];
  saveBadges(updated);
  notifyBadgeUnlocked(badge);
  return updated;
}

export function syncLogBadges(logs) {
  if (logs.length > 0) {
    unlockBadge("first_log", "First Log Recorded");
  }
  if (logs.some((log) => log.isProject || log.notes?.trim())) {
    unlockBadge("project_saver", "Project Saver");
  }
}
