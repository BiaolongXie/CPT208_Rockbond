export const STORAGE_KEYS = {
  userProfile: "rockbond_userProfile",
  logs: "rockbond_logs",
  sessions: "rockbond_sessions",
  questProgress: "rockbond_questProgress",
  joinedChallenges: "rockbond_joinedChallenges",
  joinedInvitations: "rockbond_joinedInvitations",
  joinedEvents: "rockbond_joinedEvents",
  circleApplications: "rockbond_circleApplications",
  circleChats: "rockbond_circleChats",
  friendRequests: "rockbond_friendRequests",
  friends: "rockbond_friends",
  chats: "rockbond_chats",
  badges: "rockbond_badges",
};

export const defaultQuest = {
  questId: "weekly_sessions",
  title: "Complete 2 sessions this week",
  description: "Log two climbing sessions this week to keep momentum gentle and steady.",
  target: 2,
  current: 0,
  completed: false,
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export function getUserProfile() {
  return readJSON(STORAGE_KEYS.userProfile, null);
}

export function saveUserProfile(profile) {
  return writeJSON(STORAGE_KEYS.userProfile, profile);
}

export function getSessions() {
  return readJSON(STORAGE_KEYS.sessions, []);
}

export function saveSessions(sessions) {
  return writeJSON(STORAGE_KEYS.sessions, sessions);
}

export function getLogs() {
  return readJSON(STORAGE_KEYS.logs, []);
}

export function saveLogs(logs) {
  return writeJSON(STORAGE_KEYS.logs, logs);
}

export function getQuestProgress() {
  return readJSON(STORAGE_KEYS.questProgress, defaultQuest);
}

export function saveQuestProgress(quest) {
  return writeJSON(STORAGE_KEYS.questProgress, quest);
}

export function getJoinedChallenges() {
  return readJSON(STORAGE_KEYS.joinedChallenges, []);
}

export function saveJoinedChallenges(items) {
  return writeJSON(STORAGE_KEYS.joinedChallenges, items);
}

export function getJoinedInvitations() {
  return readJSON(STORAGE_KEYS.joinedInvitations, []);
}

export function saveJoinedInvitations(items) {
  return writeJSON(STORAGE_KEYS.joinedInvitations, items);
}

export function getJoinedEvents() {
  return readJSON(STORAGE_KEYS.joinedEvents, []);
}

export function saveJoinedEvents(items) {
  return writeJSON(STORAGE_KEYS.joinedEvents, items);
}

export function getCircleApplications() {
  return readJSON(STORAGE_KEYS.circleApplications, []);
}

export function saveCircleApplications(items) {
  return writeJSON(STORAGE_KEYS.circleApplications, items);
}

export function getCircleChats() {
  return readJSON(STORAGE_KEYS.circleChats, {});
}

export function saveCircleChats(chats) {
  return writeJSON(STORAGE_KEYS.circleChats, chats);
}

export function getBadges() {
  return readJSON(STORAGE_KEYS.badges, []);
}

export function saveBadges(badges) {
  return writeJSON(STORAGE_KEYS.badges, badges);
}

export function getFriendRequests() {
  return readJSON(STORAGE_KEYS.friendRequests, []);
}

export function saveFriendRequests(requests) {
  return writeJSON(STORAGE_KEYS.friendRequests, requests);
}

export function getFriends() {
  return readJSON(STORAGE_KEYS.friends, []);
}

export function saveFriends(friends) {
  return writeJSON(STORAGE_KEYS.friends, friends);
}

export function getChats() {
  return readJSON(STORAGE_KEYS.chats, {});
}

export function saveChats(chats) {
  return writeJSON(STORAGE_KEYS.chats, chats);
}
