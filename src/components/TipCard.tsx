import { useState } from "react";
import { Check, Copy, ThumbsDown, ThumbsUp, ChevronDown } from "lucide-react";
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
      className={`scroll-mt-24 rounded-2xl border bg-white p-6 shadow-sm transition dark:bg-slate-900 ${
        done ? "border-emerald-300 dark:border-emerald-700" : "border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-bold text-white">
          {tip.id}
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            {tip.tag}
          </span>
          <h3 className="mt-0.5 text-xl font-bold">{tip.title}</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{tip.summary}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/60 dark:bg-rose-950/30">
          <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400">
            <ThumbsDown size={15} /> Слаб промпт
          </div>
          <p className="whitespace-pre-line font-mono text-sm text-slate-700 dark:text-slate-300">{tip.bad}</p>
        </div>
        <div className="relative rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              <ThumbsUp size={15} /> Добър промпт
            </span>
            <button
              onClick={copy}
              aria-label="Копирай добрия промпт"
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/40"
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
          className="flex items-center gap-1 text-sm font-medium text-violet-700 hover:underline dark:text-violet-400"
        >
          Защо работи?
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <input
            type="checkbox"
            checked={done}
            onChange={onToggleDone}
            className="h-4 w-4 accent-emerald-600"
          />
          Усвоих го
        </label>
      </div>
      {open && (
        <p className="mt-3 rounded-lg bg-violet-50 p-4 text-sm text-slate-700 dark:bg-violet-950/30 dark:text-slate-300">
          {tip.why}
        </p>
      )}
    </article>
  );
}
