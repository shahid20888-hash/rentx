export function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildStateSlug(stateName: string): string {
  return normalizeSlug(stateName);
}

export function buildCitySlug(cityName: string, stateCode: string): string {
  const cityPart = normalizeSlug(cityName);
  const codePart = stateCode.trim().toLowerCase();
  return `${cityPart}-${codePart}`;
}

