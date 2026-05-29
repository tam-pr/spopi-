import type { ListeningSignals, PersonalityId } from "./types";

type ArchetypeDefinition = {
  id: PersonalityId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  score: (signals: ListeningSignals) => number;
};

function pct(value: number): number {
  return Math.round(value * 100);
}

function blend(...values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export const PERSONALITY_DEFINITIONS: ArchetypeDefinition[] = [
  {
    id: "night-owl",
    name: "Night Owl",
    tagline: "Your best playlists start after midnight.",
    description: "You treat 2 AM like prime time and let the quiet hours soundtrack your thoughts.",
    icon: "🌙",
    score: (s) => pct(s.lateNightShare * 0.9 + s.avgSessionSize * 0.1),
  },
  {
    id: "loop-addict",
    name: "Loop Addict",
    tagline: "If it hits once, it hits forty times.",
    description: "Repeat mode is not a button for you. It is a lifestyle.",
    icon: "🔁",
    score: (s) => pct(s.replayRatio * 0.55 + s.topTrackShare * 0.45),
  },
  {
    id: "genre-hopper",
    name: "Genre Hopper",
    tagline: "One genre? That is a cage.",
    description: "Your queue jumps moods faster than group chat plans change.",
    icon: "🎛️",
    score: (s) => pct(s.genreDiversity * 0.6 + (1 - s.artistLoyalty) * 0.4),
  },
  {
    id: "main-character-listener",
    name: "Main Character Listener",
    tagline: "Every walk has a cinematic soundtrack.",
    description: "Your top artist is basically the lead role in your personal montage.",
    icon: "⭐",
    score: (s) => pct(s.artistLoyalty * 0.75 + s.topTrackShare * 0.25),
  },
  {
    id: "indie-explorer",
    name: "Indie Explorer",
    tagline: "You find gems before they trend.",
    description: "Your taste lives one block away from the mainstream, and that is the point.",
    icon: "🎸",
    score: (s) => pct(s.indieGenreShare * 0.65 + s.nicheArtistShare * 0.35),
  },
  {
    id: "chaos-listener",
    name: "Chaos Listener",
    tagline: "No plan. Just vibes. Possibly loud ones.",
    description: "Your listening history reads like beautiful, organized chaos.",
    icon: "🌀",
    score: (s) => pct(s.genreDiversity * 0.4 + s.moodVolatility * 0.35 + (1 - s.artistLoyalty) * 0.25),
  },
  {
    id: "sad-girl-autumn",
    name: "Sad Girl Autumn",
    tagline: "Pumpkin spice, but emotionally.",
    description: "When leaves fall, your playlists get softer, slower, and devastatingly good.",
    icon: "🍂",
    score: (s) => pct(s.autumnShare * 0.55 + s.indieGenreShare * 0.25 + s.dreamPopShare * 0.2),
  },
  {
    id: "sonic-time-traveler",
    name: "Sonic Time Traveler",
    tagline: "Past, present, and future hits in one session.",
    description: "You jump eras and genres like a DJ with a time machine.",
    icon: "⏳",
    score: (s) => pct(s.genreDiversity * 0.45 + s.uniqueArtistRatio * 0.35 + s.longTailShare * 0.2),
  },
  {
    id: "playlist-curator",
    name: "Playlist Curator",
    tagline: "Every queue is a carefully staged mood.",
    description: "You build listening sessions with intention and flow.",
    icon: "📼",
    score: (s) => pct(s.avgSessionSize * 0.45 + s.monthlyConsistency * 0.35 + s.genreDiversity * 0.2),
  },
  {
    id: "underground-scout",
    name: "Underground Scout",
    tagline: "You know artists your friends will discover next year.",
    description: "Your library is full of deep cuts and low-stream legends.",
    icon: "🕵️",
    score: (s) => pct(s.nicheArtistShare * 0.5 + s.longTailShare * 0.3 + s.uniqueArtistRatio * 0.2),
  },
  {
    id: "comfort-artist-devotee",
    name: "Comfort Artist Devotee",
    tagline: "Same artist, same safety, same serotonin.",
    description: "When life gets loud, you return to the artist who always gets it.",
    icon: "🫶",
    score: (s) => pct(s.artistLoyalty * 0.65 + s.replayRatio * 0.35),
  },
  {
    id: "energy-spike-listener",
    name: "Energy Spike Listener",
    tagline: "Calm intro? Never heard of her.",
    description: "You chase high-energy drops and fast emotional lift-offs.",
    icon: "⚡",
    score: (s) => pct(s.energyGenreShare * 0.6 + s.hyperpopShare * 0.25 + s.moodVolatility * 0.15),
  },
  {
    id: "emotional-archivist",
    name: "Emotional Archivist",
    tagline: "You do not just listen. You remember.",
    description: "Your history is a scrapbook of moods, milestones, and repeat listens.",
    icon: "📓",
    score: (s) => pct(blend(s.monthlyConsistency, s.replayRatio, s.artistLoyalty)),
  },
  {
    id: "dream-pop-drifter",
    name: "Dream Pop Drifter",
    tagline: "Soft focus, big feelings.",
    description: "You float through hazy textures like the world is slightly underwater.",
    icon: "☁️",
    score: (s) => pct(s.dreamPopShare * 0.75 + s.lateNightShare * 0.25),
  },
  {
    id: "hyperpop-maximalist",
    name: "Hyperpop Maximalist",
    tagline: "More is more is more is more.",
    description: "Your taste turns volume, color, and chaos all the way up.",
    icon: "💥",
    score: (s) => pct(s.hyperpopShare * 0.7 + s.energyGenreShare * 0.3),
  },
];

export function buildDominantCommentary(
  id: PersonalityId,
  signals: ListeningSignals,
  topArtist: string,
): { headline: string; commentary: string } {
  const latePct = Math.round(signals.lateNightShare * 100);
  const replayPct = Math.round(signals.replayRatio * 100);
  const loyaltyPct = Math.round(signals.artistLoyalty * 100);

  const copy: Record<PersonalityId, { headline: string; commentary: string }> = {
    "night-owl": {
      headline: "The algorithm clocked out. You did not.",
      commentary: `${latePct}% of your listening happened in late-night hours. Your peak creativity and your peak replay button apparently share a schedule.`,
    },
    "loop-addict": {
      headline: "One song can carry an entire personality.",
      commentary: `You replay like it is research. ${replayPct}% of your tracks got repeat streams, and your #1 track basically paid rent in your history.`,
    },
    "genre-hopper": {
      headline: "Your taste has no lane and that is the flex.",
      commentary: "You collect genres like stickers. Every session is a new mood board.",
    },
    "main-character-listener": {
      headline: "Supporting characters? Not in your soundtrack.",
      commentary: `${loyaltyPct}% of your listening minutes orbit your top artist. ${topArtist} is basically co-author of your year.`,
    },
    "indie-explorer": {
      headline: "Mainstream who? You were already there.",
      commentary: "You dig in corners, find hidden tracks, and leave with better taste than you arrived with.",
    },
    "chaos-listener": {
      headline: "Organized chaos, but make it iconic.",
      commentary: "Your listening pattern is unpredictable, colorful, and weirdly perfect.",
    },
    "sad-girl-autumn": {
      headline: "Soft sweater, sharp emotions.",
      commentary: "Your autumn listening hits like a cinematic breakup montage in the best way.",
    },
    "sonic-time-traveler": {
      headline: "Your queue is a time machine with aux.",
      commentary: "You jump decades, genres, and moods without asking permission.",
    },
    "playlist-curator": {
      headline: "This was not random. This was curated.",
      commentary: "Your sessions have flow, intent, and emotional pacing like a mini album.",
    },
    "underground-scout": {
      headline: "You listen where the charts have not arrived yet.",
      commentary: "Your library is full of deep cuts that feel like insider secrets.",
    },
    "comfort-artist-devotee": {
      headline: "Home is an artist and you know exactly who.",
      commentary: `${topArtist} is your emotional reset button. Reliable. Loud. Yours.`,
    },
    "energy-spike-listener": {
      headline: "You do not ease in. You launch.",
      commentary: "Your listening spikes hard and fast, like every queue starts at the chorus.",
    },
    "emotional-archivist": {
      headline: "Your history is a memory box with a beat.",
      commentary: "You keep returning to songs that mark moments, not just moods.",
    },
    "dream-pop-drifter": {
      headline: "Floating through feelings at half speed.",
      commentary: "Your sound is soft, hazy, and emotionally huge.",
    },
    "hyperpop-maximalist": {
      headline: "Maximum volume. Maximum color. Maximum you.",
      commentary: "Your taste does not whisper. It bursts through the speakers.",
    },
  };

  return copy[id];
}
