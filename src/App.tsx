import { useEffect, useMemo, useState } from "react";
import { GraduationCap, ArrowDown, ShieldAlert } from "lucide-react";
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
      <header className="sticky top-0 z-10 border-b border-amber-200/70 bg-amber-50/90 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-bold">
            <GraduationCap size={22} className="text-board dark:text-pencil" />
            AI за учители
          </a>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-sm text-slate-600 sm:flex dark:text-slate-400">
              <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full bg-pencil transition-all" style={{ width: `${progress}%` }} />
              </div>
              {done.length}/{tips.length}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="px-4 py-10 md:py-14">
        <div className="chalkboard mx-auto max-w-5xl rounded-lg px-6 py-14 text-center text-white md:py-20">
          <span className="font-hand inline-block rounded-full border border-white/30 px-4 py-1 text-xl text-pencil">
            Ръководство за учители
          </span>
          <h1 className="font-hand mt-4 text-5xl font-bold leading-tight md:text-7xl">
            10 съвета за <span className="text-pencil underline decoration-wavy decoration-white/40 underline-offset-8">по-добри промптове</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Планове на уроци, тестове, обратна връзка за учениците – научи как да поискаш от AI точно това,
            което ти трябва. Всеки съвет има пример, който можеш да копираш и да пробваш веднага.
          </p>
          <a
            href="#tips"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-pencil px-6 py-3 font-bold text-board shadow-lg transition hover:brightness-110"
          >
            Към урока <ArrowDown size={18} />
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
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                filter === t
                  ? "bg-board text-white"
                  : "bg-white text-slate-700 ring-1 ring-amber-200 hover:bg-amber-100 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800 dark:hover:bg-slate-800"
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
          <div className="mt-10 rounded-2xl bg-board p-6 text-center text-white">
            <p className="font-hand text-4xl font-bold text-pencil">Отличен 6! 🍎</p>
            <p className="mt-1 opacity-90">Научи всички 10 урока. Сега е време за практика в следващия ти час.</p>
          </div>
        )}

        <aside className="mt-10 flex gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-5 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">
          <ShieldAlert className="mt-0.5 shrink-0" size={20} />
          <p>
            <strong>Важно:</strong> не въвеждайте в AI имена, ЕГН, оценки или други лични данни на ученици.
            Заменяйте ги с „Ученик А“ и винаги проверявайте генерираното съдържание, преди да го ползвате.
          </p>
        </aside>
      </main>

      <footer className="border-t border-amber-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800">
        Направено с ❤️ за учителите · Хоствано в Lovable
      </footer>
    </div>
  );
}
