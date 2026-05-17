import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Wand2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/app/PageShell";
import { UploadDrop } from "@/components/app/UploadDrop";
import { generateOutfitMatchesFn } from "./app.matcher.server";

export const Route = createFileRoute("/app/matcher")({
  head: () => ({ meta: [{ title: "Smart Outfit Matcher — MirrorMind AI" }] }),
  component: Matcher,
});

const fileToBase64 = (file: File): Promise<string> => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

function Matcher() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ matches: any[], reasoning: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async (f: File) => {
    setLoading(true);
    setData(null);
    try {
      const base64 = await fileToBase64(f);
      setPreview(base64);
      const result = await generateOutfitMatchesFn({ data: base64 });
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="Smart Outfit Matcher" subtitle="/ flagship · one item in, one silhouette out">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan/30 to-magenta/30 rounded-3xl blur-xl opacity-50" />
            <div className="relative glass-card rounded-3xl p-5 h-full flex flex-col">
              <UploadDrop label="Upload one item" hint="Top, bottom, shoes or accessory" onFile={handleUpload} />
              
              <AnimatePresence>
                {preview && !loading && data && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-5 glass-card p-4 rounded-2xl"
                  >
                    <p className="text-[10px] font-mono uppercase tracking-widest text-magenta">Neural Analysis</p>
                    <p className="text-sm text-foreground mt-2 leading-relaxed">{data.reasoning}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <span className="text-[10px] px-2 py-1 rounded bg-cyan/10 text-cyan ring-1 ring-cyan/20 animate-pulse">AI Generated</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-2 flex lg:flex-col items-center justify-center gap-3">
          <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-cyan/40 to-transparent" />
          <motion.div 
            animate={{ rotate: loading ? 360 : 0 }}
            transition={{ repeat: loading ? Infinity : 0, duration: 2, ease: "linear" }}
            className="size-14 rounded-full grid place-items-center bg-background ring-1 ring-cyan/40 neon-cyan"
          >
            <Wand2 className="size-5 text-cyan" />
          </motion.div>
          <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-magenta/40 to-transparent" />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="hidden lg:block mb-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-magenta">/ ai matches</p>
            <h3 className="font-serif italic text-2xl mt-1">Architected pairings</h3>
          </div>

          <AnimatePresence mode="wait">
            {!loading && !data && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-[400px] border border-dashed border-white/10 rounded-3xl grid place-items-center bg-white/[0.01] p-12 text-center"
              >
                <p className="font-serif italic text-2xl text-muted-foreground">Waiting for anchor item</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">Upload a piece of clothing to see what AI builds around it.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-card rounded-2xl p-4 flex gap-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                    <div className="size-24 shrink-0 rounded-xl bg-white/5" />
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-4 bg-white/5 rounded-md w-3/4" />
                      <div className="h-3 bg-white/5 rounded-md w-1/2" />
                      <div className="h-6 bg-white/5 rounded-md w-1/4 mt-4" />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {!loading && data && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {data.matches.map((m: any, i: number) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                    key={m.name} className="group glass-card rounded-2xl p-4 flex gap-4 hover:bg-white/[0.08] hover:ring-white/20 transition duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                    <div className="size-24 shrink-0 rounded-xl overflow-hidden ring-1 ring-white/5">
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-medium text-foreground truncate">{m.name}</h5>
                          <span className={`text-[10px] font-bold ${m.tone}`}>{m.fit}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{m.price}</p>
                      </div>
                      <div className="mt-3">
                        <a href="#" target="_blank" rel="noreferrer" className="inline-flex px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-medium hover:bg-foreground hover:text-background transition">
                          BUY ON {m.brand.toUpperCase()}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {data && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { k: "Color harmony", v: "9.8/10", c: "text-cyan" },
              { k: "Aesthetic sync", v: "96%", c: "text-magenta" },
              { k: "Occasion fit", v: "Dynamic", c: "text-purple" },
              { k: "Confidence Δ", v: "+22", c: "text-cyan" },
            ].map((s, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + (i * 0.1) }}
                key={s.k} className="glass-card rounded-2xl p-5"
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.k}</p>
                <p className={`font-serif italic text-3xl mt-1 ${s.c}`}>{s.v}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
