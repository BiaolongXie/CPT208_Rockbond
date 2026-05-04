import { defaultQuest, saveQuestProgress } from "./storage.js";

function startOfWeek(date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = copy.getDate() - day + (day === 0 ? -6 : 1);
  copy.setHours(0, 0, 0, 0);
  copy.setDate(diff);
  return copy;
}

export function calculateWeeklyQuest(sessions) {
  const weekStart = startOfWeek(new Date());
  const current = sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    return !Number.isNaN(sessionDate.getTime()) && sessionDate >= weekStart;
  }).length;

  return {
    ...defaultQuest,
    current: Math.min(current, defaultQuest.target),
    completed: current >= defaultQuest.target,
  };
}

export function updateQuestFromSessions(sessions) {
  const quest = calculateWeeklyQuest(sessions);
  saveQuestProgress(quest);
  return quest;
}
