export const avatarImages = {
  alexChen: "/avatars/alex-chen.jpg",
  alexRivera: "/avatars/alex-rivera.jpg",
  jordanChen: "/avatars/jordan-chen.jpg",
  miaThompson: "/avatars/mia-thompson.jpg",
  marcusRivera: "/avatars/marcus-rivera.jpg",
  sarahChen: "/avatars/sarah-chen.jpg",
};

const nameToAvatar = {
  "alex": avatarImages.alexChen,
  "alex chen": avatarImages.alexChen,
  "alex rivera": avatarImages.alexRivera,
  "jordan": avatarImages.jordanChen,
  "jordan chen": avatarImages.jordanChen,
  "mia": avatarImages.miaThompson,
  "mia thompson": avatarImages.miaThompson,
  "maya": avatarImages.miaThompson,
  "marcus": avatarImages.marcusRivera,
  "marcus rivera": avatarImages.marcusRivera,
  "sarah": avatarImages.sarahChen,
  "sarah chen": avatarImages.sarahChen,
};

export function getAvatarImageByName(name = "") {
  const normalized = name.trim().toLowerCase();
  const firstName = normalized.split(/\s+/)[0]?.replace(/[^a-z]/g, "");
  return nameToAvatar[normalized] || nameToAvatar[firstName] || "";
}
