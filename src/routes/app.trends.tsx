import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/app/PageShell";

export const Route = createFileRoute("/app/trends")({
  head: () => ({ meta: [{ title: "Trend Oracle — MirrorMind AI" }] }),
  component: Trends,
});

const trends = [
  { name: "Metallic Sheen", v: 80, c: "cyan", region: "Tokyo", note: "+24% w/w" },
  { name: "Modular Layering", v: 45, c: "purple", region: "Berlin", note: "+6% w/w" },
  { name: "Gorpcore 2.0", v: 95, c: "magenta", region: "Seoul", note: "+41% w/w" },
  { name: "Soft Coquette", v: 62, c: "cyan", region: "Paris", note: "+18% w/w" },
  { name: "Mercury Accent", v: 73, c: "magenta", region: "London", note: "+22% w/w" },
  { name: "Quiet Luxe", v: 88, c: "purple", region: "NYC", note: "+33% w/w" },
];

function Trends() {
  return (
    <PageShell title="Trend Oracle" subtitle="/ predictive aesthetics · live">
      <div className="glass-card rounded-3xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-2">/ rising fastest</p>
            <h2 className="font-serif italic text-3xl">Gorpcore 2.0 · +41% w/w</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">Technical outdoor silhouettes recoded with high-gloss synthetics. Driven by Seoul + Berlin underground feeds.</p>
          </div>
          <div className="flex gap-3">
            {["1D", "7D", "30D"].map((p, i) => (
              <button key={p} className={`text-xs font-medium px-3 py-1.5 rounded-full ring-1 ${i === 1 ? "bg-foreground text-background ring-foreground" : "ring-white/10"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trends.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t.region}</p>
              <span className={`text-[10px] font-bold text-${t.c}`}>{t.note}</span>
            </div>
            <p className="font-serif italic text-2xl mb-4">{t.name}</p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${t.v}%` }} transition={{ duration: 1.2, delay: 0.2 + i * 0.08 }}
                className={`h-full rounded-full bg-${t.c}`}
              />
            </div>
            <div className="mt-5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span>Momentum {t.v}/100</span>
              <span className="text-foreground">peak Q4</span>
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
