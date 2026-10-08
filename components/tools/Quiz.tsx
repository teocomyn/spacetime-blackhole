"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { QUIZ } from "@/lib/quiz";

const TEXT = {
  fr: {
    progress: (i: number, n: number) => `Question ${i} sur ${n}`,
    correct: "Bonne réponse.",
    wrong: "Pas tout à fait.",
    next: "Question suivante",
    finish: "Voir mon score",
    score: (s: number, n: number) => `Votre score : ${s} sur ${n}`,
    verdict: (s: number, n: number) =>
      s === n
        ? "Parfait. Vous pourriez donner le cours."
        : s >= n * 0.7
          ? "Très bien. Il reste un ou deux pièges à revoir."
          : s >= n * 0.4
            ? "Bon début. Les pages thématiques vous donneront le reste."
            : "Les trous noirs sont contre-intuitifs : c'est le bon moment pour explorer le site.",
    restart: "Recommencer",
    share: "Copier le lien du quiz",
    copied: "Lien copié",
  },
  en: {
    progress: (i: number, n: number) => `Question ${i} of ${n}`,
    correct: "Correct.",
    wrong: "Not quite.",
    next: "Next question",
    finish: "See my score",
    score: (s: number, n: number) => `Your score: ${s} out of ${n}`,
    verdict: (s: number, n: number) =>
      s === n
        ? "Perfect. You could teach the class."
        : s >= n * 0.7
          ? "Very good. One or two traps left to review."
          : s >= n * 0.4
            ? "Good start. The topic pages will give you the rest."
            : "Black holes are counter-intuitive: a great moment to explore the site.",
    restart: "Restart",
    share: "Copy the quiz link",
    copied: "Link copied",
  },
} as const;

export default function Quiz() {
  const { locale } = useApp();
  const t = TEXT[locale];
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const q = QUIZ[index];

  if (done) {
    return (
      <div className="not-prose my-10 rounded-2xl border border-white/10 bg-bg-secondary/50 p-6 text-center">
        <p className="font-sans text-3xl font-light text-white" role="status">
          {t.score(score, QUIZ.length)}
        </p>
        <p className="mt-3 text-text-secondary">{t.verdict(score, QUIZ.length)}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setPicked(null);
              setScore(0);
              setDone(false);
            }}
            className="min-h-[44px] rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-5 text-sm text-accent-cyan hover:bg-accent-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {t.restart}
          </button>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(window.location.href).then(() => setCopied(true));
            }}
            className="min-h-[44px] rounded-full border border-white/15 px-5 text-sm text-text-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {copied ? t.copied : t.share}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose my-10 rounded-2xl border border-white/10 bg-bg-secondary/50 p-4 sm:p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{t.progress(index + 1, QUIZ.length)}</p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className="h-full bg-accent-cyan transition-all" style={{ width: `${(index / QUIZ.length) * 100}%` }} />
      </div>

      <fieldset className="mt-6">
        <legend className="font-sans text-xl font-light leading-snug text-white">{q.question[locale]}</legend>
        <div className="mt-5 space-y-3">
          {q.choices.map((choice, i) => {
            const isAnswer = i === q.answer;
            const isPicked = i === picked;
            const state =
              picked === null
                ? "border-white/10 hover:border-accent-blue/40 hover:bg-accent-blue/[0.05]"
                : isAnswer
                  ? "border-accent-cyan/60 bg-accent-cyan/10"
                  : isPicked
                    ? "border-accent-red/60 bg-accent-red/10"
                    : "border-white/5 opacity-60";
            return (
              <button
                key={choice.en}
                type="button"
                disabled={picked !== null}
                aria-pressed={isPicked}
                onClick={() => {
                  setPicked(i);
                  if (isAnswer) setScore((s) => s + 1);
                }}
                className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-4 text-left text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${state}`}
              >
                <span aria-hidden="true" className="font-semibold text-text-muted">
                  {String.fromCharCode(65 + i)}
                </span>
                {choice[locale]}
              </button>
            );
          })}
        </div>
      </fieldset>

      {picked !== null && (
        <div className="mt-6" role="status">
          <p className={`font-semibold ${picked === q.answer ? "text-accent-cyan" : "text-accent-red"}`}>
            {picked === q.answer ? t.correct : t.wrong}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{q.explanation[locale]}</p>
          <button
            type="button"
            onClick={() => {
              if (index + 1 >= QUIZ.length) {
                setDone(true);
                return;
              }
              setIndex((i) => i + 1);
              setPicked(null);
            }}
            className="mt-5 min-h-[44px] rounded-full bg-white px-6 text-sm font-semibold text-black hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {index + 1 >= QUIZ.length ? t.finish : t.next} →
          </button>
        </div>
      )}
    </div>
  );
}
