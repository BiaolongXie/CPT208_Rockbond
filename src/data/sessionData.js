import { avatarImages } from "./avatarData.js";

export const sessionSeeds = [
  {
    id: "event_001",
    title: "Beginner Bouldering Night",
    location: "Campus Climbing Gym",
    area: "Campus Climbing Gym",
    gradeRange: "V0-V3",
    date: "Today",
    startTime: "9:00 AM",
    level: "Beginner",
    notes: "A relaxed bouldering session for newer climbers. We'll warm up, share beta, and try a few friendly circuits together.",
    privacy: "Public",
    participants: ["Alex", "Sarah", "Marcus", "Lena", "Jordan", "Maya", "Bo", "Chris"],
    joined: false,
    createdAt: "2026-05-04T09:00:00Z",
    discussion: [
      {
        id: "discussion_001",
        author: "Sarah",
        avatar: "S",
        avatarImage: avatarImages.sarahChen,
        text: "I can bring an extra chalk bag! Who else is joining?",
        time: "15m ago",
        createdAt: "2026-05-04T08:45:00Z",
      },
      {
        id: "discussion_002",
        author: "Alex",
        avatar: "A",
        avatarImage: avatarImages.alexChen,
        text: "Nice Sarah! I'll reserve a corner near the V1 wall.",
        time: "8m ago",
        createdAt: "2026-05-04T08:52:00Z",
      },
    ],
  },
  {
    id: "event_002",
    title: "Afternoon Send at Castle Rock",
    location: "Castle Rock",
    area: "Magoos area",
    gradeRange: "V3-V6",
    date: "Today",
    startTime: "2:00 PM",
    level: "Intermediate",
    notes:
      "We're hitting the Magoos area for some afternoon projecting. Goal is to share beta on the classic V4 traverses and maybe check out the Spoon if time permits. Bringing two pads!",
    privacy: "Public",
    participants: ["Alex", "Sarah", "Marcus", "Lena", "Jordan", "Maya", "Bo", "Chris"],
    joined: false,
    createdAt: "2026-05-04T14:00:00Z",
    discussion: [
      {
        id: "discussion_003",
        author: "Sarah",
        avatar: "S",
        avatarImage: avatarImages.sarahChen,
        text: "I can bring an extra crash pad! Who else is bringing gear?",
        time: "15m ago",
        createdAt: "2026-05-04T13:45:00Z",
      },
      {
        id: "discussion_004",
        author: "Alex",
        avatar: "A",
        avatarImage: avatarImages.alexChen,
        text: "Nice Sarah! I've got two. Marcus said he's bringing his brushes too.",
        time: "8m ago",
        createdAt: "2026-05-04T13:52:00Z",
      },
    ],
  },
  {
    id: "event_003",
    title: "Technique Workshop",
    location: "Stone Grove Climbing Gym",
    area: "Training wall",
    gradeRange: "V1-V4",
    date: "Tomorrow",
    startTime: "2:00 PM",
    level: "Beginner Friendly",
    notes: "Footwork drills, quiet feet practice, and a few balance-focused problems with gentle coaching.",
    privacy: "Public",
    participants: ["Alex", "Maya", "Liam", "Jordan"],
    joined: false,
    createdAt: "2026-05-05T14:00:00Z",
    discussion: [],
  },
];

export function findSeedSession(sessionId) {
  return sessionSeeds.find((session) => session.id === sessionId) || sessionSeeds[0];
}

export function buildSessionFromEvent(event) {
  return findSeedSession(event.id);
}
