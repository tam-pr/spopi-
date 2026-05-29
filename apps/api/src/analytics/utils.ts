export function msToMinutes(ms: number): number {
  return Number((ms / 1000 / 60).toFixed(2));
}

export function monthKey(timestampIso: string): string {
  return timestampIso.slice(0, 7);
}

export function toSortedTop<T extends { name: string; streams: number; minutes: number }>(
  map: Map<string, { streams: number; msPlayed: number }>,
  limit: number,
): T[] {
  return Array.from(map.entries())
    .map(([name, value]) => ({
      name,
      streams: value.streams,
      minutes: msToMinutes(value.msPlayed),
    }))
    .sort((a, b) => b.minutes - a.minutes || b.streams - a.streams || a.name.localeCompare(b.name))
    .slice(0, limit) as T[];
}

export function incrementAggregate(
  map: Map<string, { streams: number; msPlayed: number }>,
  key: string,
  msPlayed: number,
) {
  const current = map.get(key);
  if (!current) {
    map.set(key, { streams: 1, msPlayed });
    return;
  }
  current.streams += 1;
  current.msPlayed += msPlayed;
}

