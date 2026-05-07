import { sessionSeeds } from "../data/sessionData.js";
import { getJoinedEvents, getSessions, saveJoinedEvents, saveSessions } from "./storage.js";

export function upsertSession(session) {
  const sessions = getSessions();
  const nextSessions = sessions.some((item) => item.id === session.id)
    ? sessions.map((item) => (item.id === session.id ? session : item))
    : [session, ...sessions];
  saveSessions(nextSessions);
  return nextSessions;
}

export function getJoinedSessions() {
  const sessions = getSessions();
  const joinedRecords = getJoinedEvents();
  const fromSessions = sessions.filter((session) => session.joined || session.hosted);
  const fromJoinedRecords = joinedRecords
    .map((record) => {
      const storedSession = sessions.find((session) => session.id === record.id);
      if (storedSession) {
        return { ...storedSession, joined: true, joinedAt: record.joinedAt || storedSession.joinedAt };
      }
      const seed = sessionSeeds.find((session) => session.id === record.id);
      return seed ? { ...seed, joined: true, joinedAt: record.joinedAt || seed.createdAt } : null;
    })
    .filter(Boolean);

  return dedupeSessions([...fromSessions, ...fromJoinedRecords]).sort((a, b) => new Date(b.joinedAt || b.createdAt) - new Date(a.joinedAt || a.createdAt));
}

export function setPublicSessionJoined(session, joined) {
  const sessions = getSessions();
  const existing = sessions.find((item) => item.id === session.id);
  const joinedAt = joined ? new Date().toISOString() : existing?.joinedAt;
  const nextSession = {
    ...session,
    ...existing,
    joined,
    joinedAt,
    participants: joined ? ensureParticipant(existing?.participants || session.participants, "Alex") : existing?.participants || session.participants || [],
  };
  const nextSessions = sessions.some((item) => item.id === nextSession.id)
    ? sessions.map((item) => (item.id === nextSession.id ? nextSession : item))
    : [nextSession, ...sessions];
  saveSessions(nextSessions);

  const joinedEvents = getJoinedEvents();
  const nextJoinedEvents = joined
    ? joinedEvents.some((item) => item.id === session.id)
      ? joinedEvents.map((item) => (item.id === session.id ? { ...item, title: nextSession.title, joinedAt } : item))
      : [{ id: session.id, title: nextSession.title, joinedAt }, ...joinedEvents]
    : joinedEvents.filter((item) => item.id !== session.id);
  saveJoinedEvents(nextJoinedEvents);

  return { session: nextSession, sessions: nextSessions, joinedEvents: nextJoinedEvents };
}

function ensureParticipant(participants = [], name) {
  return participants.includes(name) ? participants : [name, ...participants];
}

function dedupeSessions(sessions) {
  const seen = new Set();
  return sessions.filter((session) => {
    if (!session?.id || seen.has(session.id)) return false;
    seen.add(session.id);
    return true;
  });
}
