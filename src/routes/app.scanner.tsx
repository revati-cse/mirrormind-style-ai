import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PageShell } from "@/components/app/PageShell";
import { UploadDrop } from "@/components/app/UploadDrop";
import { analyzeStyleFn } from "@/server/gemini";
import { Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/scanner")({
  head: () => ({ meta: [{ title: "Style Scanner — MirrorMind AI" }] }),
  component: Scanner,
});

function Ring({ value, color, animated }: { value: number; color: string; animated: boolean }) {
  const r = 40, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="size-24">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      <motion.circle
        cx="50" cy="50" r={r} fill="none" strokeLinecap="round" strokeWidth="6"
        stroke={color}
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={animated ? { strokeDashoffset: c - (c * value) / 100 } : { strokeDashoffset: c }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        transform="rotate(-90 50 50)"
      />
      {animated && (
        <motion.text 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }}
          x="50" y="55" textAnchor="middle" className="fill-foreground font-serif italic text-[22px]"
        >
          {value}
        </motion.text>
      )}
    </svg>
  );
}

const fileToBase64 = (file: File): Promise<string> => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

function Scanner() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ scores: any[], notes: string[] } | null>(null);

  const handleScan = async (f: File) => {
    setLoading(true);
    setData(null);
    try {
      const base64 = await fileToBase64(f);
      const result = await analyzeStyleFn({ data: base64 });
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="AI Style Scanner" subtitle="/ confidence · professionalism · trend">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6">
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <UploadDrop label="Upload a photo to scan" hint="Best results in even lighting" onFile={handleScan} />
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!loading && !data && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full border border-dashed border-white/10 rounded-3xl grid place-items-center bg-white/[0.01] p-12 text-center"
              >
                <Sparkles className="size-8 text-cyan/40 mb-4 mx-auto" />
                <p className="font-serif italic text-2xl text-muted-foreground">Awaiting input</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">Upload an image to activate the neural scanner and extract aesthetic metrics.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="h-full glass-card rounded-3xl p-12 flex flex-col items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan/5 animate-pulse" />
                <div className="size-20 rounded-full border border-cyan/20 bg-cyan/10 grid place-items-center neon-cyan relative">
                  <div className="absolute inset-0 rounded-full border border-cyan/50 animate-ping opacity-30" />
                  <Loader2 className="size-8 text-cyan animate-spin" />
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-cyan animate-pulse">Running neural scan...</p>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs text-center">Quantifying textures, silhouettes, and aesthetic alignment across 4 dimensions.</p>
              </motion.div>
            )}

            {!loading && data && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20"><Sparkles className="size-24 text-cyan" /></div>
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-cyan">/ live scoring</p>
                    <span className="px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/20 text-[10px] uppercase tracking-widest text-cyan animate-pulse">AI Generated</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {data.scores.map((s: any, i: number) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                        key={s.k} className="text-center"
                      >
                        <Ring animated={true} value={s.v} color={s.c === "text-cyan" ? "oklch(0.88 0.18 200)" : s.c === "text-magenta" ? "oklch(0.70 0.32 340)" : "oklch(0.65 0.28 305)"} />
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{s.k}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-6">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-magenta mb-4">/ glow-up notes</p>
                  <ul className="space-y-4 text-sm">
                    {data.notes.map((n: string, i: number) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
                        key={i} className="flex gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5"
                      >
                        <span className="mt-1 size-2 rounded-full bg-cyan animate-glow shrink-0 ring-4 ring-cyan/10" />
                        <span className="text-foreground leading-relaxed">{n}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-magenta/10 to-cyan/10 border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white mb-1">Aesthetic Compatibility</p>
                    <p className="font-serif italic text-2xl text-foreground">94% Match</p>
                  </div>
                  <button className="px-4 py-2 text-xs font-semibold rounded-full bg-white text-background hover:bg-white/90 transition">
                    Save to Profile
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
}
