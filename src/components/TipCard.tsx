import { useState } from "react";
import { Check, Copy, ChevronDown, Pencil, CheckCircle2 } from "lucide-react";
import type { Tip } from "@/data/tips";

type Props = { tip: Tip; done: boolean; onToggleDone: () => void };

export function TipCard({ tip, done, onToggleDone }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tip.good);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked */ }
  };

  return (
    <article
      id={`tip-${tip.id}`}
      className={`notebook scroll-mt-24 rounded-xl p-6 pl-16 shadow-md sm:pl-[72px] ${
        done ? "!border-emerald-500" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="font-hand -ml-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-3xl font-bold text-onaccent shadow">
          {tip.id}
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {tip.tag}
          </span>
          <h3 className="font-hand mt-0.5 text-3xl font-bold leading-tight text-head">
            {tip.title}
          </h3>
          <p className="mt-2 text-slate-700 dark:text-slate-300">{tip.summary}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border-2 border-dashed border-red-300 bg-white/80 p-4 dark:border-red-800 dark:bg-slate-900/70">
          <div className="font-hand mb-2 flex items-center gap-1.5 text-xl font-bold text-red-600 dark:text-red-400">
            <Pencil size={16} /> Може по-добре
          </div>
          <p className="whitespace-pre-line font-mono text-sm text-slate-700 dark:text-slate-300">{tip.bad}</p>
        </div>
        <div className="rounded-lg border-2 border-emerald-400 bg-white/80 p-4 dark:border-emerald-700 dark:bg-slate-900/70">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-hand flex items-center gap-1.5 text-xl font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 size={16} /> Отличен 6
            </span>
            <button
              onClick={copy}
              aria-label="Копирай добрия промпт"
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/40"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Копирано" : "Копирай"}
            </button>
          </div>
          <p className="whitespace-pre-line font-mono text-sm text-slate-700 dark:text-slate-300">{tip.good}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex items-center gap-1 text-sm font-bold text-slate-800 hover:underline dark:text-slate-200"
        >
          Защо работи?
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <input type="checkbox" checked={done} onChange={onToggleDone} className="h-4 w-4 accent-emerald-600" />
          Научих урока
        </label>
      </div>
      {open && (
        <p className="mt-3 rounded-lg bg-black/5 p-4 text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200">
          {tip.why}
        </p>
      )}
    </article>
  );
}
