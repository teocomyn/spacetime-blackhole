import type { Faq as FaqItem } from "@/lib/seo";

export default function Faq({ title, items }: { title: string; items: readonly FaqItem[] }) {
  return (
    <section aria-labelledby="faq-title" className="mt-20">
      <h2 id="faq-title" className="mb-6 font-sans text-[clamp(1.5rem,3vw,2rem)] font-light text-white">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-white/10 bg-bg-secondary/40 open:border-accent-blue/30"
          >
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center gap-4 px-5 py-3 font-sans text-base text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{item.q}</span>
              <span aria-hidden="true" className="text-accent-cyan transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 font-sans text-sm leading-relaxed text-text-secondary">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
