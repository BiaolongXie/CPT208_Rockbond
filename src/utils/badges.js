import { getBadges, saveBadges } from "./storage.js";

export function unlockBadge(id, title) {
  const current = getBadges();
  if (current.some((badge) => badge.id === id)) {
    return current;
  }

  const updated = [
    ...current,
    {
      id,
      title,
      unlockedAt: new Date().toISOString(),
    },
  ];
  saveBadges(updated);
  return updated;
}

export function syncLogBadges(logs) {
  if (logs.length > 0) {
    unlockBadge("first_log", "First Log Recorded");
  }
  if (logs.some((log) => log.isProject)) {
    unlockBadge("project_saver", "Project Saver");
  }
}
