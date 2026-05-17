import { createFileRoute } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";
import { PageShell } from "@/components/app/PageShell";
import { UploadDrop } from "@/components/app/UploadDrop";
import itemHoodie from "@/assets/item-hoodie.jpg";
import itemPants from "@/assets/item-pants.jpg";
import itemShoes from "@/assets/item-shoes.jpg";
import itemAccessory from "@/assets/item-accessory.jpg";

export const Route = createFileRoute("/app/matcher")({
  head: () => ({ meta: [{ title: "Smart Outfit Matcher — MirrorMind AI" }] }),
  component: Matcher,
});

const matches = [
  { img: itemPants, name: "Structural Cargos", meta: "Slate Grey · Tactical finish", match: 98, tone: "text-cyan", retailers: ["Zara", "H&M"] },
  { img: itemShoes, name: "Vertex Chrome Kicks", meta: "Holographic · Bio-form sole", match: 92, tone: "text-magenta", retailers: ["ASOS", "Nike"] },
  { img: itemAccessory, name: "Mercury Chain Set", meta: "Brushed silver · Layered", match: 89, tone: "text-purple", retailers: ["Urbanic", "Ajio"] },
];

function Matcher() {
  return (
    <PageShell title="Smart Outfit Matcher" subtitle="/ flagship · one item in, one silhouette out">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5">
          <div className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan/30 to-magenta/30 rounded-3xl blur-xl opacity-50" />
            <div className="relative glass-card rounded-3xl p-5 h-full">
              <UploadDrop label="Upload one item" hint="Top, bottom, shoes or accessory" />
              <div className="mt-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Detected</p>
                <p className="font-medium text-foreground mt-1">Oversized Mohair Hoodie · Obsidian</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-[10px] px-2 py-1 rounded bg-cyan/10 text-cyan ring-1 ring-cyan/20">Streetwear</span>
                  <span className="text-[10px] px-2 py-1 rounded bg-magenta/10 text-magenta ring-1 ring-magenta/20">Heavyweight knit</span>
                  <span className="text-[10px] px-2 py-1 rounded bg-purple/10 text-purple ring-1 ring-purple/20">Monochrome</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex lg:flex-col items-center justify-center gap-3">
          <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-cyan/40 to-transparent" />
          <div className="size-14 rounded-full grid place-items-center bg-background ring-1 ring-cyan/40 neon-cyan animate-glow">
            <Wand2 className="size-5 text-cyan" />
          </div>
          <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-magenta/40 to-transparent" />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="hidden lg:block">
            <p className="text-[10px] font-mono uppercase tracking-widest text-magenta">/ ai matches</p>
            <h3 className="font-serif italic text-2xl mt-1">Architected pairings</h3>
          </div>
          {[{ img: itemHoodie, name: "Base · Mohair Veil", meta: "Your uploaded item", match: 100, tone: "text-foreground", retailers: [] }, ...matches].map((m) => (
            <div key={m.name} className="glass-card rounded-2xl p-4 flex gap-4 hover:bg-white/5 transition">
              <div className="size-24 shrink-0 rounded-xl overflow-hidden ring-1 ring-white/5">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-medium text-foreground truncate">{m.name}</h5>
                  <span className={`text-[10px] font-bold ${m.tone}`}>{m.match}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{m.meta}</p>
                {m.retailers.length > 0 && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {m.retailers.map((r) => (
                      <button key={r} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-medium hover:bg-foreground hover:text-background transition">
                        BUY · {r.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { k: "Color harmony", v: "9.4/10", c: "text-cyan" },
          { k: "Aesthetic sync", v: "96%", c: "text-magenta" },
          { k: "Occasion fit", v: "Casual+", c: "text-purple" },
          { k: "Confidence Δ", v: "+18", c: "text-cyan" },
        ].map((s) => (
          <div key={s.k} className="glass-card rounded-2xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.k}</p>
            <p className={`font-serif italic text-3xl mt-1 ${s.c}`}>{s.v}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
