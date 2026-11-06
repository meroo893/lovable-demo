export type Palette = {
  id: string;
  name: string;
  colors: [string, string, string];
};

export const palettes: Palette[] = [
  { id: "rose", name: "Розова", colors: ["#FF78AC", "#A8D5E3", "#F2F0EA"] },
  { id: "forest", name: "Класическа", colors: ["#205A28", "#C72B32", "#FFFFFF"] },
  { id: "sunny", name: "Слънчева", colors: ["#009B4D", "#FFCC00", "#FAF5E9"] },
];

export const DEFAULT_PALETTE = "sunny";
export const PALETTE_KEY = "pe-palette";
