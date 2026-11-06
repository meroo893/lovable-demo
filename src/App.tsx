import { useEffect, useMemo, useState } from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import { tips } from "@/data/tips";
import { TipCard } from "@/components/TipCard";
import { ThemeToggle } from "@/components/ThemeToggle";

const STORAGE_KEY = "pe-tips-done";
const ALL = "Всички";

function loadDone(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [done, setDone] = useState<number[]>(loadDone);
  const [filter, setFilter] = useState(ALL);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(done)); } catch { /* ignore */ }
  }, [done]);

  const tags = useMemo(() => [ALL, ...Array.from(new Set(tips.map((t) => t.tag)))], []);
  const visible = filter === ALL ? tips : tips.filter((t) => t.tag === filter);
  const progress = Math.round((done.length / tips.length) * 100);

  const toggle = (id: number) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-bold">
            <Sparkles size={20} className="text-violet-600" />
            Промпт Инженеринг
          </a>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-sm text-slate-600 sm:flex dark:text-slate-400">
              <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
              </div>
              {done.length}/{tips.length}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-transparent dark:from-violet-950/50 dark:via-fuchsia-950/20" />
        <div className="mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
          <span className="inline-block rounded-full bg-violet-600/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300">
            Ръководство за начинаещи и напреднали
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
            10 съвета за{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              по-добри промптове
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Промпт инженерингът е умението да общуваш ясно с AI модели. Ето 10 практични техники –
            всяка с пример „преди“ и „след“, който можеш да копираш и пробваш веднага.
          </p>
          <a
            href="#tips"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700"
          >
            Към съветите <ArrowDown size={18} />
          </a>
        </div>
      </section>

      <main id="tips" className="mx-auto max-w-5xl scroll-mt-16 px-4 pb-20">
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Филтър по категория">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              aria-pressed={filter === t}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === t
                  ? "bg-violet-600 text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800 dark:hover:bg-slate-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {visible.map((tip) => (
            <TipCard key={tip.id} tip={tip} done={done.includes(tip.id)} onToggleDone={() => toggle(tip.id)} />
          ))}
        </div>

        {done.length === tips.length && (
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-center text-white">
            <p className="text-xl font-bold">🎉 Браво! Усвои всички 10 съвета.</p>
            <p className="mt-1 opacity-90">Сега е време за практика – пробвай ги в следващия си разговор с AI.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800">
        Създадено с ❤️ в София · Хоствано в Lovable
      </footer>
    </div>
  );
}
