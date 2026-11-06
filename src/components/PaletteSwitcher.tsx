import { useEffect, useState } from "react";
import { DEFAULT_PALETTE, PALETTE_KEY, palettes } from "@/data/palettes";

function initial(): string {
  try {
    const saved = localStorage.getItem(PALETTE_KEY);
    if (saved && palettes.some((p) => p.id === saved)) return saved;
  } catch { /* storage unavailable */ }
  return DEFAULT_PALETTE;
}

export function PaletteSwitcher() {
  const [current, setCurrent] = useState(initial);

  useEffect(() => {
    document.documentElement.dataset.palette = current;
  }, [current]);

  const choose = (id: string) => {
    setCurrent(id);
    try { localStorage.setItem(PALETTE_KEY, id); } catch { /* ignore */ }
  };

  return (
    <div role="radiogroup" aria-label="Цветова палитра" className="flex items-center gap-1.5">
      <span className="hidden text-sm font-semibold text-slate-600 md:inline dark:text-slate-400">Палитра</span>
      {palettes.map((p) => {
        const [a, b, c] = p.colors;
        const active = p.id === current;
        return (
          <button
            key={p.id}
            role="radio"
            aria-checked={active}
            aria-label={`Палитра ${p.name}`}
            title={p.name}
            onClick={() => choose(p.id)}
            className={`h-8 w-8 rounded-full border border-black/20 transition hover:scale-110 ${
              active ? "ring-2 ring-slate-900 ring-offset-2 ring-offset-transparent dark:ring-white" : ""
            }`}
            style={{ background: `linear-gradient(90deg, ${a} 0 33.3%, ${b} 33.3% 66.6%, ${c} 66.6% 100%)` }}
          />
        );
      })}
    </div>
  );
}
