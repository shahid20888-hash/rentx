export function formatDateLabel(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function resolveArticleDateLabel(updatedAt?: string, publishedAt?: string): string {
  return formatDateLabel(updatedAt ?? publishedAt ?? getTodayISO());
}
