import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/app/PageShell";
import { UploadDrop } from "@/components/app/UploadDrop";

export const Route = createFileRoute("/app/scanner")({
  head: () => ({ meta: [{ title: "Style Scanner — MirrorMind AI" }] }),
  component: Scanner,
});

const scores = [
  { k: "Professionalism", v: 87, c: "text-cyan" },
  { k: "Attractiveness", v: 92, c: "text-magenta" },
  { k: "Confidence", v: 94, c: "text-purple" },
  { k: "Trendiness", v: 81, c: "text-cyan" },
];

function Ring({ value, color }: { value: number; color: string }) {
  const r = 40, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="size-24">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      <motion.circle
        cx="50" cy="50" r={r} fill="none" strokeLinecap="round" strokeWidth="6"
        stroke={color}
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (c * value) / 100 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="55" textAnchor="middle" className="fill-foreground font-serif italic text-[22px]">{value}</text>
    </svg>
  );
}

function Scanner() {
  return (
    <PageShell title="AI Style Scanner" subtitle="/ confidence · professionalism · trend">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6">
        <UploadDrop label="Upload a photo to scan" hint="Best results in even lighting" />
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-4">/ live scoring</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {scores.map((s) => (
                <div key={s.k} className="text-center">
                  <Ring value={s.v} color={s.c === "text-cyan" ? "oklch(0.88 0.18 200)" : s.c === "text-magenta" ? "oklch(0.70 0.32 340)" : "oklch(0.65 0.28 305)"} />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{s.k}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-magenta mb-3">/ glow-up notes</p>
            <ul className="space-y-3 text-sm">
              {[
                "Swap the brown belt for a brushed-chrome buckle to lift trendiness by ~9 points.",
                "Add a single chain accent — your aesthetic profile under-indexes on metals.",
                "Push to a darker base palette; your undertone is cool, the warm khaki is dragging cohesion.",
              ].map((n, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 rounded-full bg-cyan animate-glow shrink-0" />
                  <span className="text-muted-foreground">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
