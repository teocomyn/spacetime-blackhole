"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg-primary px-6 text-center">
      <h1 className="font-serif text-3xl text-white">Une erreur est survenue</h1>
      <p className="max-w-md text-text-secondary">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-accent-blue/40 px-6 py-3 font-mono text-xs tracking-widest text-accent-cyan hover:bg-accent-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      >
        Réessayer
      </button>
    </div>
  );
}
