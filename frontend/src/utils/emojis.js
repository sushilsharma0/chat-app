const emoji = [
  "🦋",
  "🕷️",
  "🕸️",
  "🦠",
  "🪭",
  "👑",
  "⚾",
  "💍",
  "🏀",
  "♣️",
  "🎧",
  "🪇",
  "🥁",
  "🎙️",
  "🎼",
  "🧪",
  "⚖️",
];

export const getEmoji = () => {
  return emoji[Math.floor(Math.random() * emoji.length)];
};
