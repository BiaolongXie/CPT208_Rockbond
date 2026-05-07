const EN_LOCALE = "en-US";

export function parseDateValue(value) {
  if (value instanceof Date) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatShortDate(value, fallback = "Today") {
  const date = parseDateValue(value);
  if (!date) return value || fallback;
  return date.toLocaleDateString(EN_LOCALE, { month: "short", day: "numeric" });
}

export function formatDetailDate(value, fallback = "Today") {
  const date = parseDateValue(value);
  if (!date) return value || fallback;
  return date.toLocaleDateString(EN_LOCALE, { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}

export function formatMonthYear(value, fallback = "This Month") {
  const date = parseDateValue(value);
  if (!date) return fallback;
  return date.toLocaleDateString(EN_LOCALE, { month: "long", year: "numeric" });
}

export function formatNumericDate(value, fallback = "Today") {
  const date = parseDateValue(value);
  if (!date) return value || fallback;
  return date.toLocaleDateString(EN_LOCALE, { year: "numeric", month: "2-digit", day: "2-digit" });
}

export function formatChatTime(value = new Date()) {
  const date = parseDateValue(value) || new Date();
  return date.toLocaleTimeString(EN_LOCALE, { hour: "2-digit", minute: "2-digit" });
}
