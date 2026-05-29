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
    name: "Búho nocturno",
    tagline: "Tus mejores playlists empiezan a sonar despues de las 12AM",
    description: "Tratas las 2 de la mañana como tu tiempo para ti, y permites que tu soundtrack inunde tus pensamientos.",
    icon: "⋆.˚ ☾⭒.˚",
    score: (s) => pct(s.lateNightShare * 0.9 + s.avgSessionSize * 0.1),
  },
  {
    id: "loop-addict",
    name: "Adicto a reiniciar",
    tagline: "Si fue un hit una vez, lo sera miles de veces",
    description: "Escuchar algo en loop no es una decision, es un estilo de vida. ",
    icon: "꩜",
    score: (s) => pct(s.replayRatio * 0.55 + s.topTrackShare * 0.45),
  },
  {
    id: "genre-hopper",
    name: "Salta-géneros",
    tagline: "Solo uno? Qué es esto? Una jaula?",
    description: "Tu lista de reproduccion es más cambiante que las flores en primavera",
    icon: "˗ˏˋ 🪩 ˎˊ˗",
    score: (s) => pct(s.genreDiversity * 0.6 + (1 - s.artistLoyalty) * 0.4),
  },
  {
    id: "main-character-listener",
    name: "Sindrome de personaje principal",
    tagline: "Cada caminata tiene un soundtrack.",
    description: "Tratas a cada canción como una decisión artistica en el montaje de tu vida.",
    icon: ".✦ ݁˖",
    score: (s) => pct(s.artistLoyalty * 0.75 + s.topTrackShare * 0.25),
  },
  {
    id: "indie-explorer",
    name: "Explorador de joyas indies",
    tagline: "Encuentras oro antes de que sea popular.",
    description: "Tu artista favorito es tan under que puede que te sirva tu café por las mañanas.",
    icon: "𝄞⨾𓍢ִ໋",
    score: (s) => pct(s.indieGenreShare * 0.65 + s.nicheArtistShare * 0.35),
  },
  {
    id: "chaos-listener",
    name: "Caos puro",
    tagline: "No hay plan, solo vibra, una vibra muy ruidosa.",
    description: "Aun así tu soundtrack encaja perfectamente entre sí",
    icon: "◝(ᵔᗜᵔ)◜",
    score: (s) => pct(s.genreDiversity * 0.4 + s.moodVolatility * 0.35 + (1 - s.artistLoyalty) * 0.25),
  },
  {
    id: "sad-girl-autumn",
    name: "Depresión otoñal",
    tagline: "Olas de sentimientos que llegan como la brisa pos veraniega",
    description: "Tus playlists son suaves como los atardeceres otoñales.",
    icon: "𖡼.𖤣𖥧𖡼.𖤣𖥧",
    score: (s) => pct(s.autumnShare * 0.55 + s.indieGenreShare * 0.25 + s.dreamPopShare * 0.2),
  },
  {
    id: "sonic-time-traveler",
    name: "Viajero del tiempo cafeinado",
    tagline: "Pasado, presente y futuro, todo en una sola sesión de escucha",
    description: "Brincas de era y género como un DJ con una maquina del tiempo",
    icon: "◴",
    score: (s) => pct(s.genreDiversity * 0.45 + s.uniqueArtistRatio * 0.35 + s.longTailShare * 0.2),
  },
  {
    id: "playlist-curator",
    name: "Curador de galerías sonoras",
    tagline: "Cada sonido es minuciosamente seleccionado",
    description: "Hasta el más mínimo cambio de vibra es intencional",
    icon: "ᯓ♪",
    score: (s) => pct(s.avgSessionSize * 0.45 + s.monthlyConsistency * 0.35 + s.genreDiversity * 0.2),
  },
  {
    id: "underground-scout",
    name: "Cazatalentos",
    tagline: "Encuentras artistas que apenas se encontraron a ellos mismos",
    description: "Tu biblioteca esta lleno de artistas que nadie conoce, pero un día seran enormes",
    icon: "⋆⭒˚.⋆",
    score: (s) => pct(s.nicheArtistShare * 0.5 + s.longTailShare * 0.3 + s.uniqueArtistRatio * 0.2),
  },
  {
    id: "comfort-artist-devotee",
    name: "Fiel oyente",
    tagline: "Mismo artista, misma seguridad, misma buena vibra",
    description: "Siempre regresas a ese artista que simplemente, lo entiende. ",
    icon: "‹𝟹",
    score: (s) => pct(s.artistLoyalty * 0.65 + s.replayRatio * 0.35),
  },
  {
    id: "energy-spike-listener",
    name: "Adicto a los temazos",
    tagline: "Sesion de chill? Eso con que se come?",
    description: "Persigues ese subidón de energia atraves de tus audifonos",
    icon: "Ϟ⋆.˚",
    score: (s) => pct(s.energyGenreShare * 0.6 + s.hyperpopShare * 0.25 + s.moodVolatility * 0.15),
  },
  {
    id: "emotional-archivist",
    name: "Cajon de tiliches emocional",
    tagline: "Cada canción, nota y sonido, atados a una memoria y sentimiento",
    description: "Tu biblioteca es un claro reflejo de tu historia de vida.",
    icon: "𓇢𓆸",
    score: (s) => pct(blend(s.monthlyConsistency, s.replayRatio, s.artistLoyalty)),
  },
  {
    id: "dream-pop-drifter",
    name: "Entusiasta del Dream Pop",
    tagline: "Beats suaves, sentimientos intensos",
    description: "Flotas entre melodias, imaginando que todo es un acogedor sueño",
    icon: "⋆˚࿔",
    score: (s) => pct(s.dreamPopShare * 0.75 + s.lateNightShare * 0.25),
  },
  {
    id: "hyperpop-maximalist",
    name: "Sobrecarga de caos digital",
    tagline: "Más es más",
    description: "Tu gusto musical es colorido y estridente, pero de la mejor manera",
    icon: ">ᴗ<",
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
