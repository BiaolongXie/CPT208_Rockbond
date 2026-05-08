import { notifications } from "../data/mockData.js";
import { getFriendRequests, getReadNotificationIds, getUserNotifications, saveReadNotificationIds } from "./storage.js";

export function getCurrentNotificationIds() {
  const pendingRequestIds = getFriendRequests()
    .filter((request) => request.status === "pending")
    .map((request) => request.id);

  return [
    ...pendingRequestIds,
    ...getUserNotifications().map((notification) => notification.id),
    ...notifications.map((notification) => notification.id),
  ];
}

export function hasUnreadNotifications() {
  const readIds = new Set(getReadNotificationIds());
  return getCurrentNotificationIds().some((id) => !readIds.has(id));
}

export function markNotificationsRead() {
  saveReadNotificationIds(getCurrentNotificationIds());
}
