import { avatarImages, getAvatarImageByName } from "./avatarData.js";

export const invitations = [
  {
    id: "invite_001",
    climberName: "Alex Rivera",
    avatarImage: avatarImages.alexRivera,
    location: "Campus Climbing Gym",
    time: "Saturday 3:00 PM",
    skillLevel: "Beginner-friendly",
    goal: "Practice easy bouldering routes",
    tags: ["V6 Boulderer", "Lead Climbing"],
  },
  {
    id: "invite_002",
    climberName: "Jordan Chen",
    avatarImage: avatarImages.jordanChen,
    location: "The Summit Vault",
    time: "Friday 6:00 PM",
    skillLevel: "Occasional",
    goal: "Try top rope basics together",
    tags: ["Top Rope", "Beginner Friendly"],
  },
  {
    id: "invite_003",
    climberName: "Mia Thompson",
    avatarImage: avatarImages.miaThompson,
    location: "Stone Grove",
    time: "Sunday 10:30 AM",
    skillLevel: "Regular",
    goal: "Outdoor trad practice with a calm pace",
    tags: ["Outdoor Trad", "Multi-pitch"],
  },
];

export const challenges = [
  {
    id: "challenge_001",
    title: "2 Sessions This Week",
    description: "Complete two climbing sessions with your circle this week.",
    participants: 5,
    goal: "2 sessions",
  },
  {
    id: "challenge_002",
    title: "Share One Beta Tip",
    description: "Help another climber with one friendly route tip.",
    participants: 12,
    goal: "1 tip shared",
  },
  {
    id: "challenge_003",
    title: "Try a New Route Style",
    description: "Pick a climb outside your usual comfort zone.",
    participants: 8,
    goal: "1 new style",
  },
];

export const events = [
  {
    id: "event_001",
    title: "Beginner Bouldering Night",
    location: "Campus Climbing Gym",
    time: "Sat, Oct 12 - 9:00 AM",
    tag: "Beginner",
  },
  {
    id: "event_002",
    title: "Belay and Beer Social Mixer",
    location: "The Summit Vault",
    time: "Fri, Oct 18 - 6:00 PM",
    tag: "Social",
  },
  {
    id: "event_003",
    title: "Technique Workshop",
    location: "Stone Grove Climbing Gym",
    time: "Sun, Oct 20 - 2:00 PM",
    tag: "Skills",
  },
];

export const badgeCatalog = [
  {
    id: "first_log",
    title: "First Log Recorded",
    description: "Record your first climb or project.",
  },
  {
    id: "project_saver",
    title: "Project Saver",
    description: "Save a route project from any quick log.",
  },
  {
    id: "new_partner",
    title: "New Partner Joined",
    description: "Join a partner invitation or challenge.",
  },
  {
    id: "event_explorer",
    title: "Session Explorer",
    description: "Join or save a public climbing session.",
  },
  {
    id: "weekly_quest",
    title: "Peak Performer",
    description: "Complete the weekly progress quest.",
  },
];

export const notifications = [
  {
    id: "notification_001",
    category: "partners",
    type: "message",
    title: "Marcus Rivera",
    action: "sent you a message",
    body: "Hey! Are you hitting the gym tonight?",
    time: "2m ago",
    avatar: "M",
    avatarImage: avatarImages.marcusRivera,
  },
  {
    id: "notification_002",
    category: "circles",
    type: "session",
    title: "The Granite Nomads",
    action: "added a new session",
    time: "1h ago",
    icon: "mountain",
    tags: ["Yosemite Peak", "V5-V7"],
  },
  {
    id: "notification_003",
    category: "system",
    type: "achievement",
    title: "Achievement Unlocked!",
    body: "You've earned the Peak Master badge!",
    time: "4h ago",
  },
  {
    id: "notification_004",
    category: "partners",
    type: "follow",
    title: "Sarah Chen",
    action: "followed you",
    time: "Yesterday",
    avatar: "S",
    avatarImage: avatarImages.sarahChen,
  },
  {
    id: "notification_005",
    category: "circles",
    type: "comment",
    title: "New comment in The Overhang session",
    body: "That crux move was insane!",
    time: "2 days ago",
  },
];

export function findPartnerById(friendId) {
  return invitations.find((invite) => invite.id === friendId) || invitations[0];
}

export function buildFriendProfile(friendId) {
  const partner = findPartnerById(friendId);
  return {
    id: partner.id,
    name: partner.climberName,
    level: partner.tags?.[0] || "V8 Climber",
    skillLevel: partner.skillLevel || "Regular",
    location: partner.location || "Boulder, Colorado",
    goal: partner.goal || "Find consistent climbing partners",
    tags: partner.tags || [],
    preferredSession: partner.time || "Flexible",
    avatar: partner.climberName.slice(0, 1),
    avatarImage: partner.avatarImage || getAvatarImageByName(partner.climberName),
    totalClimbs: partner.id === "invite_001" ? 248 : 124,
    milestones: partner.id === "invite_001" ? 14 : 8,
    rankNote: partner.id === "invite_001" ? "Top 5% Boulder" : "Friendly Sender",
    achievements: ["Summit Seeker", "Flash Master", "100 Day Streak"],
  };
}

export function seedChatMessages(friend) {
  return [
    {
      id: "seed_001",
      sender: "friend",
      text: "Yo! Did you check out that new route at The Grotto?",
      time: "10:42 AM",
      createdAt: "2026-05-04T10:42:00Z",
    },
    {
      id: "seed_002",
      sender: "me",
      text: "Not yet! Is it the V5 near the waterfall?",
      time: "10:44 AM",
      createdAt: "2026-05-04T10:44:00Z",
    },
    {
      id: "seed_003",
      sender: "friend",
      text: "Yeah, this one! The holds are super crimpy but the view from the top is insane.",
      time: "10:45 AM",
      image: true,
      createdAt: "2026-05-04T10:45:00Z",
    },
    {
      id: "seed_004",
      sender: "me",
      text: "Looks incredible. Let's hit it this Saturday morning!",
      time: "10:46 AM",
      createdAt: "2026-05-04T10:46:00Z",
    },
  ];
}
